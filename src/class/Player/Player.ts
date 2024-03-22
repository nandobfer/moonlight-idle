import AsyncStorage from "@react-native-async-storage/async-storage"
import { WithoutFunctions } from "../../types/helpers"
import { Attributes } from "../../types/player/attributes"
import { Stats } from "../../types/player/stats"
import { fixedNumber } from "../../tools/fixedNumber"

export type PlayerData = WithoutFunctions<Player>

export class Player {
    level: number = 1
    experience: number = 0
    coin: number = 0

    stats: Stats = {
        armor: 0,
        attack_power: 10,
        attack_speed: 0.5,
        magical_power: 10,
        cooldown_reduction: 0,
        critical_chance: 10,
        critical_multiplier: 2,
        health: 10,
        mana: 10,
    }

    current = {
        armor: 0,
        attack_power: 10,
        attack_speed: 0.5,
        magical_power: 10,
        cooldown_reduction: 0,
        critical_chance: 10,
        critical_multiplier: 2,
        health: 10,
        mana: 10,
    }

    attributes: Attributes = {
        dexterity: 0,
        inteligence: 0,
        stamina: 0,
        strenght: 0,
    }

    points = {
        attributes: 1,
        skills: 1,
    }

    accumulated_exp = 0

    render: () => void

    constructor(render: () => void, data?: PlayerData) {
        this.render = render
        if (data) {
            this.level = data.level
            this.attributes = data.attributes
            this.coin = data.coin
            this.experience = data.experience
            this.stats = data.stats
            this.current = data.current
            this.points = data.points
        }

        this.current = this.getUpdatedStats(this.attributes)
        this.save()
    }

    save() {
        AsyncStorage.setItem("player", JSON.stringify(this))
    }

    attack(exp_multiplier: number) {
        const critical = Math.random() * 100 <= this.current.critical_chance
        const damage_multiplier = critical ? this.current.critical_multiplier : 1

        const min = this.current.attack_power * 0.6
        const max = this.current.attack_power * 1.4
        const damage = Math.floor(Math.random() * (max - min) + min) * damage_multiplier

        this.accumulateExp(damage * exp_multiplier)
        console.log({ damage, critical })

        return { damage, critical }
    }

    accumulateExp(exp: number) {
        this.accumulated_exp += exp
    }

    addExp() {
        this.experience += this.accumulated_exp
        this.accumulated_exp = 0

        if (this.experience >= this.getNeededExp(this.level)) {
            this.levelUp()
        }

        this.save()
        this.render()
    }

    getNeededExp(target_level: number) {
        const experience = Math.pow(target_level * 10, 2)
        return experience
    }

    levelUp(quantity = 1) {
        this.experience = this.experience - this.getNeededExp(this.level + (quantity - 1))
        this.level += quantity
        this.points.attributes += quantity

        if (this.level % 5 == 0) {
            this.points.skills += quantity
        }
    }

    getUpdatedStats(attributes: Attributes) {
        const stats = { ...this.stats }

        stats.attack_power = fixedNumber(this.stats.attack_power + attributes.strenght * 0.5)
        stats.attack_speed = fixedNumber(this.stats.attack_speed + attributes.dexterity * 0.02)
        stats.critical_chance = fixedNumber(this.stats.critical_chance + attributes.dexterity * 0.1)
        stats.health = fixedNumber(this.stats.health + attributes.stamina * 0.5)
        stats.mana = fixedNumber(this.stats.mana + attributes.inteligence * 0.5)

        return stats
    }

    updateAttributes(data: Attributes) {
        this.attributes = data
        this.current = this.getUpdatedStats(data)

        this.render()
    }

    handleIdle(timestamp: string) {
        const now = new Date()
        const closed = new Date(Number(timestamp))
        const elapsed_time = (now.getTime() - closed.getTime()) / 1000

        const attacks = elapsed_time / this.current.attack_speed
        this.attack(10 * attacks)
        return elapsed_time
    }
}
