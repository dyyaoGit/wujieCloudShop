<template>
    <div>
        <el-form :model="formData" label-width="80px" label-position="right" size="small">
            <el-form-item label="文章名称">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="文章类型">
                <el-select v-model="formData.type" placeholder="请选择文章类型">
                    <el-option
                        v-for="item in contentType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="formData.sort" controls-position="right" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="文章头图">
                <bgDiv :imgStr="formData.logo"></bgDiv>
                <imgUpload @uploadSuccess="uploader" :max="1"></imgUpload>
            </el-form-item>
            <el-form-item label="文章内容">
                <TinyEdit v-model="formData.content"></TinyEdit>
            </el-form-item>
            <el-form-item label="">
                <el-button type="danger" class="bottom-btn" @click="saveEdit" v-if="$route.name == 'editType'">保存更改</el-button>
                <el-button type="danger" class="bottom-btn" @click="save" v-else>保存</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'
    import TinyEdit from '@/components/Tinymce'
    export default {
        components: {
            imgUpload,  //七牛上传组件
            bgDiv,    //图片显示组件
            TinyEdit  //富文本
        },
        name: '',
        data() {
            return {
                formData: {
                    name: '', //文章名称
                    title: '', //文章标题
                    logo: '', //文章头图
                    content: '', //文章内容
                    sort: 1, //排序
                    type: ''
                },
                contentType: [
                    {
                        label: '',
                        value: ''
                    }
                ]
            }
        },
        methods: {
            save() {
                this.$axios.post('addBrand', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('文章添加成功，正在为您跳转文章列表...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            saveEdit() {
                this.$axios.post('updateBrand', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('文章修改成功，正在为您跳转文章列表...')
                        setTimeout(() => {this.$router.back()}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('brandManage', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                    this.imgList.push(res.data[0].logo)  //此处必须用push，否则vue无法检测到数组的变动
                })
            },
            uploader(imgList) {
                this.formData.logo = imgList[0]
            }
        }
    }
</script>


<style scoped>


</style>
