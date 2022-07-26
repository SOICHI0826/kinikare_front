/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { css } from "@emotion/css"
import { useForm } from "react-hook-form"
import {
    Box, Heading, VStack, FormControl, FormLabel, Button,
    FormErrorMessage, Input,
    Alert,
    AlertIcon,
    AlertDescription
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../utils/useAuth"

export const Login = () => {
    const auth = useAuth() // 中身はisLoading,isAuthenticated(True or False),username,signIn,signOut
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
    const [ifLoginFailed, setLoginFailed] = useState(false)
    const navigate = useNavigate()

    const handleSignIn = async (data) => {
        const result = await auth.signIn(data.username, data.password) // 中身はsuccess（boolean）
        if (result.success) {
            auth.getSession()
            navigate("/")
        } else {
            setLoginFailed(true)
        }
    }

    return (
        <div className={styles.container}>
            <Box borderRadius="lg" p="100px" bg="white" shadow="base" className={styles.formContainer}>
                <VStack spacing="24px" align="stretch">
                    {ifLoginFailed && <Alert status="error">
                        <AlertIcon />
                        <AlertDescription>ログインできませんでした<br/>もう一回試してください</AlertDescription>
                    </Alert>}
                    <Heading as="h2" size="lg">
                        &#128525;キニカレへようこそ
                    </Heading>
                    <form className={styles.form}onSubmit={handleSubmit(handleSignIn)}>
                        <FormControl mb="24px" isInvalid={errors.username}>
                            <FormLabel htmlFor="username">ユーザーID</FormLabel>
                            <Input bg="white" id="username" placeholder="IDを入力してください" size="lg"
                                {...register("username", {
                                    required: "正しいIDを入力してください"
                                })}
                            />
                            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb="56px" isInvalid={errors.password}>
                            <FormLabel htmlFor="password">パスワード</FormLabel>
                            <Input id="password" type="password" placeholder="パスワードを入力してください" size="lg"
                                {...register("password", {
                                    required: "正しいパスワードを入力してください"
                                })}
                            />
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                        <Button size="lg" colorScheme="teal" isLoading={isSubmitting} type="submit">
                            ログイン
                        </Button>
                    </form>
                </VStack>
            </Box>
        </div>
    )
}

const styles = {
    container: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        backgroundColor: "lightgrey"
    }),
    formContainer: css({
        width: "580px",
        marginTop: "56px"
    }),
    form: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    })
}
