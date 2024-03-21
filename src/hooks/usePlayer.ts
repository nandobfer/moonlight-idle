import { useContext } from "react"
import PlayerContext from "../contexts/playerContext"

export const usePlayer = () => {
    const {player} = useContext(PlayerContext)
    if (player === null) throw 'player not loaded yet'

    return player
}