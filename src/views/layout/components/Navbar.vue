<template>
    <el-menu class="navbar" mode="horizontal">
        <!--<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>-->
        <i class="iconfont icon-menu1" style="line-height: 67px;display: block; float: left;margin-left: 20px;font-weight: 100;color:#333;"></i>
        <breadcrumb></breadcrumb>
        <div class="nav-title">无界云店平台管理后台</div>
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
                <i class="iconfont icon-fuzeren user-avatar"></i>
                <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class="inlineBlock" to="/index">
                    <el-dropdown-item>
                        返回首页
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span @click="logout" style="display:block;">退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$router.push('/login')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        background-color: #fff;
        position: relative;
        color: #333;
        height: 67px;
        line-height: 67px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 67px;
            float: left;
            padding: 0 10px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
        }
        .avatar-container {
            height: 67px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    display: block;
                    line-height: 67px;
                    color: #333;
                    font-size: 34px;
                }
                .el-icon-caret-bottom {
                    color: #333;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }

    .nav-title {
        font-family: "Helvetica Neue",Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
        font-size: 23px;
        position: absolute;
        left: 45%;
        top: 67%;
        transform: translate(-67%, -67%);
        /*font-weight: bold;*/
    }
</style>

