import request from "../utils/request"

// const KINIKARE_ATTENDANCES_ENDPOINT = "attendances/"
export default class Attendances {
    static get (date, office) {
        return request({
            // url: `${KINIKARE_ATTENDANCES_ENDPOINT}?date=${date}&office=${office}`
        })
    }
}
