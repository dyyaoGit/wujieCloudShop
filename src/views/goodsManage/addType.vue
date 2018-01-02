<template>
    <div>
        <el-form :model="formData" label-width="100px" label-position="right" style="width: 800px;">
            <el-form-item label="所属父级分类" >
                <el-select v-model="formData.parent_id">
                    <el-option-group label="顶级分类">
                        <el-option v-for="item in typeList" :value="item.id" :label="item.name" :key="item.id" v-if="item.rank == 0"></el-option>
                    </el-option-group>
                    <el-option-group label="一级分类">
                        <el-option v-for="item in typeList" :value="item.id" :label="item.name" :key="item.id" v-if="item.rank == 1"></el-option>
                    </el-option-group>
                    <el-option-group label="二级分类">
                        <el-option v-for="item in typeList" :value="item.id" :label="item.name" :key="item.id" v-if="item.rank == 2"></el-option>
                    </el-option-group>
                    <!--<el-option v-for="item in typeList" :value="item.id" :label="item.name" :key="item.id"></el-option>-->
                </el-select>
            </el-form-item>
            <el-form-item label="分类名">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <bgDiv :imgStr="formData.img"></bgDiv>
                <imgUpload @uploadSuccess="upload"></imgUpload>
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
    import imgUpload from '@/components/imgUpload.vue'
    import bgDiv from '@/components/bgDiv.vue'
    export default {
        name: '',
        components: {imgUpload, bgDiv},
        data() {
            return {
                typeList: [],
                formData: {
                    name: '',
                    parent_id: '',
                    img: ''
                }
            }
        },
        methods: {
            save() {
                console.log(this.formData);
                if(this.formData.name.trim()!== '' && this.formData.parent_id!== '' && this.formData.img){  //此处id防止js 0自动转换为false
                    this.$axios.post('addType', this.formData, res => {
                        if(res.ret == true){
                            this.$message.success('添加成功!正在刷新数据...');
                            setTimeout(() => {this.$router.back();} , 1500)
                        }
                    })
                }
                else{
                    this.$message.warning('请确认填写完整信息')
                }
            },
            getData() {
                this.$axios.get('getTypeList', {}, res => {
                    this.typeList = res.data;
                    this.typeList.splice(0, 0, {name: '添加为一级分类', id: 0, rank: 0})
//                    this.typeList.forEach(val => {
//                        for(let i = 0; i<val.rank; i++){
//                            val.name = `|        ` + val.name;
//                        }
//                    })
                })
            },
            upload(val) {
                console.log(val)
                this.formData.img = val[0];
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>


<style scoped>


</style>
