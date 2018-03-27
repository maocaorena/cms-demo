/**
 * Storage\
    urlMessage   免登录链接信息
    uf  用户信息
 */
const Storage = {
    //本地存储字段
    token: 'token', //用户token值,
    uf: 'uf', //用户token值,
    noHis: true,
    pattern: 6,
    setItem: function (name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        };
        window.sessionStorage.setItem(name, content);
    },
    getItem: function (name) {
        if (!name) return;
        return window.sessionStorage.getItem(name);
    },
    getItemJson: function (name) {
        if (!name) return;
        return JSON.parse(window.sessionStorage.getItem(name));
    },
    removeItem: function (name) {
        if (!name) return;
        window.sessionStorage.removeItem(name);
    },
    isNoHis: function () {
        let testKey = 'test',
            storage = window.sessionStorage;
        try {
            storage.setItem(testKey, 'testValue');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }
}
export { Storage };
