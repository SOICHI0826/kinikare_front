import { css } from "@emotion/css"
import { Box, HStack, Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { classNames } from "../../utils/classNames"

export const NavTab = (props) => {
    const { tabs } = props

    return (
        <HStack className={styles.container}>
            {tabs.map((tab) => {
                return (
                    tab.isSelected
                        ? <Box key={tab.title} className={classNames([styles.tabContainer, styles.isSelected])}>
                            <Link to={tab.link}><Heading fontSize="sm" color="white">{tab.title}</Heading></Link>
                        </Box>
                        : <Box key={tab.title} className={styles.tabContainer}>
                            <Link to={tab.link}><Heading fontSize="sm" color="white">{tab.title}</Heading></Link>
                        </Box>
                )
            })}
        </HStack>
    )
}

const styles = {
    container: css({
        height: "100%",
        display: "flex",
        alignItems: "center"
    }),
    tabContainer: css({
        padding: "8px 16px"
    }),
    isSelected: css({
        borderBottom: "solid 2px white",
        color: "white"
    })
}
