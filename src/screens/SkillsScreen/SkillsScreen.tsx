import React, { useState } from "react"
import { View } from "react-native"
import { Button, Surface, Text } from "react-native-paper"
import { HealthManaBars } from "../../components/HealthManaBars"
import { AttributeInput } from "./AttributeInput"
import schema from "../../style/colors.json"
import { usePlayer } from "../../hooks/usePlayer"
import { Details } from "./Details"

interface SkillsScreenProps {}

export const SkillsScreen: React.FC<SkillsScreenProps> = ({}) => {
    const player = usePlayer()

    const [tempAttributes, setTempAttributes] = useState({ ...player.attributes })

    const onSaveAttributes = () => {
        player.updateAttributes(tempAttributes)
    }

    return (
        <Surface elevation={0} style={{ flex: 1, padding: 20, gap: 10 }}>
            <HealthManaBars />
            <Details attributes={tempAttributes} />

            <AttributeInput
                color={schema.colors.strength}
                name="strenght"
                value={tempAttributes.strenght}
                onChange={(value) => setTempAttributes({ ...tempAttributes, strenght: tempAttributes.strenght + value })}
                can_decrease={tempAttributes.strenght != player.attributes.strenght}
            />
            <AttributeInput
                color={schema.colors.dexterity}
                name="dexterity"
                value={tempAttributes.dexterity}
                onChange={(value) => setTempAttributes({ ...tempAttributes, dexterity: tempAttributes.dexterity + value })}
                can_decrease={tempAttributes.dexterity != player.attributes.dexterity}
            />
            <AttributeInput
                color={schema.colors.intelligence}
                name="inteligence"
                value={tempAttributes.inteligence}
                onChange={(value) => setTempAttributes({ ...tempAttributes, inteligence: tempAttributes.inteligence + value })}
                can_decrease={tempAttributes.inteligence != player.attributes.inteligence}
            />
            <AttributeInput
                color={schema.colors.stamina}
                name="stamina"
                value={tempAttributes.stamina}
                onChange={(value) => setTempAttributes({ ...tempAttributes, stamina: tempAttributes.stamina + value })}
                can_decrease={tempAttributes.stamina != player.attributes.stamina}
            />

            <Button mode="contained-tonal" onPress={onSaveAttributes} disabled={tempAttributes == player.attributes}>
                save
            </Button>
        </Surface>
    )
}
