import { css } from "@emotion/css"
import { Button, Text } from "@chakra-ui/react"

export const HobbiesGroupButton = (props) => {
    const { hobbies, setHobbies, otherHobbies, setOtherHobbies } = props
    // 趣味タグボタンを押した時の更新処理
    const onClickEvent = (hobby) => {
        updateHobbies(hobby)
        updateOtherHobbies(hobby)
    }

    // 選択中の趣味リスト更新
    const updateHobbies = (hobby) => {
        const newHobbies = hobbies.concat() // 参照渡しだと再レンダリングされないので、concatメソッドで値渡しに
        newHobbies.push(hobby)
        setHobbies(newHobbies)
    }
    // 選択していない趣味リスト更新
    const updateOtherHobbies = (hobby) => {
        const index = otherHobbies.indexOf(hobby)
        const newOtherHobbies = otherHobbies.concat() // 参照渡しだと再レンダリングされないので、concatメソッドで値渡しに
        newOtherHobbies.splice(index, 1)
        setOtherHobbies(newOtherHobbies)
    }

    if (hobbies !== "undefined") {
        return (
            <div className={styles.container} >
                {otherHobbies && otherHobbies.map((hobby) => (
                    <Button size="sm" key={hobby} variant="solid" color="white" colorScheme="orange" onClick={() => onClickEvent(hobby)}>
                        <Text size="sm" fontSize="sm">{hobby}</Text>
                    </Button>
                ))}
            </div>
        )
    }
}

const styles = {
    container: css({
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
    })

}
