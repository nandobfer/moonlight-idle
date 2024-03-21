import { createContext, useEffect } from "react"
import React from "react"
import { Socket, io as ioSocket } from "socket.io-client"
import { url } from "../backend"

interface IoContextValue {
    io: Socket
}

interface IoProviderProps {
    children: React.ReactNode
}

const IoContext = createContext<IoContextValue>({} as IoContextValue)

export default IoContext

const io = ioSocket(`ws${url}`)
console.log(`ws${url}`)

export const IoProvider: React.FC<IoProviderProps> = ({ children }) => {
    useEffect(() => {
        io.once("connect_error", (reason) => {
            // snackbar({ severity: "error", text: "Não foi possível se conectar com o servidor, verifique sua conexão com a internet" })
            console.log('error connecting to server')
            console.log(reason)
        })

        io.on("connect", () => {
            console.log('connected to server')
        })

        io.on("disconnect", (reason) => {
            if (reason == "io client disconnect" || reason == "io server disconnect") {
                // snackbar({ severity: "info", text: "Desconectado do servidor" })
            } else {
                // snackbar({ severity: "error", text: "Conexão com o servidor perdida! Tentando reconectar automaticamente" })
            }

        })

        return () => {
            io.off("connect_error")
            io.off("connect")
            io.off("disconnect")
        }
    }, [])

    return <IoContext.Provider value={{ io }}>
        {children}
    </IoContext.Provider>
}
