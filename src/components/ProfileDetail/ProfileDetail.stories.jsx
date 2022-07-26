import { ProfileDetail } from "./ProfileDetail"
import { HiOutlineBriefcase } from "react-icons/hi"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/ProfileDetail",
    component: ProfileDetail
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <ProfileDetail detailHeading="部署" detailText="SRE部" detailIcon={HiOutlineBriefcase} detailIconColor="teal"/>
