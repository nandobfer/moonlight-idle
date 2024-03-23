import React, { useEffect, useRef, useState } from "react"
import { Button, Dialog, Portal, Surface, Text } from "react-native-paper"
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
    let damages_key = 0
    const ref = useRef<SpriteSheet>(null)
    const player = usePlayer()
    const [render, setRender] = useState({})
    const rerender = () => {
        setRender({})
    }
    const [enemy, setEnemy] = useState(new Monster({ exp_multiplier: level * 2, level: level }, rerender))

    const [damages, setDamages] = useState<{ key: number; damage: number; top: number; left: number }[]>([])
    const [fightResult, setFightResult] = useState(false)
    const [drops, setDrops] = useState<{ coin: number; exp: number; advanced_tower: boolean }>()

    const [fighting, setFighting] = useState(false)

    const renderDamage = (damage: number) => {
        damages_key += 1
        setDamages((damages) => [...damages, { key: damages_key, damage, left: Math.random() * 50, top: Math.random() * 50 }])
        setTimeout(() => setDamages((damages) => damages.filter((item) => item.key != damages_key)), 500)
    }

    const onEnemyAttack = () => {
        const damage = enemy.attack()
        renderDamage(damage)

        const remaining_health = player.takeHit(damage)
        if (remaining_health == 0) {
            setFighting(false)
            setFightResult(true)
        }
    }

    useEffect(() => {
        if (!fighting) {
            player.revive()
            enemy.revive()
        }
    }, [fighting])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!enemy.dead && fighting) {
                const variant = Math.random() > 0.5 ? "attack1" : "attack2"
                ref.current?.play({
                    type: variant,
                    fps: 7,
                    onFinish: () => {
                        ref.current?.play({ type: "idle", loop: true, fps: 7 })
                        // attack logic
                        onEnemyAttack()
                    },
                })
            }
        }, 1000 / enemy.stats.attack_speed)

        if (enemy.dead && fighting) {
            clearInterval(interval)
            ref.current?.play({
                type: "dying",
                fps: 7,
                onFinish: () => {
                    ref.current?.play({ type: "dead", loop: false, fps: 1 })
                    // after dead logic
                    const drops = player.killedTowerEnemy(enemy)
                    setDrops(drops)
                    setFightResult(true)
                    setFighting(false)
                },
            })
        }

        return () => {
            clearInterval(interval)
        }
    }, [enemy.dead, fighting])

    useEffect(() => {
        ref.current?.play({ type: "idle", loop: true, fps: 7 })
    }, [])

    return (
        <Surface elevation={0} style={{ flex: 1, padding: 20 }}>
            <HealthManaBars />
            <Ui>
                <Surface elevation={0} style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative", gap: 10 }}>
                    <View
                        style={{ alignSelf: "flex-end", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}
                    >
                        <View style={{ position: "relative" }}>
                            {damages.map((item) => {
                                return (
                                    <Text variant="bodyLarge" style={{ color: colors.stamina, top: item.top, left: item.left }} key={item.key}>
                                        {item.damage}
                                    </Text>
                                )
                            })}
                        </View>
                        <IconNumber color={colors.strength} icon="star" value={level} />
                    </View>

                    <SpriteSheet
                        ref={ref}
                        source={enemy.asset.spritesheet}
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

            <Portal>
                <Dialog visible={fightResult} onDismiss={() => setFightResult(false)}>
                    <Dialog.Title>{drops ? `you killed the ${enemy.name}` : "you died"}</Dialog.Title>
                    {!!drops && (
                        <Dialog.Content>
                            <Surface style={{ padding: 10, gap: 5, borderRadius: 10 }}>
                                <Text>coins: {drops.coin}</Text>
                                <Text>exp: {drops.exp}</Text>
                            </Surface>
                        </Dialog.Content>
                    )}
                    <Dialog.Actions>
                        {drops?.advanced_tower && <Text>you unlocked a new floor</Text>}
                        <Button onPress={() => setFightResult(false)}>ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Surface>
    )
}
