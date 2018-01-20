<template>
    <div>
        <div>
            <h3>活动详情</h3>
            <el-form :model="formData" label-width="160px" class="form-width" >
                <el-form-item label="活动名">
                    <div class="data-item" v-text="formData.name"></div>
                </el-form-item>
                <el-form-item label="活动时间">
                    <div class="data-item">
                        {{`${time[0]} 至 ${time[1]}`}}
                    </div>
                </el-form-item>
                <el-form-item label="活动LOGO">
                    <bgDiv :imgStr="formData.logo" :isCanEdit="false"></bgDiv>
                </el-form-item>
            </el-form>
        </div>
        <el-form :model="actData" label-width="160px" label-position="right" :rules="rules" size="mini" class="form-width">
            <el-form-item label="商品名称">
                <el-select v-model="actData.goods_id" filterable placeholder="请选择商品，支持搜索" @change="goodChange" :disabled="!isCanEdit">
                    <el-option
                        v-for="item in GoodsList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="普通会员秒杀价(元)" prop="common">
                <el-input v-model.number="actData.common" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="一级会员秒杀价(元)" prop="first">
                <el-input v-model.number="actData.first" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="二级会员秒杀价(元)" prop="second">
                <el-input v-model.number="actData.second" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="三级会员秒杀价(元)" prop="third">
                <el-input v-model.number="actData.third" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="四级会员秒杀价(元)" prop="fourth">
                <el-input v-model.number="actData.fourth" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" class="bottom-btn" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import moment from 'moment'
    import bgDiv from '@/components/bgDiv'

    export default {
        components: {bgDiv},
        data() {
            return {
                formData: {
                    name: "",
                    logo: '',
                    start_time: '',
                    end_time: ''
                },
                time: [],
                actData: {
                    goods_id: '',
                    kill_id: this.$route.query.id,
                    common: '',   //普通会员价格
                    first: '',    //1级会员价格
                    second: '',     //2级会员价格
                    third: '',      //3级会员价格
                    fourth: '',      //4级会员价格
                    name: '',   //所选商品的名字
                    img: ''    //所选商品的图片数组
                },
                GoodsList: [],
                rules: {
                    common: [{required: true, type: 'number', message: '价格必须为数字'}],
                    first: [{required: true, type: 'number', message: '价格必须为数字'}],
                    second: [{required: true, type: 'number', message: '价格必须为数字'}],
                    third: [{required: true, type: 'number', message: '价格必须为数字'}],
                    fourth: [{required: true, type: 'number', message: '价格必须为数字'}],
                }
            }
        },
        methods: {
            upload(imgList) {
               this.formData.logo = imgList[0]
            },
            save() {
                this.$axios.post('applyAct', this.actData, res => {
                    if(res.ret == true){
                        this.$message.success('申请成功，请等待平台审核')
                        setTimeout(() => {this.$router.push({path: 'goodsList',query: {id: this.$route.query.id}})}, 1500)
                    }
                })
            },

            getActData() {
                this.$axios.get('getActivitiesList', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0]
                    this.time = [moment.unix(res.data[0].start_time).format("YYYY-MM-DD HH:mm:ss"), moment.unix(res.data[0].end_time).format("YYYY-MM-DD HH:mm:ss")]
                })
            },
            getGoodsList() {  //获取商品选择列表
                this.$axios.get('getGoodList', {}, res => {
                    this.GoodsList = res.data;
                })
            },
            goodChange(id) {    //商品改变后，动态改变提交表单中的商品名字和图片
                let getItem = this.GoodsList.find(item => {
                    if(item.id == id){return item}
                })
                this.actData.name = getItem.name;
                this.actData.img = getItem.img;
            },
            getDetails() {
                this.$axios.get('getApplyList', {goods_id: this.$route.query.goodsId}, res => {
                    this.actData
                })
            }
        },
        mounted() {
            this.getGoodsList()  //获取选择列表
            this.getActData()   //获取活动数据
            if(this.$route.name == 'showDetails'){
                this.getDetails();
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
            },
            isCanEdit() {
                return this.$route.name == 'showDetails'? true : false;
            }
        }
    }
</script>

<style scoped>
    .data-item {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        /*border-radius: 4px;*/
        /*border: 1px solid #dcdfe6;*/
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
</style>
