import React, { Attributes } from "react"
import { Surface, Text } from "react-native-paper"
import { Equipment } from "../../../class/Item/Equipment"
import { fixedNumber } from "../../../tools/fixedNumber"
import { labelText } from "../../../tools/labelText"

interface AttributesContainerProps {
    item: Equipment
}

interface AttributeInfoProps {
    attribute: { key: string; value: number }
}

export const AttributeInfo: React.FC<AttributeInfoProps> = ({ attribute }) => {
    return !!attribute.value ? (
        <Surface elevation={0} style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{labelText(attribute.key)}</Text>
            <Text style={{ textAlign: "right" }}>+ {fixedNumber(attribute.value)}</Text>
        </Surface>
    ) : null
}

export const ItemAttributesContainer: React.FC<AttributesContainerProps> = ({ item }) => {
    return (
        <>
            <Surface style={{ width: "100%", padding: 10, borderRadius: 10 }}>
                {item.attributes.map((attr) => (
                    <AttributeInfo attribute={attr} key={attr.key} />
                ))}
            </Surface>
            <Surface style={{ width: "100%", padding: 10, borderRadius: 10 }}>
                {item.stats.map((stat) => (
                    <AttributeInfo attribute={stat} key={stat.key} />
                ))}
            </Surface>
        </>
    )
}
