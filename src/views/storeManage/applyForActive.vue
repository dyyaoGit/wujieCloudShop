<template>
    <div>
        <h3>秒杀活动</h3>
        <el-table border :data="tableData" size="small">
            <el-table-column label="活动名" prop="name"></el-table-column>
            <el-table-column label="活动开始时间" prop="start_time"></el-table-column>
            <el-table-column label="结束时间" prop="end_time"></el-table-column>
            <el-table-column label="活动logo" prop="logo">
                <template slot-scope="scope">
                    <img :src="scope.row.logo" class="img-item-small">
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click.native="applyList(scope.row.id)">添加商品到该活动</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: '',
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getData() {
                this.$axios.get('getActivitiesList', {}, res => {
                    if(res.ret == true){
                        res.data.forEach(val => {
                            val.start_time = moment((val.start_time*1000)).format("YYYY-MM-DD HH:mm:ss")
                            val.end_time = moment((val.end_time*1000)).format("YYYY-MM-DD HH:mm:ss")
                        })
                        this.tableData = res.data;
                    }
                })
            },
            applyList(id) {
                this.$router.push({path:'goodsList', query: {id}})
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
