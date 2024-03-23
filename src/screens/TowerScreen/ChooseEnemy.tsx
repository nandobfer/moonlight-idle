import React, { useEffect } from "react"
import { Button, Surface } from "react-native-paper"
import { monsters } from "../../monsters"
import { FlatList, View } from "react-native"
import { Image } from "expo-image"
import { IconNumber } from "../../components/IconNumber"
import { colors } from "../../style/colors"
import { usePlayer } from "../../hooks/usePlayer"
import { Ui } from "../Home/Ui"

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
        <Surface elevation={0} style={{ flex: 1, position: "relative" }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[...enemies]}
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
                                maxHeight: 120,
                                overflow: "hidden",
                                paddingHorizontal: 20,
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
                contentContainerStyle={{ gap: 20, padding: 20, paddingVertical: 100 }}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", position: "absolute", width: "100%", padding: 20 }}>
                <IconNumber icon="star-of-david" color={colors.inversePrimary} value={player.level} />
                <IconNumber icon="star" color={colors.strength} value={player.tower_level} size={60} />
                <IconNumber icon="coins" color={colors.stamina} value={player.coin} />
            </View>
        </Surface>
    )
}
