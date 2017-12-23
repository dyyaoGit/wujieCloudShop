<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right">
            <el-form-item label="品牌名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="品牌宣传语">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="品牌图片">
                <bgDiv :imgStr="formData.logo"></bgDiv>
                <imgUpload @uploadSuccess="upload" :max="1"></imgUpload>
            </el-form-item>
            <el-form-item label="品牌描述">
                <el-input type="textarea" v-model="formData.content" :rows="4"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="danger" class="bottom-btn" @click="saveEdit" v-if="$route.name == 'editBrand'">保存更改</el-button>
        <el-button type="danger" class="bottom-btn" @click="save" v-else>保存</el-button>
    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'

    export default {
        components: {imgUpload, bgDiv},
        data() {
            return {
                formData: {
                    name: "",
                    title: "",
                    logo: "",
                    content: ""
                },
                imgList: []
            };
        },
        methods: {
            upload(imgList) {
                this.formData.logo = imgList[0]
            },
            save() {
                this.$axios.post('addBrand', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('品牌添加成功，正在为您跳转品牌列表...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            saveEdit() {
                this.$axios.post('updateBrand', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('品牌修改成功，正在为您跳转品牌列表...')
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
            if(this.$route.name === 'editBrand'){
                this.getEditData();
            }
        }
    }
</script>
