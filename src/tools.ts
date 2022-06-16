/*
 * @Description: 方法库
 * @Author: theL07
 * @Date: 2022-06-11 14:12:09
 * @LastEditTime: 2022-06-16 21:37:05
 * @LastEditors: theL07
 */
import ToolTypes from '../types/tools'
/**
 * 根据坐标计算二者距离
 * @param startCoord 起点坐标 {lat: number, lng: number}
 * @param endCoord 中点坐标 { lat: number, lng: number }
 * @returns distance 距离 number
 */
function computedCoordDistance (startCoord: ToolTypes.Coordinates, endCoord: ToolTypes.Coordinates) {
  const {lat: lat1, lng: lng1} = startCoord
  const {lat: lat2, lng: lng2} = endCoord
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
function delay (time = 800): Promise<void> {
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
function uniqueBy<T extends Record<string, unknown>> (arr: T[], key = 'name') {
  const res = new Map()
  const result = arr.filter(item => item[key])
  return result.filter(item => {
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
function sortBy<T extends Record<string, unknown>> (arr: T[], key = 'name', isFalling = false) {
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
function convertArray<T> (arr: T[], row?: number) {
  if (!arr.length) {
    return []
  }
  const result: T[][] = []
  row = row || 2
  for (let i = 0; i < arr.length; i += row) {
    result.push(arr.slice(i, i + row))
  }
  return result
}

/**
 * 防抖函数
 * @param fn 函数 Function
 * @param delay 延时时间 ms number
 */
function debounce (fn: Function, delay = 500) {
  let timer: ReturnType<typeof setTimeout>
  return  function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 函数 Function
 * @param delay 节流时长 ms number
 */
 function throttle (fn: Function, delay = 500) {
  let lastTime = 0
  return function (...args: unknown[]) {
    const now = Date.now()
    if (now - lastTime > delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * 校验姓名(包含中文、英文、空格)
 * @param name 名称 string
 * @param min 最小有效字符长度
 * @param max 最大有效字符长度
 * @returns boolean
 */
function checkName (name: string, min = 1, max = 20) {
  name = name.trim()
  const reg = new RegExp(`^[\\u4E00-\\u9FA5_a-zA-Z\\s]{${min},${max}}$`)
  return reg.test(name)
}

/**
 * 校验手机号
 * @param phone 手机号 string
 * @returns boolean
 */
function checkPhone (phone: string) {
  phone = phone.trim()
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phone)
}

/**
 * 判断是否支持某个CSS属性
 * @param attribute 属性名 string
 * @returns boolean
 */
function isSupportCSS (attribute: string) {
  if (window.CSS && window.CSS.supports) {
    return window.CSS.supports(attribute)
  }
  const elem = document.createElement('div')
  if (attribute in elem.style) {
    document.removeChild(elem)
    return true
  }
  document.removeChild(elem)
  return false
}

/**
 * 获取地址栏指定参数
 * @param name 名称 string
 * @returns string | null
 */
function getQueryString (name: string) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substring(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

// 获取URL hash后参数
function getHashQueryString (name: string) {
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
function formatTime (data: ToolTypes.FormatTimeType) {
  const {
    date,
    format = 'yyyy-MM-dd',
    link = '-'
  } = data
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
function numZeroPadding (n: number, length = 2) {
  return (Array(length).join('0') + n).slice(-length)
}

/**
 * 获取数据的类型
 * @param data 数据对象
 * @returns 数据类型 string
 */
function getDataType<T> (data: T) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

/**
 * 深拷贝
 * @param data 数据对象
 * @returns 深拷贝后的数据对象
 */
function deepClone (data: any) {
  const type = getDataType(data)
  let newData: any
  if (type === 'object') {
    newData = {}
    for (const i in data) {
      newData[i] = deepClone(data[i])
    }
  } else if (type === 'array') {
    newData = []
    for (let i = 0; i < data.length; i++) {
      newData.push(deepClone(data[i]))
  }
  } else {
    newData = data
  }
  return newData
}

/**
 * 对象序列化 {a:1,b:2} => a=1&b=2
 * @param query object 序列化对象
 * @param encode boolean 是否编码
 * @returns string 序列化处理
 */
function serialize (query: Record<string, unknown>, encode = true) {
  if (getDataType(query) !== 'object') {
    throw new Error('query must be a object')
  }
  return Object.keys(query)
  .map((key) => `${key}=${encode ? encodeURIComponent(query[key] + '') : (query[key] + '')}`)
  .join('&')
}


export default {
  computedCoordDistance,
  uniqueBy,
  sortBy,
  delay,
  convertArray,
  debounce,
  throttle,
  checkName,
  checkPhone,
  isSupportCSS,
  getQueryString,
  getHashQueryString,
  formatTime,
  numZeroPadding,
  getDataType,
  deepClone,
  serialize
}