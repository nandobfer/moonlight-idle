import React, { useEffect, useState } from "react"
import { usePlayer } from "../../hooks/usePlayer"
import { ChooseEnemy } from "./ChooseEnemy"
import { Fight } from "./Fight"

interface TowerScreenProps {}

export const TowerScreen: React.FC<TowerScreenProps> = ({}) => {
    const player = usePlayer()

    const [screen, setScreen] = useState("list")
    const [chosenLevel, setChosenLevel] = useState(0)

    useEffect(() => {
        if (screen == "list") {
            setChosenLevel(0)
        }
    }, [screen])

    useEffect(() => {
        if (chosenLevel > 0) {
            setScreen("fight")
        } else {
            setScreen("list")
        }
    }, [chosenLevel])

    return (
        <>
            {screen == "list" && <ChooseEnemy setChosenLevel={setChosenLevel} />}
            {screen == "fight" && <Fight level={chosenLevel} goBack={() => setScreen("list")} />}
        </>
    )
}
