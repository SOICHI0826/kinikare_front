import { Heading, Text, Box } from "@chakra-ui/react"

export const FreeComments = (props) => {
    return (
        <Box maxW="542px" maxH="293px" boxShadow="base" p="6" rounded="xs" bg="#F5F5F5" >
            <Heading mb="15px" as="h3" size="lg">みんなへひとこと</Heading>
            <Text fontSize="md">{props.text}</Text>
        </Box>
    )
}
