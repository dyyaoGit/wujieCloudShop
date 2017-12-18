import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    {path: '/login', component: _import('login/index'), hidden: true},
    {path: '/404', component: _import('404'), hidden: true},

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        hidden: true,
        children: [
            {
                path: 'dashboard',
                component: _import('dashboard/index'),
                meta: {title: '首页'}
            }
        ]
    },

    {
        path: '/goodsManage',
        component: Layout,
        name: '商品管理',
        redirect: '/goodsManage/GoodsList',
        meta: {title: '商品管理'},
        children: [
            {
                path: 'GoodsList',
                component: _import('goodsManage/GoodsList'),
                meta: {title: '商品列表'}
            },
            {
                path: 'upload',
                component: _import('goodsManage/uploadGoods/upload'),
                meta: {title: '上传商品'}
            },
            {
                path: 'edit',
                name: 'edit',
                component: _import('goodsManage/uploadGoods/upload'),
                meta: {title: '商品编辑'},
                // hidden: true
            },

        ]
    },
    {
        path: '/orderManage',
        component: Layout,
        redirect: '/orderManage/index',
        meta: {title: '订单管理'},
        name: '订单管理',
        children: [
            {
                path: 'index',
                component: _import('orderManage/index'),
                meta: {title: '所有订单'}
            },
            {
                path: 'send',
                component: _import('orderManage/index'),
                meta: {title: '已发货订单'}
            },
            {
                path: 'success',
                component: _import('orderManage/index'),
                meta: {title: '已完成订单'}
            }


        ]
    },

    {
        path: '/storeManage',
        component: Layout,
        redirect: '/storeManage/index',
        meta: {title: '店铺管理'},
        name: '店铺管理',
        children: [
            {
                path: 'index',
                component: _import('storeManage/index'),
                meta: {title: '轮播图管理'}
            },
            {
                path: 'success',
                component: _import('storeManage/applyForActive'),
                meta: {title: '平台活动申请'}
            }
        ]
    },
    {
        path: '/couponManage',
        component: Layout,
        redirect: '/couponManage/index',
        meta: {title: '商家优惠券'},
        name: '商家优惠券',
        children: [
            {
                path: 'index',
                component: _import('couponManage/couponManage'),
                meta: {title: '优惠券管理'}
            },
            {
                path: 'new',
                component: _import('couponManage/editCoupon'),
                meta: {title: '新建优惠券'}
            },
            {
                path: 'edit',
                component: _import('couponManage/editCoupon'),
                meta: {title: '优惠券编辑'}
            }
        ]
    },
    {
        path: '/test',
        component: Layout,
        redirect: '/test/index',
        name: '测试页',
        children: [{
            path: 'index',
            component: _import('test/test'),
            meta: {title: '功能测试页'}
        }]
    },


    {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

