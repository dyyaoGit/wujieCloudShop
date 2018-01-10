<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right" size="small">
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
            <el-form-item label="是否精选文章">
                <el-switch
                    :disabled="!isCanEdit"
                    v-model="formData.choice"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="1"
                    inactive-value="0">
                </el-switch>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="formData.sort" controls-position="right" :min="1" :max="10" :disabled="!isCanEdit"></el-input-number>
            </el-form-item>

            <el-form-item label="上传头图视频">
                <el-switch
                    :disabled="!isCanEdit"
                    v-model="formData.is_video"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="is_videoChange"
                >
                </el-switch>
            </el-form-item>
            <el-form-item label="上传视频" v-if="formData.is_video">
                <imgUpload @uploadSuccess="uploaderVideo" :max="1" v-if="isCanEdit" btnId="upVideo" containerId="upVideoBox" :isButton="true"></imgUpload>
            </el-form-item>
            <el-form-item label="头图视频" v-if="formData.video">
                <videoPlayer :options="playerOptions" class="video-box" ref="videoPlayer" ></videoPlayer>
            </el-form-item>

            <el-form-item label="文章头图">
                <bgDiv :imgStr="formData.logo" :isCanEdit="isCanEdit" v-if="formData.logo"></bgDiv>
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
    import 'video.js/dist/video-js.css'
    import 'vue-video-player/src/custom-theme.css'
    import { videoPlayer } from 'vue-video-player'
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'
    import TinyEdit from '@/components/Tinymce'
    export default {
        components: {
            imgUpload,  //七牛上传组件
            bgDiv,    //图片显示组件
            TinyEdit,  //富文本
            videoPlayer
        },
        name: '',
        data() {
            return {
                formData: {
                    title: '', //文章标题
                    logo: '', //文章头图
                    content: '', //文章内容
                    sort: 1, //排序
                    cat_id: '',
                    choice: 0, //  是否精选
                    is_video: false,
                    video: '' //视频播放链接
                },
                contentType: [],  //选择框数组
                isCanEdit: true,   //是否可以编辑
                playerOptions: { //视频播放控件设置
                    muted: true,    //是否静音
                    language: 'zh',
                    playbackRates: [0.5, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: ""   //视频播放地址
                    }],
                    poster: "",     //视频背景图
                }
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
                    this.formData = res.data[0]
                    this.playerOptions.sources[0].src = res.data[0].video
                    this.playerOptions.poster = res.data[0].logo
                })
            },
            uploader(imgList) {
                this.formData.logo = imgList[0]
                if(this.formData.is_video){
                    this.playerOptions.poster = imgList[0]
                }
                else {
                    this.playerOptions.poster = ''
                }
            },
            getSelect() {
                return new Promise(resolve => {
                    this.$axios.get('articleType', {}, res => {
                        this.contentType = res.data;
                        resolve()
                    })
                })
            },
            is_videoChange(val) {
                this.$confirm('此操作将清空已经上传的图片或视频数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.formData.logo = ''
                    this.formData.video = ''
                    this.playerOptions.sources[0].src = ''

                }).catch(() => {
                    this.formData.is_video = !this.formData.is_video
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            uploaderVideo(val) {
                this.playerOptions.sources[0].src = val[0]
                this.formData.video = val[0]
                this.formData.logo = `${val[0]}?vframe/jpg/offset/0`
                this.playerOptions.poster = `${val[0]}?vframe/jpg/offset/0`
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
<style>
    .video-box,.video-box,.video-js{
        position: relative;
        display: block;
        width: 342px;
        height: 132px;
    }
    .vjs-tech {
        width: 100%;
        height: 100%;
    }
    .vjs-big-play-button {
        position: absolute;
        left: 50%!important;
        top: 50%!important;
        transform: translate(-50%, -50%);
    }
</style>
