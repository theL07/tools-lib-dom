/*
 * @Description: 文件类
 * @Author: theL07
 * @Date: 2022-06-16 18:50:59
 * @LastEditTime: 2022-06-16 23:39:11
 * @LastEditors: theL07
 */
function checkFileName (fileName: string, list: string[]) {
  if (!fileName.trim().length) {
    throw new Error('fileName is empty')
  }
  const reg = new RegExp(list.join('|'), 'g')
  return reg.test(fileName)
}

function isImage (fileName: string) {
  return checkFileName(fileName, ['jpg', 'jpeg', 'png', 'gif', 'bmp'])
}

function isH5Video (fileName: string) {
  return checkFileName(fileName, ['mp4', 'mov', 'avi', 'wmv', '3gp', 'flv', 'mkv', 'ogg', 'webm'])
}

function isPdf (fileName: string) {
  return checkFileName(fileName, ['pdf'])
}

function isWord (fileName: string) {
  return checkFileName(fileName, ['doc', 'docx'])
}

function isExcel (fileName: string) {
  return checkFileName(fileName, ['xls', 'xlsx'])
}

export default {
  checkFileName,
  isImage,
  isH5Video,
  isPdf,
  isWord,
  isExcel
}