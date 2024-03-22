import { Enemy } from "./Enemy"

export class Dummy extends Enemy {
    level = 1

    constructor(level: number) {
        const exp_multiplier = Math.pow(level / 0.9, 1.5)
        super(exp_multiplier)

        this.level = level
    }
}
