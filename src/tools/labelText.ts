export const labelText = (text: string) => {
    switch (text) {
        case "attack_power":
            return "attack"
        case "critical_chance":
            return "crit %"
    }

    return text
}
