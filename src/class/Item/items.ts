// index = column + (6 * (tier-1)) - 1

import { EquipmentData } from "./Equipment"

export const equipments: { [tier: number]: { [column: number]: EquipmentData } } = {
    [1]: {
        [1]: {
            name: "wooden sword",
            type: "weapon",
            price: 3,
            attributes: [
                { key: "strenght", value: [0, 2] },
                { key: "dexterity", value: [0, 2] },
                { key: "stamina", value: [0, 2] },
            ],
            stats: [
                { key: "attack_power", value: [1, 2] },
                { key: "critical_chance", value: [1, 5] },
            ],
        },
        [5]: {
            name: "wooden shield",
            type: "acessory",
            price: 3,
            attributes: [{ key: "stamina", value: [1, 4] }],
            stats: [{ key: "armor", value: [10, 15] }],
        },
        [6]: {
            name: "wooden ring",
            type: "acessory",
            price: 3,
            attributes: [
                { key: "dexterity", value: [0, 2] },
                { key: "inteligence", value: [0, 2] },
                { key: "strenght", value: [0, 2] },
            ],
            stats: [
                { key: "critical_chance", value: [1, 5] },
                { key: "attack_power", value: [0, 2] },
            ],
        },
    },
    [2]: {
        [1]: {
            name: "bronze sword",
            type: "weapon",
            price: 30,
            attributes: [
                { key: "strenght", value: [2, 5] },
                { key: "dexterity", value: [2, 5] },
                { key: "stamina", value: [2, 5] },
            ],
            stats: [
                { key: "attack_power", value: [5, 10] },
                { key: "critical_chance", value: [1, 10] },
            ],
        },
        [5]: {
            name: "bronze shield",
            type: "acessory",
            price: 30,
            attributes: [{ key: "stamina", value: [5, 10] }],
            stats: [{ key: "armor", value: [12, 18] }],
        },
        [6]: {
            name: "bronze ring",
            type: "acessory",
            price: 30,
            attributes: [
                { key: "dexterity", value: [0, 10] },
                { key: "inteligence", value: [0, 10] },
                { key: "strenght", value: [0, 10] },
            ],
            stats: [
                { key: "critical_chance", value: [1, 10] },
                { key: "attack_power", value: [0, 10] },
            ],
        },
    },
    [3]: {
        [1]: {
            name: "iron sword",
            type: "weapon",
            price: 150,
            attributes: [
                { key: "strenght", value: [5, 10] },
                { key: "dexterity", value: [5, 10] },
                { key: "stamina", value: [5, 10] },
            ],
            stats: [
                { key: "attack_power", value: [10, 20] },
                { key: "critical_chance", value: [5, 10] },
            ],
        },
        [5]: {
            name: "iron shield",
            type: "acessory",
            price: 150,
            attributes: [{ key: "stamina", value: [10, 20] }],
            stats: [{ key: "armor", value: [15, 20] }],
        },
        [6]: {
            name: "iron ring",
            type: "acessory",
            price: 150,
            attributes: [
                { key: "dexterity", value: [0, 20] },
                { key: "inteligence", value: [0, 20] },
                { key: "strenght", value: [0, 20] },
            ],
            stats: [
                { key: "critical_chance", value: [5, 10] },
                { key: "attack_power", value: [0, 15] },
            ],
        },
    },
    [4]: {
        [1]: {
            name: "steel sword",
            type: "weapon",
            price: 500,
            attributes: [
                { key: "strenght", value: [10, 20] },
                { key: "dexterity", value: [10, 20] },
                { key: "stamina", value: [10, 20] },
            ],
            stats: [
                { key: "attack_power", value: [20, 40] },
                { key: "critical_chance", value: [5, 15] },
            ],
        },
        [5]: {
            name: "steel shield",
            type: "acessory",
            price: 500,
            attributes: [{ key: "stamina", value: [20, 40] }],
            stats: [{ key: "armor", value: [18, 22] }],
        },
        [6]: {
            name: "steel ring",
            type: "acessory",
            price: 500,
            attributes: [
                { key: "dexterity", value: [0, 40] },
                { key: "inteligence", value: [0, 40] },
                { key: "strenght", value: [0, 40] },
            ],
            stats: [
                { key: "critical_chance", value: [5, 15] },
                { key: "attack_power", value: [0, 25] },
            ],
        },
    },
    [5]: {
        [1]: {
            name: "dark iron sword",
            type: "weapon",
            price: 2000,
            attributes: [
                { key: "strenght", value: [20, 40] },
                { key: "dexterity", value: [20, 40] },
                { key: "stamina", value: [20, 40] },
            ],
            stats: [
                { key: "attack_power", value: [40, 60] },
                { key: "critical_chance", value: [10, 15] },
            ],
        },
        [5]: {
            name: "dark iron shield",
            type: "acessory",
            price: 2000,
            attributes: [{ key: "stamina", value: [40, 80] }],
            stats: [{ key: "armor", value: [20, 25] }],
        },
        [6]: {
            name: "dark iron ring",
            type: "acessory",
            price: 2000,
            attributes: [
                { key: "dexterity", value: [0, 60] },
                { key: "inteligence", value: [0, 60] },
                { key: "strenght", value: [0, 60] },
            ],
            stats: [
                { key: "critical_chance", value: [10, 15] },
                { key: "attack_power", value: [0, 50] },
            ],
        },
    },
    [6]: {
        [1]: {
            name: "golden sword",
            type: "weapon",
            price: 20000,
            attributes: [
                { key: "strenght", value: [40, 100] },
                { key: "dexterity", value: [40, 100] },
                { key: "stamina", value: [40, 100] },
            ],
            stats: [
                { key: "attack_power", value: [60, 100] },
                { key: "critical_chance", value: [10, 20] },
            ],
        },
        [5]: {
            name: "golden shield",
            type: "acessory",
            price: 20000,
            attributes: [{ key: "stamina", value: [60, 100] }],
            stats: [{ key: "armor", value: [25, 30] }],
        },
        [6]: {
            name: "golden ring",
            type: "acessory",
            price: 20000,
            attributes: [
                { key: "dexterity", value: [0, 100] },
                { key: "inteligence", value: [0, 100] },
                { key: "strenght", value: [0, 100] },
            ],
            stats: [
                { key: "critical_chance", value: [15, 20] },
                { key: "attack_power", value: [0, 100] },
            ],
        },
    },
}
