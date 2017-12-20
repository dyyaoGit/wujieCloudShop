<template>
    <div>
        <el-table border :data="tableData">
            <el-table-column label="商品名">

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
            getData(audit=1) {
                this.$axios.get('getGoodList', {audit}, res => {
                    this.tableData = res.data;
                })
            }
        },
        mounted() {
            this.getData()
        }
    }
</script>


<style scoped>


</style>
