import axios from "axios"

export default ({ url, method, headers, data }, options = {}) => {
    return axios(url, {
    // *GET, POST, PUT, DELETE。
        method: method || "GET",
        // data to be sent to server
        data,
        // headers
        headers,
        ...options // ほかのオプション
    })
}
