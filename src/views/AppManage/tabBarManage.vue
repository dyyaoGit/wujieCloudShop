<template>
    <div>
        <div class="clearfix">
            <el-button @click="add" type="danger" class="align-right">添加</el-button>
        </div>
        <el-table border :data="tableData" class="mt-20" v-loading="loading">
            <el-table-column label="tabBar名" prop="name"></el-table-column>
            <el-table-column label="ICON">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right">
                <template slot-scope="scope">
                    <el-button type="warning" size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
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
                tableData: [],
                loading: false
            }
        },
        methods: {
            add() {
                this.$router.push({path: 'addTabBar'})
            },
            getData() {
                this.loading = true
                this.$axios.get('getTab', {}, res => {
                    if(res.ret){
                        this.tableData = res.data;
                    }
                    this.loading = false

                })
            },
            edit(id) {
                this.$router.push({path: 'editTabBar', query: {id}})
            },
            del(id) {
                this.$axios.post('deleteTab', {id}, res => {
                    if(res.ret){
                        this.$message.success('删除成功，正在刷新数据');
                        this.getData();
                    }
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
