const Util = {
    trim: function (str) { //删除左右两端的空格
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    getSearch: function () {
        var args = {};
        var query = location.search.substring(1); //获取查询串
        var len = query.replace(/(^\s*)|(\s*$)/g, "").length;
        if (len < 1) {
            return args;
        };
        var pairs = query.split("&"); //在逗号处断开
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('='); //查找name=value
            if (pos > 0) {
                var argname = pairs[i].substring(0, pos); //提取name
                var value = pairs[i].substring(pos + 1); //提取value
                args[argname] = decodeURI(value); //存为属性
            } else {
                args[pairs[i]] = '';
            }
        };
        return args;
    },
    goSearch: function (url, obj, type) {
        let toGo = url;
        for (let i in obj) {
            if (toGo.indexOf('?') > 0) {
                toGo += ('&' + i + '=' + obj[i])
            } else {
                toGo += ('?' + i + '=' + obj[i])
            }
        };
        if (type == 1) {
            window.location.href = toGo;
        } else {
            window.open(toGo);
        }
    },
    time: function () {//控制提示框停留时间
        return 2000
    },
    time1: function () {//控制提示框停留时间
        return 2000
    },
    dateTime(num, type) {
        let str = num;
        if (num) {
            let _num = new Date(num);
            let dateStr = _num.getFullYear() + '-' + this.addZero(_num.getMonth() + 1) + '-' + this.addZero(_num.getDate());
            let timeStr = this.addZero(_num.getHours()) + ':' + this.addZero(_num.getMinutes()) + ':' + this.addZero(_num.getSeconds());
            if (type === 'date') {
                str = dateStr;
            } else if (type === 'time') {
                str = timeStr;
            } else {
                str = dateStr + ' ' + timeStr;
            }
        };
        return str;
    },
    addZero(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    },
    jm(str) {
        return JSON.parse(JSON.stringify(str))
    },
    testUrl: 'http://118.178.135.132:18901/',
    prodUrl: 'http://101.37.13.241:18901/',
    nowUrl(){
        console.log(process.env.NODE_ENV,process.env.BUILD_ENV)
        if (process.env.NODE_ENV == 'production') {
            if (process.env.BUILD_ENV == 't') {//测试环境打包
                return this.testUrl;
            } else {//线上环境打包
                return this.prodUrl;
            };
        }else{
            return 'bb/';
        };
    }
}

export {
    Util
}
