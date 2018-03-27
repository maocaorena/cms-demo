import { request } from '@/utils/request/api.js'

//获取订单列表
export function getList(params) {
    return request({
        url: 'appOperateData/getList',
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

//同步数据
export function updateData(params) {
    return request({
        url: 'appOperateData/synchGuessAppOperateData',
        method: 'GET',
        params: params,
    })
}   