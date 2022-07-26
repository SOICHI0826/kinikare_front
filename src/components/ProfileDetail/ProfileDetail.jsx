import { Box, Icon, Heading, Text, HStack } from "@chakra-ui/react"

export const ProfileDetail = (props) => {
    return (
        <Box p={3} rounded="base" bg="#F5F5F5" >
            <HStack align="flex-start">
                <Icon w="24px" h="24px" color={props.detailIconColor} as={props.detailIcon} />
                <div>
                    <Heading mb="4px" as="h5" size="sm">{props.detailHeading}</Heading>
                    <Text fontSize="sm">{props.detailText}</Text>
                </div>
            </HStack>
        </Box>
    )
}
