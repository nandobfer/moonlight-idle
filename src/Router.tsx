import React, { useContext, useEffect, useState } from "react"
import { Text } from "react-native"
import constants from "expo-constants"
import { BottomNavigation, Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { usePlayer } from "./hooks/usePlayer"
import { Home } from "./screens/Home/Home"
import { AttributesScreen } from "./screens/AttributesScreen/AttributesScreen"
import { useAppState } from "@react-native-community/hooks"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSnackbar } from "./hooks/useSnackbar"
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation"
import { Debug } from "./screens/Debug/Debug"
import { SkillTree } from "./screens/SkillTree/SkillTree"
import { Equipment } from "./screens/Equipment/Equipment"
import RouterContext from "./contexts/routerContext"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { bottom } = useSafeAreaInsets()
    const player = usePlayer()
    const currentAppState = useAppState()
    const snackbar = useSnackbar()

    const { index, routes, setIndex } = useContext(RouterContext)

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        attributes: AttributesScreen,
        skills: SkillTree,
        equipment: Equipment,
        fight: Equipment,
        debug: Debug,
    })

    const handleIdle = async () => {
        try {
            const idle = await AsyncStorage.getItem("idle")
            const closed = JSON.parse(idle || "0")
            if (closed) {
                const seconds = player.handleIdle(closed)
                snackbar(
                    `you was idle for ${Math.floor(seconds / 60 / 60)} hours, ${Math.floor(seconds / 60)} minutes and ${Math.floor(seconds)} seconds`
                )
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
