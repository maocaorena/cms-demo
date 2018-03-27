import Vue from 'vue';
import Router from 'vue-router';
import store from '@/stores';
import { Util } from '@/utils/util.js';
import { Storage } from '@/utils/storage.js';
import { User } from '@/utils/user.js';

import App from '../App.vue'
import login from '@/views/login/login';
import layout from '@/views/layout/layout';
import template from '@/views/layout/template';


import deverDataDay from '@/views/deverData/deverDataDay/DeverDataDay'; //开发者日报
import dataAll from '@/views/deverData/dataAll/DataAll'; //开发者数据统计

import orderList from '@/views/order/orderList/OrderList'; //订单列表

import productConfig from '@/views/config/productConfig/ProductConfig'; //产品配置

Vue.use(Router);

export const routes = [{
		path: '/',
		component: App,
		redirect: '/login',
		children: [{ //login
				path: '/login',
				component: login,
			},
			{
                name: 'layout',
                path: '/layout',
				component: layout,
                redirect: {
                    name: 'deverData'
                },
				children: [
                    { //开发者数据
                        name: 'deverData',
                        path: '/layout/deverData',
                        component: template,
                        redirect: {
                            name: 'deverDataDay'
                        },
                        meta: {
                            name: '开发者数据',
                        },
                        children: [
                            { //开发者日报
                                name: 'deverDataDay',
                                path: '/layout/deverData/deverDataDay',
                                component: deverDataDay,
                                meta: {
                                    name: '数据日报',
                                }
                            },
                            { //开发者数据统计
                                name: 'dataAll',
                                path: '/layout/deverData/dataAll',
                                component: dataAll,
                                meta: {
                                    name: '数据统计',
                                }
                            },
                        ]
                    },
					{
                        name: 'orderList',
                        path: '/layout/orderList',
                        component: orderList,
						meta: {
							name: '订单查询',
						}
                    },
                    {
                        name: 'config',
                        path: '/layout/config',
                        component: productConfig,
                        meta: {
                            name: '产品配置',
                        },
                    }
				]
			}
		]
	},
	{
		path: '*',
		redirect: '/login',
		hidden: true
	}
];
const router = new Router({
	//	mode: 'history',
	routes: routes
})
router.beforeEach((to, from, next) => {
	if(User.getToken()) {
		next();
	} else {
		if(to.path!= '/login'){
			next('/login');
		}else{
			next()
		};
	};
});
export default router
