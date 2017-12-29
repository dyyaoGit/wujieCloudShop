<template>
    <div>
        <div class="search-form">
            <el-form :model="formData" :inline="true" size="small">
                <el-form-item lable="用户等级">
                    <el-select v-model="formData.level">
                        <el-option label="普通会员" :value="0"></el-option>
                        <el-option label="一级会员" :value="1"></el-option>
                        <el-option label="二级会员" :value="2"></el-option>
                        <el-option label="三级会员" :value="3"></el-option>
                        <el-option label="四级会员" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input v-model="formData.userId"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="search">
                        搜索
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="clean">
                        清空
                    </el-button>
                </el-form-item>
            </el-form>
        </div>


        <el-table border :data="tableData">
            <el-table-column label="用户名" prop="name"></el-table-column>
            <el-table-column label="邀请人数" prop="num"></el-table-column>
            <el-table-column label="用户等级" prop="level"></el-table-column>
            <!--<el-table-column label="用户名" prop="name"></el-table-column>-->
            <el-table-column label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini">封号</el-button>
                    <el-button type="primary" size="mini">查看用户详情</el-button>
                    <el-button type="warning" size="mini">编辑</el-button>
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
                tableData: [{}],
                formData: {
                    level: '',
                    name: '',
                    userId: ''
                }
            }
        },
        methods: {
            getData() {

            },
            search() {

            },
            clean() { //清空搜索框
                this.formData = {
                    level: '',
                    name: '',
                    userId: ''
                }
            }
        }
    }
</script>


<style scoped>


</style>
