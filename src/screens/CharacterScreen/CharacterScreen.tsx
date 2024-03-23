import React from "react"
import { Surface } from "react-native-paper"
import { usePlayer } from "../../hooks/usePlayer"
import { HealthManaBars } from "../../components/HealthManaBars"
import { Details } from "./Details"
import { AttributesContainer } from "./Attributes/AttributesContainer"
import { EquipmentContainer } from "./Equipment/EquipmentContainer"

interface CharacterScreenProps {}

export const CharacterScreen: React.FC<CharacterScreenProps> = ({}) => {
    const player = usePlayer()

    return (
        <Surface elevation={0} style={{ flex: 1, padding: 20, gap: 10 }}>
            <HealthManaBars />
            <Details attributes={player.attributes} />
            <AttributesContainer />
            <EquipmentContainer />
        </Surface>
    )
}
