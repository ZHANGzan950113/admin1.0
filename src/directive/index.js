
import store from '@/store'





const req = require.context('./directives', false, /\.js$/)

console.log('req=>',req)



export default {
  install: (Vue) => {
    Vue.directive('hasBtn',{
      inserted: (el,binding) => {

        let btns = store.getters.btnPermission
        console.log(btns, binding.value)
          if(!btns.includes(binding.value)) {
            el.remove()
          } 
      }
    })
  }
}