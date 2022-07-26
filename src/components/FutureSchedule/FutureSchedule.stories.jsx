import { FutureSchedule } from "./FutureSchedule"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/FutureSchedule",
    component: FutureSchedule
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <FutureSchedule
        date="2022-06-22"
        clockIn="0900"
        clockOut="1800"
        officePlace="虎ノ門3F"
    />
