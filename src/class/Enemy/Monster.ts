import { ImageSource } from "expo-image"
import { Enemy } from "./Enemy"
import { MonsterAsset } from "../../types/monster_assets"
import { Stats } from "../../types/player/stats"
import { WithoutFunctions } from "../../types/helpers"
import { monsters } from "../../monsters"

export interface MonsterForm {
    level: number
    exp_multiplier: number
}

export interface MonsterStats {
    attack_power: number
    attack_speed: number
    health: number
}

export class Monster extends Enemy {
    name: string
    level: number

    asset: MonsterAsset

    stats: MonsterStats
    health: number
    render: () => void

    dead = false

    constructor(data: MonsterForm, render: () => void) {
        super(data.exp_multiplier)
        this.level = data.level

        const asset = Monster.getAsset(data.level)
        this.asset = asset
        this.render = render

        this.name = asset.name
        this.health = asset.health
        this.stats = {
            attack_power: asset.attack_power,
            attack_speed: asset.attack_speed,
            health: asset.health,
        }
    }

    static generateRandom(level: number, exp_multiplier: number) {
        const possible_monsters: MonsterAsset[] = []
        Object.entries(monsters).forEach(([_, item]) => {
            if (item.max_level <= level) {
                possible_monsters.push(item)
            }
        })

        const max_index = Object.entries(possible_monsters).reduce((maximum, [key]) => (Number(key) > maximum ? Number(key) : maximum), 1)
        const random_index = Math.ceil(Math.random() * max_index)
        // @ts-ignore
        const asset = possible_monsters[random_index]

        const stats: MonsterStats = {
            attack_power: asset.attack_power,
            attack_speed: asset.attack_speed,
            health: asset.health,
        }

        // const monster = new Monster({ asset, exp_multiplier, level, stats })
        // return monster
    }

    static getAsset(level: number) {
        try {
            const asset = monsters[level.toString()]
            return asset
        } catch (error) {
            throw error
        }
    }

    takeHit(damage: number) {
        if (this.health - damage > 0) {
            this.health -= damage
            console.log({ damage, health: this.health })
            this.render()
        } else {
            this.die()
        }
    }

    die() {
        this.health = 0
        this.dead = true
        this.render()
    }

    drop() {
        const min_coin = this.asset.gold_base * 0.6
        const max_coin = this.asset.gold_base * 1.4
        const coin = Math.round(Math.random() * (max_coin - min_coin) + min_coin)

        return { coin }
    }
}
