<template>
    <div>
        <el-form :model="formData" sizi="small" label-position="left">
            <el-form-item label="优惠券类型">
                <el-select v-model="formData.type">
                    <el-option :value="1" label="满减优惠券"></el-option>
                    <el-option :value="2" label="现金券"></el-option>
                    <el-option :value="3" label="包邮券"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="优惠券状态">
                <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="优惠券有效时间">
                <el-date-picker
                    v-model="time"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="满(元)" v-if="formData.type == 1" label-width="80px" style="width: 800px;" label-position="left">
                <el-input v-model="formData.boundary"></el-input>
            </el-form-item>
            <el-form-item label="减（元）" v-if="formData.type == 1" label-width="80px" style="width: 800px;" label-position="left">
                <el-input v-model="formData.money"></el-input>
            </el-form-item>
            <el-form-item label="现金券金额" v-if="formData.type == 2" label-width="100px" style="width: 800px;" label-position="left">
                <el-input v-model="formData.cash"></el-input>
            </el-form-item>
            <el-form-item label="包邮券" v-if="formData.type == 3" label-width="80px" style="width: 800px;" label-position="left">
                <el-input v-model="formData.pinkage"></el-input>
            </el-form-item>
        </el-form>

        <el-button type="primary">
            保存
        </el-button>
        <el-button type="danger">
            取消
        </el-button>
    </div>
</template>

<script>
    import myFunction from './test'
    export default {
        name: '',
        data() {
            return {
                formData: {
                    type: 1,   //优惠券类型
                    status: 1,  //状态   0.不可用1.可用
                    startTime: 1501546088, //优惠券开始时间
                    endTime: 1513324505,    //优惠券结束时间
                    boundary: '',   //满减界限
                    money: '',      //减少多少金额
                    id: 11111,     //优惠券ID
                    cash: 100,   //现金券金额
                    pinkage: ''  //包邮券
                },
                time: []
            }
        },
        created() {
            if(this.formData.status === 0){
                this.formData.status = false;
            }
            if(this.formData.status === 1){
                this.formData.status = true;
            }
        }
    }
</script>


<style scoped>


</style>
