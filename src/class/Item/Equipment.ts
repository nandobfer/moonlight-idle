import { WithoutFunctions } from "../../types/helpers"
import { Attributes } from "../../types/player/attributes"
import { Stats } from "../../types/player/stats"
import { Item, ItemForm } from "./Item"
import { equipments } from "./items"

export enum ItemTier {
    wooden = 1,
    bronze = 2,
    iron = 3,
    steel = 4,
    dark_iron = 5,
    gold = 6,
    // platinum = 7,
    // mithril = 8,
    // emerald = 9,
    // draconic = 10,
    // holy = 11,
    // crystal = 12,
    // obsidian = 13,
}

export enum ColumnType {
    sword = 1,
    // spear = 2,
    // staff = 3,
    // bow = 4,
    shield = 5,
    trinket = 6,
}

export type EquipType = "weapon" | "acessory"

export interface EquipmentData {
    name: string
    price: number
    type: EquipType
    attributes: { key: keyof Attributes; value: [number, number] }[]
    stats: { key: keyof Stats; value: [number, number] }[]
}

export type EquipmentForm = WithoutFunctions<Equipment>

export class Equipment extends Item {
    attributes: { key: keyof Attributes; value: number }[] = []
    stats: { key: keyof Stats; value: number }[] = []
    equiped: boolean = false
    data: EquipmentData
    tier: ItemTier

    constructor(tier: ItemTier, column: ColumnType, load?: EquipmentForm) {
        const data = equipments[tier][column]
        super({ ...data, row: tier, column })
        this.tier = tier
        this.data = data

        if (load) {
            this.attributes = load.attributes
            this.stats = load.stats
            this.equiped = load.equiped
        } else {
            data.attributes.forEach((attr) => {
                const value = Math.round(Math.random() * (attr.value[1] - attr.value[0]) + attr.value[0])
                this.attributes.push({ key: attr.key, value })
            })

            data.stats.forEach((stat) => {
                const value = Math.random() * (stat.value[1] - stat.value[0]) + stat.value[0]
                this.stats.push({ key: stat.key, value })
            })
        }
    }
}
