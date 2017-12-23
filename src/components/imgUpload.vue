<template>
    <div class="upload-container">
        <el-button :class='iconClass'  @click="getToken" type="danger" v-if="iconClass.trim()!== ''">上传图片</el-button>
        <div class="img-button" @click="getToken" v-if="iconClass.trim() === ''"></div>
        <el-dialog :visible.sync="dialogVisible" >
            <div class="clearfix">
                <dive :key="index" class="img-item" @click="removeImg(index)" v-for="(item, index) in imgList" :style="'background-image: url(' + item + ')'"></dive>
            </div>
            <label id="container" class="input-container">
                <input type="file" class="upload-input" id="btnupload" name="img" />
            </label>
            <el-button @click="cancelUp">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </el-dialog>
    </div>
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
                                qiniu({
                                    token: res.data.uptoken,
                                }, (info, file) => {
                                    this.imgList.push(info.data.url);
                                })
                            }
                            this.qiniuInit = true;
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
    }
    .img-button {
        position: relative;
        display: block;
        float: left;
        width: 200px;
        height: 200px;
        border-radius: 8px;
        border: 1px dashed #999;
        margin: 0 10px 10px 0;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .img-button::after {
        font-family:"iconfont" !important;
        font-size:40px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        content: '\e600';
        text-align: center;
        line-height: 200px;
        color: rgba(0,0,0,.2);
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        cursor: pointer;
    }
</style>
