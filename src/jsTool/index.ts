/*
 * @Description: 方法库
 * @Author: theL07
 * @Date: 2022-06-11 14:12:09
 * @LastEditTime: 2022-06-21 16:08:06
 * @LastEditors: theL07
 */
import ToolTypes from '../types/jsTools'
/**
 * 根据坐标计算二者距离
 * @param startCoord 起点坐标 {lat: number, lng: number}
 * @param endCoord 中点坐标 { lat: number, lng: number }
 * @returns distance 距离 number
 */
function computedCoordDistance(startCoord: ToolTypes.Coordinates, endCoord: ToolTypes.Coordinates) {
  const { lat: lat1, lng: lng1 } = startCoord
  const { lat: lat2, lng: lng2 } = endCoord
  const PI = Math.PI
  const EARTH_RADIUS = 6378137.0
  function getRad(d: number) {
    return (d * PI) / 180.0
  }
  const f = getRad((lat1 + lat2) / 2)
  const g = getRad((lat1 - lat2) / 2)
  const l = getRad((lng1 - lng2) / 2)
  let sg = Math.sin(g)
  let sl = Math.sin(l)
  let sf = Math.sin(f)

  const a = EARTH_RADIUS
  const fl = 1 / 298.257

  sg = sg * sg
  sl = sl * sl
  sf = sf * sf

  const s = sg * (1 - sl) + (1 - sf) * sl
  const c = (1 - sg) * (1 - sl) + sf * sl

  const w = Math.atan(Math.sqrt(s / c))
  const r = Math.sqrt(s * c) / w
  const d = 2 * w * a
  const h1 = (3 * r - 1) / 2 / c
  const h2 = (3 * r + 1) / 2 / s
  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
}

/**
 * 延迟执行并返回一个Promise
 * @param time 延迟时间 ms number
 * @returns Promise
 */
function delay(time = 800): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve()
    }, time)
  })
}

/**
 * 数组对象根据某个属性值去重
 * @param arr 数组 [{}, {}, {}]
 * @param key 字段名
 * @returns arr 去重数组 [{}]
 */
function uniqueBy<T extends Record<string, unknown>>(arr: T[], key = 'name') {
  const res = new Map()
  const result = arr.filter((item) => item[key])
  return result.filter((item) => {
    !res.has(item[key]) && res.set(item[key], 1)
  })
}

/**
 *
 * @param arr 数组 [{}]
 * @param key 字段名
 * @param isFalling 是否降序 boolean
 * @returns arr 排序后数组
 */
function sortBy<T extends Record<string, unknown>>(arr: T[], key = 'name', isFalling = false) {
  return arr.sort((a, b) => {
    const numA = Number(a[key])
    const numB = Number(b[key])
    return isFalling ? numB - numA : numA - numB
  })
}

/**
 * 一维数组转为二维数组
 * @param arr 数组 []
 * @param row 合并数量 number
 * @returns 转为二维数组 [[], [], []]
 */
function convertArray<T>(arr: T[], row?: number) {
  if (!arr.length) {
    return []
  }
  const result: T[][] = []
  row = row || 2
  for (let i = 0;i < arr.length;i += row) {
    result.push(arr.slice(i, i + row))
  }
  return result
}

/**
 * 校验姓名(包含中文、英文、空格)
 * @param name 名称 string
 * @param min 最小有效字符长度
 * @param max 最大有效字符长度
 * @returns boolean
 */
function checkName(name: string, min = 1, max = 20) {
  name = name.trim()
  const reg = new RegExp(`^[\\u4E00-\\u9FA5_a-zA-Z\\s]{${min},${max}}$`)
  return reg.test(name)
}

/**
 * 校验手机号
 * @param phone 手机号 string
 * @returns boolean
 */
function checkPhone(phone: string) {
  phone = phone.trim()
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

/**
 * 隐藏手机号中间四位
 * @param phone 手机号 string
 * @returns string 1xx **** xxxx
 */
function hidePhone(phone: string) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 获取地址栏指定参数
 * @param name 名称 string
 * @returns string | null
 */
function getQueryString(name: string) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substring(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

// 获取URL hash后参数
function getHashQueryString(name: string) {
  const after = window.location.href.split('?')[1]
  if (after) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const r = after.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  }
  return null
}

/**
 * 格式化时间
 * @param data 数据对象
 * @returns string
 */
function formatTime(data: ToolTypes.FormatTimeType) {
  const { date, format = 'yyyy-MM-dd', link = '-' } = data
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (format === 'yyyy-MM-dd') {
    return [year, month, day].map(numZeroPadding).join(link)
  } else if (format === 'yyyy-MM-dd HH:mm:ss') {
    return [year, month, day].map(numZeroPadding).join(link) + ' ' + [hour, minute, second].map(numZeroPadding).join(':')
  } else if (format === 'HH:mm:ss') {
    return [hour, minute, second].map(numZeroPadding).join(':')
  }
}

/**
 * 对数字进行指定长度补0操作
 * @param n 数字
 * @param length 字符长度
 * @returns string '01' '008'
 */
function numZeroPadding(n: number, length = 2) {
  return (Array(length).join('0') + n).slice(-length)
}

/**
 * 获取数据的类型
 * @param data 数据对象
 * @returns 数据类型 string
 */
function getDataType<T>(data: T) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

/**
 * 深拷贝
 * @param data 数据对象
 * @returns 深拷贝后的数据对象
 */
function deepClone(data: any, map = new WeakMap()) {
  function getInit(data: any) {
    const Ctor = data.constructor
    return new Ctor()
  }
  function isObject(data: any) {
    const type = typeof data;
    return data !== null && (type === 'object' || type === 'function')
  }

  function forEach(array: [], callback: (item: any, index: number) => void) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
      callback(array[index], index)
    }
    return array
  }

  function cloneSymbol(data: Symbol) {
    return Object(Symbol.prototype.valueOf.call(data))
  }


  function cloneReg(data: any) {
    const reFlags = /\w*$/
    const result = new data.constructor(data.source, reFlags.exec(data))
    result.lastIndex = data.lastIndex
    return result
  }

  function cloneFunction(func: Function) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/
    const funcString = func.toString()
    if (func.prototype) {
      const param = paramReg.exec(funcString)
      const body = bodyReg.exec(funcString)
      if (body) {
        if (param) {
          const paramArr = param[0].split(',')
          return new Function(...paramArr, body[0])
        } else {
          return new Function(body[0])
        }
      } else {
        return null
      }
    } else {
      return eval(funcString)
    }
  }

  function cloneOtherType(data: any, type: string) {
    const Ctor = data.constructor;
    switch (type) {
      case 'boolean':
      case 'number':
      case 'string':
      case 'error':
      case 'date':
        return new Ctor(data)
      case 'regexp':
        return cloneReg(data)
      case 'symbol':
        return cloneSymbol(data)
      case 'function':
        return cloneFunction(data)
      default:
        return null;
    }
  }


  if (!isObject(data)) {
    return data
  }

  const type = getDataType(data)
  let cloneTarget: any

  const deepTag = [
    'map',
    'set',
    'array',
    'object',
    'arguments',
  ]
  if (~deepTag.indexOf(type)) {
    cloneTarget = getInit(data)
  } else {
    cloneTarget = cloneOtherType(data, type)
  }

  if (map.get(data)) {
    return map.get(data)
  }

  map.set(data, cloneTarget)

  if (type === 'set') {
    cloneTarget = new Set()
    data.forEach((item: any) => {
      cloneTarget.add(deepClone(item, map))
    })
    return cloneTarget
  }

  if (type === 'map') {
    data.forEach((item: any, key: any) => {
      cloneTarget.set(key, deepClone(item, map))
    })
    return cloneTarget
  }

  const keys = type === 'array' ? undefined : Object.keys(data)
  forEach(keys || data, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = deepClone(data[key], map)
  })
  return cloneTarget
}

/**
 * 对象序列化 {a:1,b:2} => a=1&b=2
 * @param query object 序列化对象
 * @param encode boolean 是否编码
 * @returns string 序列化处理
 */
function serialize(query: Record<string, unknown>, encode = true) {
  if (getDataType(query) !== 'object') {
    throw new Error('query must be a object')
  }
  return Object.keys(query)
    .map((key) => `${key}=${encode ? encodeURIComponent(query[key] + '') : query[key] + ''}`)
    .join('&')
}

/**
 * 防抖函数
 * @param fn 需要执行的函数
 * @param time 间隔时间
 * @returns
 */
function debounce(fn: () => void, time = 800) {
  let timeout: number | null = null
  return function () {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(fn, time)
  }
}

/**
 * 节流函数
 * @param fn 需要执行的函数
 * @param time 间隔时间
 * @returns
 */
function throttle(fn: () => void, time = 800) {
  let canRun: boolean = true
  let timeout: number | null = null
  return function () {
    if (!canRun) return
    canRun = false
    timeout = setTimeout(() => {
      fn()
      canRun = true
      timeout && clearTimeout(timeout)
    }, time)
  }
}

/**
 * 设置uuid
 * @returns string uuid
 */
function setUUID() {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now()
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export default {
  computedCoordDistance,
  uniqueBy,
  sortBy,
  delay,
  convertArray,
  checkName,
  checkPhone,
  hidePhone,
  getQueryString,
  getHashQueryString,
  formatTime,
  numZeroPadding,
  getDataType,
  deepClone,
  serialize,
  debounce,
  throttle,
  setUUID
}
