export default{
    url(u){
        let t = this;
        return t.baseURL.trim() + t[u.trim()];
    },
    baseURL: 'http://yly3.ylyedu.com',


    // qiniu
    qiniu: "/api/tools/getToken",
    upload: "/api/tools/upload",


// 商品相关
    getCategory: '/admin/category/index' ,     //获取商品分类表
    addGood: '/admin/goods/add',      //获取商品分类表
    getGoodList: '/admin/goods/index', //获取商品列表
    getTypeList: '/admin/category/tree', //获取所有的类型
    addType: '/admin/category/add', //增加类型
    deleteType: '/admin/category/delete', //删除类型
    updateType: '/admin/category/update', //更新类型

//用户注册
    getMsg: '/admin/admin/message', //获取短信验证码

}
