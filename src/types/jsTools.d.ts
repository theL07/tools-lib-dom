/*
 * @Description: 声明文件
 * @Author: theL07
 * @Date: 2022-06-13 20:47:13
 * @LastEditTime: 2022-06-16 21:39:58
 * @LastEditors: theL07
 */
export as namespace ToolTypes

export interface Coordinates {
  lat: number
  lng: number
}
export interface CoordDistance {
  startCoord: Coordinates
  endCoord: Coordinates
}

export interface FormatTimeType {
  date: Date;
  format?: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss' | 'HH:mm:ss'
  link?: '-' | '/'
}
