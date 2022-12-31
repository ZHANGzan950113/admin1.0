/**
 * 
 * @param {string} str 组件路径
 * @returns 返回一个组件
 */

export default function getComponent(str) {
  return require('@'+'/'`${str}.vue`).default
}