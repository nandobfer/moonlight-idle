import React, { useEffect, useState } from "react"
import { usePlayer } from "../../hooks/usePlayer"
import { Surface, Text } from "react-native-paper"
import { StatusBar } from "../../components/StatusBar"
import schema from "../../style/colors.json"
import { View } from "react-native"
import { IconNumber } from "../../components/IconNumber"

interface UiProps {
    children?: React.ReactNode
}

export const Ui: React.FC<UiProps> = ({ children }) => {
    const player = usePlayer()
    const [maxExp, setMaxExp] = useState(player.getNeededExp(player.level))

    useEffect(() => {
        setMaxExp(player.getNeededExp(player.level))
    }, [player.level])

    return (
        <Surface style={{ flex: 1, padding: 20 }} elevation={0}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", position: "relative" }}>
                <IconNumber icon="star-of-david" color={schema.colors.inversePrimary} value={player.level} />
                <IconNumber icon="coins" color={schema.colors.stamina} value={player.coin} />
            </View>
            {children}
            <Surface style={{ paddingBottom: 5, position: "relative" }}>
                <Surface style={{ position: "absolute", width: "100%", justifyContent: "center", alignItems: "center" }} elevation={0}>
                    <Surface
                        style={{
                            borderRadius: 1000,
                            minWidth: 50,
                            top: -35,
                            height: 50,
                            alignItems: "center",
                            padding: 10,
                        }}
                    >
                        <Text style={{ color: schema.colors.inversePrimary, fontWeight: "bold" }}>exp</Text>
                    </Surface>
                </Surface>
                <StatusBar value={player.experience} max_value={maxExp} color={schema.colors.inversePrimary} label />
            </Surface>
        </Surface>
    )
}
