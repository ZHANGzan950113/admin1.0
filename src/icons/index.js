import SvgIcon from '@/components/SvgIcon'; // svg component
import Vue from 'vue';

// 注册全局组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}

requireAll(req)
