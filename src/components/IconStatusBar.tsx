import React from "react"
import { View } from "react-native"
import { StatusBar, StatusBarProps } from "./StatusBar"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface IconStatusBarProps extends StatusBarProps {
    icon?: string
    compact?: boolean
}

export const IconStatusBar: React.FC<IconStatusBarProps> = ({ icon, max_value, value, color, label, compact }) => {
    return (
        <View style={{ flexDirection: "row", gap: 5, width: compact ? "50%" : "100%", alignItems: "center" }}>
            {!!icon && <Icon name={icon} color={color} size={15} />}
            <StatusBar value={value} max_value={max_value} color={color} label={label} />
        </View>
    )
}
