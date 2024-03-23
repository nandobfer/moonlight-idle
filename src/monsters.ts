import { MonsterAsset } from "./types/monster_assets"

export const monsters: { [key: string]: MonsterAsset } = {
    [1]: {
        name: "rat",
        max_level: 3,
        attack_power: 2,
        attack_speed: 0.7,
        health: 50,
        gold_base: 3,
        spritesheet: require("../assets/game/monsters/rat/spritesheet.png"),
    },

    [2]: {
        name: "slime",
        max_level: 5,
        attack_power: 5,
        attack_speed: 0.4,
        gold_base: 10,
        health: 100,
        spritesheet: require("../assets/game/monsters/slime/spritesheet.png"),
    },
}
