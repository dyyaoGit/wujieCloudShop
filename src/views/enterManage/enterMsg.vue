<template>
    <div>
        <h3>
            商家入驻详细信息
            id:{{$route.query.id}}
        </h3>

        <el-table :data="tableData" border>
            <el-table-column label="商家编号" prop="id" ></el-table-column>
            <el-table-column label="申请人姓名" prop="name" ></el-table-column>
            <el-table-column label="店铺名称" prop="title" ></el-table-column>
            <el-table-column label="商品分类" prop="type" ></el-table-column>
        </el-table>

        <div class="btn-wrap">
            <el-button size="mini" type="danger">同意该申请</el-button>
            <el-button size="mini" type="warning">拒绝该申请</el-button>
            <el-button size="mini" type="primary">查看详细信息</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [
                    {
                        id: this.$route.query.id,   //商家编号
                        name: '花花公子',   //申请人姓名
                        title: '花花公子旗舰店',          //店铺名称
                        type: '日用品'     //商品分类
                    }
                ]
            }
        }
    }
</script>


<style scoped>


</style>
