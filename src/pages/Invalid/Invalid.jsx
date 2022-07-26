import { Header } from "./../../components/Header/Header"
import { Footer } from "./../../components/Footer/Footer"
import { css } from "@emotion/css"
import { useAuth } from "./../../utils/useAuth"

export const Invalid = () => {
    const auth = useAuth()
    const tabs = [
        {
            title: "キニカレ",
            link: "/",
            isSelected: false
        },
        {
            title: "マイプロフィル",
            link: "/profile",
            isSelected: false
        }
    ]
    return (
        <div className={ styles.container}>
            <Header className={styles.header} tabs={tabs} auth={auth}/>
            <div className={styles.main} ><p>Invalid</p></div>
            <Footer className={styles.footer} />
        </div>
    )
}

// eslint-disable-next-line max-lines-per-function
const styles = {
    container: css({
        display: "grid",
        gridTemplateAreas: `
            "header "
            "main"
            "footer"
        `,
        gridTemplateRows: " 114px 1fr 69px",
        margin: "0 auto",
        minHeight: "100vh"
    }),
    header: css({
        gridArea: "header",
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%"
    }),
    main: css({
        gridArea: "main"
    }),
    footer: css({
        gridArea: "footer",
        width: "100%"
    })

}
