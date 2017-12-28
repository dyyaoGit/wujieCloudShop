<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="left">
            <el-form-item label="标签名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="标签链接">
                <el-input v-model="formData.value.url"></el-input>
            </el-form-item>
            <el-form-item label="标签ICON">
                <bgDiv :imgStr="formData.value.img"></bgDiv>
                <imgUpload @uploadSuccess="upload"></imgUpload>
            </el-form-item>
            <el-form-item>
                <el-button @click="save" type="danger">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'
    export default {
        name: '',
        components: {imgUpload, bgDiv},
        data() {
            return {
                formData: {
                    name: '',
                    value: {
                        img: '',
                        url: ''
                    }
                }
            }
        },
        methods: {
            upload(imgList) {
                console.log(imgList[0])
                this.formData.value.img = imgList[0]
            },
            save() {
                let address = this.$route.name === "updateRec" ? "updateIcon" : "addIcon"
                this.$axios.post(address, this.formData, res => {
                    if(res.ret){
                        this.$message.success('保存成功,正在为您跳转标签列表...')
                        setTimeout(() => {this.$router.push({path: 'recLabel'})}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('getIcon', {id: this.$route.query.id}, res => {
                    if(res.ret){
                        this.formData = res.data[0];
//                        this.formData.value = res.data[0].logo;
                    }
                })
            }
        },
        mounted() {
            if(this.$route.name === "updateRec"){
                this.getEditData();
            }
        }
    }
</script>


<style scoped>


</style>
