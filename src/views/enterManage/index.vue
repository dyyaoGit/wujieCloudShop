<template>
    <div>
        <el-table :data="tableData" border>
            <el-table-column label="品牌名" prop="name"></el-table-column>
            <el-table-column label="品牌宣传语" prop="title"></el-table-column>
            <el-table-column label="LOGO" prop="logo">
                <template slot-scope="scope">
                    <img :src="scope.row.logo" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column label="品牌描述" prop="content"></el-table-column>
            <el-table-column label="手机号码" prop="phone"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleJudge(scope.row.user_id, 1)">同意</el-button>
                    <el-button size="mini" type="warning" @click="handleJudge(scope.row.user_id, 2)">拒绝</el-button>
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
            handleJudge(user_id, status) {
                let str = status == 1 ? '同意' : '拒绝'
                this.$confirm(`此操作将${str}用户入驻，是否继续？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('enterJudge', {user_id, status}, res => {
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
