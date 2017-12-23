<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right">
            <el-form-item label="轮播图名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="轮播图图片">
                <bgDiv :imgList="formData.value"></bgDiv>
                <imgUpload @uploadSuccess="upload" ></imgUpload>
            </el-form-item>
        </el-form>
        <el-button type="danger" class="bottom-btn" @click="save">保存</el-button>
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
                    value: [],
                    text: 'App轮播图'
                },
                imgList: []
            };
        },
        methods: {
            upload(imgList) {
                if(imgList.length>0){
                    imgList.forEach(val => {
                        this.formData.value.push(val)
                    })
                }
            },
            save() {
                if(this.$route.name === 'updateSlide'){
                    this.saveEdit();
                }
                else{
                    this.$axios.post('addSlide', this.formData, res => {
                        if(res.ret == true){
                            this.$message.success('轮播图添加成功，正在为您跳转轮播图列表...')
                            setTimeout(() => {this.$router.back()}, 1500)
                        }
                    })
                }
            },
            saveEdit() {
                this.$axios.post('updateSlide', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('轮播图修改成功，正在为您跳转轮播图列表...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('getSlideList', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                })
            }
        },
        mounted() {
            if(this.$route.name === 'updateSlide'){
                this.getEditData();
            }
        }
    }
</script>
