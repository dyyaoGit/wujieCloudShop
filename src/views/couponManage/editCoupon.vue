<template>
    <div>
        <el-form :model="formData" sizi="small" label-position="right" :rules="rules" ref="form" size="mini"
                 label-width="130px" class="form-width">
            <el-form-item label="优惠券类型" prop="type">
                <el-select v-model="formData.type" :disabled="!isCanEdit">
                    <el-option :value="0" label="新付费用户"></el-option>
                    <el-option :value="1" label="全场"></el-option>
                    <el-option :value="2" label="会员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优惠券名称" prop="name">
                <el-input v-model="formData.name" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="优惠券标题" prop="title" required>
                <el-input v-model="formData.title" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="优惠券描述" prop="content" required>
                <el-input v-model="formData.content" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="优惠券面值" prop="worth" required>
                <el-input v-model.number="formData.worth" placeholder="请输入优惠券面值 单位：元" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="使用门槛" prop="full" required>
                购物满：
                <el-input v-model.number="formData.full" style="width: 100px" :disabled="!isCanEdit"></el-input>
                无门槛请设为0
            </el-form-item>
            <el-form-item label="发行数量" prop="num" required>
                <el-input-number v-model="formData.num" @change="handleChange" :min="1" label="发行数量"
                                 :disabled="!isCanEdit">
                </el-input-number>
            </el-form-item>
            <el-form-item label="可使用商品" prop="goods_type" required>
                <el-radio-group v-model="formData.goods_type" @change="changeType" :disabled="!isCanEdit">
                    <el-radio-button :label="0" >全部商品</el-radio-button>
                    <el-radio-button :label="1" >指定商品</el-radio-button>
                    <el-radio-button :label="2" >指定分类</el-radio-button>
                </el-radio-group>
                <!--<el-select v-model="formData.goods_type" @change="changeType" :disabled="!isCanEdit">-->
                    <!--<el-option label="全部商品" :value="0"></el-option>-->
                    <!--<el-option label="指定商品" :value="1"></el-option>-->
                    <!--<el-option label="分类" :value="2"></el-option>-->
                <!--</el-select>-->
            </el-form-item>
            <el-form-item :label="computedType" prop="goods_id" v-if="formData.goods_type != 0" required>
                <el-select v-model="formData.goods_id" multiple>
                    <el-option v-for="item in resTypeArr" :key="item.id" :value="item.id"
                               :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优惠券有效时间" prop="time">
                <el-date-picker
                    :disabled="!isCanEdit"
                    v-model="formData.time"
                    type="datetimerange"
                    range-separator="至"
                    @change="handleChange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="优惠券状态" >
                <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949"
                           :active-value="1" :inactive-value="0" :disabled="!isCanEdit"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" v-if="$route.name == 'newCoupon'">
                    保存
                </el-button>
                <el-button type="danger" @click="$router.back()">
                    {{backText}}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: '',
        data() {
            return {
                formData: {
                    name: '', //优惠券名称
                    title: '', //优惠券标题
                    type: '',   //优惠券类型
                    content: '',    //优惠券描述
                    worth: '', //优惠券价值
                    full: '',   //优惠券门槛
                    num: '',    //发行数量
                    goods_type: '', //使用类型
                    goods_id: [], //存放用于指定的id，可以是商品id的数组，也可以是商品分类的数组，选择全部的时候为空
                    rank: '',    //指定可用等级
                    start_time: '', //优惠券开始时间
                    end_time: '',    //优惠券结束时间
                    status: '',  //状态   0.不可用1.可用
                    id: '',     //优惠券ID
                    time: [],   //存放时间的数组。表单需要必须放在formData中
                },
                time: [],
                resTypeArr: [],   //用于存放优惠券的可用分类以及优惠券的可选商品的数组
                rules: {
                    type: [{required: true, message: '请选择优惠券类型', trigger: 'change', type: 'number'}],
                    num: [{required: true, message: '请输入发行数量', trigger: 'blur', type: 'number'}],
                    time: [{required: true, message: '请输入优惠券有效时间', trigger: 'change', type: 'array'}],
                    full: [{ trigger: 'blur', required: true, type: 'number',}],
                    worth: [{required: true, message: '请输入金额大小', trigger: 'blur', type: 'number'}],
                    name: [{required: true, message: '请输入优惠券名称', trigger: 'blur'}]
                },
                isCanEdit: true
            }
        },
        created() {
            if (this.$route.name == 'editCoupon') {
                this.getEditData();
                this.isCanEdit = false;
            }
        },
        methods: {
            handleChange(val) {
                if (val != null && val.length == 2) {
                    this.formData.start_time = moment(val[0]).format('X');
                    this.formData.end_time = moment(val[1]).format('X');
                }
            },
            submit() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        this.$message.warning('存在未正确填写的信息')
                    }
                    else {
                        let address = this.$route.name === 'editCoupon' ? 'updateCoupons' : 'addCoupons'
                        this.$axios.post(address, this.formData, res => {
                            if (res.ret == true) {
                                this.$message.success('操作成功，正在为您跳转优惠券列表')
                                setTimeout(() => {
                                    this.$router.push('index')
                                }, 1500)
                            }
                        })
                    }
                })
            },
            getEditData() {
                this.$axios.get('getCoupons', {id: this.$route.query.id}, res => {
                    if (res.ret) {
                        res.data[0].time = [moment.unix(res.data[0].start_time), moment.unix(res.data[0].end_time)]
                        this.formData = res.data[0]
                    }
                })
            },
            changeType(val) { //针对分类的改变
                val == 1 ? this.getGoodsList() : this.getTypeList();
                if (val == 0) {
                    this.formData.goods_id = [];
                }
            },
            getGoodsList() {  //获取商品列表
                this.$axios.get('getGoodList', {}, res => {
                    this.resTypeArr = res.data;
                })
            },
            getTypeList() { //获取商品分类列表
                this.$axios.get('getCategory', {}, res => {
                    this.resTypeArr = res.data;
                })
            }
        },
        computed: {
            backText() {
                return this.$route.name === 'editCoupon' ? '返回' : '取消'
            },
            computedType() {
                return this.formData.goods_type == 1 ? '优惠券可用商品' : '优惠券可用分类'
            }
        }
    }
</script>


<style scoped>


</style>
