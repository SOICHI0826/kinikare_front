import { css } from "@emotion/css"
import { Button } from "@chakra-ui/react"

export const CustomButton = (props) => {
    return (
        <div>
            <button
                type="button"
                className={styles.button}
            >
                {props.label}
            </button>
            <Button colorScheme="teal" size="lg">
                {props.label}
            </Button>
            <p className={styles.caption}>{props.caption}</p>
        </div>
    )
}

const styles = {
    button: css({
        border: "1px solid black",
        color: "black",
        backgroundColor: "pink",
        padding: "20px 10px"
    }),
    caption: css({
        color: "grey",
        fontSize: "12px"
    })
}
