/*
 * @Date: 2024-01-26 15:45:25
 * @LastEditTime: 2024-01-31 14:11:12
 * @Description: ref 实现
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\ref.js
 */
import { hasChanged } from '@mini-vue3/shared'
import { track, trigger } from './effect'


/**
 * @description: ref 响应式api 入口函数
 * ref 是浅的
 * @param {*} value 要代理的目标数据
 * @return {*}
 */
export const ref = (value) => {
  return createRef (value, true)
}


/**
 * @description: 创建ref处理代理对象
 * @param {*} rawValue 目标值
 * @param {*} shallow  是否是浅的
 * @return {*}
 */
function createRef (rawValue, shallow) {
// 如果已经被ref代理过直接返回
  if (isRef(rawValue)) {
    return rawValue
  }
  // TODO 如果是复杂类型使用reactive进行代理
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
    this._rawValue = rawValue // 保存原始值
    this._value = rawValue
    this.__v_isRef = shallow
  }
  get value () {
    // 依赖收集
    track(this,'value') // 当前this是一个对象\ value作为key 也就是最终返回的 ref.value
    return this._value
  }
  set value (newValue) {
    // 当新的值不等于老的值的话,才更新值\需要触发依赖
    if (!hasChanged(newValue, this._rawValue)) {
      this._value = newValue
      this._rawValue = newValue
      // 触发依赖
      trigger(this,'value')
    }
  }
}


/** 根据 __v_isRef 属性判断是否被ref代理过 */
function isRef (value) {
  console.log(!!value.__v_isRef)
  return !!value.__v_isRef
}

