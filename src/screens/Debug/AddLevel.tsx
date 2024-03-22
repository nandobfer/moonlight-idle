import React, { useCallback, useEffect, useState } from "react"
import { Button, Dialog, Portal, Surface, Text, TextInput } from "react-native-paper"
import { usePlayer } from "../../hooks/usePlayer"

interface AddLevelProps {}

export const AddLevel: React.FC<AddLevelProps> = ({}) => {
    const player = usePlayer()

    const [level, setLevel] = useState(player.level)
    const [dialog, setDialog] = useState(false)

    const onSubmit = useCallback(() => {
        const diff = level - player.level
        if (diff <= 0) {
            setDialog(true)
        } else {
            const needed_exp = player.getNeededExp(level - 1)
            console.log({ needed_exp })
            player.experience = needed_exp
            player.levelUp(diff)
        }
    }, [player.level, level, player.experience])

    useEffect(() => {
        setLevel(player.level)
    }, [player.level])

    return (
        <Surface style={{ flexDirection: "row" }}>
            <TextInput
                label={"set level"}
                mode="flat"
                style={{ width: "100%" }}
                value={level.toString()}
                onChangeText={(value) => setLevel(Number(value))}
                keyboardType="numeric"
                onSubmitEditing={onSubmit}
            />
            <Portal>
                <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
                    <Dialog.Title>can't set this level</Dialog.Title>
                    <Dialog.Content>
                        <Text>new level must be higher then current. If you need a lower level, a reset is needed.</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialog(false)}>ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Surface>
    )
}
