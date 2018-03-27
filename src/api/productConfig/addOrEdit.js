import { request, postUp} from '@/utils/request/api.js'

export function upImg({ params, callback, progress, err }) {
    return postUp({
        url: 'common/upload',
        params: params,
        progress: progress,
    })
}

//新增
export function addConfig(params) {
    return request({
        url: 'productConfig/add',
        method: 'POST',
        params: params,
    })
}   

//编辑
export function updateConfig(params) {
    return request({
        url: 'productConfig/update',
        method: 'PUT',
        params: params,
    })
}  

//根据id获取产品详情
export function getById(params) {
    console.log(params)
    return request({
        url: 'productConfig/getById',
        method: 'GET',
        params: params,
    })
}   