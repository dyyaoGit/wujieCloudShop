<template>
    <div>
        <div class="clearfix">
            <el-button style="float: right;margin-bottom: 20px;" type="danger" size="small" @click="add">添加轮播图</el-button>
        </div>
        <el-table border :data="tableData" size="small" v-loading="loading">
            <el-table-column label="轮播图名" prop="name" width="200"></el-table-column>
            <el-table-column label="轮播图预览图" prop="	value">
                <template slot-scope="scope">
                    <img :src="item" v-for="(item,index) in scope.row.value" class="img-item-small" v-if="index<3">
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
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [
//                    {
//                        name: '星云的彼端',
//                        title: '', //轮播图标题
//                        content: '次时代修真',
//                        type: '小说',
//                        rank: 1
//                    }
                ],
                loading: false
            }
        },
        methods: {
            add() {
                this.$router.push({path: 'addSlide'})
            },
            edit(id) {
                this.$router.push({path: 'updateSlide', query: {id}})
            },
            remove(id) {
                this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delSlide', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '删除成功!'});
                            this.getData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            getData() {
                this.loading = true;
                this.$axios.get('getSlideList', {}, res => {
                    if(res.ret == true){
                        this.tableData = res.data;
                    }
                    this.loading = false;
                })
            }
        },
        created() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
