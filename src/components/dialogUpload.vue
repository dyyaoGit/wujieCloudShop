<template>
    <label id="container1" class="img-label" :style="`background: url(${bg}) no-repeat;`">
        <input type="file" class="upload-input" id="btnupload1" name="img" />
    </label>
</template>

<script>
    // import { getToken } from 'api/qiniu'
    import qiniu from '@/api/qiniu.js'
    export default {
        name: 'myUpload',
        props: {
            iconClass: {
                type: String,
                default: ''
            },
            max: {
                type: Number,
                default: 5
            },
            bg: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                dialogVisible: false,
                imgList: [],   //存放图片的数组
                qiniuInit: false
            }
        },
        methods: {
            handleSubmit() {
                this.$emit('uploadSuccess', this.imgList)
                this.imgList = []   //修改
                this.dialogVisible = false
            },
            getToken(){
                this.dialogVisible = true; //遮罩显示
                this.$nextTick(() => {
                    if(!this.qiniuInit){
                        this.$axios.post('qiniu', {}, (res) => {
                            if (res.ret) {
                                this.qiniuInit = true;
                                qiniu({
                                    token: res.data.uptoken,
                                    container: 'container1',
                                    button: 'btnupload1'
                                }, (info, file) => {
                                    this.imgList.push(info.data.url);
                                    this.handleSubmit();
                                })
                            }
                        })
                    }
                })
            },
            removeImg(index) {
                this.imgList.splice(index, 1);
            },
            cancelUp() {
                this.imgList = []
                this.dialogVisible = false;
            }
        },
        mounted() {
            this.getToken();
        },
        watch: {
            imgList(val) {  //限制图片存放
                if(val.length>this.max){
                    this.$message.warning(`图片最多添加${this.max}张`)
                    val.pop();
                }
            }
        }
    }
</script>

<style>
    .input-container {
        z-index: 100000;
        position: relative;
        display: block;
        height: 150px;
        width: 100%;
        text-align: center;
        border: 1px dashed #999;
        margin-bottom: 20px;
        border-radius: 8px;
        cursor: pointer;
    }
    .input-container::after {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        content: '点击上传图片';
        background: #39f;
        color: #fff;
        font-size: 12px!important;
        text-align: center;
        line-height: 36px;
        padding: 0 15px;
        border-radius: 5px;
    }
    .childButton {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 0;

    }
    .upload-input {
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

    .img-label {
        display: inline-block;
        position: relative;
        cursor: pointer;
        width: 200px;
        height: 200px;
        border-radius: 8px;
        border: 1px dashed #999;
        margin: 0 10px 10px 0;
        -webkit-background-size: 100% 100%!important;
        background-size: 100% 100%!important;
        overflow: hidden;
        box-sizing: border-box;
    }

</style>
