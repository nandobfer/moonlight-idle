import { useContext } from "react"
import SnackbarContext from "../contexts/snackbarContext"

export const useSnackbar = () => {
    const snackbar = useContext(SnackbarContext)

    return (text: string) => {
        snackbar.setText(text)
        snackbar.setVisible(true)
    }
}
