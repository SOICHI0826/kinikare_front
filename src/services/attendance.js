import request from "../utils/request"

const KINIKARE_ATTENDANCE_ENDPOINT = "attendance/"
export default class Attendance {
    static get (id) {
        return request({
            url: `${KINIKARE_ATTENDANCE_ENDPOINT}${id}`
        })
    }
}
