import React from "react"
import { View } from "react-native"
import { Button, IconButton, Surface, Text } from "react-native-paper"
import { usePlayer } from "../../hooks/usePlayer"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface AttributeInputProps {
    value: number
    onChange: (value: number) => void
    color: string
    name: string
    can_decrease: boolean
}

export const AttributeInput: React.FC<AttributeInputProps> = ({ value, onChange, color, name, can_decrease }) => {
    const button_size = 10
    const player = usePlayer()

    const handleChange = (sum: number) => {
        onChange(sum)
        player.points.attributes += sum * -1
        player.render()
    }

    return (
        <Surface style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, borderRadius: 10 }}>
            <Text>{name}</Text>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
                <IconButton mode="contained" onPress={() => handleChange(-1)} disabled={!can_decrease} icon={"minus"} size={button_size} />
                <Text style={{ width: 50, textAlign: "center" }}>{value}</Text>
                <IconButton mode="contained" onPress={() => handleChange(1)} disabled={!player.points.attributes} icon={"plus"} size={button_size} />
            </View>
        </Surface>
    )
}
