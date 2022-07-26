/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import userApi from "../../services/user"
import attendanceApi from "../../services/attendance"
import { Header } from "./../../components/Header/Header"
import { Footer } from "./../../components/Footer/Footer"
import { css } from "@emotion/css"
import { useAuth } from "./../../utils/useAuth"
import { ProfileCard } from "../../components/ProfileCard/ProfileCard"
import { FreeComments } from "../../components/FreeComments/FreeComments"
import { HobbiesGroup } from "../../components/HobbiesGroup/HobbiesGroup"
import { FutureSchedule } from "../../components/FutureSchedule/FutureSchedule"
import { ProfileDetail } from "../../components/ProfileDetail/ProfileDetail"
import { Heading, Box } from "@chakra-ui/react"
import { HiOutlineDesktopComputer, HiOutlineEmojiHappy } from "react-icons/hi"
import imageApi from "../../services/image"

export const Profile = () => {
    const auth = useAuth()
    const tabs = [
        {
            title: "キニカレ",
            link: "/",
            isSelected: false
        },
        {
            title: "マイプロフィール",
            link: "/profile",
            isSelected: true
        }
    ]
    const [profile, setProfile] = useState({})
    const [attendanceList, setAttendanceList] = useState()
    const [image, setImage] = useState()

    useEffect(() => {
        const fetchData = async () => {
            // GET user profile
            const result = await userApi.get(auth.username)
            setProfile(result.data)

            // GET user schedule
            const attendanceResult = await attendanceApi.get(auth.username)
            const tempAttendanceList = attendanceResult.data
            setAttendanceList(tempAttendanceList)

            const userImage = await imageApi.get(auth.username)
            setImage(userImage.data)

            return result
        }
        fetchData()
    }, [])

    return (
        <div className={ styles.container}>
            <Header className={styles.header} tabs={tabs} auth={auth}/>
            <div className={styles.main}>
                <div className= {styles.mainContent} >
                    <div className={styles.profileArea}>
                        <div className={styles.profileCard}>
                            <ProfileCard
                                firstName={profile.first_name}
                                lastName={profile.last_name}
                                gender={String(profile.gender)}
                                department={profile.department}
                                birthplace={profile.birthplace}
                                default_office={profile.default_office}
                                lastNameKana={profile.last_name_kana}
                                firstNameKana={profile.first_name_kana}
                                isUserValid={auth.isAuthenticated}
                                // 仮に入れた数値
                                visitCount="20"
                                photo={`data:image/png;base64,${image}`}
                            />
                        </div>

                        <div className={styles.commentContent}>
                            <div className={styles.freeComments}>
                                <FreeComments text = {profile.comment}/>
                            </div>
                            <HobbiesGroup hobbies = {profile.hobbies_list}/>
                        </div>
                    </div>

                    {/* &&attendanceListが入ったら実行する */}
                    {attendanceList && <div className={styles.scheduleContainer} >
                        <Heading size="lg" mt="30px" mb="30px">✨今後の出社予定</Heading>
                        <div className={styles.scheduleList} >
                            {attendanceList.map((schedule) => (
                                <Box key={schedule.date} bg="white" w="100%" p="6px" rounded="base" boxShadow="base">
                                    <div className={styles.schedule}>
                                        <div className={styles.scheduleLeft} >
                                            <FutureSchedule
                                                date={schedule.date}
                                                clockIn={schedule.clock_in}
                                                clockOut={schedule.clock_out}
                                                officePlace={schedule.office}
                                            />
                                        </div>
                                        <div className={styles.scheduleRight} >
                                            <ProfileDetail detailHeading="集中タイム" detailText={`${convertTime(schedule.start_focus)} - ${convertTime(schedule.end_focus)}`} detailIcon={HiOutlineDesktopComputer} detailIconColor="Blue"/>
                                            <ProfileDetail detailHeading="お声かけ歓迎" detailText={`${convertTime(schedule.start_welcome)} - ${convertTime(schedule.end_welcome)}`} detailIcon={HiOutlineEmojiHappy} detailIconColor="Teal"/>
                                        </div>
                                    </div>
                                </Box>
                            ))}

                        </div>
                    </div>}
                </div>
            </div>

            <Footer className={styles.footer} />
        </div>
    )
}

const convertTime = (clock) => {
    return clock.slice(0, 2) + ":" + clock.slice(-2)
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
    footer: css({
        gridArea: "footer",
        width: "100%"
    }),
    profileArea: css({
        display: "flex",
        justifyContent: "space-between"
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
    mainCOntent: css({
        maxWidth: "1200px"
    }),
    title: css({
        fontSize: "30px",
        color: "lightcoral"
    }),

    profileCard: css({
        width: "350px"
    }),

    commentContent: css({
        width: "430px",
        marginLeft: "30px"
    }),

    freeComments: css({
        marginBottom: "20px"
    }),

    schedule: css({
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }),
    scheduleLeft: css({
        width: "60%"
    }),
    scheduleRight: css({
        width: "40%",
        display: "flex",
        gap: "10px"
    }),
    scheduleList: css({
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    })
}
