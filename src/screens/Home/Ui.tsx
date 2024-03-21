import React, { useEffect, useState } from "react"
import { usePlayer } from "../../hooks/usePlayer"
import { Surface, Text } from "react-native-paper"
import { StatusBar } from "../../components/StatusBar"
import schema from "../../style/colors.json"
import { View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome6"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { IconStatusBar } from "../../components/IconStatusBar"

interface UiProps {
    children?: React.ReactNode
}

export const Ui: React.FC<UiProps> = ({ children }) => {
    const text_style = {fontSize: 10}
    const player = usePlayer()
    const [maxExp, setMaxExp] = useState(player.getNextLevelExp())

    useEffect(() => {
        setMaxExp(player.getNextLevelExp())
    }, [player.level])

    return (
        <Surface style={{ flex: 1, padding: 20 }} elevation={0}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", position: "relative" }}>
                <Surface style={{ flex: 0.5, padding: 10, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", opacity: 0.7 }}>
                    <View style={{ gap: 2 }}>
                        <Text style={text_style}>level: {player.level}</Text>
                        <Text style={text_style}>strenght: {player.attributes.strenght}</Text>
                        <Text style={text_style}>dexterity: {player.attributes.dexterity}</Text>
                        <Text style={text_style}>inteligence: {player.attributes.inteligence}</Text>
                        <Text style={text_style}>stamina: {player.attributes.stamina}</Text>
                    </View>
                    <View style={{ gap: 2 }}>
                        <Text style={text_style}>attack power: {player.stats.attack_power}</Text>
                        <Text style={text_style}>attack speed: {player.stats.attack_speed}</Text>
                        <Text style={text_style}>magical power: {player.stats.magical_power}</Text>
                        <Text style={text_style}>cooldown reduction: {player.stats.cooldown_reduction}</Text>
                        <Text style={text_style}>critical chance: {player.stats.critical_chance}</Text>
                    </View>
                </Surface>
                <Surface
                    style={{
                        position: "absolute",
                        right: 0,
                        borderRadius: 1000,
                        minWidth: 50,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        flexDirection: "row",
                        gap: 5,
                    }}
                >
                    <Icon name="coins" size={15} color={schema.colors.stamina} />
                    <Text style={{ color: schema.colors.stamina }}>{player.coin}</Text>
                </Surface>
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
                        <Text style={{ color: schema.colors.primaryContainer, fontWeight: "bold" }}>XP</Text>
                    </Surface>
                </Surface>
                <StatusBar value={player.experience} max_value={maxExp} color={schema.colors.inversePrimary} label />
            </Surface>
        </Surface>
    )
}
