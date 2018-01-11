<template>
    <div>
        <el-table border :data="tableData">
            <el-table-column label="会员等级" prop="level"></el-table-column>
            <el-table-column label="等级名称" prop="name"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="edit(scope.$index)">
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "level-name-manage",
        data() {
            return {
                tableData: [
                    {
                        level: 0,
                        name: '普通会员'
                    },
                    {
                        level: 1,
                        name: '一级会员'
                    },
                    {
                        level: 2,
                        name: '二级会员'
                    },
                    {
                        level: 3,
                        name: '三级会员'
                    },
                    {
                        level: 4,
                        name: '四级会员'
                    }
                ]
            }
        },
        methods: {
            getData() {

            },
            edit(index) {
                this.$router.push({path: 'editLevelName', query: {level: index}})
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
