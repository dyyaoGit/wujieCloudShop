<template>
    <div>
        <div style="margin-bottom: 15px;">
            <el-radio-group v-model="state" size="small">
                <el-radio-button label="2" value="2">待审核列表</el-radio-button>
                <el-radio-button label="1" value="1">所有商品列表</el-radio-button>
                <el-radio-button label="3" value="3">已审核列表</el-radio-button>
            </el-radio-group>
        </div>

        <el-table border :data="tableData" v-loading="loading">
            <el-table-column label="商品名" prop="name" width="180">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.name" placement="top">
                        <div class="no-wrap">
                            {{scope.row.name}}
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="商品头图" prop="img" width="130">
                <template slot-scope="scope">
                    <img :src="scope.row.img[0]" style="width: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="商品简介" prop="title" width="200">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="bottom">
                        <div   style="overflow: hidden;text-overflow: ellipsis;text-wrap: avoid;white-space: nowrap">{{scope.row.title}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="state"
                label="商品状态"
                width="100"
            >
                <template slot-scope="scope">
                    <strong v-if="scope.row.state == 1">上架状态</strong>
                    <strong v-if="scope.row.state == 2">上架审核中</strong>
                    <strong v-if="scope.row.state == 3">审核不通过</strong>
                    <strong v-if="scope.row.state == 0">下架状态</strong>
                </template>
            </el-table-column>
            <el-table-column
                prop="price[common]"
                width="150"
                label="一级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="price[first]"
                width="150"
                label="二级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="price[second]"
                width="150"
                label="三级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="price[third]"
                width="150"
                label="四级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="update_time"
                width="150"
                label="修改时间"
            >
            </el-table-column>
            <el-table-column label="操作" width="260" fixed="right">
                <template slot-scope="scope">
                    <div v-if="state == 2">
                        <!--待审核操作按钮-->
                        <el-button size="text" type="primary" @click="handleGoods(scope.row)">审核通过</el-button>
                        <el-button size="text" type="danger" @click="handleGoods(scope.row,3)">拒绝上架</el-button>
                        <el-button size="text"  @click="showDetails(scope.row.id)">查看素材</el-button>
                    </div>
                    <el-button size="text" type="primary" @click="showDetails(scope.row.id)">查看详细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: right; margin-top: 20px;">
            <el-pagination
                @current-change="pageChange"
                :current-page.sync="currentPage"
                :page-size="1"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [],
                state: 2,
                loading: false,
                currentPage: 1,
                total: 0
            }
        },
        methods: {
            getData() {
                this.loading = true;
                let params = this.state == 1 ? {page: this.currentPage} : {state: this.state, page: this.currentPage}
                this.$axios.get('getGoodList', params, res => {
                    this.tableData = res.data;
                    console.log(res)

                    if(this.currentPage == 1 && res.msg){
                        this.total = res.msg
                        console.log(this.total)
                    }
                    this.loading = false;
                })
            },
            handleGoods(allMsg, state=1) { //商品审核操作
                let msg = state == 1 ? '同意上架该商品' : '拒绝该商品上架'
                this.$confirm(`此操作将${msg}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('goodsManage', {...allMsg, state}, res => {
                        if(res.ret == true){
                            this.$message({type: 'success', message: '操作成功，正在为您刷新数据'});
                            this.getData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            showDetails(id) {
                this.$router.push({path: 'details', query: {id}})
            },
            pageChange(val) {
                this.getData()
            }
        },
        mounted() {
            this.getData()
        },
        watch: {
            state(val) {
                this.currentPage = 1;
                this.getData();
            }
        }
    }
</script>


<style scoped>


</style>
