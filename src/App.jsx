import { ChakraProvider } from "@chakra-ui/react"
import { Profile } from "./pages/Profile/Profile"
import { BrowserRouter, Routes, Route } from "react-router-dom" // Routerのためのimport
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { ProvideAuth } from "./utils/useAuth"
import { PrivateRoute } from "./utils/PrivateRoute"
import { Invalid } from "./pages/Invalid/Invalid"
import { EditProfile } from "./pages/Profile/EditProfile"

function App () {
    return (
        <ChakraProvider>
            <ProvideAuth>
                {/* Routerを作成 */}
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            {/* 規定のページ以外にアクセスしようとしたときにInvalidに飛ばすためのルート */}
                            <Route
                                path="*"
                                element={
                                    <PrivateRoute><Invalid /></PrivateRoute> // PrivateRouteは独自に作成したタグ（src/utils/PrivateRoute.jsxに記述）
                                }
                                title="キニカレ　- Invalid"
                            />
                            {/* ホームページ */}
                            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} title="キニカレ　- ホーム" />
                            {/* my profile */}
                            <Route path="/profile" title="キニカレ　- プロフィール" element={<PrivateRoute><Profile /></PrivateRoute>} />
                            {/* プロフィール編集ページ */}
                            <Route path="/profile/edit" title="キニカレ　- プロフィール編集" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
                            {/* ログインページ */}
                            <Route path="/login" title="キニカレ　- ログイン" element={<Login />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </ProvideAuth>
        </ChakraProvider>

    )
}

export default App
