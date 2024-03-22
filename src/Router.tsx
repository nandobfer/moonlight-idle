import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import constants from "expo-constants"
import { BottomNavigation, Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { usePlayer } from "./hooks/usePlayer"
import { Home } from "./screens/Home/Home"
import { SkillsScreen } from "./screens/SkillsScreen/SkillsScreen"
import { useAppState } from "@react-native-community/hooks"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSnackbar } from "./hooks/useSnackbar"
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation"
import { Debug } from "./screens/Debug/Debug"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { bottom } = useSafeAreaInsets()
    const player = usePlayer()
    const currentAppState = useAppState()
    const snackbar = useSnackbar()

    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState<BaseRoute[]>([
        { key: "home", title: "training", focusedIcon: "bullseye-arrow", unfocusedIcon: "bullseye-arrow" },
        { key: "attributes", title: "attributes", focusedIcon: "format-list-numbered", unfocusedIcon: "format-list-numbered" },
        { key: "skills", title: "skills", focusedIcon: "sitemap", unfocusedIcon: "sitemap" },
        { key: "debug", title: "debug", focusedIcon: "console-line", unfocusedIcon: "console-line" },
    ])

    const renderScene = BottomNavigation.SceneMap({ home: Home, attributes: SkillsScreen, skills: SkillsScreen, debug: Debug })

    const handleIdle = async () => {
        try {
            const idle = await AsyncStorage.getItem("idle")
            const closed = JSON.parse(idle || "0")
            if (closed) {
                const elapsed_time = player.handleIdle(closed)
                snackbar(`you idle trained for ${Math.round(elapsed_time)} seconds`)
                await AsyncStorage.setItem("idle", "0")
            }
        } catch (error) {}
    }

    const getBadge = (key: string) => {
        switch (key) {
            case "attributes":
                return player.points.attributes || false
            case "skills":
                return player.points.skills || false
        }

        return false
    }

    useEffect(() => {
        console.log(currentAppState)

        if (currentAppState == "background" || currentAppState == "inactive") {
            AsyncStorage.setItem("idle", new Date().getTime().toString())
        } else {
            handleIdle()
        }
    }, [currentAppState])

    return (
        <Surface elevation={0} style={{ flex: 1 }}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                sceneAnimationEnabled
                sceneAnimationType="shifting"
                safeAreaInsets={{ bottom }}
                getBadge={({ route }) => getBadge(route.key)}
            />
            <Text style={{ position: "absolute", bottom: 5, right: 5, color: "red" }}>{constants.expoConfig?.version}</Text>
        </Surface>
    )
}
