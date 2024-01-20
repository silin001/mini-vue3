/*
 * @Date: 2024-01-16 10:36:04
 * @LastEditTime: 2024-01-20 12:27:07
 * @Description: effect、track、trigger
 * @FilePath: \yike-design-devd:\web_si\my_webDemo\my-open-source\mini-vue3\packages\reactivity\src\effect.js
 */


/** 当前被执行的effect */
export let activeEffect
/** 栈结构存储当前选中的effect */
const effectStack = []

/** 目标 */
const targetMap = new WeakMap()

/**
 * @description: 依赖收集（存储）
 * track中完成 reactive-key-effect之间关系的构建，
 * 确保以后可以在set阶段找到指定的effet的fn即可。
 * @param {*} target
 * @param {*} key
 * @return {*}
 */
export const track = (target, key) => {
  // console.log('track 依赖收集')
  // 如果当前依赖存储的effect不存在，直接退出
  if (!activeEffect) {
    return
  }
  // 1------如果activeEffect存在，进行获取目标
  let depsMap = targetMap.get(target)
  // 如果目标不存在， 定义一个新的，并存储到targetMap
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  // 2-----
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  // 存储
  deps.add(activeEffect)
  //  console.log('track 收集 deps---', deps)
}


/**
 * @description: 依赖触发
 * @param {*} target
 * @param {*} key
 * @return {*}
 */
export const trigger = (target, key) => {
  // console.log('trigger 依赖触发')
  const depsMap = targetMap.get(target)
  // 如果拿不到Map,这说明当前对象没有effect要触发
  if (!depsMap) {
    return
  }
  const deps = depsMap.get(key)
  // 虽然当前对象中存在effect, 但是本次读取的 对象内变量 不存在,所以此处获取不到值
  if (!deps) {
    return
  }
  // 触发所有依赖
  triggerEffects(deps)

}

/**
 * @description:
 * effect的核心实现，就是在运行effect的时候保存当前的this，以便于后续流程中的依赖收集。
 * 1、运行effect本身
 * 2、保存effect的fn到activeEffect即可
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

/** 依赖收集 */
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn
  }
  run () {
    // console.log('run... this——>', this)
    try {
      // 使用栈存储一下，压入栈
      effectStack.push(this)
       // 直接给全局的 activeEffect 赋值，利用全局属性来获取当前的 effect
      activeEffect = this // 虽然上面使用了栈存储，但这里还要必须赋值一次，因为要return
      // 执行用户传入的fn，并返回
      return this.fn()
    } finally {
      // 出栈
      effectStack.pop()
      // 获取当前effect
      activeEffect = effectStack[effectStack.length-1]
    }
  }
}

/**
 * @description: 执行收集的所有effect的 run方法
 * 达到依赖触发，更新视图
 * @param {*} deps
 * @return {*}
 */
export const triggerEffects = (deps) => {
  // console.log('收集到的所有effect：', deps)
  for (const effect of deps) {
    effect.run()
  }
}
