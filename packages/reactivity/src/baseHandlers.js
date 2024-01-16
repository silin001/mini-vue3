/*
 * @Date: 2024-01-15 15:47:25
 * @LastEditTime: 2024-01-16 11:11:21
 * @Description:
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\baseHandlers.js
 */
import { track, trigger } from './effect'

const get = createGetter()
const set = createSetter()

export const mutableHandlers = {
 get,
 set
}

function createGetter () {
 return function get (target, key, receiver) {
  console.log('proxy get读取')
  // 正常访问，使用 Reflect 反射对象
  const result = Reflect.get(target,key,receiver)
  // TODO 核心：依赖收集
  track(target, key)
  return result
 }
}


function createSetter () {
 return function set (target, key, newValue, receiver) {
  console.log('proxy set设置')
  const result = Reflect.set(target, key, newValue, receiver)
  // TODO 触发set时候进行 依赖触发
  trigger(target, key)
  return result
 }
}


