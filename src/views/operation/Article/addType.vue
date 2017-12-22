<template>
    <div>
        <el-form :model="formData" label-width="60px" label-position="right">
            <el-form-item label="分类名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <!--<el-form-item label="分类描述">-->
                <!--<el-input type="textarea" v-model="formData.content" :rows="4"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
                <el-button type="danger" class="bottom-btn" @click="saveEdit" v-if="$route.name == 'editType'">保存更改</el-button>
                <el-button type="danger" class="bottom-btn" @click="save" v-else>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                formData: {
                    name: '',
//                    content: ''
                }
            }
        },
        methods: {
            save() {
                this.$axios.post('addArticleType', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('分类添加成功，正在为您跳转分类列表...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            saveEdit() {
                this.$axios.post('updateBrand', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('分类修改成功，正在为您跳转分类列表...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('brandManage', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                    this.imgList.push(res.data[0].logo)  //此处必须用push，否则vue无法检测到数组的变动
                })
            }
        },
        mounted() {
            if(this.$route.name === 'editType'){
//                this.getEditData();
            }
        }
    }
</script>


<style scoped>


</style>
