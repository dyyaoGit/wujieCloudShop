import Vue from 'vue';
import axios from 'axios';
import service from './service.js';
import qs from 'qs';


Vue.prototype.Loading = false; //用于处理全局的ajax Loading状态，在表格处需要调用的地方，使用v-loading处理表格loading

var ajax = {
    post: function(url, data, cb){
        Vue.prototype.Loading = true;
        axios.post(service.url(url), qs.stringify(data),{
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then((res) => {
            Vue.prototype.Loading = false;
            if (res.data.ret == true) {
                cb && cb(res.data);
            }else if(res.data.code == 501){
                Vue.prototype.$message.error('登录状态失效, 正在跳转...');
                setTimeout(function(){ location.href = "/" }, 2000);
            }else{
                Vue.prototype.$message.error(res.data.msg);
            }
        }).catch((error) => {
            console.log(error);
        });
    },
    get: function(url, data, cb){
        Vue.prototype.Loading = true;
        axios.get(service.url(url), { params: data}).then((res) => {
            Vue.prototype.Loading = false;
            // if (res.data.ret == true) {
            //     cb && cb(res.data);
            // }else if(res.data.code == 501){
            //     Vue.prototype.$message.error('登录状态失效, 正在跳转...');
            //     setTimeout(function(){ location.href = "/" }, 2000);
            // }else{
            //     Vue.prototype.$message.error(res.data.msg);
            // }
            cb && cb(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }
}



Vue.prototype.$axios = ajax;


