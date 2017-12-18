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
    getCategory: '/admin/category/index'      //获取商品分类表


}
