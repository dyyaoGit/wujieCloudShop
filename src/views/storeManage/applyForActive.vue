<template>
    <div>
        <h2>秒杀申请</h2>
        <el-table border :data="tableData" size="small">
            <el-table-column label="活动名" prop="name"></el-table-column>
            <el-table-column label="活动开始时间" prop="start_time"></el-table-column>
            <el-table-column label="结束时间" prop="end_time"></el-table-column>
            <el-table-column label="活动logo" prop="logo">
                <template slot-scope="scope">
                    <img :src="scope.row.logo" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)" size="mini" type="danger">申请参加该活动</el-button>
                    <el-button @click="remove(scope.row.id)" size="mini" type="warning">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getData() {

            }
        }
    }
</script>


<style scoped>


</style>
