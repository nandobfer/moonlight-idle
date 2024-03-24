import { ImageSource } from "expo-image"
import { ColumnType, ItemTier } from "../class/Item/Equipment"

export interface ImageAsset {
    source: number
    width: number
    height: number
    frames: number
}

export interface MonsterData {
    name: string
    max_level: number
    health: number
    attack_power: number
    attack_speed: number
    gold_base: number
    spritesheet: number
    drops: { tier: ItemTier; column: ColumnType; chance: number }[]
}
