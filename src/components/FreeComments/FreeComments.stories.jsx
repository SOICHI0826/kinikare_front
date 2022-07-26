import { FreeComments } from "./FreeComments"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Kinikare/FreeComments",
    component: FreeComments
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
}

export const Primary = () =>
    <FreeComments text="こんにちは！SRE部のユウゴたんです！
    最近はコロンビアのコーヒーにハマっています！
    普段出社が多いのでぜひ一緒にご飯ができたらと思います！" />
