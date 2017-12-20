<template>
    <div>
        <el-table :data="tableData" border size="small"
                  @selection-change="selectionChange"
                  tooltip-effect="dark"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="img"
                width="150"
                label="商品头图"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.img[0]" style="max-width: 100px;max-height:100px">
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品名称"
            >
            </el-table-column>
            <el-table-column
                prop="state"
                label="商品状态"
            >
                <template slot-scope="scope">
                    <strong v-if="scope.row.state == 1">上架状态</strong>
                    <strong v-if="scope.row.state == 0">下架状态</strong>
                </template>
            </el-table-column>

            <el-table-column
                prop="type"
                width="150"
                label="类型"
            >
                <template slot-scope="scope">
                   <span v-text="scope.row.f_category['name'] || ''" ></span>
                </template>
            </el-table-column>
            <el-table-column label="商品库存" width="100" prop="stock"></el-table-column>
            <el-table-column label="商品简介" width="100">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="bottom">
                        <span   style="overflow: hidden;text-overflow-ellipsis: ellipsis;text-wrap: avoid;">{{scope.row.title}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                prop="ems_price"
                width="150"
                label="快递价格"
            >
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
            <el-table-column label="操作" width="310" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" v-if="scope.row.state == 0" @click="putAway(scope.row)">上架</el-button>
                    <el-button size="mini" type="danger" v-if="scope.row.state == 2">下架</el-button>
                    <el-button size="mini" type="primary" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="warning" @click="editPhotos(scope.row.id)">素材编辑</el-button>
                    <el-button size="mini" type="default" @click="delGood(scope.row.id)">删除</el-button>
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
                tableData: [
//                    {
//                        type: [],   //商品分类
//                        name: '',  //商品名称
//                        title: '',  //商品简介
//                        products: [     //商品规格
//                            {
//                                name: '颜色',    //规格名称
//                                tag: ['黄色'],   //规格对应标签
//                                empty: ''               //临时存放
//                            }
//                        ],
//                        content: '',
//                        price: {   //各级会员价格
//                            common: '',
//                            first: '',
//                            second: '',
//                            third: ''
//                        },
//                        ems_price: '',     //邮费
//                        img: [],    //商品轮播图
//                        stock: '',   //商品库存
//                        state: 0,     //上下架状态
//                        browse_num: 0, //浏览量
//                        share_num: 0, //分享量
//                        agent_num: 0, //商品代理数
//                        f_category: {name: ''}
//                    }
                ],
                selection: []  //选中的部分
            }
        },
        methods: {
            selectionChange(val) {
                console.log(val)
                this.selection = val;
            },
            getList() { //获取商品列表
                this.$axios.get('getGoodList', {}, res => {
                    this.tableData = res.data;
                })
            },
            edit(id) {
                console.log(id)
                this.$router.push({path:'edit', query: {id}})
            },
            editPhotos(id) {
                console.log(id)
                this.$router.push({path: 'fodderManage', query: {id}})
            },
            delGood(id) { //删除商品
                this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('delGood', {id}, res => {
                        if(res.ret == true){
                            this.$message.success('删除成功')
                            this.getList();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            putAway(allMsg) {  //发送上架申请
                this.$confirm('此操作将向平台发送上架审核申请,平台同意后方可上架， 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let newMsg = {...allMsg,state: 2}
                    this.$axios.post('updateGoodList', newMsg, res => {
                        if(res.ret == true){
                            this.$message.success('申请成功，请耐心等待平台审核')
                            this.getList();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>


<style scoped>


</style>
