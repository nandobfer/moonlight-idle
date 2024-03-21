import { NavigationContainerRef, NavigationProp } from "@react-navigation/native"
import * as React from "react"
import { Appbar, BottomNavigation, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Home } from "../../screens/Home/Home"
import { SkillsScreen } from "../../screens/SkillsScreen/SkillsScreen"

const BOTTOM_APPBAR_HEIGHT = 60

interface AppBarProps {
    navigator_ref: React.RefObject<NavigationContainerRef<ReactNavigation.RootParamList>>
}

const AppBar: React.FC<AppBarProps> = ({ navigator_ref }) => {
    const { bottom } = useSafeAreaInsets()
    const theme = useTheme()
    const current_screen = navigator_ref.current?.getCurrentRoute()?.name

    const [index, setIndex] = React.useState(0)
    const [routes, setRoutes] = React.useState([
        { key: "home", title: "training", focusedIcon: "bullseye-arrow", unfocusedIcon: "bullseye-arrow" },
        { key: "skills", title: "skills", focusedIcon: "sitemap", unfocusedIcon: "sitemap" },
    ])

    const navigate = (route: string) => {
        console.log(navigator_ref)
        if (navigator_ref.current) {
            // @ts-ignore
            navigator_ref.current.navigate(route)
        }
    }

    const renderScene = BottomNavigation.SceneMap({ home: Home, skills: SkillsScreen })

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            sceneAnimationEnabled
            sceneAnimationType="shifting"
            safeAreaInsets={{ bottom }}
        />
        // <Appbar
        //     style={[
        //         {
        //             height: BOTTOM_APPBAR_HEIGHT + bottom,
        //             backgroundColor: theme.colors.elevation.level2,
        //             justifyContent: "space-around",
        //         },
        //     ]}
        //     safeAreaInsets={{ bottom }}
        // >
        //     <Appbar.Action icon="bullseye-arrow" onPress={() => navigate("home")} isLeading={current_screen == "home"} />
        //     <Appbar.Action icon="gold" onPress={() => navigate("skills")} isLeading={current_screen == "equipment"} />
        //     <Appbar.Action icon="sitemap" onPress={() => navigate("home")} isLeading={current_screen == "skill_tree"} />
        //     <Appbar.Action icon="bitcoin" onPress={() => navigate("home")} isLeading={current_screen == "shop"} />
        //     <Appbar.Action icon="sword-cross" onPress={() => navigate("home")} isLeading={current_screen == "battle"} />
        // </Appbar>
    )
}

export default AppBar
