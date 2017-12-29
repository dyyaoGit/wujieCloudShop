<template>
    <div>
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="goods.name" label="商品名"></el-table-column>
            <el-table-column prop="goods.img" label="商品头图">
                <template slot-scope="scope">
                    <img :src="scope.row.goods.img[0]" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.state == 0">审核中</span>
                    <span v-if="scope.row.state == 1">审核通过</span>
                    <span v-if="scope.row.state == 2">审核不通过</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="操作" width="280" fixed="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="handle(scope.row, 'agree')" v-if="scope.row.state != 1">同意</el-button>
                    <el-button type="warning" size="mini" @click="handle(scope.row, false)">拒绝</el-button>
                    <el-button type="primary" size="mini" @click="showDetails(scope.row.goods_id)">查看商品详情</el-button>
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
            getData() {
                this.loading = true;
                this.$axios.get('getApplyList', {kill_id: this.$route.query.id}, res => {
                    this.tableData = res.data;
                    this.loading = false;
                })
            },
            handle(all,type) { //
                let msg = type === "agree" ? "同意" : '拒绝'
                let state = type === "agree" ? 1 : 2
                this.$confirm(`该操作将${msg}该商品参加活动，是否继续`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('updateApply', {...all, state}, res => {
                        if(res.ret){this.$message({type: 'success', message: '操作成功!'}); this.getData()}
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消操作'});
                });

            },
            showDetails(id) {
                this.$router.push({path: 'goodsDetails', query: {id}})
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
