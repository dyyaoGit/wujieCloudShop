<template>
    <div>
        <div class="clearfix" style="margin-bottom: 20px;">
            <el-button type="danger" size="small" style="float:right;">添加品牌</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" :height="120">
            <el-table-column prop="name" label="品牌名" width="180"></el-table-column>
            <el-table-column prop="title" label="品牌宣传语" width="180"></el-table-column>
            <el-table-column prop="logo" label="LOGO" width="200"></el-table-column>
            <el-table-column prop="content" label="品牌描述"></el-table-column>
            <el-table-column prop="title" label="操作" width="220" fixed="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini">编辑该品牌</el-button>
                    <el-button type="warning" size="mini">删除该品牌</el-button>
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
                {
                    name: '联想',
                    title: '因为拥有联想，世界充满希望',
                    logo: '',
                    content: '我是品牌描述'
                }
            ]
        }
    }
};
</script>

<style>

</style>
