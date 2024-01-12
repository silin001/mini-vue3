/*
 * @Date: 2024-01-12 11:16:47
 * @LastEditTime: 2024-01-12 16:56:50
 * @Description: reactive 实现（代理一个具体对象）
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\reactive.js
 */
import { isArray } from '@mini-vue3/shared'
console.log('🚀🚀 ~ file: reactive.js:8 ~ isArray:', isArray)

/** reactive 响应式api */
// export const reactive = (target) => {
//  // return createReactiveObject(target)
//  return 111
// }
export function reactive (target) {
 // return createReactiveObject(target)
 return 200
}
/** 创建reactive对象 */
function createReactiveObject (target) {
 return 100
}