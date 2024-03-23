import React, { useRef } from "react"
import { Button, Surface } from "react-native-paper"
import { MonsterAsset } from "../../types/monster_assets"
import { IconNumber } from "../../components/IconNumber"
import { colors } from "../../style/colors"
import { View } from "react-native"
import SpriteSheet from "rn-sprite-sheet"

interface EnemyChoosingComponentProps {
    enemy: MonsterAsset
    id: string
    onPress: (level: number) => void
}

export const EnemyChoosingComponent: React.FC<EnemyChoosingComponentProps> = ({ enemy, id, onPress }) => {
    const ref = useRef<SpriteSheet>(null)
    return (
        <Surface
            style={{
                width: "100%",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                borderRadius: 20,
                padding: 10,
                maxHeight: 120,
                overflow: "hidden",
                paddingHorizontal: 20,
                justifyContent: "space-between",
            }}
        >
            <IconNumber color={colors.stamina} icon="star" value={id} elevation={5} />
            <View style={{ width: 100, alignItems: "center" }}>
                <SpriteSheet
                    ref={ref}
                    source={enemy.spritesheet}
                    columns={3}
                    rows={5}
                    animations={{
                        idle: [0, 1, 2, 1],
                        attack1: [3, 4, 5],
                        attack2: [6, 7, 8],
                        dying: [9, 10, 11],
                        dead: [12, 13, 14],
                    }}
                    onLoad={() => ref.current?.play({ type: "idle", fps: 7, loop: true })}
                />
            </View>
            <Button mode="contained-tonal" onPress={() => onPress(Number(id))}>
                go
            </Button>
        </Surface>
    )
}
