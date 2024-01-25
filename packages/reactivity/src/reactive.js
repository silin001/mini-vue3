/*
 * @Date: 2024-01-12 11:16:47
 * @LastEditTime: 2024-01-25 16:44:54
 * @Description: reactive 实现（代理一个具体对象）
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\reactive.js
 */
// import { isArray } from '@mini-vue3/shared'
import { mutableHandlers } from './baseHandlers'

/** 使用 weakMap 缓存 proxy */
const reactiveMap = new WeakMap()


/**
 * @description: reactive 响应式api 入口函数
 * @param {*} target 要代理的目标对象
 * @return {*}
 */
export const reactive = (target) => {
  return createReactiveObject(target, reactiveMap, mutableHandlers)
}


/**
 * @description: 创建处理代理对象
 * 核心是proxy，目的是可以监听到用户get、set操作
 * @param {*} target 目标对象
 * @param {*} proxyMap 全局变量缓存proxy的 weakMap
 * @param {*} baseHandlers
 * @return {*}
 */
function createReactiveObject (target, proxyMap, baseHandlers) {
  // 1、get: 如果已经代理过直接返回
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  // 2、如果没有被代理，直接创建一个 proxy进行代理
  const proxy = new Proxy(target, baseHandlers)
  // 3、把创建好的 proxy 给存储到全局 reactiveMap
  proxyMap.set(target, proxy)
  console.log('全局reactiveMap->', reactiveMap)
  return proxy

}

