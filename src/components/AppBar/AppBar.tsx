import { NavigationContainerRef, NavigationProp } from "@react-navigation/native"
import * as React from "react"
import { Appbar, useTheme } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const BOTTOM_APPBAR_HEIGHT = 60

interface AppBarProps {
    navigator_ref: React.RefObject<NavigationContainerRef<ReactNavigation.RootParamList>>
}

const AppBar: React.FC<AppBarProps> = ({ navigator_ref }) => {
    const { bottom } = useSafeAreaInsets()
    const theme = useTheme()
    const current_screen = navigator_ref.current?.getCurrentRoute()?.name

    return (
        <Appbar
            style={[
                {
                    height: BOTTOM_APPBAR_HEIGHT + bottom,
                    backgroundColor: theme.colors.elevation.level2,
                    justifyContent: "space-around",
                },
            ]}
            safeAreaInsets={{ bottom }}
        >
            <Appbar.Action icon="bullseye-arrow" onPress={() => {}} isLeading={current_screen == "home"} />
            <Appbar.Action icon="gold" onPress={() => {}} isLeading={current_screen == "equipment"} />
            <Appbar.Action icon="sitemap" onPress={() => {}} isLeading={current_screen == "skill_tree"} />
            <Appbar.Action icon="bitcoin" onPress={() => {}} isLeading={current_screen == "shop"} />
            <Appbar.Action icon="sword-cross" onPress={() => {}} isLeading={current_screen == "battle"} />
        </Appbar>
    )
}

export default AppBar
