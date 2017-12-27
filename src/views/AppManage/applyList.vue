<template>
    <div>
        <el-table :data="tableData" border style="width: 100%" >
            <el-table-column prop="name" label="商品名"></el-table-column>
            <el-table-column prop="logo" label="商品头图">
                <template slot-scope="scope">
                    <img :src="scope.row.img[0]" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.state == 0">审核中</span>
                    <span v-if="scope.row.state == 1">审核通过</span>
                    <span v-if="scope.row.state == 2">审核不通过</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="操作" width="220" fixed="right">
                <template slot-scope="scope">
                    <!--<el-button type="danger" size="mini" @click="add(scope.row.id)">申请参加</el-button>-->
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
                this.$axios.get('getApplyList', {kill_id: this.$route.query.id}, res => {
                    console.log(res)
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
