import React, { useEffect } from "react"
import { Button, IconButton, Surface, Text } from "react-native-paper"
import { Equipment } from "../../../class/Item/Equipment"
import { Item } from "../../../class/Item/Item"
import { ItemSprite } from "./ItemSprite"
import { ItemAttributesContainer } from "./ItemAttributesContainer"
import { usePlayer } from "../../../hooks/usePlayer"
import { colors } from "../../../style/colors"

interface SelectedItemProps {
    item: Equipment | Item
}

export const SelectedItem: React.FC<SelectedItemProps> = ({ item }) => {
    const player = usePlayer()

    useEffect(() => {
        console.log(item)
    }, [item])

    return (
        <Surface style={{ flex: 1, borderRadius: 20, padding: 10, alignItems: "center", gap: 5, position: "relative" }} elevation={5}>
            <IconButton
                onPress={() => (item.favorite = !item)}
                icon={item.favorite ? "star" : "star-outline"}
                iconColor={colors.stamina}
                style={{ position: "absolute", right: 0 }}
            />
            <ItemSprite item={item} big />
            <Text>{item.name}</Text>

            {item instanceof Equipment && <ItemAttributesContainer item={item} />}
            {item instanceof Equipment && (
                <Button
                    style={{ marginTop: "auto", width: "100%" }}
                    mode="contained"
                    onPress={() => (item.equiped ? player.unequipItem(item) : player.equipItem(item))}
                >
                    {item.equiped ? "unequip" : "equip"}
                </Button>
            )}
        </Surface>
    )
}
