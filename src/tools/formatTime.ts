export const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000)
    const minutes = Math.floor((milliseconds % 3600000) / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)

    // Format hours and minutes as HH:mm
    const formattedTime = `${hours.toString().padStart(2, "0")}h${minutes.toString().padStart(2, "0")}m${seconds.toString().padStart(2, "0")}s`
    const formattedTimeNoMIlli = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    return formattedTime
}
