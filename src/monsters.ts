import { MonsterAsset } from "./types/monster_assets"

export const monsters: { [key: string]: MonsterAsset } = {
    [1]: {
        name: "rat",
        max_level: 3,
        attack_power: 1,
        attack_speed: 0.7,
        health: 50,
        images: {
            idle: { source: require("../assets/game/monsters/rat/idle.gif"), width: 225, height: 112 },
            dead: { source: require("../assets/game/monsters/rat/dead.webp"), width: 225, height: 112 },
        },
    },

    [2]: {
        name: "slime",
        max_level: 5,
        attack_power: 3,
        attack_speed: 0.4,
        health: 100,
        images: {
            idle: { source: require("../assets/game/monsters/slime/idle.gif"), width: 170, height: 135 },
            dead: { source: require("../assets/game/monsters/slime/dead.webp"), width: 170, height: 135 },
        },
    },
}
