export const isArray = (arr) => Array.isArray(arr)

export const isObject = (val) => val !== null && typeof val === 'object'


/** 使用 Object.is 判断两个值是否相等 */
export function hasChanged (value, oldValue) {
 return Object.is(value, oldValue);
}