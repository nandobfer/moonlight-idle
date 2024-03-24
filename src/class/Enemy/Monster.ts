import { ImageSource } from "expo-image"
import { Enemy } from "./Enemy"
import { MonsterData } from "../../types/monster_assets"
import { Stats } from "../../types/player/stats"
import { WithoutFunctions } from "../../types/helpers"
import { monsters } from "../../monsters"
import { Equipment } from "../Item/Equipment"

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

    data: MonsterData

    stats: MonsterStats
    health: number
    render: () => void

    dead = false

    constructor(data: MonsterForm, render: () => void) {
        super(data.exp_multiplier)
        this.level = data.level

        const asset = Monster.getAsset(data.level)
        this.data = asset
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
        const possible_monsters: MonsterData[] = []
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

    attack() {
        const min_damage = this.stats.attack_power * 0.75
        const max_damage = this.stats.attack_power * 1.25
        const damage = Math.round(Math.random() * (max_damage - min_damage) + min_damage)
        return damage
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
        const min_coin = this.data.gold_base * 0.6
        const max_coin = this.data.gold_base * 1.4
        const coin = Math.round(Math.random() * (max_coin - min_coin) + min_coin)

        const exp = Math.round(this.stats.health * 2 * this.exp_multiplier)

        const items: Equipment[] = []
        this.data.drops.forEach((drop) => {
            const roll = Math.random() * 100
            if (roll <= drop.chance) {
                items.push(new Equipment(drop.tier, drop.column))
                console.log({ roll, chance: drop.chance })
            }
        })

        return { coin, exp, items }
    }

    revive() {
        this.health = this.stats.health
        this.render()
    }
}
