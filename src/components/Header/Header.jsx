/* eslint-disable no-unused-vars */
import { css } from "@emotion/css"
import { Box, Button, Text, Avatar } from "@chakra-ui/react"
import { NavTab } from "../NavTab/NavTab"
import { Navigate } from "react-router-dom"
import userApi from "../../services/user" // ユーザー情報をIDを引数としてAPIで取得する
import imageApi from "../../services/image"
import { useState, useEffect } from "react"

// ユーザプロフィール情報を取得するための処理
export const Header = (props) => {
    const { children, tabs, auth } = props
    const [user, setUser] = useState("")
    const [image, setImage] = useState("")
    const handleSignOut = async () => {
        const result = await auth.signOut()
        if (result.success) {
            return (<Navigate to="/login" />)
        } else {
            return "error"
        }
    }
    // TODO：usernameは全画面で使うので、Contextで管理しても良いのかも
    const fetchData = async () => {
        const result = await userApi.get(auth.username) // ログイン成功しているusername(K00000*)でプロフィール一覧を取得するapi叩く
        const imageResult = await imageApi.get(auth.username)
        setUser(result.data)
        setImage(imageResult.data)
        return result
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box bg="teal" className={styles.container}>
            <div className={styles.innerContainer}>
                {children}
                <div className={styles.leftContainer}>
                    <NavTab tabs={tabs} />
                </div>
                { auth.username &&
                <div className={styles.rightContainer}>
                    <Avatar mr="14px" size="sm" name={user.firstName} src={`data:image/png;base64,${image}`} />
                    <Text mr="14px" color="#FFFFFF">{"こんにちは、" + user.last_name + "さん"}</Text>
                    <Button type="button" onClick={handleSignOut}>ログアウト</Button>
                </div> }
            </div>
        </Box>
    )
}

// ユーザプロフィール情報を取得するための処理
const styles = {
    container: css({
        width: "100%",
        height: "114px",
        display: "flex",
        justifyContent: "center"
    }),
    innerContainer: css({
        width: "1200px",
        display: "flex",
        alignItems: "center"
    }),
    personalContainer: css({
        right: 0
    }),
    leftContainer: css({
        width: "256px",
        height: "42px",
        marginLeft: "150px"
    }),
    rightContainer: css({
        width: "353px",
        height: "53px",
        display: "flex",
        alignItems: "center",
        marginLeft: "388px"
    })
}
