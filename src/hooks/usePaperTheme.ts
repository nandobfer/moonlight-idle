import { useColorScheme } from 'react-native';
// import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { MD3DarkTheme as DefaultTheme } from 'react-native-paper';
import schema from '../style/colors.json'

export const usePaperTheme = () => {
    const colorScheme = useColorScheme();
//   const { theme } = useMaterial3Theme();

  const theme = {
    ...DefaultTheme,
    colors: schema.colors, // Copy it from the color codes scheme and then use it here
  };

      return theme
}