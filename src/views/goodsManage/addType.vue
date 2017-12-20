<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right" style="width: 800px;">
            <el-form-item label="所属父级分类" >
                <el-select v-model="formData.parent_id">
                    <el-option v-for="item in typeList" :value="item.id" :label="item.name" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-button type="danger" @click="save">
                添加该分类
            </el-button>
            <el-button type="primary" @click="$router.back()">
                返回
            </el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                typeList: [],
                formData: {
                    name: '',
                    parent_id: ''
                }
            }
        },
        methods: {
            save() {
                console.log(this.formData);
                if(this.formData.name.trim()!== '' && this.formData.parent_id!== ''){  //此处id防止js 0自动转换为false
                    this.$axios.post('addType', this.formData, res => {
                        if(res.ret == true){
                            this.$message.success('添加成功!正在刷新数据...');
                            setTimeout(() => {this.$router.back();} , 1500)
                        }
                    })
                }
            },
            getData() {
                this.$axios.get('getTypeList', {}, res => {
                    this.typeList = res;
                    this.typeList.splice(0, 0, {name: '添加为一级分类', id: 0, rank: 0})
                    this.typeList.forEach(val => {
                        for(let i = 0; i<val.rank; i++){
                            val.name = '#' + val.name;
                        }
                    })
                })
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
