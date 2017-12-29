<template>
    <div>
        <el-form :model="formData" class="form-width">
            <el-form-item label="标签名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="formData.sort" :min="1" ></el-input-number>
            </el-form-item>
            <el-form-item>
                <bgDiv :imgStr="formData.img"></bgDiv>
                <imgUpload @uploadSuccess="upload" :max="1"></imgUpload>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'
    export default {
        components: {imgUpload, bgDiv},
        name: '',
        data() {
            return {
                formData: {
                    name: '',
                    img: '',
                    sort: ''
                }
            }
        },
        methods: {
            upload(imgList) {
                this.formData.img = imgList[0];
            },
            handleChange(val) {

            },
            save() {
                let address = this.$route.name === 'editTabBar' ? 'updateTab' : 'addTab'
                this.$axios.post(address, this.formData, res => {
                    if(res.ret){
                        this.$message.success('操作成功，正在跳转列表页');
                        setTimeout(() => {this.$router.push('tabBarManage')}, 1500)
                    }
                })
            },
            getEditData() {
                if(this.$route.name === 'editTabBar'){
                    this.$axios.get('getTab', {id: this.$route.query.id}, res => {
                        if(res.ret){
                            this.formData = res.data[0];
                        }
                    })
                }
            }
        },
        created() {
            this.getEditData();
        }
    }
</script>


<style scoped>


</style>
