import React from "react"
import { View } from "react-native"
import { Surface } from "react-native-paper"
import { IconStatusBar } from "./IconStatusBar"
import { usePlayer } from "../hooks/usePlayer"
import schema from "../style/colors.json"

interface HealthManaBarsProps {}

export const HealthManaBars: React.FC<HealthManaBarsProps> = ({}) => {
    const player = usePlayer()

    return (
        <Surface style={{ padding: 10, paddingLeft: 7, borderRadius: 10, gap: 5 }}>
            <IconStatusBar value={player.current.health} max_value={player.stats.health} color={schema.colors.strength} icon="heart" label />
            <IconStatusBar value={player.current.health} max_value={player.stats.mana} color={schema.colors.intelligence} icon="cards-spade" label />
        </Surface>
    )
}
