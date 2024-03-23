import React, { useState } from "react"
import assets from "../../assets"
import { Pressable, View } from "react-native"
import { Image } from "expo-image"
import { usePlayer } from "../../hooks/usePlayer"
import { IconNumber } from "../../components/IconNumber"
import schema from "../../style/colors.json"

interface TowerComponentProps {
    onPress: () => void
}

export const TowerComponent: React.FC<TowerComponentProps> = ({ onPress }) => {
    const player = usePlayer()
    const tower_image = assets.images.tower

    const [image, setImage] = useState(tower_image.static)

    const onPressIn = () => {
        setImage(tower_image.animation1)
    }

    const onPressOut = () => {
        setTimeout(() => {
            // navigate to tower
            setImage(tower_image.static)
            onPress()
        }, 500)
    }

    return (
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} style={{ position: "relative" }}>
            <View style={{ position: "absolute", right: 20, top: 20 }}>
                <IconNumber color={schema.colors.inversePrimary} icon="star" value={player.tower_level} />
            </View>
            <Image source={image.source} style={{ width: image.width, height: image.height }} />
        </Pressable>
    )
}
