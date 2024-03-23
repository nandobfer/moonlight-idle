import { ImageSource } from "expo-image"

export interface ImageAsset {
    source: string | number | ImageSource | ImageSource[] | string[] | null | undefined
    width: number
    height: number
}

export interface MonsterAsset {
    name: string
    max_level: number
    health: number
    attack_power: number
    attack_speed: number
    gold_base: number

    images: {
        idle: ImageAsset
        dead?: ImageAsset
    }
}
