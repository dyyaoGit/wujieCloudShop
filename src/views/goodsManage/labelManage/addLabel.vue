<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="left">
            <el-form-item label="标签名">
                <el-input v-model="formData.name" @keyup.enter.native.prevent="save"></el-input>
            </el-form-item>
            <el-form-item :label="`图${index + 1}跳转URL`" v-for="(item, index) in formData.value" :key="index">
                <el-input v-model="item.url"></el-input>
                <bgDiv :imgStr="item.img" style="margin-top: 20px;" @removeOne="remove(index)"></bgDiv>
                <el-button style="margin-top: 172px;" type="primary" size="text" @click="editPhoto(index)">修改图片</el-button>
            </el-form-item>
            <el-form-item label="轮播图上传">
                <imgUpload @uploadSuccess="upload"></imgUpload>
            </el-form-item>
            <el-form-item label="标签排序">
                <el-input-number v-model="formData.sort"  :min="1" :max="10" label="排序"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" class="bottom-btn" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="修改图片"
            :visible.sync="dialogVisible"
            >
            <div class="clearfix" style="text-align: center;">
                <dialogUpload @uploadSuccess="editUpload" :bg="bg"></dialogUpload>
                <div>点击图片修改</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleChange">取 消</el-button>
                <el-button type="primary" @click="handleChange(true)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload'
    import dialogUpload from '@/components/dialogUpload'
    import bgDiv from '@/components/bgDiv'
    export default {
        components: {imgUpload, bgDiv, dialogUpload},
        data() {
            return {
                formData: {
                    name: "",
                    sort: '',
                    value: []
                },
                dialogVisible: false,
                bg: '',
                index: ''
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
            remove(index) {
                this.formData.value.splice(index, 1)
            },
            editPhoto(index) {
                this.dialogVisible = true;
                this.bg = this.formData.value[index].img;
                this.index = index;
            },
            editUpload(val) {
                this.bg = val[0];
            },
            handleChange(isSure=false) {
                if(isSure){
                    this.formData.value[this.index].img = this.bg;
                }
                this.dialogVisible = false;
                this.bg = ''
            }
        },
        mounted() {
            if(this.$route.name === 'updateLabel'){
                this.getEditData();
            }
        }
    }
</script>
