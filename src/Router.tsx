import React, { useContext, useEffect, useState } from "react"
import { BackHandler, Text } from "react-native"
import constants from "expo-constants"
import { BottomNavigation, Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { usePlayer } from "./hooks/usePlayer"
import { Home } from "./screens/Home/Home"
import { useAppState } from "@react-native-community/hooks"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSnackbar } from "./hooks/useSnackbar"
import { Debug } from "./screens/Debug/Debug"
import { SkillTree } from "./screens/SkillTree/SkillTree"
import RouterContext from "./contexts/routerContext"
import { GamemodeScreen } from "./screens/GamemodeScreen/GamemodeScreen"
import { CharacterScreen } from "./screens/CharacterScreen/CharacterScreen"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { bottom } = useSafeAreaInsets()
    const player = usePlayer()
    const currentAppState = useAppState()
    const snackbar = useSnackbar()

    const { index, routes, setIndex } = useContext(RouterContext)

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        character: CharacterScreen,
        skills: SkillTree,
        fight: GamemodeScreen,
        debug: Debug,
    })

    const handleIdle = async () => {
        try {
            const idle = await AsyncStorage.getItem("idle")
            const closed = JSON.parse(idle || "0")
            if (closed) {
                const seconds = player.handleIdle(closed)
                // snackbar(
                //     `you was idle for ${Math.floor(seconds / 60 / 60)} hours, ${Math.floor(seconds / 60)} minutes and ${Math.floor(seconds)} seconds`
                // )
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

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", function () {
            return true
        })
    }, [])

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
