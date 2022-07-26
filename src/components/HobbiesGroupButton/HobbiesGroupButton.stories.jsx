import { HobbiesGroupButton } from "./HobbiesGroupButton"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/HobbiesGroupButton",
    component: HobbiesGroupButton
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <HobbiesGroupButton hobbies={["スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩"]}/>
