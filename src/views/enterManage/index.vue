<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column label="申请编号" prop="id"></el-table-column>
            <el-table-column label="手机号码" prop="phone"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleJudge(scope.row.id, 1)">同意</el-button>
                    <el-button size="mini" type="warning" @click="handleJudge(scope.row.id, 2)">拒绝</el-button>
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
                tableData: [
//                    {
//                        id: '996996996',
//                        name: '我是商户名称'
//                    }
                ]
            }
        },
        methods: {
            showMore(id) {
                this.$router.push({path: 'explore', query: {id}})
            },
            getList(state) {
                this.$axios.get('enterManageList', {state}, res => {
                    this.tableData = res.data
                })
            },
            handleJudge(id, state) {
                let str = state == 1 ? '同意' : '拒绝'
                this.$confirm(`此操作将${str}用户入驻，是否继续？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('enterJudge', {id, state}, res => {
                        if(res.ret == true){
                            this.$message.success('操作成功')
                            this.getList(0);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });

            }
        },
        mounted() {
            this.getList(0);
        }
    }
</script>


<style scoped>


</style>
