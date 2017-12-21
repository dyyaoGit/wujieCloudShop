<template>
    <div>
        <div class="clearfix">
            <el-button style="float: right;margin-bottom:  20px;" type="danger" @click="add">
                添加素材
            </el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%"  v-loading="loading">
            <el-table-column prop="content" label="素材描述" width="180"></el-table-column>
            <el-table-column prop="content" label="素材图预览" >
                <template slot-scope="scope">
                    <img class="fodder-item" :src="item" v-for="(item, index) in scope.row.img" v-if="index<3">
                </template>
            </el-table-column>
            <el-table-column prop="content" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="edit(scope.row.id)">编辑该素材</el-button>
                    <el-button size="mini" type="warning" @click="remove(scope.row.id)">删除该素材</el-button>
                    <el-button size="mini" type="primary" @click="showDetails(scope.row.id)">查看素材详细</el-button>
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
//                        img: [],  // 图片数组
//                        content: ''    //素材描述
//                    }
                ],
                loading: false
            }
        },
        methods: {
            getData() {
                this.loading = true;
                this.$axios.get('getFodder', {goods_id: this.$route.query.id}, res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
            },
            add() {
                this.$router.push({ path: 'addFodder', query: {goods_id: this.$route.query.id} })
            },
            edit(id) {
                this.$router.push({ path: 'editFodder', query: {id} })
            },
            remove(id) {
                this.$confirm('此操作将永久删除该素材, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delFodder', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '删除成功!正在刷新数据'});
                        }
                        this.getData();
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'
                    });
                });
            },
            showDetails(id) {
                this.$router.push({path: 'fodderDetails', query: {id}})
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>
    .fodder-item {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        overflow: hidden;
    }

</style>
