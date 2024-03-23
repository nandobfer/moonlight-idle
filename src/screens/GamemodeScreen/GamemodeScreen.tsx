import { Image } from "expo-image"
import React, { useState } from "react"
import { Surface } from "react-native-paper"
import { TowerComponent } from "./TowerComponent"
import { TowerScreen } from "../TowerScreen/TowerScreen"

interface GamemodeScreenProps {}

export const GamemodeScreen: React.FC<GamemodeScreenProps> = ({}) => {
    const [screen, setScreen] = useState("home")
    return (
        <>
            {screen == "home" && (
                <Surface elevation={0} style={{ flex: 1, padding: 20 }}>
                    <TowerComponent onPress={() => setScreen("tower")} />
                </Surface>
            )}
            {screen == "tower" && <TowerScreen />}
        </>
    )
}
