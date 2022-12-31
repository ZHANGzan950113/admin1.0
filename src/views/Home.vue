<template>
  <div class="home" :style="{'background-image': `url(${require('@/assets/logo.png')})`}">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  </div>
</template>

<script>
// @ is an alias to /src

import cssVar from '@/styles/variables.scss';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    cssVar.color = '000000'
    console.log(cssVar)
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.home {
  background-repeat: no-repeat;
  color: $color;
}
</style>
