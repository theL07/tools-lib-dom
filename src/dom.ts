/*
 * @Description: DOM操作相关
 * @Author: theL07
 * @Date: 2022-06-16 19:08:45
 * @LastEditTime: 2022-06-16 21:49:50
 * @LastEditors: theL07
 */
import DomTypes from '../types/dom'
/**
 * 判断元素是否存在指定类名
 * @param ele HTML元素
 * @param className 类名 string 
 * @returns boolean 是否存在
 */
function hasClass(ele: HTMLElement, className: string) {
  return ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

/**
 * 给指定元素添加类名
 * @param ele HTML元素
 * @param className 类名 string
 */
function addClass(ele: HTMLElement, className: string) {
  if (!hasClass(ele, className)) {
    let curClass = ele.className.split(' ')
    curClass.push(className)
    ele.className = curClass.join(' ')
  }
}

/**
 * 指定元素删除指定类名
 * @param ele HTML元素
 * @param className 类名 string
 */
function removeClass(ele: HTMLElement, className: string) {
  if (hasClass(ele, className)) {
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 计算指定元素的滚动百分比
 * @param scrollEle 滚动元素
 * @param clientEle 可视区域元素
 * @returns 滚动元素滚动到底部的百分比
 */
function scrollTopPercent(scrollEle: HTMLElement, clientEle: HTMLElement) {
  const { scrollHeight: totalHeight } = scrollEle
  const { clientHeight } = clientEle
  const validHeight = totalHeight - clientHeight
  const { scrollTop } = scrollEle
  const percent = (scrollTop / validHeight * 100)
  return percent
}

/**
 * 拨打电话
 * @param phone 手机(电话)号码
 */
function callPhone(phone: string) {
  if (!phone.trim().length) {
    throw new Error('phone is empty')
  }
  const aEle = document.createElement('a')
  aEle.setAttribute('href', `tel:${phone}`)
  document.body.appendChild(aEle)
  aEle.click()
  document.body.removeChild(aEle)
}

/**
 * 复制文本到剪贴板
 * @param text 文本
 * @param callback 回调函数
 */
function copyText(text: string, callback?: Function) {
  if (navigator.clipboard) {
  navigator.clipboard.writeText(text).then(() => {
    callback && callback('success')
  }, () => {
    callback && callback('error')
  })
  } else if (document.execCommand('copy')) {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    callback && callback('success')
  }
}

/**
 * base64转Buffer
 * @param dataURI base64
 * @returns ArrayBuffer
 */
function dataURItoBuffer(dataURI: string) {
  const byteString = atob(dataURI.split(',')[1])
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return ab
}

/**
 * base64转Blob
 * @param dataURI base64地址
 * @returns Blob
 */
function dataURLtoBlob(dataURI: string) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const buffer = dataURItoBuffer(dataURI);
  return new Blob([buffer], {
    type: mimeString
  })
}


/**
 * 
 * @param imgURL 图片地址
 * @param callback 图片生成回调函数
 * @param options 图片展示的 data URI的配置
 */
function imgToBase64(imgURL: string, callback?: Function, options?: DomTypes.ImgToBase64Options) {
  const {
    quality = 0.92,
    type = 'png'
  } = options || {}
  const img = new Image()
  img.src = imgURL
  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx!.drawImage(img, 0, 0)
    const base64 = canvas.toDataURL(`image/${type}`, quality)
    if (callback) {
      callback(base64)
    }
    return base64
  }
}

export default {
  hasClass,
  addClass,
  removeClass,
  scrollTopPercent,
  callPhone,
  copyText,
  dataURItoBuffer,
  dataURLtoBlob,
  imgToBase64
}