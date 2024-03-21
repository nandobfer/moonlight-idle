import React from "react"
import { View } from "react-native"
import { StatusBar, StatusBarProps } from "./StatusBar"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface IconStatusBarProps extends StatusBarProps {
    icon: string
}

export const IconStatusBar: React.FC<IconStatusBarProps> = ({ icon, max_value, value, color, label }) => {
    return (
        <View style={{ flexDirection: "row", gap: 5, width: "100%", alignItems: 'center' }}>
            <Icon name={icon} color={color} size={15} />
            <StatusBar value={value} max_value={max_value} color={color} label={label} />
        </View>
    )
}
