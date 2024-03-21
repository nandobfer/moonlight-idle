import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import {View} from 'react-native'
import { Surface, Text } from 'react-native-paper'
import { usePlayer } from '../../hooks/usePlayer'
import { Ui } from './Ui'
import { TrainingScreen } from './TrainingScreen'

interface HomeProps {
    navigation: NavigationProp<any, any>
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
    const player = usePlayer()
    
    return (
        <Ui>
            <Surface elevation={0} style={{flex: 1}}>
                <TrainingScreen />
            </Surface>
        </Ui>
    )
}