import { Box, Heading } from "@chakra-ui/react"

export const FutureSchedule = (props) => {
    const { date, clockIn, clockOut, officePlace } = props

    const convertedDate = convertDate(date)
    const convertedClockIn = convertTime(clockIn)
    const convertedClockOut = convertTime(clockOut)

    return (
        <Box display="flex" width="100%" justifyContent="space-between">
            <Heading display="flex" justifyContent="center" alignItems="center" pl="10px" pr="10px" width="40%" size="sm" borderRightWidth="3px" borderRightColor="#F5F5F5">{convertedDate }</Heading>
            <Heading display="flex" justifyContent="center" width="30%" p="10px" size="sm" borderRightWidth="3px" borderRightColor="#F5F5F5">{convertedClockIn + " - " + convertedClockOut}</Heading>
            <Heading display="flex" justifyContent="center" width="30%" p="10px" size="sm">{officePlace}</Heading>
        </Box>
    )
}

const convertDate = (date) => {
    const dateObj = new Date(date)
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"]
    const month = dateObj.getMonth() + 1
    return dateObj.getFullYear() + "年" + month + "月" + dateObj.getDate() + "日（" + dayOfWeek[dateObj.getDay()] + "）"
}

const convertTime = (clock) => {
    return clock.slice(0, 2) + ":" + clock.slice(-2)
}
