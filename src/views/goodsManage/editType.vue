<template>
    <div>
        <el-form>
            <el-form-item label="分类名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <bgDiv :imgStr="img"></bgDiv>
                <imgUpload @uploadSuccess="upload"></imgUpload>
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
    import imgUpload from '@/components/imgUpload.vue'
    import bgDiv from '@/components/bgDiv.vue'
    export default {
        name: '',
        components: {imgUpload, bgDiv},
        data() {
            return {
                formData: {
                    name: '',
                    id: '',
                    img: ''
                },
                img: ''
            }
        },
        methods: {
            getItem() {
                this.$axios.get('getCategory', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                })
            },
            save() {
                if(this.formData.name.trim() && this.formData.id && this.formData.img){
                    this.$axios.post('updateType', {name: this.formData.name, id: this.formData.id}, res => {
                        if(res.ret == true){
                            this.$message.success('修改分类成功，正在为您跳转...')
                            setTimeout(() => {this.$router.back()}, 1500)
                        }
                    })
                }
            },
            upload(val) {
                this.formData.img = val[0]
            }
        },
        mounted() {
            this.getItem();
        }
    }
</script>


<style scoped>


</style>
