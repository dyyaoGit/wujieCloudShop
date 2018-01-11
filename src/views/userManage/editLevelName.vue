<template>
    <div class="edit-level-name">
        <el-form  :model="formData" label-width="100px" >
            <el-form-item label="会员等级">
                {{`${$route.query.level}级会员`}}
            </el-form-item>
            <el-form-item label="等级名称编辑">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger"  @click="save">保存</el-button>
                <el-button type="primary" @click="$router.back()">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "edit-level-name",
        data() {
            return {
                formData:{
                    level: this.$route.query.level,
                    name: ''
                }
            }
        },
        methods: {
           save() {
               console.log(this.formData)
           }
        }
    }
</script>

<style scoped>

</style>
