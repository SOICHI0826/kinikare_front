import { HomeProfile } from "./HomeProfile"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/HomeProfile",
    component: HomeProfile
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <HomeProfile
        lastName={"中村"} firstName={"勇吾"}
        date="2022-06-22"
        officePlace = "虎ノ門3F"
        clockIn = "1000"
        clockOut = "1800"
        startWelcome = "1200"
        endWelcome = "1300"
        startFocus = "1000"
        endFocus = "1200"
        hobbies= {["スノボー", "ゲーム", "スキー", "スノボー", "ゲーム", "スキー", "スノボー", "ゲーム", "スキー", "スノボー", "ゲーム", "スキー", "スノボー", "ゲーム"]}/>
