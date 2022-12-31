<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <Sidebar class="asidebar" />
    <!-- 主窗口 -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <!-- 顶部面包屑 -->
      <div :class="{'fixed-header':fixedHeader}">
        <Navbar />
        <!-- 标签栏 -->
        <TagsView v-if="false" />
      </div>
      <!-- 业务板块 -->
      <div class="content_wrap">
        <router-view></router-view>
      </div>
    </div>
    
  </div>
</template>

<script>
import { Navbar, Sidebar, TagsView } from './components';
export default {
  name:"Layout",
  components: {
    Sidebar,
    Navbar,
    TagsView
  },
  data() {
    return {
      needTagsView: true,
      fixedHeader:true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.app-wrapper {
  display: flex;
  height: 100%;
  .asidebar {
    // min-width: $sideBarWidth;
    border-right: 1px solid #ccc;
  }
  .app-main {
    flex: 1;
    background-color: rgb(241, 163, 163);
  }
}
.main-container {
  width: 100%;
}

.content_wrap {
  box-sizing: border-box;
  padding: 20px;
}
</style>