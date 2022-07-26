import { css } from "@emotion/css"
import { Text } from "@chakra-ui/react"
export const Footer = () => {
    return (
        <div className={styles.container}>
            <Text fontSize="sm">💟 Copyright © 2022 Team 菱湖 All Right Reserved.</Text>
        </div>
    )
}

const styles = {
    container: css({
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    })
}
