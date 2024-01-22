/*
 * @Date: 2024-01-16 10:36:04
 * @LastEditTime: 2024-01-22 16:09:25
 * @Description: effect、track、trigger
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\effect.js
 */


/** 当前被执行的effect */
export let activeEffect
/** 栈结构存储当前选中的effect */
const effectStack = []

/** 使用WeakMap 收集effect */
const targetMap = new WeakMap()

/**
 * @description:
 * effect的核心实现，就是在运行effect的时候保存当前的this，以便于后续流程中的依赖收集。
 * 1、运行effect参数匿名函数 fn
 * 2、保存自身 effect到 全局变量activeEffect即可
 * @param {*} fn
 * @return {*}
 */
export const effect = (fn) => {
  const _effectFn = new ReactiveEffect(fn)
  // 初始化（第一次）执行effect传入的fn
  // console.log('effect完成第一次初始化')
  _effectFn.run()
  return _effectFn
}

/** 依赖收集
 * ReactiveEffect.run 运行后就会将当前正在运行的匿名函数保存到内存中
 * 以便 proxy get事件触发的时候，收集保存在内存中的匿名函数，进而完成依赖收集
*/
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn
  }
  run () {
    // console.log('run... this——>', this)
    try {
      // 使用栈存储一下，压入栈
      effectStack.push(this)
      // 直接给全局的 activeEffect 赋值，后续利用全局属性来获取当前的 effect
      activeEffect = this // 虽然上面使用了栈存储，但这里还要必须赋值一次，因为要return
      // 执行用户传入的fn，并返回
      return this.fn()
    } finally {
      // 出栈
      effectStack.pop()
      // 获取当前effect
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
}



/**
 * @description: 依赖收集（存储）
 * track中完成 reactive-key-effect之间关系的构建，
 * 确保以后可以在set阶段找到指定的effet的fn即可。
 * @param {*} target
 * @param {*} key
 * @return {*}
 */
export const track = (target, key) => {
  console.log('track 依赖收集')
  // 如果当前 activeEffect 存储的effect不存在，直接退出，不需要依赖收集
  if (!activeEffect) {
    return
  }
  // targetMap 是用于存储 effect的全局变量，实际是 new WeakMap（用于缓存）
  // 1、获取全局存储的 effect
  let depsMap = targetMap.get(target)
  // 1-2、首次 depsMap 肯定是不存在的，那就需要初始化定义一个新的
  if (!depsMap) {
    depsMap = new Map()
    // 存储到全局变量 targetMap
    targetMap.set(target, depsMap) // 这里的 target 为被代理对象：{name: '王五'} 该值做为key；新建的 Map 作为 value 设置
  }
  console.log('全局收集到的effect--->',targetMap)
  // --------------------------------------------
  // 2、使用key从 depsMap 中获取 deps
  let deps = depsMap.get(key)
  // 2-2、当前 key为 name首次也是不存在的，也需要定义一个新的
  if (!deps) {
    deps = new Set()
    // 不存在就需要设置 depsMap （第一步获取到的 depsMap 是一个Map结构，key是name；value是一个 Set结构（Set结构特点：元素不可重复数组））
    depsMap.set(key, deps) // 这里的key：响应式对象的指定属性（name）；value：新建的Set结构 deps
  }
  // debugger
  // 3、将全局变量 activeEffect （包含effect的匿名函数）存储到 deps 中，此时的deps为 Set
  deps.add(activeEffect)
  // 到这里我们将响应式数据与effect函数建立起了联系，标志着我们完成了依赖收集
  //  console.log('track 收集 deps---', deps)
}


/**
 * @description: 依赖触发
 * @param {*} target
 * @param {*} key
 * @return {*}
 */
export const trigger = (target, key) => {
  console.log('trigger 依赖触发')
  const depsMap = targetMap.get(target)
  // 如果拿不到Map,这说明当前对象没有effect要触发
  if (!depsMap) {
    return
  }
  const deps = depsMap.get(key) // 此时的 deps 为 set数据结构
  // 虽然当前对象中存在effect, 但是本次读取的对象内变量不存在,所以此处获取不到值
  if (!deps) {
    return
  }
  debugger
  // 触发所有依赖
  triggerEffects(deps)

}


/**
 * @description: 执行收集的所有effect的 run方法
 * 达到依赖触发，更新视图
 * @param {*} deps set数据结构
 * @return {*}
 */
export const triggerEffects = (deps) => {
  // console.log('收集到的所有effect：', deps)
  for (const effect of deps) {
    effect.run()
  }
}

