import React from "react"
import { View } from "react-native"
import { ProgressBar, Surface, Text } from "react-native-paper"

export interface StatusBarProps {
    value: number
    max_value: number
    color?: string
    label?: boolean
}

export const StatusBar: React.FC<StatusBarProps> = ({ value, max_value, color, label }) => {
    const size = 14
    const current_value = Math.floor(value) / max_value

    return (
        <Surface elevation={0} style={{ position: "relative", flex: 1 }}>
            <ProgressBar progress={current_value} color={color} style={{ height: size, borderRadius: 2 }} />
            {label && (
                <View
                    style={{
                        position: "absolute",
                        justifyContent: "center",
                        alignItems: "center",
                        width: '100%'
                    }}
                >
                    <Text adjustsFontSizeToFit style={{ height: size }}>
                        {Math.floor(value)} / {max_value}
                    </Text>
                </View>
            )}
        </Surface>
    )
}
