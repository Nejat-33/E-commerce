import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/authcontext"

function Protectedroute({ children }: any) {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default Protectedroute
