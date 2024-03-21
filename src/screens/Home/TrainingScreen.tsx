import React, { useEffect, useState } from "react";
import { Surface } from "react-native-paper";
import { Image } from "expo-image";
import images from "../../images";
import { SlashAnimation } from "../../components/SlashAnimation";


export const TrainingScreen: React.FC<{}> = () => {
    return (
        <Surface elevation={0} style={{ flex: 1, position: "relative", justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Image source={images.dummy[1]} style={{ width: 300, height: 400 }} />
            <SlashAnimation />
        </Surface>
    )
};
