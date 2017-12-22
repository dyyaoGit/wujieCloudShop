<template>
    <div>
        <div class="clearfix">
            <el-button style="float: right;margin-bottom: 20px;" type="danger" size="small" @click="add">添加分类</el-button>
        </div>
        <el-table border :data="tableData" size="small">
            <el-table-column label="分类名" prop="name"></el-table-column>
            <el-table-column label="分类描述" prop="content"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)" size="mini" type="danger">编辑</el-button>
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
                tableData: [
                    {
                        name: '情感',
                        content: ''
                    }
                ]
            }
        },
        methods: {
            add() {
                this.$router.push({path: 'addType'})
            },
            edit() {
                this.$router.push({path: 'editType', query: {id: ''}})
            },
            remove() {
                this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delLabel', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '删除成功!'});
                            this.getData();
                        }
                    })
                }).catch(() => {this.$message({type: 'info', message: '已取消删除'});});
            },
            getData() {
                this.$axios.get('articleType', {}, res => {
                    this.tableData = res.data;
                })
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
