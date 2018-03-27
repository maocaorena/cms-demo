import { request } from '@/utils/request/api.js'

//获取列表
export function getList(params) {
    return request({
        url: 'appOperateData/getSumList',
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