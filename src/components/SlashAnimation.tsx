import React, { useEffect, useState } from "react"
import { ImageSourcePropType, View } from "react-native"
import { uid } from "uid"
import { usePlayer } from "../hooks/usePlayer"
import assets from "../assets"
import { Image } from "expo-image"
import { Audio } from "expo-av"
import { Text } from "react-native-paper"
import schema from "../style/colors.json"
import { useRouter } from "../hooks/useRouter"

const maxWidth = 300 // Maximum X-coordinate for the GIF's position
const maxHeight = 400 // Maximum Y-coordinate for the GIF's position

const SlashGIF: React.FC<{
    gif: { source: ImageSourcePropType; width: number; height: number }
    sound: Audio.Sound
    damage: number
    critical: boolean
}> = ({ gif, sound, damage, critical }) => {
    const { route } = useRouter()
    const [position, setPosition] = useState({ top: Math.random() * maxHeight, left: Math.random() * maxWidth })

    useEffect(() => {
        if (route.key == "home") {
            sound.playAsync()
        }

        return () => {
            sound.unloadAsync()
        }
    }, [])

    return (
        <View style={{ position: "absolute", ...position }}>
            <Text variant="bodyLarge" style={[{ fontWeight: "bold" }, critical && { color: schema.colors.strength }]}>
                {damage.toString()}
            </Text>
            <Image
                source={gif.source}
                style={{
                    width: gif.width * 2.5,
                    height: gif.height * 2.5,
                    transform: [{ rotate: `${Math.random() * 360}deg` }, { scaleX: Math.random() > 0.5 ? 1 : -1 }],
                }}
            />
        </View>
    )
}

export const SlashAnimation: React.FC<{}> = ({}) => {
    const player = usePlayer()
    const dummy = player.dummy
    const interval = 1000 / player.current.attack_speed
    const [slashes, setSlashes] = useState<Array<JSX.Element>>([])

    useEffect(() => {
        const timer = setInterval(async () => {
            const { critical, damage } = player.attack(dummy.exp_multiplier)

            const image = critical ? assets.images.crit : assets.images.attack
            const sound_asset = critical ? assets.sounds.crit[1] : assets.sounds.attack[1]
            const { sound } = await Audio.Sound.createAsync(sound_asset.source)

            const max_index = Object.entries(image).reduce((maximum, [key]) => (Number(key) > maximum ? Number(key) : maximum), 1)
            const random_index = Math.ceil(Math.random() * max_index)
            // @ts-ignore
            const slashGIF = image[random_index]
            const newSlash = <SlashGIF key={uid(50)} gif={slashGIF} sound={sound} damage={damage} critical={critical} />
            setSlashes((slashes) => [...slashes, newSlash])

            setTimeout(() => setSlashes((slashes) => slashes.filter((item) => item.key !== newSlash.key)), slashGIF.duration)
        }, interval)

        return () => clearInterval(timer)
    }, [interval, player.current.attack_speed])

    return <View style={{ position: "absolute", width: "100%", height: "100%" }}>{slashes}</View>
}
