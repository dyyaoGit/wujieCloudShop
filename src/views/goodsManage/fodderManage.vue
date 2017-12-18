<template>
    <div>
        <div>
            <div class="button-wrap clearfix">
                <el-button type="danger" size="small" style="float: right;">
                    添加素材
                </el-button>
            </div>
            <el-table border :data="tableData" style="margin-top: 15px;">
                <el-table-column>

                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fodderManage',
        data() {
            return {
                tableData: [
                    {

                    }
                ]
            }
        }
    }
</script>


<style scoped>


</style>
