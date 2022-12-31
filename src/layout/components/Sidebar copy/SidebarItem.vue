<template>
  <div v-if="!item.hidden">

    <!-- 只有1个 或 0个子导航 且 不存在 children 或则 不显示子导航 -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </AppLink>
    </template>

    <!-- 存在子菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import { isExternal } from '@/utils/validate';
import path from 'path';
import Item from './Item';
import AppLink from './Link';
export default {
  name: "SidebarItem",
  components: {
    AppLink,
    Item
  },
  props: {
    // route object
    item : {
      type: Object,
      require:true
    },
    // 是否为子菜单
    isNest: {
      typeof:Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 是否只显示一个
    hasOneShowingChild(children = [], parent) {
      // 过滤需要显示的nav
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 如果没有子导航 显示主导航
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    // 导航路径
    resolvePath(routePath) {
      // 如果是外链
      if (isExternal(routePath)) {
        return routePath
      }
      // 如果是外链
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 拼接路径
      console.log(this.item.meta.title,path.resolve(this.basePath,routePath))
      return path.resolve(this.basePath,routePath)
    }
  }
}
</script>

<style>

</style>