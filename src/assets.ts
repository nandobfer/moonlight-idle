const assets = {
    images: {
        dummy: {
            [1]: require("../assets/training/spritesheet.png"),
        },
        attack: {
            [1]: { source: require("../assets/gifs/slash1.gif"), width: 32, height: 54, duration: 600 },
            [2]: { source: require("../assets/gifs/slash2.gif"), width: 54, height: 27, duration: 400 },
        },
        crit: {
            [1]: { source: require("../assets/gifs/crit3.gif"), width: 75, height: 75, duration: 800 },
        },

        tower: {
            static: { source: require("../assets/game/tower/tower.webp"), width: 350, height: 350 },
            animation1: { source: require("../assets/game/tower/tower1.gif"), width: 350, height: 350 },
            animation2: { source: require("../assets/game/tower/tower2.gif"), width: 350, height: 350 },
        },

        monsters: {},
    },

    sounds: {
        attack: {
            [1]: { source: require("../assets/sound/attack/attack1.mp3") },
        },
        crit: {
            [1]: { source: require("../assets/sound/attack/crit2.mp3") },
        },
    },
}

export default assets
