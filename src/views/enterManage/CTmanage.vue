<template>
    <div>
        <el-table border :data="tableData">
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
                    <el-button size="mini" type="danger">同意</el-button>
                    <el-button size="mini" type="warning">查看详细</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "c-tmanage",
        data() {
            return {
                tableData: [
                    {}
                ]
            }
        }
    }
</script>

<style scoped>

</style>
