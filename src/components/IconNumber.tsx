import React from "react"
import { Surface, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/FontAwesome6"

interface IconNumberProps {
    icon: string
    value: string | number
    color: string
    size?: number
    elevation?: 0 | 1 | 2 | 3 | 4 | 5
}

export const IconNumber: React.FC<IconNumberProps> = ({ icon, value, color, elevation = 1, size = 50 }) => {
    return (
        <Surface
            elevation={elevation}
            style={{
                borderRadius: 1000,
                minWidth: size,
                height: size,
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
