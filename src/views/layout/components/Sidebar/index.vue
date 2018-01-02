<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path"  background-color="#ffffff" text-color="#4d4d4d" active-text-color="#fff">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    created() {


    },
    mounted() {

    }
  }
}
</script>
