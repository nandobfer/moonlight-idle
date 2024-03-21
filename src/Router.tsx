import React, { useRef } from "react"
import { NavigationContainer, NavigationContainerRef, DarkTheme as NavigationDarkTheme } from "@react-navigation/native"
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack"
import { Text } from "react-native"
import constants from "expo-constants"
import schema from "./style/colors.json"
import { Home } from "./screens/Home/Home"
import { Surface } from "react-native-paper"
import AppBar from "./components/AppBar/AppBar"

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
    const navigator_ref = useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null)
    const Stack = createNativeStackNavigator()
    const navigator_options: NativeStackNavigationOptions = {
        headerStyle: {
            backgroundColor: "red",
        },
        headerTintColor: "white",
        headerTitleStyle: {
            fontWeight: "bold",
        },
        headerTitleAlign: "center",
        animation: "slide_from_right",
        headerShown: false,
    }

    const home_header_options = {
        title: "Casa Lúdica alguma coisa",
        headerShown: false,
    }

    const CombinedDarkTheme = {
        ...NavigationDarkTheme,
        colors: { ...NavigationDarkTheme.colors, ...schema.colors },
    }

    return (
        <Surface elevation={0} style={{ flex: 1 }}>
            <NavigationContainer theme={CombinedDarkTheme} ref={navigator_ref}>
                <Stack.Navigator initialRouteName="home" screenOptions={navigator_options}>
                    <Stack.Screen name={"home"} component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
            <AppBar navigator_ref={navigator_ref} />
            <Text style={{ position: "absolute", bottom: 5, right: 5, color: "red" }}>{constants.expoConfig?.version}</Text>
        </Surface>
    )
}
