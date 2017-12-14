export default{
    url(u){
        let t = this;
        return t.baseURL.trim() + t[u.trim()];
    },
    baseURL: 'http://yly3.ylyedu.com/',


    // qiniu
    qiniu: "/api/tools/getToken",
    upload: "/api/tools/upload",
// /admin/category/index
    getCategory: '/admin/category/index'      //获取分类表


}
