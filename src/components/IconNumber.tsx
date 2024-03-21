import React from "react"
import { Surface, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/FontAwesome6"

interface IconNumberProps {
    icon: string
    value: string | number
    color: string
}

export const IconNumber: React.FC<IconNumberProps> = ({ icon, value, color }) => {
    return (
        <Surface
            style={{
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
            <Icon name={icon} size={15} color={color} />
            <Text style={{ color: color }}>{value}</Text>
        </Surface>
    )
}
