<template>
    <div>
        <el-table :data="tableData" border style="width: 100%"  v-loading="loading">
            <el-table-column prop="content" label="素材描述" width="180"></el-table-column>
            <el-table-column prop="content" label="素材图预览" >
                <template slot-scope="scope">
                    <img class="fodder-item" :src="item" v-for="(item, index) in scope.row.img" v-if="index<3">
                </template>
            </el-table-column>
            <el-table-column prop="content" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="showDetails(scope.row.id)">查看素材详细</el-button>
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
//                        img: [],  // 图片数组
//                        content: ''    //素材描述
//                    }
                ],
                loading: false
            }
        },
        methods: {
            getData() {
                this.loading = true;
                this.$axios.get('getFodder', {goods_id: this.$route.query.id}, res => {
                    this.loading = false;
                    this.tableData = res.data;
                })
            },
            showDetails(id) {
                this.$router.push({path: 'fodderDetails', query: {id}})
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>
    .fodder-item {
        width: 100px;
        height: 100px;
        margin-right: 10px;
        overflow: hidden;
    }

</style>
