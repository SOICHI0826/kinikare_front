import { Box, Tag, Avatar, Text, Heading, Button } from "@chakra-ui/react"
import { HiOutlineBriefcase, HiOutlineTruck, HiOutlineClipboardList, HiOutlineFire } from "react-icons/hi"
import { ProfileDetail } from "../ProfileDetail/ProfileDetail"
import { css } from "@emotion/css"
import { useNavigate } from "react-router-dom"

export const ProfileCard = (props) => {
    const navigate = useNavigate()
    const navigateToEdit = () => {
        navigate("/profile/edit")
    }

    return (
        <Box p={3} boxShadow="base" rounded="base" bg="White" >
            {props.isUserValid &&
            <div className={styles.editBtnContainer}>
                <Button size="md" variant="outline" colorScheme="Teal" onClick={navigateToEdit}>
                    編集
                </Button></div>}
            <div className={styles.container}>
                <div>
                    <Avatar mb="30px" size="2xl" name={props.firstName} src={props.photo} />
                </div>
                <div>
                    <Heading size="24px">{props.lastName} {props.firstName}</Heading>
                    <Text>{props.lastNameKana} {props.firstNameKana}</Text>
                </div>
                <div className={styles.genderBox}>
                    {genderSwitch(props.gender)}
                </div>
            </div>
            <div className={styles.profileDetails}>
                <ProfileDetail detailHeading="部署" detailText={props.department} detailIcon={HiOutlineBriefcase} detailIconColor="Teal"/>
                <ProfileDetail detailHeading="出身" detailText={props.birthplace} detailIcon={HiOutlineTruck} detailIconColor="Blue"/>
                <ProfileDetail detailHeading="通っているオフィス" detailText={props.default_office} detailIcon={HiOutlineClipboardList} detailIconColor="Teal"/>
                <ProfileDetail detailHeading="今年の出社回数" detailText={props.visitCount + "回"} detailIcon={HiOutlineFire} detailIconColor="Red"/>
            </div>
        </Box>
    )
}

const genderSwitch = (gender) => {
    switch (gender) {
    case "1":
        return (
            <Tag mb="40px" size="md" key="man" variant="solid" colorScheme="teal">
                男性
            </Tag>)
    case "2":
        return (
            <Tag mb="40px" size="md" key="woman" variant="solid" colorScheme="teal">
                女性
            </Tag>)
    default:
        return (
            <Tag mb="40px" size="md" key="unknown" variant="solid" colorScheme="teal">
                回答しない
            </Tag>)
    }
}

const styles = {
    profileDetails: css({
        display: "flex",
        flexFlow: "column",
        gap: "8px",
        marginBottom: "8px"
    }),

    editBtnContainer: css({
        textAlign: "right"
    }),

    container: css({
        textAlign: "center"
    }),

    genderBox: css({
        marginTop: "10px",
        textAlign: "center"
    })
}
