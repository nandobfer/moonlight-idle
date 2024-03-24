import React from "react"
import { Surface } from "react-native-paper"
import { usePlayer } from "../../../../hooks/usePlayer"
import { FlatList } from "react-native"
import { ItemSprite } from "../ItemSprite"
import { Equipment } from "../../../../class/Item/Equipment"
import { Item } from "../../../../class/Item/Item"

interface BagProps {
    selectedItem: Equipment | Item | null
    onPress: (item: Equipment | Item) => void
}

export const BagContainer: React.FC<BagProps> = ({ selectedItem, onPress }) => {
    const player = usePlayer()

    return (
        <Surface style={{ flex: 1 }}>
            <FlatList
                data={player.bag.items.sort((a, b) => b.row - a.row)}
                numColumns={3}
                renderItem={({ item }) => <ItemSprite item={item} onPress={onPress} selectedItem={selectedItem} />}
                columnWrapperStyle={{ gap: 10 }}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
        </Surface>
    )
}
