import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Surface, Text } from "react-native-paper"
import { Attributes } from "../../types/player/attributes"
import { usePlayer } from "../../hooks/usePlayer"
import { formatTime } from "../../tools/formatTime"

interface DetailsProps {
    attributes: Attributes
}

export const Details: React.FC<DetailsProps> = ({ attributes }) => {
    const player = usePlayer()

    // const [stats, setStats] = useState(player.current)

    // useEffect(() => {
    //     setStats(player.current)
    // }, [player.current])

    return (
        <Surface style={{ flex: 0.3, flexDirection: "row", justifyContent: "space-between", padding: 10, borderRadius: 10 }}>
            <View style={{ gap: 5, flex: 0.5 }}>
                <Text>level: {player.level}</Text>
                <Text>health: {player.current.max_health}</Text>
                <Text>mana: {player.current.max_mana}</Text>
                <Text>armor: {Math.round(player.current.armor)}</Text>
                <Text>idle: {formatTime(player.stats.idle)}</Text>
                <Text>kills: {player.stats.kills}</Text>
            </View>
            <View style={{ gap: 5, flex: 0.5 }}>
                <Text>attack power: {player.current.attack_power}</Text>
                <Text>attack speed: {player.current.attack_speed} /s</Text>
                <Text>critical chance: {player.current.critical_chance} %</Text>
                <Text>critical multiplier: x{player.current.critical_multiplier}</Text>
                <Text>damage /s: {Math.round(player.current.dps)}</Text>
            </View>
        </Surface>
    )
}
