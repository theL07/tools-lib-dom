/*
 * @Description: 浏览器相关
 * @Author: theL07
 * @Date: 2022-06-16 17:55:57
 * @LastEditTime: 2022-06-16 21:43:18
 * @LastEditors: theL07
 */
import NavigatorTypes from '../types/navigator'
/**
 * 获取操作系统类型
 * @returns 系统名称
 */
 function getOS () {
  const ua = navigator.userAgent
  let os = ''
  if (ua.match(/Windows/)) {
    os = 'Windows'
  } else if (ua.match(/Mac/)) {
    os = 'Mac'
  } else if (ua.match(/Linux/)) {
    os = 'Linux'
  } else if (ua.match(/Android/)) {
    os = 'Android'
  } else if (ua.match(/iPhone/)) {
    os = 'iPhone'
  } else if (ua.match(/iPad/)) {
    os = 'iPad'
  } else {
    os = 'other'
  }
  return os
}

/**
 * 获取操作系统版本
 * @returns string
 */
function getOSVersion () {
  const ua = navigator.userAgent
  let osVersion = ''
  if (ua.match(/Windows NT/)) {
    osVersion = ua.match(/Windows NT/)![0]
  } else if (ua.match(/Mac OS/)) {
    osVersion = ua.match(/Mac OS/)![0]
  } else if (ua.match(/Linux/)) {
    osVersion = ua.match(/Linux/)![0]
  } else if (ua.match(/Android/)) {
    osVersion = ua.match(/Android/)![0]
  } else if (ua.match(/iPhone/)) {
    osVersion = ua.match(/iPhone/)![0]
  } else if (ua.match(/iPad/)) {
    osVersion = ua.match(/iPad/)![0]
  } else {
    osVersion = 'other'
  }
  return osVersion
}

/**
 * 获取当前网络类型
 * @returns string
 */
function getNetworkType () {
  const ua = navigator.userAgent
  let networkStr = ''
  if (ua.match(/NetType\/\w+/)) {
    networkStr = ua.match(/NetType\/\w+/)![0]
  } else {
    networkStr = 'NetType/other'
  }
  networkStr = networkStr.toLowerCase().replace('nettype/', '')
  let networkType
  switch (networkStr) {
    case 'wifi':
      networkType = 'wifi'
      break
    case '4g':
      networkType = '4g'
      break
    case '3g':
      networkType = '3g'
      break
    case '3gnet':
      networkType = '3g'
      break
    case '2g':
      networkType = '2g'
      break
    default:
      networkType = 'other'
  }
  return networkType
}

/**
 * 获取当前操作环境是否为微信浏览器或微信小程序
 * @params 微信jssdk对象
 * @returns Promise
 */
function isWXPrograme (wx: NavigatorTypes.WXTypes) {
  return new Promise(resolve => {
    const ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) && ~(ua.match(/MicroMessenger/i)!).indexOf('micromessenger')) {
      wx.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          return resolve('wxProgram')
        } else {
          return resolve('wxBrowser')
        }
      })
    } else {
      return resolve('web')
    }
  })
}

/**
 * 判断是否为移动端
 * @returns boolean
 */
function isMobile () {
  const reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  return !!navigator.userAgent.match(reg)
}

/**
 * 申请获取H5获取浏览器经纬度权限
 * @param successFn 函数  成功回调
 * @param errorFn 函数  失败回调
 */
function applyLocation (successFn: Function, errorFn?: Function) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      res => {
        successFn(res)
      },
      err => {
        if (errorFn) {
          errorFn(err)
        }
      }
    )
  }
}

export default {
  getOS,
  getOSVersion,
  getNetworkType,
  isWXPrograme,
  isMobile,
  applyLocation
}