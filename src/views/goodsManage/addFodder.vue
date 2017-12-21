<template>
    <div>
        <div>
            <el-form :model="formData" label-width="80px" label-position="left" size="small">
                <!--<el-form-item label="素材名称">-->
                    <!--<el-input v-model="formData.name"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="素材描述">
                    <el-input type="textarea" :rows="3" v-model="formData.content"></el-input>
                </el-form-item>
            </el-form>

            <div class="img-container clearfix">
                <div :style="'backgroundImage: url(' + item + ')'" v-for="(item, index) in formData.img" class="div-img-item" @click="remove(index)"></div>
                <imgUpload @uploadSuccess="uploadeImg"></imgUpload>
            </div>

            <el-button @click="saveEdit" type="danger" v-if="$route.name === 'editFodder'">
                保存更改
            </el-button>
            <el-button @click="save" type="danger" v-else>
                保存素材
            </el-button>
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
//                    name: '花花公子官方素材',
                    content: '',
                    img: []
                }
            }
        },
        methods: {
            uploadeImg(val) {
                if(val.length>0){
                    val.forEach(va => {
                        this.formData.img.push(va)
                    })
                }
            },
            remove(index) {
                this.formData.img.splice(index, 1)
            },
            save() {
                this.$axios.post('addFodder', {goods_id: this.$route.query.goods_id, ...this.formData}, res => {
                    if(res.ret == true){
                        this.$message.success('素材添加成功,正在跳转...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            saveEdit() {
                this.$axios.post('updateFodder', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('素材修改成功,正在跳转...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('getFodder', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                })
            }
        },
        mounted() {
            if(this.$route.name === 'editFodder'){
                this.getEditData();
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
