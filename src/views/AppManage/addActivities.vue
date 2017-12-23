<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right">
            <el-form-item label="活动名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="活动时间">
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="活动LOGO">
                <bgDiv :imgStr="formData.logo"></bgDiv>
                <imgUpload @uploadSuccess="upload" :max="1"></imgUpload>
            </el-form-item>
        </el-form>
        <el-button type="danger" class="bottom-btn" @click="save">保存</el-button>
    </div>
</template>

<script>
    import moment from 'moment'
    import imgUpload from '@/components/imgUpload'
    import bgDiv from '@/components/bgDiv'

    export default {
        components: {imgUpload, bgDiv},
        data() {
            return {
                formData: {
                    name: "",
                    logo: '',
                    start_time: '',
                    end_time: ''
                },
                time: []
            };
        },
        methods: {
            upload(imgList) {
               this.formData.logo = imgList[0]
            },
            save() {
                let address = this.$route.name === 'updateActivities' ? 'updateActivities' : 'addActivities'
                this.formData.start_time = moment(this.time[0]).format('X')
                this.formData.end_time = moment(this.time[1]).format('X')
                if(this.isCanSubmit){
                    this.$axios.post(address , this.formData, res => {
                        if(res.ret == true){
                            this.$message.success('活动保存成功，正在为您跳转活动列表...')
                            setTimeout(() => {this.$router.push('activitiesList')}, 1500)
                        }
                    })
                }
                else{
                    this.$message.warning('存在未填写的资料')
                }
            },
            getEditData() {
                this.$axios.get('getActivitiesList', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                    this.time = [moment(res.data[0].start_time*1000), moment(res.data[0].end_time*1000)]
                })
            }
        },
        mounted() {
            if(this.$route.name === 'updateActivities'){
                this.getEditData();
            }
        },
        computed: {
            isCanSubmit() {
                let canSubmit = true;
                for(let key in this.formData){
                    console.log(key)
                    if(this.formData[key].trim() == ''){
                        canSubmit = false;
                    }
                }
                return canSubmit
            }
        }
    }
</script>
