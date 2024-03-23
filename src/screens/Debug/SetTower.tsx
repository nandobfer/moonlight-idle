import React, { useState } from "react"
import { Surface, TextInput } from "react-native-paper"
import { usePlayer } from "../../hooks/usePlayer"
import { Dummy } from "../../class/Enemy/Dummy"

interface SetTowerProps {}

export const SetTower: React.FC<SetTowerProps> = ({}) => {
    const player = usePlayer()

    const [level, setLevel] = useState(player.tower_level)

    const onSubmit = () => {
        player.tower_level = level
        player.render()
    }

    return (
        <Surface style={{ flexDirection: "row" }}>
            <TextInput
                label={"set tower level"}
                mode="flat"
                style={{ width: "100%" }}
                value={level.toString()}
                onChangeText={(value) => setLevel(Number(value))}
                keyboardType="numeric"
                onSubmitEditing={onSubmit}
            />
        </Surface>
    )
}
