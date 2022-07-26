import { Navigate } from "react-router-dom"
import { useAuth } from "./useAuth"

// ログイン状態かどうかでルーティングを分岐させる
export const PrivateRoute = (props) => {
    const { children } = props
    const { isAuthenticated } = useAuth() // ログイン認証されているかを確認
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" /> // isAuthenticatedのTFによって処理を分岐させる
}
