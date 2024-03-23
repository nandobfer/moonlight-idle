import React, { useEffect, useRef, useState } from "react"
import { ImageSourcePropType, View } from "react-native"
import { uid } from "uid"
import { usePlayer } from "../hooks/usePlayer"
import assets from "../assets"
import { Image } from "expo-image"
import { Audio } from "expo-av"
import { Text } from "react-native-paper"
import schema from "../style/colors.json"
import { useRouter } from "../hooks/useRouter"
import { Monster } from "../class/Enemy/Monster"
import SpriteSheet from "rn-sprite-sheet"

const maxWidth = 300 // Maximum X-coordinate for the GIF's position
const maxHeight = 400 // Maximum Y-coordinate for the GIF's position

interface SlashSpriteProps {
    asset: { source: number; rows: number; columns: number }
    sound: Audio.Sound
    damage: number
    critical: boolean
    destroySelf: (key: React.Key) => void
    enemy?: Monster
    id: React.Key
}

const SlashSprite: React.FC<SlashSpriteProps> = ({ id, asset, sound, damage, critical, enemy, destroySelf }) => {
    const sprite = useRef<SpriteSheet>(null)
    const { route } = useRouter()
    const [position, setPosition] = useState({ top: Math.random() * maxHeight, left: Math.random() * maxWidth })
    const [transform, setTransform] = useState([{ rotate: `${Math.random() * 360}deg` }, { scaleX: Math.random() > 0.5 ? 1 : -1 }])

    useEffect(() => {
        if (route.key == "home" || route.key == "fight") {
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
            {/* <Image
                source={gif.source}
                style={{
                    width: gif.width * 2.5,
                    height: gif.height * 2.5,
                    transform: [{ rotate: `${Math.random() * 360}deg` }, { scaleX: Math.random() > 0.5 ? 1 : -1 }],
                }}
            /> */}
            <SpriteSheet
                ref={sprite}
                columns={asset.columns}
                rows={asset.rows}
                source={asset.source}
                animations={{ attack: Array.from({ length: asset.columns }, (_, index) => index) }}
                width={critical ? 250 : 100}
                viewStyle={{ transform }}
                onLoad={() => {
                    sprite.current?.play({
                        type: "attack",
                        fps: 15,
                        loop: false,
                        onFinish: () => {
                            destroySelf(id)
                        },
                    })
                    enemy?.takeHit(damage)
                }}
            />
        </View>
    )
}

export const SlashAnimation: React.FC<{ enemy?: Monster }> = ({ enemy }) => {
    const player = usePlayer()
    const dummy = player.dummy
    const interval = 1000 / player.current.attack_speed
    const [slashes, setSlashes] = useState<Array<JSX.Element>>([])

    const destroySelf = (key: React.Key) => {
        try {
            setSlashes((slashes) => slashes.filter((item) => item.props.id !== key))
        } catch (error) {
            console.log(error)
        }
    }

    const attack = async () => {
        if (!enemy?.dead && player.current.health > 0) {
            const { critical, damage } = player.attack(enemy?.exp_multiplier || dummy.exp_multiplier)

            const image = critical ? assets.spritesheets.attack.crit : assets.spritesheets.attack.normal
            const sound_asset = critical ? assets.sounds.crit[1] : assets.sounds.attack[1]
            const { sound } = await Audio.Sound.createAsync(sound_asset.source)

            const max_index = Object.entries(image).reduce((maximum, [key]) => (Number(key) > maximum ? Number(key) : maximum), 1)
            const random_index = Math.ceil(Math.random() * max_index)
            // @ts-ignore
            const randomSprite = image[random_index]
            const id = uid(50)

            const newSlash = (
                <SlashSprite
                    key={id}
                    id={id}
                    asset={randomSprite}
                    sound={sound}
                    damage={damage}
                    critical={critical}
                    enemy={enemy}
                    destroySelf={destroySelf}
                />
            )
            setSlashes((slashes) => [...slashes, newSlash])
        }
    }

    useEffect(() => {
        attack()
        const timer = setInterval(async () => {
            await attack()
        }, interval)

        return () => clearInterval(timer)
    }, [interval, player.current.attack_speed])

    return <View style={{ position: "absolute", width: "100%", height: "100%" }}>{slashes}</View>
}
