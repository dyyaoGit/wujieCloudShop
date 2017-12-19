<template>
    <div>
        <el-form style="width: 800px;">
            <el-form-item label="添加标签">
                <el-input v-model="formData.markName"></el-input>
            </el-form-item>
            <el-form-item label="标签图片">
                <bgDiv :imgList="formData.markImg"></bgDiv>
                <ImgUp @uploadSuccess="upSuccess" :max="1"></ImgUp>
            </el-form-item>
            <el-form-item>
                <el-button @click="add" type="danger">
                    添加
                </el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" border>
            <el-table-column label="标签名" prop="markName"></el-table-column>
            <el-table-column label="标签图片" prop="markImg">
                <template slot-scope="scope">
                    <img :src="scope.row.markImg" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="remove(scope.$index)" type="danger">移除该标签</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import ImgUp from '../goodsManage/imgUpload.vue'
    import bgDiv from '../../components/bgDiv.vue'
    export default {
        name: '',
        components: {ImgUp,bgDiv},
        data() {
            return {
                formData: {
                    markImg: [],
                    markName: ''
                },
                tableData: [

                ]
            }
        },
        methods: {
            upSuccess(val) {
                this.formData.markImg = val;
            },
            add() {
                if(this.formData.markName.trim() && this.formData.markImg.length>0){
                    this.tableData.push({markImg: this.formData.markImg[0],markName: this.formData.markName})
                    this.formData = {
                        markImg: [],
                        markName: ''
                    }
                }
                else{
                    this.$message("标签名和ICON需要同时填写才能添加")
                }


            },
            remove(index) {
                this.tableData.splice(index, 1)
            }
        }
    }
</script>


<style scoped>


</style>
