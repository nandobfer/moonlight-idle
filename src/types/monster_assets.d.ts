import { ImageSource } from "expo-image"

export interface ImageAsset {
    source: number
    width: number
    height: number
    frames: number
}

export interface MonsterAsset {
    name: string
    max_level: number
    health: number
    attack_power: number
    attack_speed: number
    gold_base: number

    images: {
        spritesheet: number
        idle: ImageAsset
        dead: ImageAsset
    }
}
