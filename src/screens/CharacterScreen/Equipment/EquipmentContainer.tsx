import React, { useState } from "react"
import { Surface, Text } from "react-native-paper"
import { usePlayer } from "../../../hooks/usePlayer"
import { View } from "react-native"
import { EquipedItems } from "./EquipedItems"
import { BagContainer } from "./Bag/BagContainer"
import { Equipment } from "../../../class/Item/Equipment"
import { Item } from "../../../class/Item/Item"
import { SelectedItem } from "./SelectedItem"

interface EquipmentProps {}

export const EquipmentContainer: React.FC<EquipmentProps> = ({}) => {
    const player = usePlayer()

    const [selectedItem, setSelectedItem] = useState<Equipment | Item | null>(null)

    const onItemPress = (item: Equipment | Item) => {
        setSelectedItem((equip) => (equip == item ? null : item))
    }

    return (
        <Surface style={{ flex: 0.7, borderRadius: 20, flexDirection: "row", gap: 10 }}>
            <View style={{ width: "50%" }}>
                <EquipedItems selectedItem={selectedItem} onPress={onItemPress} />
                <BagContainer selectedItem={selectedItem} onPress={onItemPress} />
            </View>
            {!!selectedItem && <SelectedItem item={selectedItem} />}
        </Surface>
    )
}
