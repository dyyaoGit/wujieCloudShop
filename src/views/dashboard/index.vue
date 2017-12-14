<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎来到无界云店后台系统</div>
    <!--<div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
  </div>
</template>

<script>
//import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
