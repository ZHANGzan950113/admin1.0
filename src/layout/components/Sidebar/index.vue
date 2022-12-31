<template>
  <div :class="{ has_logo: showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :collapse="isCollapse" class="sidebar">
        <SidebarItem
          v-for="route in router"
          :key="route.id"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
// import routers from './router.js';
// SidebarItem 菜单栏递归组件
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
// console.log(routers)
export default {
  components: {
    SidebarItem,
    Logo,
  },
  data() {
    return {
      router: [],
    };
  },
  mounted() {
    this.router = this.$store.getters.permission;
  },
  computed: {
    showLogo() {
      return true;
    },
    isCollapse() {
      return this.$store.getters.isCollapse;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.has_logo {
  .logo {
    height: 50px;
    width: 50px;
  }
  .el-scrollbar {
    height: calc(100% - 50px);
  }
  .el-menu {
    border-right: none;
  }
}

.sidebar:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar.el-menu--collapse {
  ::v-deep .el-submenu {
    .el-submenu__title {
      span {
        width: 0;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }
  }
}
</style>


