import React, { useContext } from "react"
import { Button, Surface } from "react-native-paper"
import PlayerContext from "../../contexts/playerContext"

interface ResetProps {}

export const Reset: React.FC<ResetProps> = ({}) => {
    const { resetPlayer } = useContext(PlayerContext)
    return (
        <Button mode="contained" style={{}} onPress={resetPlayer}>
            reset player
        </Button>
    )
}
