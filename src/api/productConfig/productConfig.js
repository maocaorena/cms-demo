import { request } from '@/utils/request/api.js'

//获取列表
export function getList(params) {
    return request({
        url: 'productConfig/getPageList',
        method: 'GET',
        params: params,
    })
}

//获取产品列表
export function getProductList(params) {
    return request({
        url: 'productConfig/getList',
        method: 'GET',
        params: params,
    })
}   

//停用启用
export function updateConfig(params) {
    return request({
        url: 'productConfig/update',
        method: 'PUT',
        params: params,
    })
}   