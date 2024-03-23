import { MonsterAsset } from "./types/monster_assets"

export const monsters: { [key: string]: MonsterAsset } = {
    [1]: {
        name: "rat",
        max_level: 3,
        attack_power: 2,
        attack_speed: 0.5,
        health: 35,
        gold_base: 3,
        spritesheet: require("../assets/game/monsters/rat/spritesheet.png"),
    },

    [2]: {
        name: "bat",
        max_level: 5,
        attack_power: 3,
        attack_speed: 0.7,
        health: 50,
        gold_base: 10,
        spritesheet: require("../assets/game/monsters/bat/spritesheet.png"),
    },
    [3]: {
        name: "slime",
        max_level: 5,
        attack_power: 5,
        attack_speed: 0.4,
        gold_base: 15,
        health: 100,
        spritesheet: require("../assets/game/monsters/slime/spritesheet.png"),
    },
    [4]: {
        name: "goblin",
        max_level: 10,
        attack_power: 10,
        attack_speed: 0.6,
        gold_base: 25,
        health: 80,
        spritesheet: require("../assets/game/monsters/goblin/spritesheet.png"),
    },
    [5]: {
        name: "wolf",
        max_level: 15,
        attack_power: 15,
        attack_speed: 0.7,
        gold_base: 35,
        health: 100,
        spritesheet: require("../assets/game/monsters/wolf/spritesheet.png"),
    },
    [6]: {
        name: "skeleton",
        max_level: 25,
        attack_power: 10,
        attack_speed: 0.4,
        gold_base: 50,
        health: 200,
        spritesheet: require("../assets/game/monsters/skeleton/spritesheet.png"),
    },
    [7]: {
        name: "werewolf",
        max_level: 50,
        attack_power: 20,
        attack_speed: 1,
        gold_base: 500,
        health: 150,
        spritesheet: require("../assets/game/monsters/werewolf/spritesheet.png"),
    },
}
