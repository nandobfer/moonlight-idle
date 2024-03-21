import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { usePlayer } from "../../hooks/usePlayer"
import { Attributes } from "../../types/player/attributes"

interface DetailsProps {
    attributes: Attributes
}

export const Details: React.FC<DetailsProps> = ({ attributes }) => {
    const player = usePlayer()

    const [stats, setStats] = useState(player.getUpdatedStats(attributes))

    useEffect(() => {
        setStats(player.getUpdatedStats(attributes))
    }, [attributes])

    return (
        <Surface style={{ flex: 0.5, flexDirection: "row", justifyContent: "space-between", padding: 10, borderRadius: 10 }}>
            <View style={{ gap: 5, flex: 0.5 }}>
                <Text>level: {player.level}</Text>
                <Text>health: {stats.health}</Text>
                <Text>mana: {stats.mana}</Text>
                <Text>armor: {stats.armor}</Text>
            </View>
            <View style={{ gap: 5, flex: 0.5 }}>
                <Text>attack power: {stats.attack_power}</Text>
                <Text>attack speed: {stats.attack_speed} /s</Text>
                <Text>critical chance: {stats.critical_chance} %</Text>
                <Text>critical multiplier: x{stats.critical_multiplier}</Text>
            </View>
        </Surface>
    )
}
