import { css } from "@emotion/css"
import { Avatar, Heading, Box } from "@chakra-ui/react"
import { ProfileDetail } from "../ProfileDetail/ProfileDetail"
import { HiOutlineDesktopComputer, HiOutlineEmojiHappy } from "react-icons/hi"
import { HobbiesGroup } from "../HobbiesGroup/HobbiesGroup"

export const HomeProfile = (props) => {
    const { lastName, firstName, date, officePlace, clockIn, clockOut, startWelcome, endWelcome, startFocus, endFocus, hobbies } = props
    const convertedDate = convertDate(date)
    const convertedClockIn = convertTime(clockIn)
    const convertedClockOut = convertTime(clockOut)
    const convertedStartWelcome = convertTime(startWelcome)
    const convertedEndWelcome = convertTime(endWelcome)
    const convertedStartFocus = convertTime(startFocus)
    const convertedEndFocus = convertTime(endFocus)
    return (
        <Box maxW="540" display="flex" boxShadow="base" p="6" rounded="xs" bg="white">
            <div className={styles.leftContainer}>
                <Avatar mb="30px" size="2xl" name={firstName} src={props.photo} />
                <div className={styles.workContainer}>
                    <Heading mb="4px" as="h5" size="xs">{officePlace}</Heading>
                    <Heading mb="4px" as="h5" size="xs">{convertedDate}</Heading>
                    <Heading mb="4px" as="h5" size="xs">{convertedClockIn + "-" + convertedClockOut}</Heading>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <Heading>{lastName + firstName + "さん"}</Heading>
                {/* TODO: タグの個数に応じてand more...を表示 */}
                <div id="hobbiesContainer" className={styles.hobbiesContainer}>
                    <HobbiesGroup hobbies ={hobbies}/>
                </div>
                <div className={styles.timeContainer}>
                    <ProfileDetail detailHeading="お声かけ歓迎" detailText={convertedStartWelcome + "~" + convertedEndWelcome} detailIcon={HiOutlineDesktopComputer} detailIconColor="teal"/>
                    <ProfileDetail detailHeading="集中タイム" detailText={convertedStartFocus + "~" + convertedEndFocus} detailIcon={HiOutlineEmojiHappy} detailIconColor="blue"/>
                </div>
            </div>
        </Box>

    )
}

const convertDate = (date) => {
    const dateObj = new Date(date)
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"]
    return dateObj.getFullYear() + "年" + dateObj.getMonth() + "月" + dateObj.getDate() + "日（" + dayOfWeek[dateObj.getDay()] + "）"
}

const convertTime = (clock) => {
    return clock.slice(0, 2) + ":" + clock.slice(-2)
}

const styles = {
    leftContainer: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "24px",
        maxWidth: "179px",
        maxHeight: "253px"
    }),

    workContainer: css({
        marginTop: "20px",
        marginRight: "11px",
        marginLeft: "11px",
        textAlign: "center"
    }),

    rightContainer: css({
        maxWidth: "277px",
        maxHight: "254px"
    }),

    hobbiesContainer: css({
        maxHeight: "58px",
        overflow: "hidden"
    }),

    timeContainer: css({
        display: "flex",
        flexFlow: "column",
        gap: "10px",
        marginTop: "25px",
        maxWidth: "274px",
        maxHeight: "134px"
    })
}
