<template>
    <div>
        <el-form :model="formData">
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
        </el-form>
    </div>
</template>

<script>
    import myFunction from './test'
    export default {
        name: '',
        data() {
            return {
                formData: {
                    type: 2,   //优惠券类型
                    status: 1,  //状态   0.不可用1.可用
                    startTime: 1501546088, //优惠券开始时间
                    endTime: 1513324505,    //优惠券结束时间
                    boundary: '',   //满减界限
                    money: '',      //减少多少金额
                    id: 11111,     //优惠券ID
                    cash: 100,   //现金券金额
                    pinkage: ''  //包邮券
                },
                long: [1,2,3,4,5],  //红的数组 max18   normal5
                short: [6,7]   //蓝的数组    max12     normal2
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
