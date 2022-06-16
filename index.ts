/*
 * @Description: 合并模块
 * @Author: theL07
 * @Date: 2022-06-13 20:19:47
 * @LastEditTime: 2022-06-16 23:41:00
 * @LastEditors: theL07
 */
import $jsTools from './src/jsTool'
import $navigator from './src/navigator'
import $file from './src/file'
import $dom from './src/dom'


const indexTools = {
  ...$jsTools,
  ...$navigator,
  ...$file,
  ...$dom
}
export default indexTools

export {
  $jsTools,
  $navigator,
  $file,
  $dom
}
