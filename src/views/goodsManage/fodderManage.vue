<template>
    <div>
        <div>
            <el-form :model="formData" label-width="80px" label-position="left" size="small">
                <el-form-item label="素材名称">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="素材描述">
                    <el-input type="textarea" :rows="3" v-model="formData.name"></el-input>
                </el-form-item>
            </el-form>

            <div class="img-container">
                <div :style="'backgroundImage: url(' + item + ')'" v-for="(item, index) in formData.imgList" class="div-img-item" @click="remove(index)"></div>
                <imgUpload @uploadSuccess="uploadeImg"></imgUpload>
            </div>
        </div>
    </div>
</template>

<script>
    import imgUpload from './imgUpload.vue'

    export default {
        components: {imgUpload},
        name: 'fodderManage',
        data() {
            return {
                formData: {
                    name: '花花公子官方素材',
                    desc: '花花公子公司推出的官方素材描述',
                    imgList: []
                }
            }
        },
        methods: {
            uploadeImg(val) {
                if(val.length>0){
                    val.forEach(va => {
                        console.log(this.formData.imgList)
                        this.formData.imgList.push(va)
                    })
                }
            },
            remove(index) {
                this.formData.imgList.splice(index, 1)
            }
        }
    }
</script>


<style scoped>
    .img-container {
        margin-top: 20px;
        padding: 10px;

    }


</style>
