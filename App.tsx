import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import { Appearance } from "react-native"
import { Routes } from "./src/Router"
import { Providers } from "./src/Providers"
import { Snackbar } from "./src/components/Snackbar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { PlayerProvider } from "./src/contexts/playerContext"
import { useKeepAwake } from "expo-keep-awake"

export default function App() {
    Appearance.setColorScheme("dark")
    useKeepAwake()

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="auto" hidden />
                <PlayerProvider>
                    <Providers>
                        <Routes />
                        <Snackbar />
                    </Providers>
                </PlayerProvider>
            </GestureHandlerRootView>
        </>
    )
}
