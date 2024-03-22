import React, { useState } from "react"
import { View } from "react-native"
import { Button, Surface, Text } from "react-native-paper"
import { HealthManaBars } from "../../components/HealthManaBars"
import { AttributeInput } from "./AttributeInput"
import schema from "../../style/colors.json"
import { usePlayer } from "../../hooks/usePlayer"
import { Details } from "./Details"
import { Attributes } from "../../types/player/attributes"

interface AttributesScreenProps {}

export const AttributesScreen: React.FC<AttributesScreenProps> = ({}) => {
    const player = usePlayer()

    const changeAttribute = (key: keyof Attributes, value: number) => {
        // player.attributes[key] += value
        player.updateAttributes({ ...player.attributes, [key]: player.attributes[key] + value })
    }

    return (
        <Surface elevation={0} style={{ flex: 1, padding: 20, gap: 10 }}>
            <HealthManaBars />
            <Details attributes={player.attributes} />

            <AttributeInput
                color={schema.colors.strength}
                name="strenght"
                value={player.attributes.strenght}
                onChange={(value) => changeAttribute("strenght", value)}
            />
            <AttributeInput
                color={schema.colors.dexterity}
                name="dexterity"
                value={player.attributes.dexterity}
                onChange={(value) => changeAttribute("dexterity", value)}
            />
            <AttributeInput
                color={schema.colors.intelligence}
                name="inteligence"
                value={player.attributes.inteligence}
                onChange={(value) => changeAttribute("inteligence", value)}
            />
            <AttributeInput
                color={schema.colors.stamina}
                name="stamina"
                value={player.attributes.stamina}
                onChange={(value) => changeAttribute("stamina", value)}
            />
        </Surface>
    )
}
