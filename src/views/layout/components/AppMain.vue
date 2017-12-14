<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
      key() {   //避免路由组件复用的时候，没有重新调用mounted钩子。
          return this.$route.name !== undefined ? this.$route.name + 't=' + new Date().getTime()/1000 : 't=' + new Date().getTime()/1000;
      }
  }
}
</script>
