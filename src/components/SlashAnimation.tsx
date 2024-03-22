import Svg, { Line, Text } from "react-native-svg"
import Animated, { useAnimatedProps, withSequence, withTiming, Easing, useSharedValue } from "react-native-reanimated"
import { uid } from "uid"
import { useEffect, useState } from "react"
import schema from "../style/colors.json"
import { usePlayer } from "../hooks/usePlayer"

const AnimatedLine = Animated.createAnimatedComponent(Line)
// const AnimatedText = Animated.createAnimatedComponent(Text)
const duration = 1000
const length = 150
const maxWidth = 300
const maxHeight = 400

const Slash: React.FC<{ damage: number; critical: boolean }> = ({ damage, critical }) => {
    const startX = useSharedValue(0)
    const startY = useSharedValue(0)
    const endX = useSharedValue(0)
    const endY = useSharedValue(0)
    const opacity = useSharedValue(1)
    // const damageOpacity = useSharedValue(1)
    // const damageY = useSharedValue(0)

    const randomPosition = () => ({
        x: Math.random() * maxWidth,
        y: Math.random() * maxHeight,
    })

    // Define animated properties for the line
    const animatedSlashProps = useAnimatedProps(() => ({
        x1: startX.value,
        y1: startY.value,
        x2: endX.value,
        y2: endY.value,
        strokeOpacity: opacity.value,
    }))

    // const animatedDamageProps = useAnimatedProps(() => ({
    //     x: startX.value,
    //     y: damageY.value,
    //     fillOpacity: damageOpacity.value,
    // }))

    const calculateEndPosition = (start: { x: number; y: number }) => {
        const angle = Math.random() * 2 * Math.PI // Random angle in radians
        // Ensure a minimum slash length of 100 units
        return {
            x: Math.max(0, Math.min(maxWidth, start.x + Math.cos(angle) * length)), // Clamp within [0, maxWidth]
            y: Math.max(0, Math.min(maxHeight, start.y + Math.sin(angle) * length)), // Clamp within [0, maxHeight]
        }
    }

    useEffect(() => {
        const startPos = randomPosition()
        const endPos = calculateEndPosition(startPos)
        startX.value = startPos.x
        startY.value = startPos.y
        endX.value = endPos.x
        endY.value = endPos.y
        // damageY.value = startY.value - 20

        opacity.value = withSequence(
            withTiming(1, { duration: 50 }), // Quickly appear
            withTiming(0, { duration: duration - 50 }) // Then fade out
        )

        // damageOpacity.value = withSequence(withTiming(1, { duration: 50 }), withTiming(0, { duration: duration - 50 }))
        // damageY.value = withTiming(startPos.y - 50, { duration: duration }) // Float up effect
    }, [])

    return (
        <>
            <AnimatedLine
                animatedProps={animatedSlashProps}
                stroke={critical ? schema.colors.stamina : schema.colors.inverseSurface}
                strokeWidth={"2"}
            />
            {/* <AnimatedText
                animatedProps={animatedDamageProps}
                stroke={schema.colors.inverseSurface}
                fill={schema.colors.inverseSurface}
                fontSize="16"
                y={400}
                
            >
                {damage.toString()}
            </AnimatedText> */}
        </>
    )
}

export const SlashAnimation: React.FC<{}> = ({}) => {
    const player = usePlayer()
    const interval = 1000 / player.current.attack_speed
    const [slashes, setSlashes] = useState<Array<JSX.Element>>([])

    useEffect(() => {
        const timer = setInterval(() => {
            const { damage, critical } = player.attack(1)
            const newSlash = <Slash key={uid(50)} damage={damage} critical={critical} />
            setSlashes((slashes) => [...slashes, newSlash])

            setTimeout(() => setSlashes((slashes) => slashes.filter((item) => item.key != newSlash.key)), duration + 100)
        }, interval)

        return () => clearInterval(timer)
    }, [interval, duration, player.current.attack_speed])

    return <Svg style={{ position: "absolute", width: "100%", height: "100%" }}>{slashes}</Svg>
}
