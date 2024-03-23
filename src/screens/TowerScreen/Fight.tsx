import React, { useEffect, useRef, useState } from "react"
import { Button, Surface } from "react-native-paper"
import { HealthManaBars } from "../../components/HealthManaBars"
import { Ui } from "../Home/Ui"
import { BackHandler, View } from "react-native"
import { IconNumber } from "../../components/IconNumber"
import { colors } from "../../style/colors"
import { usePlayer } from "../../hooks/usePlayer"
import { Image } from "expo-image"
import { IconStatusBar } from "../../components/IconStatusBar"
import { SlashAnimation } from "../../components/SlashAnimation"
import { Monster } from "../../class/Enemy/Monster"
import SpriteSheet from "rn-sprite-sheet"

interface fightProps {
    level: number
    goBack: () => void
}

export const Fight: React.FC<fightProps> = ({ level, goBack }) => {
    const ref = useRef<SpriteSheet>(null)
    const player = usePlayer()
    const [render, setRender] = useState({})
    const rerender = () => {
        setRender({})
    }
    const [enemy, setEnemy] = useState(new Monster({ exp_multiplier: 1, level: level }, rerender))

    const [fighting, setFighting] = useState(false)

    useEffect(() => {
        if (enemy.dead) {
            ref.current?.play({
                type: "dying",
                fps: 7,
                onFinish: () => {
                    setFighting(false)
                    ref.current?.play({ type: "dead", loop: false, fps: 1 })
                    player.killedTowerEnemy(enemy)
                },
            })
        }
    }, [enemy.dead])

    useEffect(() => {
        ref.current?.play({ type: "idle", loop: true, fps: 7 })
    }, [])

    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", function () {
    //         console.log(level)
    //         if (level > 0 && !fighting) {
    //             goBack()
    //             return true
    //         }
    //         return false
    //     })

    //     return () => {
    //         BackHandler.removeEventListener("hardwareBackPress", () => false)
    //     }
    // }, [fighting, level])

    return (
        <Surface elevation={0} style={{ flex: 1, padding: 20 }}>
            <HealthManaBars />
            <Ui>
                <Surface elevation={0} style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative", gap: 10 }}>
                    <View style={{ alignSelf: "flex-end" }}>
                        <IconNumber color={colors.strength} icon="star" value={level} />
                    </View>

                    <SpriteSheet
                        ref={ref}
                        source={enemy.asset.images.spritesheet}
                        columns={3}
                        rows={5}
                        animations={{
                            idle: [0, 1, 2, 1],
                            attack1: [3, 4, 5],
                            attack2: [6, 7, 8],
                            dying: [9, 10, 11],
                            dead: [12, 13, 14],
                        }}
                    />

                    <IconStatusBar value={enemy.health} max_value={enemy.stats.health} color={colors.strength} label compact />
                    {!fighting && (
                        <View style={{ position: "absolute", bottom: 100, gap: 20, flexDirection: "row" }}>
                            <Button mode="contained-tonal" onPress={goBack}>
                                stairs
                            </Button>
                            {!enemy.dead && (
                                <Button mode="contained" onPress={() => setFighting(true)}>
                                    start
                                </Button>
                            )}
                        </View>
                    )}

                    {fighting && <SlashAnimation enemy={enemy} />}
                </Surface>
            </Ui>
        </Surface>
    )
}
