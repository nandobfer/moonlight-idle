import React from "react"
import { Surface, Text } from "react-native-paper"

interface EquipmentProps {}

export const Equipment: React.FC<EquipmentProps> = ({}) => {
    return (
        <Surface style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>vem aí</Text>
        </Surface>
    )
}
