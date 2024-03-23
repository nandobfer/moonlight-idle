import { MonsterAsset } from "./types/monster_assets"

export const monsters: { [key: string]: MonsterAsset } = {
    [1]: {
        name: "rat",
        max_level: 3,
        attack_power: 1,
        attack_speed: 0.7,
        health: 50,
        gold_base: 3,
        images: {
            spritesheet: { source: require("../assets/game/monsters/rat/spritesheet.png") },
            idle: { source: require("../assets/game/monsters/rat/idle.gif"), width: 225, height: 112, frames: 4 },
            dead: { source: require("../assets/game/monsters/rat/dead.webp"), width: 225, height: 112, frames: 4 },
        },
    },

    [2]: {
        name: "slime",
        max_level: 5,
        attack_power: 3,
        attack_speed: 0.4,
        gold_base: 10,
        health: 100,
        images: {
            spritesheet: { source: require("../assets/game/monsters/slime/spritesheet.png") },
            idle: { source: require("../assets/game/monsters/slime/idle.gif"), width: 170, height: 135, frames: 4 },
            dead: { source: require("../assets/game/monsters/slime/dead.webp"), width: 170, height: 135, frames: 4 },
        },
    },
}
