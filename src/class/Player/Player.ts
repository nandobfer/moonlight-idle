import AsyncStorage from "@react-native-async-storage/async-storage"
import { WithoutFunctions } from "../../types/helpers"
import { Attributes } from "../../types/player/attributes"
import { Stats } from "../../types/player/stats"
import { fixedNumber } from "../../tools/fixedNumber"
import { Dummy } from "../Enemy/Dummy"
import { Monster } from "../Enemy/Monster"
import { Bag } from "../Item/Bag"
import { ColumnType, Equipment, ItemTier } from "../Item/Equipment"
import constants from "expo-constants"
import { equipments } from "../Item/items"

export type PlayerData = WithoutFunctions<Player>

export class Player {
    level: number = 1
    experience: number = 0
    coin: number = 0
    tower_level = 1
    bag = new Bag({ items: [] })
    equipments: Equipment[] = []
    weapon: Equipment | null = null

    stats: Stats = {
        armor: 0,
        attack_power: 10,
        attack_speed: 0.5,
        magical_power: 10,
        cooldown_reduction: 0,
        critical_chance: 10,
        critical_multiplier: 2,
        health: 10,
        max_health: 10,
        mana: 10,
        max_mana: 10,
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
        max_health: 10,
        max_mana: 10,
        dps: 0,
    }

    attributes: Attributes = {
        dexterity: 0,
        inteligence: 0,
        stamina: 0,
        strenght: 0,
    }

    temp_attributes: Attributes = {
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
            this.dummy = new Dummy(data.dummy.level) || new Dummy(1)
            this.tower_level = data.tower_level || 1
            this.bag = new Bag(data.bag) || new Bag({ items: [] })
            this.equipments = data.equipments.map((equip) => new Equipment(equip.tier, equip.column, equip))
            this.temp_attributes = data.temp_attributes
            if (data.weapon) this.weapon = new Equipment(data.weapon.tier, data.weapon.column, data.weapon)
        } else {
            this.equipItem(new Equipment(ItemTier.wooden, ColumnType.sword))
        }

        this.current = this.getUpdatedStats(this.attributes)
        this.save()
    }

    save() {
        console.log("saving")
        AsyncStorage.setItem(`player:${constants.expoConfig?.version}`, JSON.stringify(this))
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

        this.stats.attack_power += 0.2 * quantity
        this.stats.max_health += 1 * quantity

        this.save()
        this.updateAttributes(this.attributes)
    }

    getUpdatedStats(attributes: Attributes) {
        const stats = { ...this.stats, dps: 0 }

        stats.attack_power = fixedNumber(this.stats.attack_power + attributes.strenght * 0.5)
        stats.attack_speed = fixedNumber(this.stats.attack_speed + attributes.dexterity * 0.02)
        stats.critical_chance = fixedNumber(this.stats.critical_chance + attributes.dexterity * 0.1)
        stats.max_health = Math.floor(this.stats.max_health + attributes.stamina * 0.5)
        stats.max_mana = Math.floor(this.stats.max_mana + attributes.inteligence * 0.5)

        stats.dps = stats.attack_power * stats.attack_speed * (stats.critical_chance / 100 + 1) * stats.critical_multiplier

        return stats
    }

    updateAttributes(data: Attributes) {
        this.attributes = data
        const total_attributes: Attributes = {
            dexterity: data.dexterity + this.temp_attributes.dexterity || 0,
            stamina: data.stamina + this.temp_attributes.stamina || 0,
            inteligence: data.inteligence + this.temp_attributes.inteligence || 0,
            strenght: data.strenght + this.temp_attributes.stamina || 0,
        }
        this.current = { ...this.getUpdatedStats(total_attributes), health: this.current.health }

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
        drops.items.forEach((item) => this.bag.addItem(item))
        this.accumulateExp(drops.exp)

        this.render()

        return { ...drops, advanced_tower }
    }

    takeHit(damage: number) {
        const mitigated_damage = (this.current.armor / 100) * damage
        const effective_damage = damage - mitigated_damage

        if (effective_damage < this.current.health) {
            this.current.health -= effective_damage
        } else {
            this.current.health = 0
        }

        // this.render()
        return { remaining_health: this.current.health, effective_damage, mitigated_damage }
    }

    revive() {
        this.current.health = this.current.max_health
        this.current.mana = this.current.max_mana
        this.render()
    }

    equipItem(item: Equipment) {
        console.log(`equipping ${item.name}`)
        if (item.data.type == "acessory") {
            if (this.equipments.includes(item)) {
                return
            }

            if (this.equipments.length >= 2) {
                return
            }

            this.equipments.push(item)
        } else {
            if (this.weapon) {
                this.unequipItem(this.weapon)
            }
            this.weapon = item
        }

        item.stats.forEach((attribute) => {
            this.stats[attribute.key] += attribute.value
        })

        item.attributes.forEach((attribute) => {
            this.temp_attributes[attribute.key] += attribute.value
        })

        item.equiped = true
        this.bag.removeItem(item)
        this.updateAttributes(this.attributes)
    }

    unequipItem(item: Equipment) {
        if (item.data.type == "acessory") {
            this.equipments = this.equipments.filter((equip) => equip != item)
        } else {
            this.weapon = null
        }

        item.stats.forEach((attribute) => {
            this.stats[attribute.key] -= attribute.value
        })

        item.attributes.forEach((attribute) => {
            this.temp_attributes[attribute.key] -= attribute.value
        })

        item.equiped = false
        this.bag.addItem(item)
        this.updateAttributes(this.attributes)
    }
}
