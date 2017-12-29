<template>
    <div>
        <div class="clearfix">
            <el-button style="float: right;margin-bottom: 20px;" type="danger" size="small" @click="add">添加活动</el-button>
        </div>
        <el-table border :data="tableData" size="small" v-loading="loading">
            <el-table-column label="活动名" prop="name"></el-table-column>
            <el-table-column label="活动开始时间" prop="start_time"></el-table-column>
            <el-table-column label="结束时间" prop="end_time"></el-table-column>
            <el-table-column label="活动logo" prop="logo">
                <template slot-scope="scope">
                    <img :src="scope.row.logo" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="270" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)" size="mini" type="danger">编辑</el-button>
                    <el-button @click="remove(scope.row.id)" size="mini" type="warning">删除</el-button>
                    <el-button size="mini" type="primary" @click="showDetails(scope.row.id)">查看报名详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: '',
        data() {
            return {
                tableData: [],
                loading: false
            }
        },
        methods: {
            add() {
                this.$router.push({path: 'addActivities'})
            },
            edit(id) {
                this.$router.push({path: 'updateActivities', query: {id}})
            },
            remove(id) {
                this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delActivities', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '删除成功!'});
                            this.getData();
                        }
                    })
                }).catch(() => {this.$message({type: 'info', message: '已取消删除'});});
            },
            getData() {
                this.loading = true;
                setTimeout(() => {
                    if(this.loading){
                        this.loading = false;
                        this.$message.warning("请求超时，请检查网络！")
                    }
                }, 10000)

                this.$axios.get('getActivitiesList', {}, res => {
                    if(res.ret == true){
                        res.data.forEach(val => {
//                            val.start_time = moment((val.start_time*1000)).format("YYYY-MM-DD HH:MM:SS")
                            val.start_time = moment.unix(val.start_time).format("YYYY-MM-DD HH:mm:ss")
                            val.end_time = moment((val.end_time*1000)).format("YYYY-MM-DD HH:mm:ss")
                        })
                        this.tableData = res.data;
                    }
                    this.loading = false;
                })
            },
            showDetails(id) {
                this.$router.push({path: 'applyList', query: {id}})
            }
        },
        created() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
