import { css } from "@emotion/css"
import { Button, Text } from "@chakra-ui/react"
import { AiOutlineClose } from "react-icons/ai"

export const HobbiesGroupDeleteButton = (props) => {
    const { hobbies, setHobbies, otherHobbies, setOtherHobbies } = props
    // 趣味タグボタンを押した時の更新処理
    const onClickEvent = (hobby) => {
        updateHobbies(hobby)
        updateOtherHobbies(hobby)
    }

    // 選択中の趣味リスト更新
    const updateHobbies = (hobby) => {
        const index = hobbies.indexOf(hobby)
        const newHobbies = hobbies.concat() // 参照渡しだと再レンダリングされないので、concatメソッドで値渡しに
        newHobbies.splice(index, 1)
        setHobbies(newHobbies)
    }
    // 選択していない趣味リスト更新
    const updateOtherHobbies = (hobby) => {
        const newOtherHobbies = otherHobbies.concat() // 参照渡しだと再レンダリングされないので、concatメソッドで値渡しに
        newOtherHobbies.push(hobby)
        setOtherHobbies(newOtherHobbies)
    }

    if (hobbies !== "undefined") {
        return (
            <div className={styles.container} >
                {hobbies && hobbies.map((hobby) => (
                    <Button leftIcon={<AiOutlineClose />} key={hobby} size="sm" color="white" variant="solid" colorScheme="green" onClick={() => onClickEvent(hobby)}>
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
