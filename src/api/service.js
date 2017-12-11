export default{
    url(u){
        let t = this;
        return t.baseURL.trim() + t[u.trim()];
    },



    // qiniu
    qiniu: "/api/tools/getToken",
    upload: "/api/tools/upload"


}
