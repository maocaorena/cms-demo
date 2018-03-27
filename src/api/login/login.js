import {request} from '@/utils/request/api.js'

export function login({username, password, imgValidateCode}) {
    return request({
        url: 'user/login',
        method: 'POST',
        params: {
            username,
            password
        },
        headers: {
            imgValidateCode
        }
    })
}

