import React, { useContext } from "react"
import { IoProvider } from "./contexts/ioContext"
import { PaperProvider, Surface, Text } from "react-native-paper"
import { usePaperTheme } from "./hooks/usePaperTheme"
import { SnackbarProvider } from "./contexts/snackbarContext"
import PlayerContext from "./contexts/playerContext"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const theme = usePaperTheme()
    const { player } = useContext(PlayerContext)

    return (
        <>
            <PaperProvider theme={theme}>
                <SnackbarProvider>
                    <IoProvider>
                        {player ? (
                            children
                        ) : (
                            <Surface style={{ flex: 1 }} elevation={0}>
                                <Text>loading</Text>
                            </Surface>
                        )}
                    </IoProvider>
                </SnackbarProvider>
            </PaperProvider>
        </>
    )
}
