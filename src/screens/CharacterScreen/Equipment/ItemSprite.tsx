import React, { useEffect, useRef, useState } from "react"
import { Surface, Text } from "react-native-paper"
import { Equipment } from "../../../class/Item/Equipment"
import SpriteSheet from "rn-sprite-sheet"
import assets from "../../../assets"
import { equipments } from "../../../class/Item/items"
import { Pressable } from "react-native"
import { Item } from "../../../class/Item/Item"

interface ItemSpriteProps {
    item: Equipment | Item
    selectedItem?: Equipment | Item | null
    onPress?: (item: Equipment | Item) => void
    big?: boolean
}

export const ItemSprite: React.FC<ItemSpriteProps> = ({ item, selectedItem, onPress, big }) => {
    const sprite = useRef<SpriteSheet>(null)
    const animations: { [key: string]: [number, number] } = {}
    Object.entries(equipments).forEach(([tier, columns]) => {
        Object.entries(columns).forEach(([column, _equipment]) => {
            const tierNumber = parseInt(tier, 10)
            const columnNumber = parseInt(column, 10)
            const index = columnNumber + 6 * (tierNumber - 1) - 1
            const key = `${tier}:${column}`
            animations[key] = [index, index]
        })
    })

    useEffect(() => {
        sprite.current?.play({ type: `${item.row}:${item.column}`, fps: 1, loop: true })
    }, [item])

    return (
        <Pressable onPress={() => (onPress ? onPress(item) : null)}>
            <Surface elevation={selectedItem == item ? 5 : 2} style={{ borderRadius: 20 }}>
                <SpriteSheet
                    ref={sprite}
                    columns={6}
                    rows={13}
                    source={assets.spritesheets.items}
                    height={big ? 75 : 50}
                    animations={animations}
                    onLoad={() => sprite.current?.play({ type: `${item.row}:${item.column}`, fps: 1, loop: true })}
                />
            </Surface>
        </Pressable>
    )
}
