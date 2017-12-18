<template>
    <div>
        <div style="overflow: hidden;">
            <el-button
                type="danger"
                size="small"
                style="float: right;"
                icon="el-icon-plus"
                @click="jumpToAdd"
            >添加
            </el-button>
        </div>
        <el-table :data="tableData">
            <el-table-column></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [
                    {
                        img: ''
                    }
                ]
            }
        },
        methods: {
            jumpToAdd() {
                //跳转到添加轮播图页面
//                this.$router.push()
            }
        }
    }
</script>


<style scoped>


</style>
