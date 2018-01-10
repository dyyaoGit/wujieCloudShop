<template>
    <div>
        <el-form :model="formData" sizi="small" label-position="left" :rules="rules" ref="form">
            <el-form-item label="优惠券名称" prop="name" label-width="100px" style="width: 800px;">
                <el-input v-model="formData.name" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型" prop="identity">
                <el-select v-model="formData.identity" :disabled="!isCanEdit">
                    <el-option :value="1" label="满减优惠券"></el-option>
                    <el-option :value="2" label="现金券"></el-option>
                    <el-option :value="3" label="包邮券"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优惠券状态">
                <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"  :inactive-value="0" :disabled="!isCanEdit"></el-switch>
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
            <el-form-item label="满(元)" v-if="formData.identity == 1" label-width="80px" style="width: 800px;" label-position="left" prop="full">
                <el-input v-model.number="formData.full" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="减（元）" v-if="formData.identity == 1" label-width="80px" style="width: 800px;" label-position="left" prop="cut">
                <el-input v-model.number="formData.cut" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="现金券金额" v-if="formData.identity == 2" label-width="100px" style="width: 800px;" label-position="left">
                <el-input v-model.number="formData.money" :disabled="!isCanEdit"></el-input>
            </el-form-item>
            <el-form-item label="发行数量"  label-width="80px" style="width: 800px;" label-position="left" prop="num">
                <el-input-number v-model="formData.num" @change="handleChange" :min="1"  label="发行数量" :disabled="!isCanEdit"></el-input-number>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="submit" v-if="!$route.name === 'editCoupon'">
            保存
        </el-button>
        <el-button type="danger" @click="$router.back()">
            {{backText}}
        </el-button>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: '',
        data() {
            const isMaxGtMin = (rule, val, callback) => {
                if(!val&&typeof val == 'number'){
                    callback(new Error('请输入数字'))
                }
                else if(this.formData.full<this.formData.cut){
                    callback(new Error('满减金额不能大于满减界限'))
                }
                else{
                    callback();
                }
            }
            return {
                formData: {
                    identity: '',   //优惠券类型
                    status: '',  //状态   0.不可用1.可用
                    start_time: '', //优惠券开始时间
                    end_time: '',    //优惠券结束时间
                    full: '',   //满减界限
                    cut: '',      //减少多少金额
                    id: '',     //优惠券ID
                    money: '',   //现金券金额
                    num: '',    //发行数量
                    time: [],
                    name: ''
                },
                time: [],
                rules: {
                    identity: [{ required: true, message: '请选择优惠券类型', trigger: 'change', type: 'number' }],
                    num: [{ required: true, message: '请输入发行数量', trigger: 'blur', type: 'number' }],
                    time: [{ required: true, message: '请输入优惠券有效时间', trigger: 'change', type: 'array'}],
                    full: [{ validator: isMaxGtMin, trigger: 'blur', required: true, type: 'number',}],
                    cut: [{ validator: isMaxGtMin,  trigger: 'blur', type: 'number', required: true}],
                    money: [{ required: true, message: '请输入金额大小', trigger: 'blur', type: 'number'}],
                    name: [{ required: true, message: '请输入优惠券名称', trigger: 'blur'}]
                },
                isCanEdit: true
            }
        },
        created() {
            if(this.$route.name == 'editCoupon'){
                this.getEditData();
                this.isCanEdit = false;
            }
        },
        methods: {
            handleChange(val) {
                if(val != null&&val.length == 2){
                    this.formData.start_time = moment(val[0]).format('X');
                    this.formData.end_time = moment(val[1]).format('X');
                }
            },
            submit() {
                this.$refs.form.validate((valid) => {
                   if(!valid){
                       this.$message.warning('存在未正确填写的信息')
                   }
                   else{
                       let address = this.$route.name === 'editCoupon' ? 'updateCoupons' : 'addCoupons'
                       this.$axios.post(address, this.formData, res => {
                           if(res.ret == true){
                               this.$message.success('操作成功，正在为您跳转优惠券列表')
                               setTimeout(() => {this.$router.push('index')}, 1500)
                           }
                       })
                   }
                })
            },
            getEditData() {
                this.$axios.get('getCoupons', {id: this.$route.query.id}, res => {
                    if(res.ret){
                        res.data[0].time = [moment.unix(res.data[0].start_time), moment.unix(res.data[0].end_time)]
                        this.formData = res.data[0]
                    }
                })
            }
        },
        computed: {
            backText() {
                return this.$route.name === 'editCoupon'? '返回' : '取消'
            }
        }
    }
</script>


<style scoped>


</style>
