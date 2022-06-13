/**
 * 根据坐标计算二者距离
 * @param startCoord 起点坐标 {lat: number, lng: number}
 * @param endCoord 中点坐标 { lat: number, lng: number }
 * @returns distance 距离 number
 */
function computedCoordDistance(startCoord, endCoord) {
    const { lat: lat1, lng: lng1 } = startCoord;
    const { lat: lat2, lng: lng2 } = endCoord;
    const PI = Math.PI;
    const EARTH_RADIUS = 6378137.0;
    function getRad(d) {
        return (d * PI) / 180.0;
    }
    const f = getRad((lat1 + lat2) / 2);
    const g = getRad((lat1 - lat2) / 2);
    const l = getRad((lng1 - lng2) / 2);
    let sg = Math.sin(g);
    let sl = Math.sin(l);
    let sf = Math.sin(f);
    const a = EARTH_RADIUS;
    const fl = 1 / 298.257;
    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    const s = sg * (1 - sl) + (1 - sf) * sl;
    const c = (1 - sg) * (1 - sl) + sf * sl;
    const w = Math.atan(Math.sqrt(s / c));
    const r = Math.sqrt(s * c) / w;
    const d = 2 * w * a;
    const h1 = (3 * r - 1) / 2 / c;
    const h2 = (3 * r + 1) / 2 / s;
    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}
/**
 * 判断是否为移动端
 * @returns boolean
 */
function isMobile() {
    const reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    return !!navigator.userAgent.match(reg);
}
/**
 * 延迟执行并返回一个Promise
 * @param time 延迟时间 ms number
 * @returns Promise
 */
function delay(time = 800) {
    return new Promise((resolve) => {
        const timer = setTimeout(() => {
            clearTimeout(timer);
            resolve();
        }, time);
    });
}
/**
 * 数组对象根据某个属性值去重
 * @param arr 数组 [{}, {}, {}]
 * @param key 字段名
 * @returns 去重数组 [{}]
 */
function uniqueBy(arr, key = 'name') {
    const res = new Map();
    const result = arr.filter(item => item[key]);
    return result.filter(item => {
        !res.has(item[key]) && res.set(item[key], 1);
    });
}
/**
 *
 * @param arr 数组 [{}]
 * @param key 字段名
 * @param isFalling 是否降序 boolean
 * @returns arr 排序后数组
 */
function sortBy(arr, key = 'name', isFalling = false) {
    return arr.sort((a, b) => {
        const numA = Number(a[key]);
        const numB = Number(b[key]);
        return isFalling ? numB - numA : numA - numB;
    });
}
/**
 * 一维数组转为二维数组
 * @param arr 数组 []
 * @param row 合并数量 number
 * @returns 转为二维数组 [[], [], []]
 */
function convertArray(arr, row = 3) {
    const result = [];
    for (let i = 0; i < arr.length; i += row) {
        result.push(arr.slice(i, i + row));
    }
    return result;
}
/**
 * 防抖函数
 * @param fn 函数 Function
 * @param delay 延时时间 ms number
 */
const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};
/**
 * 节流函数
 * @param fn 函数 Function
 * @param delay 节流时长 ms number
 */
const throttle = (fn, delay = 300) => {
    let lastTime = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastTime > delay) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
};
/**
 * 校验姓名(包含中文、英文、空格)
 * @param name 名称 string
 * @param min 最小有效字符长度
 * @param max 最大有效字符长度
 * @returns boolean
 */
function checkName(name, min = 1, max = 20) {
    name = name.trim();
    const reg = new RegExp(`^[\\u4E00-\\u9FA5_a-zA-Z\\s]{${min},${max}}$`);
    return reg.test(name);
}
/**
 * 校验手机号
 * @param phone 手机号 string
 * @returns boolean
 */
function checkPhone(phone) {
    phone = phone.trim();
    const reg = /^1[3456789]\d{9}$/;
    return reg.test(phone);
}
/**
 * 判断是否支持某个CSS属性
 * @param attribute 属性名 string
 * @returns boolean
 */
function isSupportCSS(attribute) {
    if (window.CSS && window.CSS.supports) {
        return window.CSS.supports(attribute);
    }
    const elem = document.createElement('div');
    if (attribute in elem.style) {
        document.removeChild(elem);
        return true;
    }
    document.removeChild(elem);
    return false;
}
/**
 * 获取地址栏指定参数
 * @param name 名称 string
 * @returns string | null
 */
function getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substring(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;
}
/**
 * 格式化时间
 * @param data 数据对象
 * @returns string
 */
function formatTime(data) {
    const { date, format = 'yyyy-MM-dd', link = '-' } = data;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    if (format === 'yyyy-MM-dd') {
        return [year, month, day].map(numZeroPadding).join(link);
    }
    else if (format === 'yyyy-MM-dd HH:mm:ss') {
        return [year, month, day].map(numZeroPadding).join(link) + ' ' + [hour, minute, second].map(numZeroPadding).join(':');
    }
    else if (format === 'HH:mm:ss') {
        return [hour, minute, second].map(numZeroPadding).join(':');
    }
}
/**
 * 对数字进行指定长度补0操作
 * @param n 数字
 * @param length 字符长度
 * @returns string '01' '008'
 */
function numZeroPadding(n, length = 2) {
    return (Array(length).join('0') + n).slice(-length);
}
/**
 * 获取当前网络类型
 * @returns string
 */
function getNetworkType() {
    const ua = navigator.userAgent;
    let networkStr = '';
    if (ua.match(/NetType\/\w+/)) {
        networkStr = ua.match(/NetType\/\w+/)[0];
    }
    else {
        networkStr = 'NetType/other';
    }
    networkStr = networkStr.toLowerCase().replace('nettype/', '');
    let networkType;
    switch (networkStr) {
        case 'wifi':
            networkType = 'wifi';
            break;
        case '4g':
            networkType = '4g';
            break;
        case '3g':
            networkType = '3g';
            break;
        case '3gnet':
            networkType = '3g';
            break;
        case '2g':
            networkType = '2g';
            break;
        default:
            networkType = 'other';
    }
    return networkType;
}
/**
 * 获取操作系统类型
 * @returns 系统名称
 */
function getOS() {
    const ua = navigator.userAgent;
    let os = '';
    if (ua.match(/Windows/)) {
        os = 'Windows';
    }
    else if (ua.match(/Mac/)) {
        os = 'Mac';
    }
    else if (ua.match(/Linux/)) {
        os = 'Linux';
    }
    else if (ua.match(/Android/)) {
        os = 'Android';
    }
    else if (ua.match(/iPhone/)) {
        os = 'iPhone';
    }
    else if (ua.match(/iPad/)) {
        os = 'iPad';
    }
    else {
        os = 'other';
    }
    return os;
}
/**
 * 获取操作系统版本
 * @returns string
 */
function getOSVersion() {
    const ua = navigator.userAgent;
    let osVersion = '';
    if (ua.match(/Windows NT/)) {
        osVersion = ua.match(/Windows NT/)[0];
    }
    else if (ua.match(/Mac OS/)) {
        osVersion = ua.match(/Mac OS/)[0];
    }
    else if (ua.match(/Linux/)) {
        osVersion = ua.match(/Linux/)[0];
    }
    else if (ua.match(/Android/)) {
        osVersion = ua.match(/Android/)[0];
    }
    else if (ua.match(/iPhone/)) {
        osVersion = ua.match(/iPhone/)[0];
    }
    else if (ua.match(/iPad/)) {
        osVersion = ua.match(/iPad/)[0];
    }
    else {
        osVersion = 'other';
    }
    return osVersion;
}
/**
 * 获取当前操作环境是否为微信浏览器或微信小程序
 * @params 微信jssdk对象
 * @returns Promise
 */
function getEnvPrograme(wx) {
    return new Promise(resolve => {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) && ~(ua.match(/MicroMessenger/i)).indexOf('micromessenger')) {
            wx.miniProgram.getEnv(res => {
                if (res.miniprogram) {
                    return resolve('wx');
                }
                else {
                    return resolve('wx_browser');
                }
            });
        }
        else {
            return resolve('web');
        }
    });
}
export default {
    computedCoordDistance,
    uniqueBy,
    sortBy,
    isMobile,
    delay,
    convertArray,
    debounce,
    throttle,
    checkName,
    checkPhone,
    isSupportCSS,
    getQueryString,
    formatTime,
    numZeroPadding,
    getNetworkType,
    getOS,
    getOSVersion,
    getEnvPrograme
};
