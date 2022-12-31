import store from '@/store';
import { Message } from 'element-ui';
import router from './index';

// 页面加载进度条
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
Nprogress.configure({ showSpinner: false }) // NProgress Configuration

// cookie
// 白名单
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 动态路由

// 组件路径
// import components from './module';

function getComponent(str){
  return require(`@/views/${str}.vue`).default
}

/**
 * 
 * @param {array} routes 由后端返回的路由tree
 */


function buildRoute(tree,btn = []) {
  tree.forEach(item => {

    // 筛选按钮权限
    
    
    let tmp = Object.assign({}, item)
    if(item.component) {
      tmp.component = getComponent(item.component)
    }else {
      delete tmp.component
    }
    delete tmp.parentId
    delete tmp.id
    if(tmp.children) delete tmp.children
    // 如果是按钮类型, push ,不是则添加路由
    if(item.meta.type === 3) {
      btn.push(item.name)
    }else {
      router.addRoute('Layout', tmp)
    }
    
    // 存在child 进行递归
    if(item.children) {
      buildRoute(item.children,btn)
    }
  })

  return btn
}





// 对进入页面前
router.beforeEach(async (to,form,next)=> {
  Nprogress.start()
  
  // 是否有title
  document.title = to.meta.title ? to.meta.title : 'zhang-admin'
  // 通过token判断是否登录
  const hasToken = localStorage.getItem('token')
  if(hasToken) {
    if(to.path === '/login') {
      next({path: '/'})
      Nprogress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 判断是否已经请求权限
      if(hasRoles) {
        next()
        // 动态路由
      } else {
        try {
          let role = await store.dispatch('user/getInfo')
          let permission = await store.dispatch('user/getPermission', role)
          let btn = buildRoute(permission)

          store.dispatch('user/getBtnPermission', btn)
          
          next()
        }catch(err) {
          await store.dispatch('user/resetToken')
          Message.error(err)
          next('/login')
          Nprogress.done()
        }
        
        
        // 动态路由拼接
        // routes.forEach(item => {
        //   const tmp = {...item}
        //   components.forEach(comItem => {
        //     if(comItem.name === tmp.name) tmp.component = comItem.component
        //   })
        //   router.addRoute('Layout',tmp)
        // });
        
        next({ ...to, replace: true })

        
        // try {
        //   // get user info
        //   // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
        //   const { roles } = await store.dispatch('user/getInfo')

        //   // generate accessible routes map based on roles
        //   const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

        //   // dynamically add accessible routes
        //   router.addRoutes(accessRoutes)

        //   // hack method to ensure that addRoutes is complete
        //   // set the replace: true, so the navigation will not leave a history record
        //   next({ ...to, replace: true })
        // } catch (error) {
        //   // remove token and go to login page to re-login
        //   // await store.dispatch('user/resetToken')
        //   // Message.error(error || 'Has Error')
        //   // next(`/login?redirect=${to.path}`)
        //   NProgress.done()
        // }
      }
    }
  } else {
    if(whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path:'/login'})
    }
    Nprogress.done()
  }
})

router.afterEach(()=> {
  Nprogress.done()
})