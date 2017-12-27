<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right" style="width: 800px;">
            <el-form-item label="轮播图名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item :label="`图片${index + 1}URL`" v-for="(item, index) in formData.value" :key="index">
                <el-input v-model="item.url"></el-input>
                <bgDiv :imgStr="item.img" style="margin-top: 20px;" @removeOne="removeOne"></bgDiv>
            </el-form-item>
            <el-form-item label="图片上传">
                <imgUpload @uploadSuccess="upload"></imgUpload>
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
                    tag_id: ''
                },
                imgList: []
            };
        },
        methods: {
            upload(imgList) {
                if(imgList.length>0){
                    imgList.forEach(val => {
                        let json = {
                            url: '',
                            img: val
                        }
                        this.formData.value.push(json)
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
            },
            removeOne(index) {
                this.formData.value.splice(index, 1)
            }
        },
        mounted() {
            if(this.$route.name === 'updateSlide'){
                this.getEditData();
            }
        }
    }
</script>
