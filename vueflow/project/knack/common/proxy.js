import axios from 'axios'

function fetchGet(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default {
    get (url) {
        return fetchGet('http://m.huainanhai.com/proxy/index?url='+encodeURIComponent(url));
    }
}