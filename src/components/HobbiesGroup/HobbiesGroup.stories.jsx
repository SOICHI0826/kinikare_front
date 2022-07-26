import { HobbiesGroup } from "./HobbiesGroup"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/HobbiesGroup",
    component: HobbiesGroup
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <HobbiesGroup hobbies={["スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩"]}/>
