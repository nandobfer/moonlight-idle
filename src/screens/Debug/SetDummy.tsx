import React, { useState } from "react"
import { Surface, TextInput } from "react-native-paper"
import { usePlayer } from "../../hooks/usePlayer"
import { Dummy } from "../../class/Enemy/Dummy"

interface SetDummyProps {}

export const SetDummy: React.FC<SetDummyProps> = ({}) => {
    const player = usePlayer()
    const dummy = player.dummy

    const [level, setLevel] = useState(dummy.level)

    const onSubmit = () => {
        const new_dummy = new Dummy(level)
        player.setNewDummy(new_dummy)
    }

    return (
        <Surface style={{ flexDirection: "row" }}>
            <TextInput
                label={"set dummy"}
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
