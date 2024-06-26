import React from "react"
import { usePlayer } from "../../../hooks/usePlayer"
import { AttributeInput } from "./AttributeInput"
import { colors } from "../../../style/colors"
import { Attributes } from "../../../types/player/attributes"

interface AttributesContainerProps {}

export const AttributesContainer: React.FC<AttributesContainerProps> = ({}) => {
    const player = usePlayer()

    const changeAttribute = (key: keyof Attributes, value: number) => {
        // player.attributes[key] += value
        player.updateAttributes({ ...player.attributes, [key]: player.attributes[key] + value })
    }

    return (
        <>
            <AttributeInput
                color={colors.strength}
                name="strenght"
                value={player.attributes.strenght}
                bonus_value={player.temp_attributes.strenght}
                onChange={(value) => changeAttribute("strenght", value)}
            />
            <AttributeInput
                color={colors.dexterity}
                name="dexterity"
                value={player.attributes.dexterity}
                bonus_value={player.temp_attributes.dexterity}
                onChange={(value) => changeAttribute("dexterity", value)}
            />
            <AttributeInput
                color={colors.intelligence}
                name="inteligence"
                value={player.attributes.inteligence}
                bonus_value={player.temp_attributes.inteligence}
                onChange={(value) => changeAttribute("inteligence", value)}
            />
            <AttributeInput
                color={colors.stamina}
                name="stamina"
                value={player.attributes.stamina}
                bonus_value={player.temp_attributes.stamina}
                onChange={(value) => changeAttribute("stamina", value)}
            />
        </>
    )
}
