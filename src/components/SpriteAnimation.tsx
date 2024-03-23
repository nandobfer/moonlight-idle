import React, { useEffect, useState } from "react"
import { ImageAsset } from "../types/monster_assets"
import { Image } from "expo-image"

interface SpriteAnimationProps {
    asset: ImageAsset
}

const framesPerSecond = 10
export const SpriteAnimation: React.FC<SpriteAnimationProps> = ({ asset }) => {
    const [currentFrame, setCurrentFrame] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % asset.frames)
        }, 1000 / framesPerSecond)

        return () => clearInterval(interval)
    }, [])

    const frameX = (currentFrame % asset.frames) * asset.width
    const frameY = Math.floor(currentFrame / asset.frames) * asset.height

    return (
        <Image
            source={asset.source}
            style={{
                width: asset.width,
                height: asset.height,
                resizeMode: "contain",
                overflow: "hidden",
                transform: [{ translateX: -frameX }, { translateY: -frameY }],
            }}
        />
    )
}

export default SpriteAnimation
