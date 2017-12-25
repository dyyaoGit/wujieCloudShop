<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="left">
            <el-form-item label="标签名">
                <el-input v-model="formData.name" @keyup.enter.native.prevent="save"></el-input>
            </el-form-item>
            <el-form-item label="标签LOGO" label-width="100px">
                <bgDiv :imgStr="formData.logo"></bgDiv>
                <imgUpload @uploadSuccess="Upload"></imgUpload>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" class="bottom-btn" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'
    export default {
        components: {imgUpload,bgDiv},
        data() {
            return {
                formData: {
                    name: "",
                    logo: ''
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
            },
            Upload(val) {
                console.log(val)
                this.formData.logo = val[0]
            }
        },
        mounted() {
            if(this.$route.name === 'updateLabel'){
                this.getEditData();
            }
        }
    }
</script>
