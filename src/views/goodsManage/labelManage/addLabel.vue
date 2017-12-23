<template>
    <div>
        <el-form :model="formData" label-width="80px" label-position="right">
            <el-form-item label="标签名">
                <el-input v-model="formData.name" @keyup.enter.native.prevent="save"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" class="bottom-btn" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                formData: {
                    name: "",
                }
            }
        },
        methods: {
            save() {
                let address = this.$route.name === 'updateLabel' ? 'updateTag' : 'addTag'
                this.$axios.post(address , this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('操作成功，正在为您跳转标签列表...')
                        setTimeout(() => {this.$router.push('/goodsManage/labelManage')}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('getTag', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                })
            }
        },
        mounted() {
            if(this.$route.name === 'updateLabel'){
                this.getEditData();
            }
        }
    }
</script>
