import AsyncStorage from "@react-native-async-storage/async-storage"
import { WithoutFunctions } from "../../types/helpers"
import { Attributes } from "../../types/player/attributes"
import { Stats } from "../../types/player/stats"
import { fixedNumber } from "../../tools/fixedNumber"
import { Dummy } from "../Enemy/Dummy"
import { Monster } from "../Enemy/Monster"

export type PlayerData = WithoutFunctions<Player>

export class Player {
    level: number = 1
    experience: number = 0
    coin: number = 0
    tower_level = 1

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
        kills: 0,
        idle: 0,
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
        dps: 0,
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
    last_exp = 0

    dummy = new Dummy(1)

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
            this.dummy = data.dummy || new Dummy(1)
            this.tower_level = data.tower_level || 1
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

        const min = this.current.attack_power * 0.75
        const max = this.current.attack_power * 1.25
        const damage = Math.floor(Math.random() * (max - min) + min) * damage_multiplier
        const exp = Math.round(damage * exp_multiplier)

        this.accumulateExp(exp)
        // console.log({ damage, critical })

        return { damage, critical, exp }
    }

    accumulateExp(exp: number) {
        this.accumulated_exp += exp
    }

    addExp() {
        this.experience += this.accumulated_exp
        this.last_exp = Math.round(this.accumulated_exp)
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

        this.stats.attack_power += 0.5
        this.stats.health += 1

        const current_health = this.current.health
        this.current = { ...this.getUpdatedStats(this.attributes), health: current_health }
    }

    getUpdatedStats(attributes: Attributes) {
        const stats = { ...this.stats, dps: 0 }

        stats.attack_power = fixedNumber(this.stats.attack_power + attributes.strenght * 0.5)
        stats.attack_speed = fixedNumber(this.stats.attack_speed + attributes.dexterity * 0.02)
        stats.critical_chance = fixedNumber(this.stats.critical_chance + attributes.dexterity * 0.1)
        stats.health = fixedNumber(this.stats.health + attributes.stamina * 0.5)
        stats.mana = fixedNumber(this.stats.mana + attributes.inteligence * 0.5)

        stats.dps = stats.attack_power * stats.attack_speed * (stats.critical_chance / 100 + 1) * stats.critical_multiplier

        return stats
    }

    updateAttributes(data: Attributes) {
        this.attributes = data
        this.current = { ...this.getUpdatedStats(data), health: this.current.health }

        this.render()
    }

    handleIdle(timestamp: number) {
        const now = new Date()
        const closed = new Date(timestamp)
        const idle = now.getTime() - closed.getTime()
        const idle_seconds = idle / 1000
        this.stats.idle += idle
        console.log({ idle_seconds })

        const total_damage = idle_seconds * this.current.dps
        const total_exp = total_damage * this.dummy.exp_multiplier

        let level = this.level
        let remaining_exp = total_exp + this.experience
        while (remaining_exp >= this.getNeededExp(level)) {
            remaining_exp -= this.getNeededExp(level)
            level += 1
        }

        // this.experience += total_exp

        if (level > this.level) {
            this.levelUp(level - this.level)
        }

        this.experience = remaining_exp

        return idle_seconds
    }

    setNewDummy(dummy: Dummy) {
        this.dummy = dummy
        this.save()
    }

    killedTowerEnemy(enemy: Monster) {
        let advanced_tower = false
        if (this.tower_level == enemy.level) {
            this.tower_level += 1
            advanced_tower = true
            // tower level up rewards here
        }

        const drops = enemy.drop()
        this.coin += drops.coin
        this.stats.kills += 1
        this.accumulateExp(drops.exp)

        this.render()

        return { ...drops, advanced_tower }
    }

    takeHit(damage: number) {
        if (damage < this.current.health) {
            this.current.health -= damage
        } else {
            this.current.health = 0
        }

        // this.render()
        return this.current.health
    }

    revive() {
        this.current.health = this.stats.health
        this.current.mana = this.stats.mana
        this.render()
    }
}
