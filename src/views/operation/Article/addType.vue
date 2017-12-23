<template>
    <div>
        <el-form :model="formData" label-width="60px" label-position="right">
            <el-form-item label="分类名">
                <el-input v-model="formData.name" @keyup.enter.native.prevent="save"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" class="bottom-btn" @click="save">{{$route.name == 'editType' ? '保存更改' : '保存'}}</el-button>
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
                if(this.$route.name !== 'editType'){
                    this.$axios.post('addArticleType', this.formData, res => {
                        if(res.ret == true){
                            this.$message.success('分类添加成功，正在为您跳转分类列表...')
                            setTimeout(() => {this.$router.push('articleType')}, 1500)
                        }
                    })
                }
                else{
                    this.saveEdit()
                }
            },
            saveEdit() {
                this.$axios.post('updateArticleType', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('分类修改成功，正在为您跳转分类列表...')
                        setTimeout(() => {this.$router.push('articleType')}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('articleType', {id: this.$route.query.id}, res => {
                    this.formData = res.data.find(val => val.id === this.$route.query.id);   //从现有接口获取所有数据，并根据ID存入编辑框中
                })
            }
        },
        mounted() {
            if(this.$route.name === 'editType'){
                this.getEditData();
            }
        }
    }
</script>


<style scoped>


</style>
