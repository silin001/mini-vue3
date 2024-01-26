/*
 * @Date: 2024-01-26 15:45:25
 * @LastEditTime: 2024-01-26 16:25:07
 * @Description: ref 实现
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\ref.js
 */
import { mutableHandlers } from './baseHandlers'


/**
 * @description: ref 响应式api 入口函数
 * @param {*} value 要代理的目标数据
 * @return {*}
 */
export const ref = (value) => {
  return createRef (value, true)
}


/**
 * @description: 创建处理代理对象
 * @param {*} rawValue 目标对象
 * @param {*} shallow  是否是浅的
 * @return {*}
 */
function createRef (rawValue, shallow) {
// 如果已经被ref代理过直接返回
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue,shallow)
}


/**
 * @description: ref基础类型代理处理
 *
   "dep": {},
   "__v_isShallow": false, // 是否是浅的
    "__v_isRef": true, // 是否是 ref 代理的
    "_rawValue": "Hello vue!", // ref传入的值
    "_value": "Hello vue!" // ref传入的值
 * @return {*}
 */

class RefImpl {
  constructor(rawValue, shallow) {
    this._rawValue = rawValue
    this._value = rawValue
    this.__v_isRef = shallow
  }
  get value () {
    return this._value
  }
  set value (newValue) {
    this._value = newValue
  }
}


/** 根据__v_isRef属性判断是否被ref代理过 */
function isRef (value) {
  console.log('🚀🚀 ~ isRef ~ value:', value)
  console.log(!!value.__v_isRef)
  return !!value.__v_isRef
}

