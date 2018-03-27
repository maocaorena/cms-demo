import axios from 'axios';
import config from './config';
import qs from 'qs';
import router from '@/router';
import { Util } from '@/utils/util.js'; //引入Util
import { User } from '@/utils/user.js'; //引入Storage
import { Storage } from '@/utils/storage.js'; //引入Storage
import { Message } from 'element-ui';
axios.defaults.withCredentials = true;
let bxmUrl = Util.nowUrl();

export const request = function (msg) { //ajax
    let _headers = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "Accept": "application/json; charset=utf-8",
        "token": User.getToken()
    };
    if (msg.url == 'user/login') {
        delete _headers.token
    };
    let _params = {
        "userId": User.getUserId(),
    };
    if (msg.headers) {
        Object.assign(_headers, msg.headers);
    };
    if (msg.params) {
        Object.assign(_params, msg.params);
    };
    msg.method = msg.method.toUpperCase();
    return axios({
        method: msg.method,
        baseURL: msg.baseUrl || bxmUrl,
        url: msg.url,
        params: msg.method === 'GET' || msg.method === 'DELETE' ? _params : null,
        data: msg.method !== 'GET' && msg.method !== 'DELETE' ? qs.stringify(_params) : null,
        timeout: 600000,
        headers: _headers,
    }).then(res => {
        if (!res.data.successed) {
            switch (res.data.errorCode) {
                case '1001':
                    Message.error({
                        message: res.data.errorDesc,
                        duration: Util.time()
                    });
                    noLogin();
                    break;
                case '500':
                    Message.error({
                        message: res.data.errorDesc,
                        duration: Util.time()
                    });
                    break;
                default:
                    Message.error({
                        message: res.data.errorDesc,
                        duration: Util.time()
                    });
                    break;
            };
        };
        return res;
    }).catch(error => {
        console.log(error.response);
        if (error.response.status === 400) {
            Message.error({
                message: error.response.data.errorDesc,
                duration: Util.time()
            });
            if (error.response.data.errorCode === '1001'){
                noLogin();
            };
        }else{
            Message.error({
                message: '网络错误，请稍后重试',
                duration: Util.time()
            });
        }
    });
};
function noLogin() {
    console.log('token失效');
    Storage.removeItem('uf');
    router.push({ path: '/login' })
};

// -------------------------------------------------------------------------
//上传图片 url, param, callback, progress, err
export const postUp = function (msg) {
    let allUrl = bxmUrl + msg.url;
    let upconfig = {
        onUploadProgress: msg.progress,
        headers: {
            "token": User.getToken()
        }
    };
    return axios({
        method: 'POST',
        baseURL: bxmUrl,
        url: msg.url,
        data: msg.params,
        timeout: 600000,
        onUploadProgress: msg.progress,
        headers: {
            "token": User.getToken()
        }
    })
};
