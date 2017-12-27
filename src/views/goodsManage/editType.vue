<template>
    <div>
        <el-form>
            <el-form-item label="分类名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="save">保存修改</el-button>
                <el-button type="primary" @click="$router.back()">
                    返回
                </el-button>
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
                    id: ''
                }
            }
        },
        methods: {
            getItem() {
                this.$axios.get('getTypeList', {}, res => {
                    this.formData = res.data.find(val => val.id == this.$route.query.id)
                    //获取所有分类，并将id为该分类的值复制给formData
                })
            },
            save() {
                if(this.formData.name.trim() && this.formData.id){
                    this.$axios.post('updateType', {name: this.formData.name, id: this.formData.id}, res => {
                        if(res.ret == true){
                            this.$message.success('修改分类成功，正在为您跳转...')
                            setTimeout(() => {this.$router.back()}, 1500)
                        }
                    })
                }
            }
        },
        mounted() {
            this.getItem();
        }
    }
</script>


<style scoped>


</style>
