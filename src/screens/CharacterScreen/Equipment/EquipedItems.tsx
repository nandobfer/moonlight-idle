import React from "react"
import { Surface } from "react-native-paper"
import { ItemSprite } from "./ItemSprite"
import { usePlayer } from "../../../hooks/usePlayer"
import { Equipment } from "../../../class/Item/Equipment"
import { colors } from "../../../style/colors"
import { Item } from "../../../class/Item/Item"

interface EquipedItemsProps {
    selectedItem: Equipment | Item | null
    onPress: (item: Equipment | Item) => void
}

export const EquipedItems: React.FC<EquipedItemsProps> = ({ selectedItem, onPress }) => {
    const player = usePlayer()
    return (
        <Surface
            style={{
                flexDirection: "row",
                padding: 10,
                borderColor: colors.stamina,
                borderWidth: 1,
                borderRadius: 20,
                height: 75,
                justifyContent: "space-between",
            }}
        >
            {!!player.weapon && <ItemSprite item={player.weapon} onPress={onPress} selectedItem={selectedItem} />}
            {player.equipments.map((equip, index) => (
                <ItemSprite item={equip} onPress={onPress} selectedItem={selectedItem} key={`${index}:${equip.data.name}`} />
            ))}
        </Surface>
    )
}
