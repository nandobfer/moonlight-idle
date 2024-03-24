import { createContext, useEffect, useState } from "react"
import React from "react"
import { Player } from "../class/Player/Player"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface PlayerContextValue {
    player: Player | null
    setPlayer: React.Dispatch<React.SetStateAction<Player | null>>
    resetPlayer: () => void
}

interface PlayerProviderProps {
    children: React.ReactNode
}

const PlayerContext = createContext<PlayerContextValue>({} as PlayerContextValue)

export default PlayerContext

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [player, setPlayer] = useState<Player | null>(null)
    const [render, setRender] = useState({})

    const reRender = () => {
        setRender({})
    }

    const loadPlayer = async () => {
        const data = await AsyncStorage.getItem("player")
        if (data) {
            const player_data: Player = JSON.parse(data)
            try {
                setPlayer(new Player(reRender, player_data))
            } catch (error) {
                setPlayer(new Player(reRender))
            }
        } else {
            setPlayer(new Player(reRender))
        }
    }

    const resetPlayer = () => {
        setPlayer(new Player(reRender))
        reRender()
        setTimeout(() => player?.save(), 500)
    }

    useEffect(() => {
        console.log({ player })
        const exp_interval = setInterval(() => {
            player?.addExp()
        }, 500)
        const save_interval = setInterval(() => {
            player?.save()
        }, 60 * 1000)

        return () => {
            clearInterval(exp_interval)
            clearInterval(save_interval)
        }
    }, [player])

    useEffect(() => {
        loadPlayer()
        // setPlayer(new Player(reRender))
    }, [])

    return <PlayerContext.Provider value={{ player, setPlayer, resetPlayer }}>{children}</PlayerContext.Provider>
}
