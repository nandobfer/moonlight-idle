import { useContext, useMemo } from "react"
import RouterContext from "../contexts/routerContext"

export const useRouter = () => {
    const router = useContext(RouterContext)

    const route = useMemo(() => router.routes[router.index], [router.index])

    const navigate = (key: string) => {
        const index = router.routes.findIndex((item) => item.key == key)

        if (index === -1) {
            throw "route not found"
        }

        router.setIndex(index)
    }

    return { route, navigate }
}
