const images = {
    dummy: {
        [1]: require("../assets/training/dummy_1.png"),
    },
    attack: {
        [1]: { source: require("../assets/gifs/slash1.gif"), width: 32, height: 54, duration: 600 },
        [2]: { source: require("../assets/gifs/slash2.gif"), width: 54, height: 27, duration: 400 },
    },
    crit: {
        [1]: { source: require("../assets/gifs/crit1.gif"), width: 45, height: 52, duration: 400 },
        [2]: { source: require("../assets/gifs/crit2.gif"), width: 41, height: 36, duration: 400 },
    },
}

export default images
