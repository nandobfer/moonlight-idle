import React, { useEffect, useRef, useState } from "react"
import { Surface } from "react-native-paper"
import { Image } from "expo-image"
import assets from "../../assets"
import { SlashAnimation } from "../../components/SlashAnimation"
import { IconNumber } from "../../components/IconNumber"
import schema from "../../style/colors.json"
import { usePlayer } from "../../hooks/usePlayer"
import { useRouter } from "../../hooks/useRouter"
import SpriteSheet from "rn-sprite-sheet"

export const TrainingScreen: React.FC<{}> = () => {
    const ref = useRef<SpriteSheet>(null)
    const dummy = usePlayer().dummy

    const router = useRouter()
    const playIdle = () => {
        ref.current?.play({ type: "idle", fps: 8, loop: true })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const random = Math.random() * 100
            if (random <= 15) {
                ref.current?.play({
                    type: "weaving",
                    fps: 10,
                    loop: false,
                    onFinish: () => {
                        playIdle()
                    },
                })
            }
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return router.route.key == "home" ? (
        <Surface elevation={0} style={{ flex: 1, position: "relative", justifyContent: "center", alignItems: "center", padding: 20 }}>
            {/* <Image source={assets.images.dummy[1]} style={{ width: 300, height: 400 }} /> */}
            <SpriteSheet
                ref={ref}
                columns={9}
                rows={1}
                source={assets.images.dummy[1]}
                animations={{ idle: [6, 7, 8, 7], weaving: [0, 1, 2, 1] }}
                onLoad={playIdle}
                height={450}
            />
            <Surface elevation={0} style={{ position: "absolute", right: 50, bottom: 50 }}>
                <IconNumber color={schema.colors.strength} icon="star" value={dummy.level} />
            </Surface>
            <SlashAnimation />
        </Surface>
    ) : null
}
