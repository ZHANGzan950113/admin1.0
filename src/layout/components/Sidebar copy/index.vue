<template>
  <div :class="{'has_logo': showLogo}">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
      >
        <SidebarItem v-for="route in router" :key='route.path' :item="route" :base-path='route.path' />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// import routers from './router.js';
// SidebarItem 菜单栏递归组件
import Logo from './Logo';
import SidebarItem from './SidebarItem';
// console.log(routers)
export default {
  components: {
    SidebarItem,
    Logo
  },
  data() {
    return {
      router: [],
      isCollapse: false
      
    }
  },
  mounted() {
    this.router = this.$store.getters.permission
  },
  computed: {
    showLogo(){
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}
.has_logo {
  .logo {
    height: 50px;
    width: 50px;
  }
  .el-scrollbar {
  height: calc(100% - 50px)
}
}

</style>


