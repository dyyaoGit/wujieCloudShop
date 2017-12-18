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
                label="商品"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.img" style="max-width: 100px;max-height:100px">
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品名称"
            >
            </el-table-column>
            <el-table-column
                prop="type"
                width="150"
                label="类型"
            >
            </el-table-column>
            <el-table-column
                prop="price[level1]"
                width="150"
                label="一级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="price[level2]"
                width="150"
                label="二级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="price[level3]"
                width="150"
                label="三级会员价格"
            >
            </el-table-column>
            <el-table-column
                prop="price[level4]"
                width="150"
                label="四级会员价格"
            >
            </el-table-column>
            <el-table-column  label="操作" width="300" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" v-if="scope.row.isUp">上架</el-button>
                    <el-button size="mini" type="danger" v-else>下架</el-button>
                    <el-button size="mini" type="primary">编辑</el-button>
                    <el-button size="mini" type="default">删除</el-button>
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
                    {
                        img: 'https://i8.mifile.cn/a1/pms_1502098360.63228592!560x560.jpg',
                        name: '小米笔记本',
                        type: '电脑',
                        price: {level1: '100', level2: '80', level3: '60', level4: '40'},
                        isUp: false
                    },
                    {
                        img: 'https://i8.mifile.cn/a1/pms_1502098360.63228592!560x560.jpg',
                        name: '小米笔记本',
                        type: '电脑',
                        price: {level1: '100', level2: '80', level3: '60', level4: '40'},
                        isUp: true
                    }
                ],
                selection: []  //选中的部分
            }
        },
        methods: {
            selectionChange(val) {
                console.log(val)
                this.selection = val;
            }
        }
    }
</script>


<style scoped>


</style>
