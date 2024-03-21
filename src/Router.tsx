import React, { useState } from "react"
import { Text } from "react-native"
import constants from "expo-constants"
import { BottomNavigation, Surface } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { usePlayer } from "./hooks/usePlayer"
import { Home } from "./screens/Home/Home"
import { SkillsScreen } from "./screens/SkillsScreen/SkillsScreen"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const { bottom } = useSafeAreaInsets()
    const player = usePlayer()

    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([
        { key: "home", title: "training", focusedIcon: "bullseye-arrow", unfocusedIcon: "bullseye-arrow" },
        { key: "skills", title: "skills", focusedIcon: "sitemap", unfocusedIcon: "sitemap" },
    ])

    const renderScene = BottomNavigation.SceneMap({ home: Home, skills: SkillsScreen })

    return (
        <Surface elevation={0} style={{ flex: 1 }}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                sceneAnimationEnabled
                sceneAnimationType="shifting"
                safeAreaInsets={{ bottom }}
                getBadge={({ route }) => (route.key == "skills" && !!player.points.attributes ? player.points.attributes : false)}
            />
            <Text style={{ position: "absolute", bottom: 5, right: 5, color: "red" }}>{constants.expoConfig?.version}</Text>
        </Surface>
    )
}
