<template>
    <div>
        <div class="clearfix">
            <el-button style="float: right;margin-bottom: 20px;" type="danger" size="small" @click="add">添加文章</el-button>
        </div>
        <el-table border :data="tableData" size="small" v-loading="loading">
            <el-table-column label="作者" prop="author" width="80"></el-table-column>
            <el-table-column label="文章名" prop="name" ></el-table-column>
            <el-table-column label="文章描述" prop="title" width="120"></el-table-column>
            <el-table-column label="类型" prop="cat.name" width="100"></el-table-column>
            <el-table-column label="排序" prop="sort" width="100"></el-table-column>
            <el-table-column label="是否精选" prop="sort" width="100">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.choice"
                        active-color="#13ce66"
                        active-value="1"
                        inactive-value="0"
                        @change="handleChange(scope.row)"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)" size="mini" type="danger">编辑</el-button>
                    <el-button @click="showDetails(scope.row.id)" size="mini" type="primary">查看详细</el-button>
                    <el-button @click="remove(scope.row.id)" size="mini" type="warning">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: right;">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [
//                    {
//                        name: '星云的彼端111',
//                        title: '', //文章标题
//                        content: '次时代修真',
//                        type: '小说',
//                        rank: 1
//                    }
                ],
                loading: false,
                currentPage: 1,
                total: 0
            }
        },
        methods: {
            add() {
                this.$router.push({path: 'addArticle'})
            },
            edit(id) {
                this.$router.push({path: 'editArticle', query: {id}})
            },
            remove(id) {
                this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delArticle', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '删除成功!'});
                            this.getData();
                        }
                    })
                }).catch(() => {this.$message({type: 'info', message: '已取消删除'});});
            },
            getData() {
                this.loading = true;
                this.$axios.get('article', {page: this.currentPage}, res => {
                    if(this.currentPage === 1){
                        this.total = res.msg;
                    }
                    if(res.ret == true){
                        this.tableData = res.data;
                    }
                    this.loading = false;
                })
            },
            showDetails(id) {
                this.$router.push({path: 'articleDetails', query: {id}})
            },
            handleChange(val) {
                this.loading = true;
                this.$axios.post('updateArticle', val, res => {
                    if(res.ret == true){
                        this.$message.success('精选状态切换成功,正在刷新列表')
                        this.getData();
                    }
                    this.loading = false;
                })
            },
            handleCurrentChange(val) {
                console.log(val)
                this.currentPage = val;
                this.getData();
            }
        },
        created() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
