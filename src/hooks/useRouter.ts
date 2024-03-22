import { useContext, useMemo } from "react"
import RouterContext from "../contexts/routerContext"

export const useRouter = () => {
    const router = useContext(RouterContext)

    const route = useMemo(() => router.routes[router.index], [router.index])

    return { route }
}
