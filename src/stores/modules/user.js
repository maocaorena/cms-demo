import { routes } from '@/router';
const user = {
    state: {
        routes: routes[0].children[1].children,//将路由表放入进去，进行渲染顶部栏
        tabList: [],
    },
    mutations: {
        SET_TAB: (state,data) => {
            let cc = -1;
            for (let i = 0; i < state.tabList.length; i++) {
                if(data.path == state.tabList[i].path){
                    cc = i;
                    break;
                }
            };
            if(cc < 0){
                state.tabList.push(data);
            }
        },
        DEL_TAB: (state,data) => {
            let bb;
            for (let i = 0; i < state.tabList.length; i++) {
                if(data.path == state.tabList[i].path){
                    bb = i;
                    break;
                }
            }
            state.tabList.splice(bb,1);
        },
    },
    actions: {
        AddTab({ commit }, data) {
            commit('SET_TAB', data);
        },
        DelTab({ commit }, data) {
            commit('DEL_TAB', data);
        },
    }
};

export default user;
