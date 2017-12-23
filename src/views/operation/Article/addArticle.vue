<template>
    <div>
        <el-form :model="formData" label-width="80px" label-position="right" size="small">
            <el-form-item label="文章名称">
                <el-input v-model="formData.name" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input v-model="formData.title" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="文章类型">
                <el-select v-model="formData.cat_id" placeholder="请选择文章类型" :disabled="!isCanEdit">
                    <el-option
                        v-for="item in contentType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="formData.sort" controls-position="right" :min="1" :max="10" :disabled="!isCanEdit"></el-input-number>
            </el-form-item>
            <el-form-item label="文章头图">
                <bgDiv :imgStr="formData.logo" :isCanEdit="isCanEdit"></bgDiv>
                <imgUpload @uploadSuccess="uploader" :max="1" v-if="isCanEdit"></imgUpload>
            </el-form-item>
            <el-form-item label="文章内容">
                <TinyEdit v-model="formData.content" v-if="$route.name!== 'articleDetails'"></TinyEdit>
                <div v-html="formData.content" v-else class="content"></div>
            </el-form-item>
            <el-form-item label="">
                <el-button type="danger" class="bottom-btn" @click="saveEdit" v-if="$route.name == 'editArticle'">保存更改</el-button>
                <el-button type="danger" class="bottom-btn" @click="save" v-if="$route.name == 'addArticle'">保存</el-button>
                <el-button type="danger" class="bottom-btn" @click="$router.back()" v-if="$route.name == 'articleDetails'">返回</el-button>
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
                    cat_id: ''
                },
                contentType: [],  //选择框数组
                isCanEdit: true   //是否可以编辑
            }
        },
        methods: {
            save() {
                this.$axios.post('addArticle', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('文章添加成功，正在为您跳转文章列表...')
                        setTimeout(() => {this.$router.push('article')}, 1500)
                    }
                })
            },
            saveEdit() {
                this.$axios.post('updateArticle', this.formData, res => {
                    if(res.ret == true){
                        this.$message.success('文章修改成功，正在为您跳转文章列表...')
                        setTimeout(() => {this.$router.push('article')}, 1500)
                    }
                })
            },
            getEditData() {
                this.$axios.get('article', {id: this.$route.query.id}, res => {
                    console.log(2)

                    this.formData = res.data[0]
                })
            },
            uploader(imgList) {
                this.formData.logo = imgList[0]
            },
            getSelect() {
                console.log(1)
                return new Promise(resolve => {
                    this.$axios.get('articleType', {}, res => {
                        this.contentType = res.data;
                        resolve()
                    })
                })
            }
        },
        created() {
            this.getSelect().then(() => {
                if(this.$route.name !== 'addArticle'){
                    this.getEditData();
                }
                if(this.$route.name === 'articleDetails'){
                    this.isCanEdit = false
                }
            })

        }
    }
</script>


<style scoped>
    .content {
        border: 1px solid #999;
        border-radius: 5px;
        min-height: 200px
    }

</style>
