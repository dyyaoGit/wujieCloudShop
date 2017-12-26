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

            <el-form-item label="商品库存" prop="stock">
                <el-input v-model.number="formData.stock"></el-input>
            </el-form-item>

        </el-form>

        <div>
            <el-form size="small" :inline="true">
                <el-form-item label="规格名称" label-width="85px" label-position="left">
                    <el-input v-model="addData.name" @keyup.enter.prevent="add"></el-input>
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

        <h3>价格 <span style="font-size: 14px;">(元)</span></h3>
        <el-form :model="price" size="small" style="width: 830px;" :rules="rules">
            <el-form-item label="普通会员" prop="common" label-width="90px">
                <el-input v-model.number="price.common"></el-input>
            </el-form-item>

            <el-form-item label="会员等级1" label-width="90px" prop="first">
                <el-input v-model.number="price.first"></el-input>
            </el-form-item>

            <el-form-item label="会员等级2" label-width="90px" prop="second">
                <el-input v-model.number="price.second"></el-input>
            </el-form-item>

            <el-form-item label="会员等级3" label-width="90px" prop="third">
                <el-input v-model.number="price.third"></el-input>
            </el-form-item>

            <el-form-item label="会员等级4" label-width="90px" prop="fourth">
                <el-input v-model.number="price.fourth"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="formData" :rules="rules" size="small">
            <el-form-item label="邮费(元)" prop="ems_price" label-width="90px">
                <el-input v-model.number="formData.ems_price"></el-input>
            </el-form-item>
        </el-form>
        <h4>商品轮播图</h4>
        <div class="img-list">
            <div :key="index" :style="'backgroundImage: url(' + item + ')'" v-for="(item, index) in formData.img"
                 class="div-img-item" @click="removeImg(index)"></div>
            <imgUpload class="clearfix" @uploadSuccess="upImgList"></imgUpload>
        </div>

        <span>商品详情</span>
        <Tinymce v-model="formData.content" :height="200"></Tinymce>
        <el-button @click="submitForm" type="danger" style="margin-top: 20px;" v-if="$route.name=='edit'">提交更改
        </el-button>
        <el-button @click="submitForm" type="danger" style="margin-top: 20px;" v-else>提交</el-button>
    </div>
</template>

<script>
    import imgUpload from '../imgUpload.vue'
    import Tinymce from '@/components/Tinymce'

    export default {
        components: {Tinymce, imgUpload},
        name: 'goodsManage',
        data() {
            let msg = '该信息为必填信息';
            let needNum = '此处必须填入数字'
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
//                        {
//                            颜色: [''],    //规格名称
//                            tag: ['黄色'],   //规格对应标签
//                            empty: ''               //临时存放
//                        }


                    ],
//                    common: '',
//                    first: '',
//                    second: '',
//                    third: '',
//                    fourth: '',
                    content: '',
//                    price: {   //各级会员价格
//                        common: '',
//                        first: '',
//                        second: '',
//                        third: '',
//                        fourth: ''
//                    },   由于表单验证需要，将其挪出，提交数据时合并即可
                    ems_price: '',     //邮费
                    img: [],    //商品轮播图
                    stock: '',   //商品库存
                    state: 0,     //上下架状态
                    browse_num: "5", //浏览量
                    share_num: 2, //分享量
                    agent_num: 0, //商品代理数
                },
                price: {
                    common: '',
                    first: '',
                    second: '',
                    third: '',
                    fourth: ''
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
                    type: [{required: true, message: msg, trigger: 'blur'}],
                    name: [{required: true, message: msg, trigger: 'blur'}],
                    common: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    first: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    second: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    third: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    fourth: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    stock: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    ems_price: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    title: [{required: true, message: msg, trigger: 'blur'}]
                }
            }
        },
        mounted() {
            this.$axios.get('getCategory', {}, res => { //获取分类列表
                this.selectionData = res.data;
            })
            if (this.$route.name === 'edit' && this.$route.query.id) {
                this.getEditData()
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
                    if (canAdd) { //判断是否和现有规格重名
                        this.$message({
                            message: '添加失败，不能添加相同的规格',
                            type: 'warning'
                        });
                    }
                    else {
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
                    if (canAddTag) { //判断是否重复
                        this.$message({
                            message: '添加的规格标签不能重复',
                            type: 'warning'
                        });
                    }
                    else {
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
            submitForm(address) {
                console.log(this.formData)
                let notEmptyTag = this.formData.products.some(val => val.tag.length === 0)  //判断是否有规格的标签未填写
                if (notEmptyTag) {
                    this.$message({
                        message: '存在未添加标签的规格，请检查规格列表是否为填写完整',
                        type: 'warning'
                    });
                }
                else {
                    let canSubmit = !this.formData.type || !this.formData.name || !this.price.common || !this.price.first || !this.price.second || !this.price.third || !this.price.fourth;
                    if (canSubmit) {
                        this.$message({
                            message: '请检查是否填写完整必填信息',
                            type: 'warning'
                        })
                    }
                    else { //提交操作
                        if (this.formData.type.length > 1) {
                            this.formData.f_cid = this.formData.type[0];
                            this.formData.s_cid = this.formData.type[1];
                        }
                        else {
                            this.formData.f_cid = this.formData.type[0]
                        }

                        this.formData.products = this.formData.products.map(val => {
                            return {"name": val.name, "tag": val.tag}
                        })  //去除所有empty变量提交
                        this.formData = {...this.formData, price: {...this.price}}
                        let address = this.$route.name === 'edit' ? 'updateGood' : 'addGood'
                        this.$axios.post(address, this.formData, res => {
                            this.$message.success('添加商品成功，正在跳转商品列表...')
                            setTimeout(() => {
                                this.$router.push('GoodsList')
                            }, 1500)
                        })
                    }
                }
            },
            handleChange(val) {
                console.log(val)
            },
            upImgList(arr) {
                if (arr.length > 0) {
                    arr.forEach(val => {
                        this.formData.img.push(val)
                    })
                }
            },
            removeImg(index) {
                this.formData.img.splice(index, 1)
            },
            getEditData() {
                this.$axios.get('getGoodList', {id: this.$route.query.id}, res => {
                    this.formData = {...this.formData, ...res.data[0]}
                    this.price = {...res.data[0].price}  //此处因为数据不是在formData中，所以，将数据回填到price。
                    console.log(res.data[0].price)
                    if (res.data[0].s_category) {
                        this.formData.type = [res.data[0].f_category.id, res.data[0].s_category.id]
                    }
                    else {
                        this.formData.type = [res.data[0].f_category.id]
                    }
                })
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
