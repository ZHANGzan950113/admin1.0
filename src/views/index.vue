<template>
  <div>首页
    <svg-icon :iconClass="'form'"></svg-icon>
  <router-view></router-view>
  </div>
</template>

<script>
import { getInfo } from '../api/user';
export default {
  name: 'Index',
  mounted() {
    getInfo(this.$store.getters.token)
  },
}
</script>

<style>

</style>