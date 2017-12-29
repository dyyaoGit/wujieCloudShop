<template>
    <div>
        <div class="clearfix" style="margin-bottom: 20px;">
            <el-button type="danger" size="small" style="float:right;" @click="$router.push('addBrand')">添加品牌</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" >
            <el-table-column prop="name" label="品牌名" width="180"></el-table-column>
            <el-table-column prop="title" label="品牌宣传语" width="180"></el-table-column>
            <el-table-column prop="logo" label="LOGO" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.logo" class="img-item">
                </template>
            </el-table-column>
            <el-table-column prop="content" label="品牌描述"></el-table-column>
            <el-table-column
                prop="choice"
                label="是否精选"
                width="100">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.choice"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="1"
                        @change="switchChange(scope.$index)"
                        inactive-value="0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="操作" width="220" fixed="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="edit(scope.row.id)">编辑该品牌</el-button>
                    <el-button type="warning" size="mini" @click="remove(scope.row.id)">删除该品牌</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
//                {
//                    name: '联想',
//                    title: '因为拥有联想，世界充满希望',
//                    logo: '',
//                    content: '我是品牌描述'
//                }
            ],
            loading: false
        }
    },
    methods: {
        getData() {
            this.loading = true;
            this.$axios.get('brandManage', {}, res => {
                this.tableData = res.data;
                this.loading = false
            })
        },
        edit(id) {
            this.$router.push({path: 'editBrand', query: {id}})
        },
        remove(id) {
            this.$confirm('此操作将删除该品牌, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('delBrand', {id}, res => {
                    if(res.ret == true){
                        this.$message({type: 'success', message: '删除成功!'});
                        this.getData();
                    }
                })
            }).catch(() => {this.$message({type: 'info', message: '已取消删除'});});
        },
        switchChange(index) {
            this.$axios.post('updateBrand', this.tableData[index], res => {
                if(res.ret){
                    this.$message.success('操作成功，正在刷新数据')
                    this.getData();
                }
            })

        }
    },
    created() {
        this.getData();
    }
};
</script>

<style scoped>
.img-item {
    width: 100px;
    height: 100px;
}
</style>
