import React from "react"
import { Surface } from "react-native-paper"
import { AddLevel } from "./AddLevel"
import { Reset } from "./Reset"
import { Ui } from "../Home/Ui"

interface DebugProps {}

export const Debug: React.FC<DebugProps> = ({}) => {
    return (
        <Ui>
            <Surface elevation={0} style={{ flex: 1, paddingVertical: 20, gap: 20 }}>
                <AddLevel />
                <Reset />
            </Surface>
        </Ui>
    )
}