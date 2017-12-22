<template>
    <div>
        <div class="clearfix">
            <el-button style="float: right;margin-bottom: 20px;" type="danger" size="small" @click="add">添加分类</el-button>
        </div>
        <el-table border :data="tableData" size="small">
            <el-table-column label="分类名" prop="name"></el-table-column>
            <el-table-column label="父级编号" prop="parent_id"></el-table-column>
            <el-table-column label="分类等级" prop="rank">
                <template slot-scope="scope">
                    <h3 v-if="scope.row.rank === 1">一级分类</h3>
                    <h3 v-if="scope.row.rank === 2">二级分类</h3>
                    <h3 v-if="scope.row.rank === 3">三级分类</h3>
                    <h3 v-if="scope.row.rank === 4">四级分类</h3>
                </template>
            </el-table-column>
            <el-table-column label="操作" label-width="180px" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)" size="mini" type="danger">编辑</el-button>
                    <el-button @click="removeOne(scope.row.id)" size="mini" type="warning">删除</el-button>
                    <!--<el-button @click="add(id)" size="mini" type="primary">增加子类</el-button>-->
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
                this.$axios.get('getTypeList', {}, res => {
                    this.tableData = res.data;
                })
            },
            removeOne(id) {
                this.$confirm('此操作将永久删除该分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('deleteType', {id}, res => {
                        if(res.ret == true){
                            this.$message.success('删除成功！正在刷新数据...')
                            this.getData()
//                            setTimeout(() => {this.getData()} , 1500)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            edit(id) {
                this.$router.push({path: 'editType', query: {id}})
            },
            add() {
                this.$router.push('addType');
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
