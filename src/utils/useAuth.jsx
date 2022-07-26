/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import { Auth, Amplify } from "aws-amplify"
import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import imageApi from "../services/image"

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: "ap-northeast-1",
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: "ap-northeast-1_5hlNTqlTL",
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: "7il6s6u2odsrk71j4eorsa87a4"
    }
})

const AuthContext = createContext({})

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()
    axios.defaults.headers.common["Content-Type"] = "application/json"
    axios.defaults.baseURL = "https://api.kinikare.com"
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

const useProvideAuth = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")
    const [currentSession, setCurrentSession] = useState({})
    const [idToken, setIdToken] = useState("")
    // let InterceptId

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((result) => {
                setUsername(result.name)
                setIsAuthenticated(true)
                setIsLoading(false)
            })
            .catch(() => {
                setUsername("")
                setIsAuthenticated(false)
                setIsLoading(false)
            })
    }, [])

    const signIn = async (signInUsername, signInPassword) => {
        try {
            const result = await Auth.signIn(signInUsername, signInPassword)

            setUsername(result.username)
            setIsAuthenticated(true)
            return { success: true, message: "" }
        } catch (error) {
            return {
                success: false,
                message: "認証に失敗しました。"
            }
        }
    }
    // const setInterceptor = () =>
    //     axios.interceptors.request.use(async (request) => {
    //         try {
    //             const session = await Auth.currentSession()
    //             Object.assign(request.headers, {
    //                 Authorization: session.getIdToken().getJwtToken()
    //             })
    //             return request
    //         } catch (error) {
    //             axios.interceptors.request.eject(InterceptId)
    //             return Promise.reject(error)
    //         }
    //     })

    const signOut = async () => {
        try {
            await Auth.signOut()
            // axios.interceptors.request.eject(InterceptId)
            setUsername("")
            setIsAuthenticated(false)
            return { success: true, message: "" }
        } catch (error) {
            return {
                success: false,
                message: "ログアウトに失敗しました。"
            }
        }
    }

    const getSession = async () => {
        try {
            const result = await Auth.currentSession()
            axios.defaults.headers.common["Authorization"] = result.idToken.jwtToken
            setCurrentSession(result)
            setIdToken(result.idToken.jwtToken)
            return { success: true, message: "" }
        } catch (error) {
            return {
                success: false,
                message: ""
            }
        }
    }

    return {
        isLoading,
        isAuthenticated,
        username,
        currentSession,
        idToken,
        signIn,
        signOut,
        getSession
    }
}
