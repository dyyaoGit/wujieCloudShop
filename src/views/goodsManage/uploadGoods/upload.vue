<template>
    <div class="wrap" :key="$route.name === 'edit' ? 'edit' : 'upload'">
        <el-form :model="formData" size="small" style="width: 830px;" label-position="right" label-width="85px"
                 ref="form" :rules="rules">
            <el-form-item label="商品类型" class="item-wid" prop="type">

                <el-cascader
                    :options="selectionData"
                    v-model="formData.type"
                    :props="{value: 'id',label: 'name'}"
                    @change="handleChange">
                </el-cascader>

            </el-form-item>
            <el-form-item label="商品名称" class="item-wid" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="商品简介">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input v-model="formData.stock"></el-input>
            </el-form-item>
        </el-form>

        <div>
            <el-form  size="small" :inline="true">
                <el-form-item label="规格名称" label-width="85px" label-position="left">
                    <el-input v-model="addData.name"></el-input>
                </el-form-item>
                <el-form-item required>
                    <el-button @click="add" type="primary" required>添加规格</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="formData.products" border size="small" v-if="formData.products.length>0">
                <el-table-column
                    prop="name"
                    label="规格名称"
                    width="150">
                    <template slot-scope="scope">
                        <h2 style="color: #000;">{{scope.row.name}}</h2>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--label="规格标签"-->
                    <!--width="300">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-tag v-for="(val,idx) in scope.row.tag" :key="val" closable type="danger"-->
                                <!--@close="removeTag(scope.$index, idx)" style="margin-right: 5px;margin-bottom: 5px;">-->
                            <!--{{val}}-->
                        <!--</el-tag>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="标签名">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-row :gutter="20">-->
                            <!--<el-col :span="16">-->
                                <!--<el-input v-model="scope.row.empty" size="small"></el-input>-->
                            <!--</el-col>-->
                            <!--<el-col :span="8">-->
                                <!--<el-button @click="addTag(scope.$index)" type="danger" size="small">添加标签</el-button>-->
                            <!--</el-col>-->
                        <!--</el-row>-->

                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column label="添加标签">
                    <template slot-scope="scope">
                        <el-select
                            style="width: 300px"
                            size="middle"
                            v-model="formData.products[scope.$index].tag"
                            multiple
                            filterable
                            allow-create
                            :filterable="true"
                            :default-first-option="true"
                            placeholder="请填写标签名,并回车添加">
                            <el-option
                                v-for="item in formData.products[scope.$index].tag"
                                :key="item"
                                v-model="inputData"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="remove(scope.$index)" size="small" type="warning">移除该规格</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-form :model="formData.price" size="small" style="width: 830px;" :rules="rules">
            <h3>价格 <span style="font-size: 14px;">(元)</span></h3>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="会员等级1" label-width="90px" prop="common">
                        <el-input v-model="formData.price.common"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会员等级2" label-width="90px" prop="first">
                        <el-input v-model="formData.price.first"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="会员等级3" label-width="90px" prop="second">
                        <el-input v-model="formData.price.second"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会员等级4" label-width="90px" prop="third">
                        <el-input v-model="formData.price.third"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="邮费(元)">
                <el-input v-model="formData.ems_price"></el-input>
            </el-form-item>
        </el-form>
        <h4>商品轮播图</h4>
        <div class="img-list">
            <div  :style="'backgroundImage: url(' + item + ')'" v-for="(item, index) in formData.img" class="div-img-item" @click="removeImg(index)"></div>
            <imgUpload class="clearfix" @uploadSuccess="upImgList"></imgUpload>
        </div>

        <span>商品详情</span>
        <Tinymce v-model="formData.content" :height="200"></Tinymce>

        <el-button @click="submitForm" type="danger" style="margin-top: 20px;">提交</el-button>
    </div>
</template>

<script>
    import imgUpload from '../imgUpload.vue'
    import Tinymce from '@/components/Tinymce'

    export default {
        components: {Tinymce, imgUpload},
        name: 'goodsManage',
        data() {
            let msg = '该信息为必填信息'
            return {
                inputData: '',
                testData: '',
                addData: {
                    name: '',
                    tag: ''
                },
                selectionData: [],
                formData: {
                    f_cid: 0,   //一级分类表ID
                    s_cid: 0,   //二级分类ID
                    type: [],   //商品分类
                    name: '',  //商品名称
                    title: '',  //商品简介
                    products: [     //商品规格
                        {
                            name: '颜色',    //规格名称
                            tag: ['黄色'],   //规格对应标签
                            empty: ''               //临时存放
                        }
                    ],
                    content: '',
                    price: {   //各级会员价格
                        common: '',
                        first: '',
                        second: '',
                        third: ''
                    },
                    ems_price: '',     //邮费
                    img: [],    //商品轮播图
                    stock: '',   //商品库存
                    state: 0,     //上下架状态
                    browse_num: 0, //浏览量
                    share_num: 0, //分享量
                    agent_num: 0, //商品代理数
                },
                initData: {
                    type: [
                        {
                            name: '数码',
                            id: 1
                        },
                        {
                            name: '互联网',
                            id: 2
                        },
                        {
                            name: '金融',
                            id: 3
                        }
                    ],
                    tag: [{label: '商用', id: 111}, {label: '民用', id: 222}]
                }, //初始化数据
                editor: null,
                config: {   //富文本设置
                    toolbar: [
                        ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                    ],
                    height: 300
                },
                rules: {
                    name: [{required: true, message: msg, trigger: 'blur'}],
                    common: [{required: true, message: msg, trigger: 'blur'}],
                    first: [{required: true, message: msg, trigger: 'blur'}],
                    second: [{required: true, message: msg, trigger: 'blur'}],
                    third: [{required: true, message: msg, trigger: 'blur'}],
                }
            }
        },
        mounted() {
            console.log(this.$route.name)
            this.$axios.get('getCategory',{},res => { //获取分类列表
                console.log(res)
                this.selectionData = res.data;
            })
            if(this.$route.name === 'edit' && this.$route.query.id){
                this.$axios.get('getGoodList', {id: this.$route.query.id}, res => {

                })
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
                    let canAdd = this.formData.products.some(val => val.name === this.addData.name.trim())
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
                        this.formData.products.push(obj);
                        this.addData.name = '';
                    }
                }
            },
            //添加标签
            addTag(index) {
                if (!this.formData.products[index].empty.trim()) {   //判断是否为空
                    this.$message({
                        message: '添加的规格标签不能为空',
                        type: 'warning'
                    });
                }
                else {
                    let canAddTag = this.formData.products[index].tag.some(val => val.label === this.formData.products[index].empty)
                    if(canAddTag){ //判断是否重复
                        this.$message({
                            message: '添加的规格标签不能重复',
                            type: 'warning'
                        });
                    }
                    else{
                        this.formData.products[index].tag.push(this.formData.products[index].empty)
                        this.formData.products[index].empty = '';
                    }
                }
            },
            //移除规格
            remove(index) {
                this.formData.products.splice(index, 1);
            },
            //移除标签
            removeTag(index, idx) {
                this.formData.products[index].tag.splice(idx, 1)
            },
            submitForm() {
                console.log(this.formData)
                let notEmptyTag = this.formData.products.some(val => val.tag.length === 0)  //判断是否有规格的标签未填写
                if(false){
                    this.$message({
                        message: '存在未添加标签的规格，请检查规格列表是否为填写完整',
                        type: 'warning'
                    });
                }
                else{
                    let canSubmit = !this.formData.type || !this.formData.name || !this.formData.price.common || !this.formData.price.first || !this.formData.price.second || !this.formData.price.third;
                    if(false){
                        this.$message({
                            message: '请检查是否填写完整必填信息',
                            type: 'warning'
                        })
                    }
                    else{ //提交操作
                        if(this.formData.type.length>1){
                            this.formData.f_cid = this.formData.type[0];
                            this.formData.s_cid = this.formData.type[1];
                        }
                        else{
                            this.formData.f_cid = this.formData.type[0]
                        }

                       this.formData.products = this.formData.products.map(val => {return {"name": val.name, "tag": val.tag}})  //去除所有empty变量提交
                        this.$axios.post('addGood', this.formData, res => {
                            console.log(res)
                            alert('发送成功')
                        })

                    }
                }


            },
            handleChange(val){
                console.log(val)
            },
            upImgList(arr) {
                if(arr.length>0){
                    arr.forEach(val => {
                        this.formData.img.push(val)
                    })
                }
            },
            removeImg(index) {
                this.formData.img.splice(index, 1)
            }
        }
    }
</script>


<style>
    .content {
        border: 1px solid #5a5e66;
        min-height: 200px;
    }

    .item-wid .el-select {
        width: 750px;
    }
</style>
