import { createContext, useState } from "react"
import React from "react"
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation"

interface RouterContextValue {
    index: number
    setIndex: React.Dispatch<React.SetStateAction<number>>

    routes: BaseRoute[]
}

interface RouterProviderProps {
    children: React.ReactNode
}

const RouterContext = createContext<RouterContextValue>({} as RouterContextValue)

export default RouterContext

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState<BaseRoute[]>([
        { key: "home", title: "training", focusedIcon: "bullseye-arrow", unfocusedIcon: "bullseye-arrow" },
        { key: "attributes", title: "attributes", focusedIcon: "format-list-numbered", unfocusedIcon: "format-list-numbered" },
        { key: "skills", title: "skills", focusedIcon: "sitemap", unfocusedIcon: "sitemap" },
        { key: "equipment", title: "equips", focusedIcon: "sword", unfocusedIcon: "sword" },
        { key: "fight", title: "fight", focusedIcon: "fencing", unfocusedIcon: "fencing" },
        { key: "debug", title: "debug", focusedIcon: "console-line", unfocusedIcon: "console-line" },
    ])

    return <RouterContext.Provider value={{ routes, index, setIndex }}>{children}</RouterContext.Provider>
}
