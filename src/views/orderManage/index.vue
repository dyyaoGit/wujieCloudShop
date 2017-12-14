<template>
    <div>
        <el-form :model="formData" :inline="true" size="small">
            <el-form-item label="订单号">
                <el-input v-model="formData.id" placeholder="请输入订单编号"></el-input>
            </el-form-item>
            <el-form-item label="买家名称">
                <el-input v-model="formData.name" placeholder="请输入买家名称"></el-input>
            </el-form-item>
            <el-form-item label="下单时间">
                <el-input v-model="formData.buyTime" placeholder="请输入下单时间"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="searchData" type="danger">
                    查询
                </el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" border>
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column prop="name" label="买家名称"></el-table-column>
            <el-table-column prop="buyTime" label="下单时间"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                formData: {
                    id: '',      //订单编号
                    name: '',   //买家名称
                    buyTime: ''   //下单时间
                },
                tableData: [
                    {
                        id: '666',
                        name: '买家名称',
                        buyTime: '1999-12-08'
                    }
                ]
            }
        },
        methods: {
            searchData() {
                console.log('查询数据函数')
                console.log(this.formData)
            }
        }
    }
</script>


<style scoped>


</style>
