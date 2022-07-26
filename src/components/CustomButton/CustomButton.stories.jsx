import { CustomButton } from "./CustomButton"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/CustomButton",
    component: CustomButton
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <CustomButton
        label="this is a custom button!"
        caption="tiny caption here"
    />
