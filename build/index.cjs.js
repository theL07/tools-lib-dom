'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * 根据坐标计算二者距离
 * @param startCoord 起点坐标 {lat: number, lng: number}
 * @param endCoord 中点坐标 { lat: number, lng: number }
 * @returns distance 距离 number
 */
function computedCoordDistance(startCoord, endCoord) {
    var lat1 = startCoord.lat, lng1 = startCoord.lng;
    var lat2 = endCoord.lat, lng2 = endCoord.lng;
    var PI = Math.PI;
    var EARTH_RADIUS = 6378137.0;
    function getRad(d) {
        return (d * PI) / 180.0;
    }
    var f = getRad((lat1 + lat2) / 2);
    var g = getRad((lat1 - lat2) / 2);
    var l = getRad((lng1 - lng2) / 2);
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    var a = EARTH_RADIUS;
    var fl = 1 / 298.257;
    sg = sg * sg;
    sl = sl * sl;
    sf = sf * sf;
    var s = sg * (1 - sl) + (1 - sf) * sl;
    var c = (1 - sg) * (1 - sl) + sf * sl;
    var w = Math.atan(Math.sqrt(s / c));
    var r = Math.sqrt(s * c) / w;
    var d = 2 * w * a;
    var h1 = (3 * r - 1) / 2 / c;
    var h2 = (3 * r + 1) / 2 / s;
    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
}
/**
 * 延迟执行并返回一个Promise
 * @param time 延迟时间 ms number
 * @returns Promise
 */
function delay(time) {
    if (time === void 0) { time = 800; }
    return new Promise(function (resolve) {
        var timer = setTimeout(function () {
            clearTimeout(timer);
            resolve();
        }, time);
    });
}
/**
 * 数组对象根据某个属性值去重
 * @param arr 数组 [{}, {}, {}]
 * @param key 字段名
 * @returns arr 去重数组 [{}]
 */
function uniqueBy(arr, key) {
    if (key === void 0) { key = 'name'; }
    var res = new Map();
    var result = arr.filter(function (item) { return item[key]; });
    return result.filter(function (item) {
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
function sortBy(arr, key, isFalling) {
    if (key === void 0) { key = 'name'; }
    if (isFalling === void 0) { isFalling = false; }
    return arr.sort(function (a, b) {
        var numA = Number(a[key]);
        var numB = Number(b[key]);
        return isFalling ? numB - numA : numA - numB;
    });
}
/**
 * 一维数组转为二维数组
 * @param arr 数组 []
 * @param row 合并数量 number
 * @returns 转为二维数组 [[], [], []]
 */
function convertArray(arr, row) {
    if (!arr.length) {
        return [];
    }
    var result = [];
    row = row || 2;
    for (var i = 0; i < arr.length; i += row) {
        result.push(arr.slice(i, i + row));
    }
    return result;
}
/**
 * 防抖函数
 * @param fn 函数 Function
 * @param delay 延时时间 ms number
 */
function debounce(fn, delay) {
    if (delay === void 0) { delay = 500; }
    var timer;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
}
/**
 * 节流函数
 * @param fn 函数 Function
 * @param delay 节流时长 ms number
 */
function throttle(fn, delay) {
    if (delay === void 0) { delay = 500; }
    var lastTime = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        if (now - lastTime > delay) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}
/**
 * 校验姓名(包含中文、英文、空格)
 * @param name 名称 string
 * @param min 最小有效字符长度
 * @param max 最大有效字符长度
 * @returns boolean
 */
function checkName(name, min, max) {
    if (min === void 0) { min = 1; }
    if (max === void 0) { max = 20; }
    name = name.trim();
    var reg = new RegExp("^[\\u4E00-\\u9FA5_a-zA-Z\\s]{".concat(min, ",").concat(max, "}$"));
    return reg.test(name);
}
/**
 * 校验手机号
 * @param phone 手机号 string
 * @returns boolean
 */
function checkPhone(phone) {
    phone = phone.trim();
    var reg = /^1[3456789]\d{9}$/;
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
    var elem = document.createElement('div');
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
    var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"), 'i');
    var r = window.location.search.substring(1).match(reg);
    if (r != null)
        return decodeURIComponent(r[2]);
    return null;
}
// 获取URL hash后参数
function getHashQueryString(name) {
    var after = window.location.href.split('?')[1];
    if (after) {
        var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"), 'i');
        var r = after.match(reg);
        if (r != null)
            return decodeURIComponent(r[2]);
        return null;
    }
    return null;
}
/**
 * 格式化时间
 * @param data 数据对象
 * @returns string
 */
function formatTime(data) {
    var date = data.date, _a = data.format, format = _a === void 0 ? 'yyyy-MM-dd' : _a, _b = data.link, link = _b === void 0 ? '-' : _b;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
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
function numZeroPadding(n, length) {
    if (length === void 0) { length = 2; }
    return (Array(length).join('0') + n).slice(-length);
}
/**
 * 获取数据的类型
 * @param data 数据对象
 * @returns 数据类型 string
 */
function getDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}
/**
 * 深拷贝
 * @param data 数据对象
 * @returns 深拷贝后的数据对象
 */
function deepClone(data) {
    var type = getDataType(data);
    var newData;
    if (type === 'object') {
        newData = {};
        for (var i in data) {
            newData[i] = deepClone(data[i]);
        }
    }
    else if (type === 'array') {
        newData = [];
        for (var i = 0; i < data.length; i++) {
            newData.push(deepClone(data[i]));
        }
    }
    else {
        newData = data;
    }
    return newData;
}
/**
 * 对象序列化 {a:1,b:2} => a=1&b=2
 * @param query object 序列化对象
 * @param encode boolean 是否编码
 * @returns string 序列化处理
 */
function serialize(query, encode) {
    if (encode === void 0) { encode = true; }
    if (getDataType(query) !== 'object') {
        throw new Error('query must be a object');
    }
    return Object.keys(query)
        .map(function (key) { return "".concat(key, "=").concat(encode ? encodeURIComponent(query[key] + '') : (query[key] + '')); })
        .join('&');
}
var $tools = {
    computedCoordDistance: computedCoordDistance,
    uniqueBy: uniqueBy,
    sortBy: sortBy,
    delay: delay,
    convertArray: convertArray,
    debounce: debounce,
    throttle: throttle,
    checkName: checkName,
    checkPhone: checkPhone,
    isSupportCSS: isSupportCSS,
    getQueryString: getQueryString,
    getHashQueryString: getHashQueryString,
    formatTime: formatTime,
    numZeroPadding: numZeroPadding,
    getDataType: getDataType,
    deepClone: deepClone,
    serialize: serialize
};

/**
 * 获取操作系统类型
 * @returns 系统名称
 */
function getOS() {
    var ua = navigator.userAgent;
    var os = '';
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
    var ua = navigator.userAgent;
    var osVersion = '';
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
 * 获取当前网络类型
 * @returns string
 */
function getNetworkType() {
    var ua = navigator.userAgent;
    var networkStr = '';
    if (ua.match(/NetType\/\w+/)) {
        networkStr = ua.match(/NetType\/\w+/)[0];
    }
    else {
        networkStr = 'NetType/other';
    }
    networkStr = networkStr.toLowerCase().replace('nettype/', '');
    var networkType;
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
 * 获取当前操作环境是否为微信浏览器或微信小程序
 * @params 微信jssdk对象
 * @returns Promise
 */
function isWXPrograme(wx) {
    return new Promise(function (resolve) {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) && ~(ua.match(/MicroMessenger/i)).indexOf('micromessenger')) {
            wx.miniProgram.getEnv(function (res) {
                if (res.miniprogram) {
                    return resolve('wxProgram');
                }
                else {
                    return resolve('wxBrowser');
                }
            });
        }
        else {
            return resolve('web');
        }
    });
}
/**
 * 判断是否为移动端
 * @returns boolean
 */
function isMobile() {
    var reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    return !!navigator.userAgent.match(reg);
}
/**
 * 申请获取H5获取浏览器经纬度权限
 * @param successFn 函数  成功回调
 * @param errorFn 函数  失败回调
 */
function applyLocation(successFn, errorFn) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (res) {
            successFn(res);
        }, function (err) {
            if (errorFn) {
                errorFn(err);
            }
        });
    }
}
var $navigator = {
    getOS: getOS,
    getOSVersion: getOSVersion,
    getNetworkType: getNetworkType,
    isWXPrograme: isWXPrograme,
    isMobile: isMobile,
    applyLocation: applyLocation
};

/*
 * @Description: 文件类
 * @Author: theL07
 * @Date: 2022-06-16 18:50:59
 * @LastEditTime: 2022-06-16 19:58:33
 * @LastEditors: theL07
 */
function checkFileName(fileName, list) {
    if (!fileName.trim().length) {
        throw new Error('fileName is empty');
    }
    var reg = new RegExp(list.join('|'), 'g');
    return reg.test(fileName);
}
function isImage(fileName) {
    return checkFileName(fileName, ['jpg', 'jpeg', 'png', 'gif', 'bmp']);
}
function isH5Video(fileName) {
    return checkFileName(fileName, ['mp4', 'mov', 'avi', 'wmv', '3gp', 'flv', 'mkv', 'ogg', 'webm']);
}
function isPdf(fileName) {
    return checkFileName(fileName, ['pdf']);
}
function isWord(fileName) {
    return checkFileName(fileName, ['doc', 'docx']);
}
function isExcel(fileName) {
    return checkFileName(fileName, ['xls', 'xlsx']);
}
var $file = {
    checkFileName: checkFileName,
    isImage: isImage,
    isH5Video: isH5Video,
    isPdf: isPdf,
    isWord: isWord,
    isExcel: isExcel
};

/**
 * 判断元素是否存在指定类名
 * @param ele HTML元素
 * @param className 类名 string
 * @returns boolean 是否存在
 */
function hasClass(ele, className) {
    return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
/**
 * 给指定元素添加类名
 * @param ele HTML元素
 * @param className 类名 string
 */
function addClass(ele, className) {
    if (!hasClass(ele, className)) {
        var curClass = ele.className.split(' ');
        curClass.push(className);
        ele.className = curClass.join(' ');
    }
}
/**
 * 指定元素删除指定类名
 * @param ele HTML元素
 * @param className 类名 string
 */
function removeClass(ele, className) {
    if (hasClass(ele, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}
/**
 * 计算指定元素的滚动百分比
 * @param scrollEle 滚动元素
 * @param clientEle 可视区域元素
 * @returns 滚动元素滚动到底部的百分比
 */
function scrollTopPercent(scrollEle, clientEle) {
    var totalHeight = scrollEle.scrollHeight;
    var clientHeight = clientEle.clientHeight;
    var validHeight = totalHeight - clientHeight;
    var scrollTop = scrollEle.scrollTop;
    var percent = (scrollTop / validHeight * 100);
    return percent;
}
/**
 * 拨打电话
 * @param phone 手机(电话)号码
 */
function callPhone(phone) {
    if (!phone.trim().length) {
        throw new Error('phone is empty');
    }
    var aEle = document.createElement('a');
    aEle.setAttribute('href', "tel:".concat(phone));
    document.body.appendChild(aEle);
    aEle.click();
    document.body.removeChild(aEle);
}
/**
 * 复制文本到剪贴板
 * @param text 文本
 * @param callback 回调函数
 */
function copyText(text, callback) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
            callback && callback('success');
        }, function () {
            callback && callback('error');
        });
    }
    else if (document.execCommand('copy')) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        callback && callback('success');
    }
}
/**
 *
 * @param imgURL 图片地址
 * @param callback 图片生成回调函数
 * @param options 图片展示的 data URI的配置
 */
function imgToBase64(imgURL, callback, options) {
    var _a = options || {}, _b = _a.quality, quality = _b === void 0 ? 0.92 : _b, _c = _a.type, type = _c === void 0 ? 'png' : _c;
    var img = new Image();
    img.src = imgURL;
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var base64 = canvas.toDataURL("image/".concat(type), quality);
        if (callback) {
            callback(base64);
        }
        return base64;
    };
}
var $dom = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    scrollTopPercent: scrollTopPercent,
    callPhone: callPhone,
    copyText: copyText,
    imgToBase64: imgToBase64
};

var indexTools = __assign(__assign(__assign(__assign({}, $tools), $navigator), $file), $dom);

exports.$dom = $dom;
exports.$file = $file;
exports.$navigator = $navigator;
exports.$tools = $tools;
exports["default"] = indexTools;
//# sourceMappingURL=index.cjs.js.map
