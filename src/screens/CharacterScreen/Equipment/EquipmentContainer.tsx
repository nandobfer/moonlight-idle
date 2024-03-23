import React from "react"
import { Surface, Text } from "react-native-paper"

interface EquipmentProps {}

export const EquipmentContainer: React.FC<EquipmentProps> = ({}) => {
    return (
        <Surface style={{ flex: 0.7, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <Text>vem ai equipamentos</Text>
        </Surface>
    )
}
