import React, { useEffect, useState } from "react"
import { Button, Surface } from "react-native-paper"
import { HealthManaBars } from "../../components/HealthManaBars"
import { Ui } from "../Home/Ui"
import { View } from "react-native"
import { IconNumber } from "../../components/IconNumber"
import { colors } from "../../style/colors"
import { usePlayer } from "../../hooks/usePlayer"
import { Image } from "expo-image"
import { IconStatusBar } from "../../components/IconStatusBar"
import { SlashAnimation } from "../../components/SlashAnimation"
import { Monster } from "../../class/Enemy/Monster"

interface fightProps {
    level: number
    goBack: () => void
}

export const Fight: React.FC<fightProps> = ({ level, goBack }) => {
    const player = usePlayer()
    const [render, setRender] = useState({})
    const rerender = () => {
        setRender({})
    }
    const [enemy, setEnemy] = useState(new Monster({ exp_multiplier: 1, level: level }, rerender))

    const [fighting, setFighting] = useState(false)

    useEffect(() => {
        if (enemy.dead) {
            setTimeout(() => {
                setFighting(false)
                player.killedTowerEnemy(enemy)
            }, 500)
        }
    }, [enemy.dead])

    return (
        <Surface elevation={0} style={{ flex: 1, padding: 20 }}>
            <HealthManaBars />
            <Ui>
                <Surface elevation={0} style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative", gap: 10 }}>
                    <View style={{ alignSelf: "flex-end" }}>
                        <IconNumber color={colors.strength} icon="star" value={level} />
                    </View>
                    <Image
                        source={enemy.dead ? enemy.asset.images.dead?.source : enemy.asset.images.idle.source}
                        style={{ width: enemy.asset.images.idle.width, height: enemy.asset.images.idle.height }}
                    />
                    <IconStatusBar value={enemy.health} max_value={enemy.stats.health} color={colors.strength} label compact />
                    {!fighting && (
                        <View style={{ position: "absolute", bottom: 100, gap: 20, flexDirection: "row" }}>
                            {enemy.dead ? (
                                <Button mode="contained" onPress={goBack}>
                                    stairs
                                </Button>
                            ) : (
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
