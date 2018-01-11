<template>
    <div>
        <el-form :model="formData" ref="form" :rules="rules">
            <el-form-item label="作者名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="save">
                    保存
                </el-button>
                <el-button type="primary" @click="$router.back()">
                    返回
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "add-author",
        data() {
            return {
                formData: {
                    name: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请至少输入作者名字', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            save() {
                this.$refs.form.validate(valid => {
                    if(valid){  //验证数据成功
                        // 此处发送ajax保存
                        this.$message.success('保存成功,正在为您跳转到作者列表...')
                        setTimeout(() => {this.$router.push({path: 'authorManage'})}, 1500)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
