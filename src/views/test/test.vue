<template>
    <div>
        <el-form  size="small" :inline="true">
            <el-form-item label="规格名称">
                <el-input v-model="addData.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="add" type="primary" >添加规格</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="spec" border size="small">
            <el-table-column
                prop="name"
                label="规格名称"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="规格标签"
                width="300">
                <template slot-scope="scope">
                    <el-tag v-for="(val,idx) in scope.row.tag" :key="val.label" closable
                            @close="removeTag(scope.$index, idx)" style="margin-right: 5px;margin-bottom: 5px;">
                        {{val.label}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="标签名">
                <template slot-scope="scope">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-input v-model="scope.row.empty" size="small"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button @click="addTag(scope.$index)" type="danger" size="small">添加标签</el-button>
                        </el-col>
                    </el-row>

                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="remove(scope.$index)" size="small">移除该规格</el-button>
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
                addData: {
                    name: '',
                    tag: ''
                },
                spec: [{name: '颜色', tag: [{label: '黄色'}], empty: ''}]
            }
        },
        methods: {
            //添加规格
            add() {
                if (!this.addData.name.trim()) { //判断是否为空
                    this.$message({
                        message: '添加的规格名称不能为空',
                        type: 'warning'
                    });
                }
                else {
                    let canAdd = this.spec.some(val => val.name === this.addData.name.trim())
                    if(canAdd){ //判断是否和现有规格重名
                        this.$message({
                            message: '添加失败，不能添加相同的规格',
                            type: 'warning'
                        });
                    }
                    else{
                        let obj = {
                            name: this.addData.name,
                            tag: [],
                            empty: ''
                        }
                        this.spec.push(obj);
                        this.addData.name = '';
                    }
                }
            },
            //添加标签
            addTag(index) {
                if (!this.spec[index].empty.trim()) {   //判断是否为空
                    this.$message({
                        message: '添加的规格标签不能为空',
                        type: 'warning'
                    });
                }
                else {
                    let canAddTag = this.spec[index].tag.some(val => val.label === this.spec[index].empty)
                    if(canAddTag){ //判断是否重复
                        this.$message({
                            message: '添加的规格标签不能重复',
                            type: 'warning'
                        });
                    }
                    else{
                        this.spec[index].tag.push({label: this.spec[index].empty})
                        this.spec[index].empty = '';
                    }
                }
            },
            //移除规格
            remove(index) {
                this.spec.splice(index, 1);
            },
            //移除标签
            removeTag(index, idx) {
                this.spec[index].tag.splice(idx, 1)
            }
        }
    }
</script>


<style scoped>


</style>
