import { css } from "@emotion/react"
import { NavTab } from "./NavTab"
import { Header } from "../Header/Header"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/NavTab",
    component: NavTab
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <Header className={styles.background}>
        <NavTab />
    </Header>

const styles = {
    background: css({

    })
}
