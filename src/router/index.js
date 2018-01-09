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
 * meta : {
    title: 'title'               the title show in submenu and breadcrumb (recommend set)
  }
 **/
export const constantRouterMap = [
    {path: '/', redirect: '/login', hidden: true},
    {path: '/login', component: _import('login/index'), hidden: true},
    {path: '/signUp', component: _import('login/signUp'), hidden: true},
    {path: '/404', component: _import('404'), hidden: true},

    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        hidden: true,
        children: [
            {
                path: 'index',
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
                meta: {title: '上传商品'},
                hidden: true
            },
            {
                path: 'edit',
                name: 'edit',
                component: _import('goodsManage/uploadGoods/upload'),
                meta: {title: '商品编辑'},
                hidden: true
            },
            {
                path: 'fodderManage',
                component: _import('goodsManage/fodderList'),
                meta: {title: '素材管理'},
                hidden: true
            },
            {
                path: 'addFodder',
                component: _import('goodsManage/addFodder'),
                meta: {title: '素材添加'},
                hidden: true
            },
            {
                path: 'editFodder',
                component: _import('goodsManage/addFodder'),
                meta: {title: '素材编辑'},
                hidden: true,
                name: 'editFodder'
            },
            {
                path: 'fodderDetails',
                component: _import('goodsManage/fodderDetails'),
                meta: {title: '素材详情'},
                hidden: true,
                name: 'fodderDetails'
            },
            {
                path: 'typeManage',
                component: _import('goodsManage/typeManage'),
                meta: {title: '分类管理'}
            },
            {
                path: 'addType',
                component: _import('goodsManage/addType'),
                meta: {title: '增加分类'},
                hidden: true
            },
            {
                path: 'editType',
                component: _import('goodsManage/editType'),
                meta: {title: '分类编辑'},
                hidden: true
            },
            {
                path: 'labelManage',
                component: _import('goodsManage/labelManage/labelManage'),
                meta: {title: '标签管理'}
            },
            {
                path: 'addLabel',
                component: _import('goodsManage/labelManage/addLabel'),
                meta: {title: '添加标签'},
                hidden: true,
                name: 'addLabel'
            },
            {
                path: 'updateLabel',
                component: _import('goodsManage/labelManage/addLabel'),
                meta: {title: '编辑标签'},
                hidden: true,
                name: 'updateLabel'
            },
            {
                path: 'recLabel',
                component: _import('goodsManage/labelManage/recLabel'),
                meta: {title: '推荐标签管理'},
                name: 'recLabel'
            },
            {
                path: 'addRec',
                component: _import('goodsManage/labelManage/addRec'),
                meta: {title: '添加推荐标签'},
                name: 'addRec',
                hidden: true
            },
            {
                path: 'updateRec',
                component: _import('goodsManage/labelManage/addRec'),
                meta: {title: '编辑推荐标签'},
                name: 'updateRec',
                hidden: true
            }
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
        path: '/enterManage',
        component: Layout,
        redirect: '/enterManage/index',
        meta: {title: '入驻管理'},
        name: '入驻管理',
        children: [
            {
                path: 'index',
                component: _import('enterManage/index'),
                meta: {title: '审核入驻'}
            },
            {
                path: 'explore',
                component: _import('enterManage/enterMsg'),
                meta: {title: '详细信息'},
                name: 'merchantDetails',
                hidden: true
            },
            {
                path: 'GoodsListManage',
                component: _import('enterManage/GoodsListManage'),
                meta: {title: '商品列表'}
            },
            {
                path: 'details',
                component: _import('enterManage/details'),
                meta: {title: '商户商品详情'},
                hidden: true
            },
            {
                path: 'fodderList',
                component: _import('enterManage/fodderList'),
                meta: {title: '商户素材列表'},
                hidden: true
            },
            {
                path: 'fodderDetails',
                component: _import('enterManage/fodderDetails'),
                meta: {title: '商户素材详细'},
                hidden: true
            }
        ]
    },
    {
        path: '/userManage',
        component: Layout,
        redirect: '/userManage/userList',
        meta: {title: '用户管理'},
        children: [
            {
                path: 'userList',
                component: _import('userManage/userList'),
                name: 'userList',
                meta: {title: '用户列表'}
            }
        ]
    },
    {
        path: '/brandManage',
        component: Layout,
        redirect: '/brandManage/brandList',
        meta: {title: '品牌管理'},
        children: [
            {
                path: 'brandList',
                component: _import('brandManage/brandList'),
                meta: {title: '品牌列表'}
            },
            {
                path: 'addBrand',
                component: _import('brandManage/addBrand'),
                meta: {title: '添加品牌'},
                hidden: true
            },
            {
                path: 'editBrand',
                component: _import('brandManage/addBrand'),
                meta: {title: '编辑品牌'},
                hidden: true,
                name: 'editBrand'
            }
        ]
    },
    {
        path: '/operation',
        component: Layout,
        redirect: '/operation/article',
        meta: {title: '运营'},
        children: [
            {
                path: 'articleType',
                component: _import('operation/Article/ArticleType'),
                meta: {title: '文章分类管理'}
            },
            {
                path: 'addType',
                component: _import('operation/Article/addType'),
                meta: {title: '添加文章分类'},
                hidden: true
            },
            {
                path: 'editType',
                component: _import('operation/Article/addType'),
                meta: {title: '修改文章分类'},
                hidden: true,
                name: 'editType'
            },
            {
                path: 'article',
                component: _import('operation/Article/article'),
                meta: {title: '文章列表'}
            },
            {
                path: 'addArticle',
                component: _import('operation/Article/addArticle'),
                meta: {title: '添加文章'},
                hidden: true,
                name: 'addArticle'
            },
            {
                path: 'editArticle',
                component: _import('operation/Article/addArticle'),
                meta: {title: '编辑文章'},
                hidden: true,
                name: 'editArticle'
            },
            {
                path: 'articleDetails',
                component: _import('operation/Article/addArticle'),
                meta: {title: '查看文章详细'},
                hidden: true,
                name: 'articleDetails'
            },

        ]
    },
    {
        path: '/AppManage',
        component: Layout,
        redirect: '/AppManage/slideList',
        meta: {title: 'App管理'},
        children: [
            {
                path: 'slideList',
                component: _import('AppManage/slideList'),
                meta: {title: '轮播图管理'}
            },
            {
                path: 'addSlide',
                component: _import('AppManage/addSlide'),
                meta: {title: '轮播图添加'},
                hidden: true
            },
            {
                path: 'updateSlide',
                component: _import('AppManage/addSlide'),
                meta: {title: '轮播图修改'},
                name: 'updateSlide',
                hidden: true
            },
            {
                path: 'activitiesList',
                component: _import('AppManage/activitiesList'),
                meta: {title: '秒杀活动管理'}
            },
            {
                path: 'addActivities',
                component: _import('AppManage/addActivities'),
                meta: {title: '添加活动'},
                hidden: true,
                name: 'addActivities'
            },
            {
                path: 'updateActivities',
                component: _import('AppManage/addActivities'),
                meta: {title: '修改活动'},
                hidden: true,
                name: 'updateActivities'
            },
            {
                path: 'applyList',
                component: _import('AppManage/applyList'),
                meta: {title: '活动报名详情'},
                name: 'applyList',
                hidden: true
            },
            {
                path: 'goodsDetails',
                component: _import('AppManage/details'),
                meta: {title: '活动商品详情'},
                hidden: true
            },
            {
                path: 'tabBarManage',
                component: _import('AppManage/tabBarManage'),
                meta: {title: 'tabBar管理'},
                name: 'tabBarManage'
            },
            {
                path: 'addTabBar',
                component: _import('AppManage/addTabBar'),
                meta: {title: '添加tabBar'},
                name: 'addTabBar',
                hidden: true
            },
            {
                path: 'editTabBar',
                component: _import('AppManage/addTabBar'),
                meta: {title: '添加tabBar'},
                name: 'editTabBar',
                hidden: true
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
                component: _import('storeManage/applyForActive'),
                meta: {title: '平台活动申请'}
            },
            {
                path: 'goodsList',
                component: _import('storeManage/GoodsList'),
                meta: {title: '已申请商品列表'},
                hidden: true
            },
            {
                path: 'applyGoods',
                component: _import('storeManage/addGoods'),
                meta: {title: '添加商品到活动'},
                hidden: true
            },
            {
                path: 'showDetails',
                component: _import('storeManage/addGoods'),
                meta: {title: '查看报名详情'},
                hidden: true,
                name: 'showDetails'
            }
        ]
    },
    {
        path: '/couponManage',
        component: Layout,
        redirect: '/couponManage/index',
        meta: {title: '优惠券'},
        name: '优惠券',
        children: [
            {
                path: 'index',
                component: _import('couponManage/couponManage'),
                meta: {title: '优惠券管理'}
            },
            {
                path: 'new',
                component: _import('couponManage/editCoupon'),
                meta: {title: '新建优惠券'},
                hidden: true
            },
            {
                path: 'edit',
                component: _import('couponManage/editCoupon'),
                meta: {title: '优惠券编辑'},
                name: 'editCoupon',
                hidden: true
            }
        ]
    },
    {
        path: '/test',
        component: Layout,
        redirect: '/test/index',
        meta: {title: '功能测试页'},
        name: '测试页',
        children: [
            {
                path: 'index',
                component: _import('test/test'),
                meta: {title: '功能测试页'}
            },
            {
                path: 'addType',
                component: _import('test/addType'),
                meta: {title: '添加分类测试页'}
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]


export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

