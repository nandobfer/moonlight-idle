import React from "react"
import { Button, Surface } from "react-native-paper"
import { monsters } from "../../monsters"
import { FlatList } from "react-native"
import { Image } from "expo-image"
import { IconNumber } from "../../components/IconNumber"
import { colors } from "../../style/colors"
import { usePlayer } from "../../hooks/usePlayer"

interface ChooseEnemyProps {
    setChosenLevel: React.Dispatch<React.SetStateAction<number>>
}

export const ChooseEnemy: React.FC<ChooseEnemyProps> = ({ setChosenLevel }) => {
    const player = usePlayer()
    const enemies = Object.entries(monsters)
        .map(([key, monster]) => ({ key, monster }))
        .reverse()
        .filter((item) => Number(item.key) <= player.tower_level)

    const onPress = (level: number) => {
        setChosenLevel(level)
    }

    return (
        <Surface elevation={0} style={{ flex: 1, paddingHorizontal: 20 }}>
            <FlatList
                data={enemies}
                renderItem={({ item }) => {
                    const image = item.monster.images.idle
                    return (
                        <Surface
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                flex: 1,
                                alignItems: "center",
                                borderRadius: 20,
                                padding: 10,
                                justifyContent: "space-between",
                            }}
                        >
                            <IconNumber color={colors.stamina} icon="star" value={item.key} elevation={5} />
                            <Image source={image.source} style={{ width: image.width, height: image.height }} />
                            <Button mode="contained-tonal" onPress={() => onPress(Number(item.key))}>
                                go
                            </Button>
                        </Surface>
                    )
                }}
                contentContainerStyle={{ gap: 20, paddingVertical: 20 }}
            />
        </Surface>
    )
}
