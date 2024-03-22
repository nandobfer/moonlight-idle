import React, { useContext } from "react"
import { Snackbar as PaperSnackbar, Portal } from "react-native-paper"
import SnackbarContext from "../contexts/snackbarContext"
import schema from "../style/colors.json"

interface snackbarProps {}

export const Snackbar: React.FC<snackbarProps> = ({}) => {
    const snackbar = useContext(SnackbarContext)

    return (
        <Portal>
            <PaperSnackbar visible={snackbar.visible} onDismiss={() => snackbar.setVisible(false)} wrapperStyle={{ top: 75 }}>
                {snackbar.text}
            </PaperSnackbar>
        </Portal>
    )
}
