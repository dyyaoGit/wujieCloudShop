<template>
    <div>
        <div class="clearfix">
            <el-button type="danger" icon="el-icon-caret-bottom" style="float: right;margin-bottom: 15px;" size="small"  @click="create">新建优惠券</el-button>
        </div>
        <el-table :data="tableData" border>
            <el-table-column label="类型" width="150">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.type === 1" type="danger" size="medium">满减优惠券</el-tag>
                    <el-tag v-if="scope.row.type === 2" type="success" size="medium">现金券</el-tag>
                    <el-tag v-if="scope.row.type === 3" type="info" size="medium">包邮券</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="优惠券状态" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 1" class="default-use">可用</span>
                    <del v-if="scope.row.status === 0" class="default-use no-use">不可用</del>
                </template>
            </el-table-column>
            <el-table-column label="有效时间" width="300">
                <template slot-scope="scope">
                    {{`${scope.row.startTime}到${scope.row.endTime}`}}
                </template>
            </el-table-column>
            <el-table-column label="优惠券描述">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 1">{{`满${scope.row.boundary}减${scope.row.money}`}}</span>
                    <span v-if="scope.row.type === 2">{{`立减现金${scope.row.cash}`}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)" type="primary" size="mini">编辑</el-button>
                    <el-button @click="del(scope.row.id)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'couponManage',
        data() {
            return {
                tableData: [
                    {
                        type: 2,   //优惠券类型
                        status: 0,  //状态   0.不可用1.可用
                        startTime: 1501546088, //优惠券开始时间
                        endTime: 1513324505,    //优惠券结束时间
                        boundary: '',   //满减界限
                        money: '',      //减少多少金额
                        id: 11111,     //优惠券ID
                        cash: 100,   //现金券金额
                        pinkage: ''  //包邮券
                    },
                    {
                        type: 1,
                        status: 1,
                        startTime: 1501546088,
                        endTime: 1513324505,
                        boundary: 200,
                        money: 50,
                        id: 22222,    //优惠券ID
                        cash: '',   //现金券金额
                        pinkage: ''  //包邮券
                    },
                    {
                        type: 3,
                        status: 1,
                        startTime: 1501546088,
                        endTime: 1513324505,
                        boundary: 200,
                        money: 50,
                        id: 22222,    //优惠券ID
                        cash: '',   //现金券金额
                        pinkage: ''  //包邮券
                    }
                ]
            }
        },
        methods: {
            edit(id) {
                console.log(id)
                this.$message({
                    message: `要编辑的ID是${id}`,
                    type: 'warning'
                });
                this.$router.push({path: 'edit', query: {id}})
            },
            del(id) {
                this.$confirm('此操作将删除该优惠券, 是否继续?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: `成功删除优惠券ID${id}`
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            create() {
                this.$router.push({path: 'new'})
            }
        },
        mounted() {
            this.tableData = this.tableData.map(val => {
                val.startTime = moment(val.startTime*1000).format('YYYY-MM-DD');
                val.endTime = moment(val.endTime*1000).format('YYYY-MM-DD');
                return val
            })
        }
    }
</script>


<style scoped>
.default-use {
    font-weight: 700;
    color: #333;
}
    .no-use {
        font-weight: 400;
        color: #888;
    }

</style>
