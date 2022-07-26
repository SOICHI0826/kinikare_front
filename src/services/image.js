import request from "../utils/request"

const KINIKARE_IMAGE_ENDPOINT = "user_img/"
export default class Image {
    static get (id) {
        return request({
            url: `${KINIKARE_IMAGE_ENDPOINT}${id}`
        })
    }
}
