import request from "../utils/request"

const KINIKARE_HOBBY_ENDPOINT = "hobby"
export default class Hobby {
    static get () {
        return request({
            url: `${KINIKARE_HOBBY_ENDPOINT}`
        })
    }
}
