<template>
    <div>
        <div class="clearfix" style="margin-bottom: 20px;">
            <el-button type="danger" size="small" style="float:right;" @click="add">添加推荐标签</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" >
            <el-table-column prop="name" label="标签名" width="100"></el-table-column>
            <el-table-column prop="value" label="标签ICON" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.value.img" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column label="标签链接" prop="value.url"></el-table-column>
            <el-table-column prop="title" label="操作" width="220" fixed="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="edit(scope.row.id)">编辑该标签</el-button>
                    <el-button type="warning" size="mini" @click="remove(scope.row.id)">删除该标签</el-button>
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
//                        name: '标签名'
//                    }
                ]
            }
        },
        methods: {
            getData() {
                this.$axios.get('getIcon', {}, res => {
                    this.tableData = res.data;
                })
            },
            edit(id) {
                this.$router.push({path: 'updateRec', query: {id}})
            },
            remove(id) {
                this.$confirm('此操作将删除该标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delIcon', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '删除成功!'});
                            this.getData();
                        }
                    })
                }).catch(() => {this.$message({type: 'info', message: '已取消删除'});});
            },
            add() {
                this.$router.push({path: 'addRec'})
            }
        },
        created() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
