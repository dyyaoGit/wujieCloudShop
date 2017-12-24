<template>
    <label id="container1" class="input-wrap">
        点击上传图片
        <input type="file" class="upload-input" id="btnupload1" name="img" style="display: none;"/>
    </label>
</template>

<script>
    // import { getToken } from 'api/qiniu'
    import qiniu from '@/api/qiniu.js'
    export default {
        name: 'myUpload',
        data() {
            return {
                dialogVisible: false,
                imgList: [],   //存放图片的数组
                qiniuInit: false
            }
        },
        methods: {
            handleSubmit() {
                this.$emit('successCBK', this.imgList)
                this.imgList = []   //修改
            },
            getToken(){
                this.dialogVisible = true;
                this.$nextTick(() => {
                    if(!this.qiniuInit){
                        this.$axios.post('qiniu', {}, (res) => {
                            if (res.ret) {
                                qiniu({
                                    button: 'btnupload1',
                                    container: 'container1',
                                    token: res.data.uptoken,
                                }, (info, file) => {
                                    this.imgList.push(info.data.url);
                                    this.handleSubmit();
                                })
                            }
                        })
                        this.qiniuInit = true;
                    }
                })
            },
            removeImg(index) {
                this.imgList.splice(index, 1);
            }
        },
        mounted() {
            this.getToken();
        },
        watch: {

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
<style>
    .input-wrap {
        padding: 0 10px;        /* display: none; */
        line-height: 40px;
        height: 40px;
        color: #fff;
        font-size: 14px;
        background: #409EFF;
        border: 1px solid #aaa;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        border-radius: 5px
    }
    .upload-input {
        display: none;
    }
    /* .upload-input {
        display: none;
    }
    .img-item {
        position: relative;
        display: block;
        float: left;
        width: 100px;
        height: 100px;
        border-radius: 8px;
        border: 1px dashed #999;
        margin: 0 10px 10px 0;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .img-item:hover::after{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        content: '\e617';
        text-align: center;
        line-height: 100px;
        color: #fff;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        cursor: pointer;
    } */
</style>
