import { HobbiesGroupDeleteButton } from "./HobbiesGroupDeleteButton"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/HobbiesGroupDeleteButton",
    component: HobbiesGroupDeleteButton
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <HobbiesGroupDeleteButton hobbies={["スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩", "スノボ", "ゲーム", "散歩"]}/>
