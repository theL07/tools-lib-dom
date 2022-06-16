/*
 * @Description: 合并模块
 * @Author: theL07
 * @Date: 2022-06-13 20:19:47
 * @LastEditTime: 2022-06-16 20:05:55
 * @LastEditors: theL07
 */
import $tools from './src/tools'
import $navigator from './src/navigator'
import $file from './src/file'
import $dom from './src/dom'


const indexTools = {
  ...$tools,
  ...$navigator,
  ...$file,
  ...$dom
}
export default indexTools

export {
  $tools,
  $navigator,
  $file,
  $dom
}
