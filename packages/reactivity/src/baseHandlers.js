/*
 * @Date: 2024-01-15 15:47:25
 * @LastEditTime: 2024-01-16 15:48:25
 * @Description:
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\baseHandlers.js
 */
import { reactive } from './reactive'
import { track, trigger } from './effect'
import { isObject } from '@mini-vue3/shared'
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
  // 嵌套结构对象父级对象属于读取操作，如子类没有代理，将不会监听到子类对象的变化,
  // 就无法触发effect，所有进行递归处理嵌套对象
  if (isObject(result)) {
   return reactive(result)
  }
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


