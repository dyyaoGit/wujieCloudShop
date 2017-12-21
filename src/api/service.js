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
    addGood: '/admin/goods/add',      //增加商品
    updateGood: '/admin/goods/update',      //更新商品
    getGoodList: '/admin/goods/index', //获取商品列表
    delGood: '/admin/goods/delete', //获取商品列表
    addFodder: '/admin/material/add', //素材添加
    getFodder: '/admin/material/index', //素材获取
    delFodder: '/admin/material/delete', //素材删除
    updateFodder: '/admin/material/update', //素材修改

    updateGoodList: '/admin/goods/update', //更新商品状态  {state: 2, id: ''}
    getTypeList: '/admin/category/tree', //获取所有的类型
    addType: '/admin/category/add', //增加类型
    deleteType: '/admin/category/delete', //删除类型
    updateType: '/admin/category/update', //更新类型

//用户注册
    getMsg: '/admin/admin/message', //获取短信验证码
    register: '/admin/admin/register', // 通过短信验证码注册

//用户登录
    login: '/admin/admin/login', //用户登录

    //审核入驻

    enterManageList: '/admin/admin/index/', //审核入驻商家查询    0.未审核，1，审核完成，2已入住
    enterJudge: '/admin/admin/state',   //审核入驻操作   1同意 2.拒绝


    // 审核商品操作
    goodsManage: '/admin/goods/update', //审核商品入驻操作
}
