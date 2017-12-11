<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path"  background-color="#304156" text-color="#fff" active-text-color="#409EFF">
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
      console.log(this.routes)
      console.log(this.routes)
      console.log(this.routes)
      console.log(this.routes)
      console.log(this.routes)

    },
    mounted() {
      console.log(this.routes)
      console.log(this.routes)
      console.log(this.routes)
      console.log(this.routes)
      console.log(this.routes)
      console.log(this.routes)

    }
  }
}
</script>
