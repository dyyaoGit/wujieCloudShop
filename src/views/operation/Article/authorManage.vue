<template>
    <div>
        <div class="clearfix">
            <el-button type="danger" style="float: right;" @click="add">
                添加作者
            </el-button>
        </div>
       <el-table :data="tableData" border class="mt-20">
           <el-table-column prop="name" label="作者名"></el-table-column>
           <el-table-column label="操作" width="200">
               <template slot-scope="scope">
                   <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
                   <el-button type="danger"  size="mini" @click="del(scope.row.id)">删除</el-button>
               </template>
           </el-table-column>
       </el-table>
    </div>
</template>

<script>
    export default {
        name: "author-manage",
        data() {
            return {
                tableData: [
                    {}
                ]
            }
        },
        methods: {
            add() {
                this.$router.push('addAuthor')
            },
            edit() {

            },
            del() {

            }
        }
    }
</script>

<style scoped>

</style>
