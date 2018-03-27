import { request } from '@/utils/request/api.js'

//获取订单列表
export function getList(params) {
    return request({
        url: 'guessOrder/getList',
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