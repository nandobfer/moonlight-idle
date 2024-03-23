import React, { useEffect, useState } from "react";
import { Surface } from "react-native-paper";
import { Image } from "expo-image";
import assets from "../../assets"
import { SlashAnimation } from "../../components/SlashAnimation"
import { IconNumber } from "../../components/IconNumber"
import schema from "../../style/colors.json"
import { usePlayer } from "../../hooks/usePlayer"
import { useRouter } from "../../hooks/useRouter"

export const TrainingScreen: React.FC<{}> = () => {
    const dummy = usePlayer().dummy

    const router = useRouter()

    return router.route.key != "fight" ? (
        <Surface elevation={0} style={{ flex: 1, position: "relative", justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Image source={assets.images.dummy[1]} style={{ width: 300, height: 400 }} />
            <Surface elevation={0} style={{ position: "absolute", right: 50, bottom: 50 }}>
                <IconNumber color={schema.colors.strength} icon="star" value={dummy.level} />
            </Surface>
            <SlashAnimation />
        </Surface>
    ) : null
}
