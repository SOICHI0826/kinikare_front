import { ProfileCard } from "./ProfileCard"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/ProfileCard",
    component: ProfileCard
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <ProfileCard />
