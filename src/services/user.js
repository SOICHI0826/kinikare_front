/* eslint-disable quote-props */
import request from "../utils/request"

const KINIKARE_USER_ENDPOINT = "user/"
export default class User {
    static get (id) {
        return request({
            url: `${KINIKARE_USER_ENDPOINT}${id}`
        })
    }

    static put (id, data) {
        return request({
            method: "PUT",
            url: `${KINIKARE_USER_ENDPOINT}${id}`,
            data
        })
    }
}
