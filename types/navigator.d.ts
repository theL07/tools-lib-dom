/*
 * @Description: 
 * @Author: theL07
 * @Date: 2022-06-16 18:00:46
 * @LastEditTime: 2022-06-16 21:38:31
 * @LastEditors: theL07
 */
export as namespace NavigatorTypes

export interface WXTypes {
  miniProgram: {
    getEnv: (arg0: (res: { miniprogram?: unknown; }) => void) => void
  }
}