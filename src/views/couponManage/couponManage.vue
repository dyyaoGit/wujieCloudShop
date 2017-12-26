<template>
    <div>
        <div class="clearfix">
            <el-button type="danger" icon="el-icon-caret-bottom" style="float: right;margin-bottom: 15px;" size="small"  @click="newCoupon">新建优惠券</el-button>
        </div>
        <el-table :data="tableData" border>
            <el-table-column label="优惠券名称" width="150" prop="name"></el-table-column>
            <el-table-column label="类型" width="150">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.identity === 1" type="danger" size="medium">满减优惠券</el-tag>
                    <el-tag v-if="scope.row.identity === 2" type="success" size="medium">现金券</el-tag>
                    <el-tag v-if="scope.row.identity === 3" type="info" size="medium">包邮券</el-tag>
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
                    {{`${scope.row.start_time}至${scope.row.end_time}`}}
                </template>
            </el-table-column>
            <el-table-column label="优惠券描述">
                <template slot-scope="scope">
                    <span v-if="scope.row.identity === 1">{{`满${scope.row.full}减${scope.row.cut}`}}</span>
                    <span v-if="scope.row.identity === 2">{{`立减现金${scope.row.money}`}}</span>
                </template>
            </el-table-column>
            <el-table-column label="发行数量" prop="num"></el-table-column>
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
//                        name: '', //优惠券名称
//                        identity: 2,   //优惠券类型
//                        status: 0,  //状态   0.不可用1.可用
//                        start_time: 1501546088, //优惠券开始时间
//                        end_time: 1513324505,    //优惠券结束时间
//                        full: '',   //满减界限
//                        cut: '',      //减少多少金额
//                        id: '',     //优惠券ID
//                        money: 100,   //现金券金额
//                        num: ''  //优惠券数量
                    }
                ]
            }
        },
        methods: {
            edit(id) {
                this.$router.push({path: 'edit', query: {id}})
            },
            del(id) {
                this.$confirm('此操作将删除该优惠券, 是否继续?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delCoupons', {id}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: `成功删除优惠券ID`});
                            this.getData();
                        }
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            newCoupon() {
                this.$router.push({path: 'new'})
            },
            getData() {
                this.$axios.get('getCoupons', {}, res => {
                    if(res.ret == true){
                        this.tableData = res.data.map(val => {
                            val.start_time = moment(val.start_time*1000).format('YYYY-MM-DD HH:mm:SS');
                            val.end_time = moment(val.end_time*1000).format('YYYY-MM-DD HH:mm:SS');
                            return val
                        })
                    }
                })
            }
        },
        mounted() {
            this.getData();
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
