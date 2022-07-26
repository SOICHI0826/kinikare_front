import { css } from "@emotion/css"
import { Tag } from "@chakra-ui/react"

export const HobbiesGroup = (props) => {
    if (props.hobbies !== "undefined") {
        return (
            <div className={styles.container} >
                {props.hobbies && props.hobbies.map((hobby) => (
                    <Tag size="md" key={hobby} variant="solid" colorScheme="teal">
                        {hobby}
                    </Tag>
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
