/* eslint-disable no-unused-vars */
import { Header } from "./../../components/Header/Header"
import { Footer } from "./../../components/Footer/Footer"
import { css } from "@emotion/css"
import { useAuth } from "./../../utils/useAuth"

import { Heading, Box, Avatar, Text } from "@chakra-ui/react"
import { HobbiesGroup } from "../../components/HobbiesGroup/HobbiesGroup"
import { ProfileDetail } from "../../components/ProfileDetail/ProfileDetail"
import { HiOutlineDesktopComputer, HiOutlineEmojiHappy } from "react-icons/hi"

export const Home = () => {
    const auth = useAuth()
    const tabs = [
        {
            title: "キニカレ",
            link: "/",
            isSelected: true
        },
        {
            title: "マイプロフィール",
            link: "/profile",
            isSelected: false
        }
    ]

    const scheduleList = [
        {
            office: "虎ノ門 3F",
            user_id: "K000007",
            start_welcome: "12:00",
            date: "2022年07月26日（火）",
            start_focus: "15:00",
            end_focus: "17:00",
            end_welcome: "13:00",
            clock_in: "09:00",
            clock_out: "17:30",
            username: "中村勇吾",
            hobby_list: ["スノボ", "ゲーム", "散歩"]
        },
        {
            office: "虎ノ門 3F",
            user_id: "K000001",
            start_welcome: "12:00",
            date: "2022年07月26日（火）",
            start_focus: "15:00",
            end_focus: "17:00",
            end_welcome: "13:00",
            clock_in: "09:00",
            clock_out: "17:30",
            username: "河村尚真",
            hobby_list: ["スノボ", "ゲーム", "ビリヤード"]
        },
        {
            office: "虎ノ門 3F",
            user_id: "K000002",
            start_welcome: "12:00",
            date: "2022年07月26日（火）",
            start_focus: "16:50",
            end_focus: "17:00",
            end_welcome: "13:00",
            clock_in: "09:00",
            clock_out: "17:30",
            username: "尹喜眞",
            hobby_list: ["昼寝", "音楽"]
        },
        {
            office: "虎ノ門 3F",
            user_id: "K000006",
            start_welcome: "13:00",
            date: "2022年07月26日（火）",
            start_focus: "09:30",
            end_focus: "12:00",
            end_welcome: "14:00",
            clock_in: "09:00",
            clock_out: "17:30",
            username: "李雨菲菲",
            hobby_list: ["Twice", "読書", "バイク"]
        }
    ]

    return (
        <div className={ styles.container}>
            <Header className={styles.header} tabs={tabs} auth={auth}/>
            <div className={styles.main} >
                <div className={styles.mainContent}>
                    <Heading size="lg" mt="30px" mb="30px">✨今日の虎ノ門 3Fの出社予定一覧</Heading>
                    <div className={styles.scheduleCardContainer}>
                        {scheduleList.map((schedule) => (
                            <Box key={schedule.username} p={3} boxShadow="base" rounded="base" bg="White" >
                                <div className={styles.cardInnerContainer} >
                                    <div className={styles.leftContainer}>
                                        <Avatar mb="30px" size="2xl" name={schedule.username} />
                                        <Heading size="24px">{schedule.office}</Heading>
                                        <Text>{schedule.date}</Text>
                                        <Text>{schedule.clock_in} - {schedule.clock_out}</Text>
                                    </div>
                                    <div className={styles.rightContainer}>
                                        <Heading size="lg" mt="6px" mb="6px">{schedule.username}さん</Heading>
                                        <HobbiesGroup hobbies={schedule.hobby_list} />
                                        <ProfileDetail detailHeading="集中タイム" detailText={`${schedule.start_focus} - ${schedule.end_focus}`} detailIcon={HiOutlineDesktopComputer} detailIconColor="Blue"/>
                                        <ProfileDetail detailHeading="お声かけ歓迎" detailText={`${schedule.start_welcome} - ${schedule.end_welcome}`} detailIcon={HiOutlineEmojiHappy} detailIconColor="Teal"/>
                                    </div>
                                </div>
                            </Box>
                        ))}

                    </div>
                </div>
            </div>

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
        gridArea: "main",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        margin: "30px"
    }),
    mainContent: css({
        maxWidth: "1200px"
    }),
    scheduleCardContainer: css({
        display: "grid",
        width: "1000px",
        gridTemplateColumns: "1fr 1fr",
        columnGap: "16px",
        rowGap: "16px"
    }),
    cardInnerContainer: css({
        display: "grid",
        width: "100%",
        gridTemplateColumns: "0.6fr 1fr",
        columnGap: "6px",
        rowGap: "3px"
    }),
    leftContainer: css({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }),
    rightContainer: css({
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px 0"
    }),

    footer: css({
        gridArea: "footer",
        width: "100%"
    })
}
