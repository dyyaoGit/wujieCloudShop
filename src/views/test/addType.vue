<template>
    <div>
        <el-form style="width: 800px;" :inline="true">
            <el-form-item label="所有分类">
                <el-select v-model="selected" placeholder="请选择所属一级分类" @change="change">
                    <el-option
                        v-for="item in selectData"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="changeIt" type="danger">
                    编辑该分类
                </el-button>
                <el-button @click="add" type="warning" v-if="isCanAdd">
                    添加子分类
                </el-button>
                <!--<el-button @click="addCommon">-->
                    <!--添加一级分类-->
                <!--</el-button>-->
            </el-form-item>
        </el-form>

        <el-form v-if="isShowEdit" style="width: 800px;" label-position="left">
            <el-form-item label="编辑分类" label-width="68px">
                <el-input v-model="editParent" ref="edit">
                    <el-button slot="append" @click="removeOne">删除该分类</el-button>
                </el-input>
            </el-form-item>
        </el-form>

        <div v-if="typeArray.length === 0 && selected && addChildren.length === 0">
            该分类没有子分类
        </div>

        <el-form label-width="60px" style="width: 800px;" label-position="left" v-else>
            <el-form-item label="子分类" v-for="(item,index) in typeArray" :key="index">
                <el-input v-model="typeArray[index].name" :disabled="true">
                </el-input>
            </el-form-item>
            <el-form-item label="子分类" v-for="(item,index) in addChildren" :key="index">
                <el-input v-model="addChildren[index].name" >
                    <el-button slot="append" @click="removeSelf(index)">删除该分类</el-button>
                </el-input>
                <el-button type="danger" @click="saveAdd(index)" style="margin-top: 20px;">保存</el-button>
            </el-form-item>
        </el-form>

        <el-button type="danger" style="margin-top: 50px;" @click="save" v-if="isShowEdit && editParent">
            保存修改
        </el-button>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                formData: {
                    common: {
                        label: '',
                        value: ''
                    }
                },
                typeArray: [],  //用于拥有子分类的显示
                selectData: [], //
                selected: '',  //当前选择的分类
                res: [],       //获取到的ajax的数据备份
                index: '',       //当前选中的值的index
                isShowEdit: false,
                editParent: '',
                addChildren: [] // 增加的子分类的数组
            }
        },
        methods: {
            append() {
                console.log('append')
            },
            changeIt() {
                this.isCanAdd = false;
                if(this.index == 0){
                    this.$message.warning('添加顶级分类标签不可更改')
                }
                else{
                    this.isShowEdit = true;
                    this.editParent = this.res[this.index].name;
                }

            },
            add() {
                if(this.addChildren.length>0){
                    this.$message('分类只能逐条添加并保存')
                }
                else{
                    this.addChildren.push({name: ''})
                }
            },
            change(val) {
                this.isShowEdit = false;
                this.isCanAdd = true;
                this.index = this.res.findIndex(vl =>  vl.id == val)
                this.typeArray = [];
                this.addChildren = [];
                this.res.forEach(vl => {
                    if(vl.parent_id == val){
                        this.typeArray.push(vl)
                    }
                })
            },
            getData() {
                this.$axios.get('getTypeList', {}, res => {
                    this.selectData.push({name: '添加顶级分类', id: '0', parent_id: 'max'})
                    this.res.push({name: '添加顶级分类', id: 0, parent_id: 'max'})
                    res.forEach(val => {
                        this.res.push(val)
                        let json = {name: val.name}
                        for(let i = 0; i <= val.level; i++){
                            json.name = '#' + json.name;
                        }
                        json.parent_id = val.parent_id;
                        json.id = val.id;
                        this.selectData.push(json)
                    })
                })
            },
            removeSelf(index) {
                this.addChildren.splice(index, 1)
            },
            removeOne() {
                this.$confirm('此操作将永久删除该分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('deleteType', {id: this.res[this.index].id}, res => {
                        if(res.ret == true){
                            this.$message.success('删除成功！正在刷新数据...')
                            setTimeout(() => {this.$router.go(0)} , 1500)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            save() { //保存更改
                if(this.isShowEdit && this.editParent){
                    this.$axios.post('updateType', {id: this.selected, name: this.editParent}, res => {
                        if(res.ret == true){
                            this.$message.success('修改成功!正在刷新数据...');
                            setTimeout(() => {this.$router.go(0);} , 1500)
                        }
                    })
                }
                else{
                    this.$message('您还没有改动任何数据');
                }
            },
            saveAdd(index) { //保存增加
                this.$axios.post('addType', {parent_id: this.selected, name: this.addChildren[index].name}, res => {
                    if(res.ret == true){
                        this.$message.success('添加成功！正在刷新数据...')
                        setTimeout(() => {this.$router.go(0);} , 1500)
                    }
                })
            }
        },
        mounted() {
            this.getData();
        },
        computed: {
            isCanAdd() {
                console.log(this.selected)
                if(this.selected.trim() == ''){
                    return false
                }
                else{
                    return true;
                }
            }
        }
    }
</script>


<style scoped>


</style>
