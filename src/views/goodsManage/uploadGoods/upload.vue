<template>
    <div class="wrap" :key="$route.name === 'edit' ? 'edit' : 'upload'">
        <h3>商品基本信息</h3>
        <el-form :model="formData" size="mini" style="width: 800px;" label-position="right" label-width="120px"
                 ref="form" :rules="rules">
            <el-form-item label="商品类型" class="item-wid" prop="type">
                <el-cascader
                    :options="selectionData"
                    v-model="formData.type"
                    :props="{value: 'id',label: 'name'}"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
            <el-form-item label="标签">
                <el-select v-model="formData.tag_id" multiple :multiple-limit="3" placeholder="可多选，最多三个">
                    <el-option v-for="(item, index) in tags" :key="index" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
                <el-select v-model="formData.brand_id">
                    <el-option v-for="(item, index) in brands" :key="index" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" class="item-wid" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="商品简介">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
        </el-form>

        <div>
            <el-form size="mini" :inline="true" label-width="120px" @submit.native.prevent>
                <el-form-item label="规格名称"  label-position="left">
                    <el-input v-model="addData.name" @keyup.enter.native.prevent="add"></el-input>
                </el-form-item>
                <el-form-item required>
                    <el-button @click="add" type="primary" required>添加规格</el-button>
                </el-form-item>
            </el-form>

            <el-table :data="formData.products" border size="mini" v-if="formData.products.length>0">
                <el-table-column
                    prop="name"
                    label="规格名称"
                    width="150">
                    <template slot-scope="scope">
                        <h2 style="color: #000;">{{scope.row.name}}</h2>
                    </template>
                </el-table-column>

                <el-table-column label="库存">
                    <template slot-scope="scope">
                        <el-input v-model="formData.products[scope.$index].stock"
                            @keyup.enter.native
                            size="mini"
                            placeholder="请输入该规格的库存"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="remove(scope.$index)" size="mini" type="warning">移除该规格</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <h3>价格 <span style="font-size: 14px;">(元)</span></h3>
        <el-form :model="formData" size="mini" class="form-width" :rules="rules" label-width="120px">
            <el-form-item label="普通会员" prop="common" >
                <el-input v-model.number="formData.common"></el-input>
            </el-form-item>

            <el-form-item label="会员等级1"  prop="first">
                <el-input v-model.number="formData.first"></el-input>
            </el-form-item>

            <el-form-item label="会员等级2"  prop="second">
                <el-input v-model.number="formData.second"></el-input>
            </el-form-item>

            <el-form-item label="会员等级3"  prop="third">
                <el-input v-model.number="formData.third"></el-input>
            </el-form-item>

            <el-form-item label="会员等级4"  prop="fourth">
                <el-input v-model.number="formData.fourth"></el-input>
            </el-form-item>
        </el-form>
        <h3>发货信息</h3>
        <el-form :model="formData" :rules="rules" size="mini" class="form-width" label-width="120px">
            <el-form-item label="邮费(元)" prop="ems_price">
                <el-input v-model.number="formData.ems_price"></el-input>
            </el-form-item>
            <el-form-item label="发货地" prop="s_address" >
                <el-input v-model="formData.s_address"></el-input>
            </el-form-item>
            <el-form-item label="采购地" prop="p_address" >
                <el-select v-model="formData.p_address">
                    <el-option v-for="item in countryData" :value="item.value" :key="item.id" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="采购地所在国家" prop="country" v-if="isShowSelect">
                    <el-select v-model="formData.country">
                        <el-option v-for="item in countryList" :label='`${item.en} ${item.ch}` ' :value="item.id" :key="item.id"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="库存类型" prop="stock_type"  v-if="isShowSelect">
                <el-select v-model="formData.stock_type">
                    <el-option label="现货" :value="1"></el-option>
                    <el-option label="保税仓" :value="2"></el-option>
                    <el-option label="海外直邮" :value="3"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <h3>商品轮播图</h3>
        <div class="img-list clearfix">
            <div :key="index" :style="'backgroundImage: url(' + item + ')'" v-for="(item, index) in formData.img"
                 class="div-img-item" @click="removeImg(index)"></div>
            <imgUpload  @uploadSuccess="upImgList"></imgUpload>
        </div>

        <span>商品详情</span>
        <Tinymce v-model="formData.content" :height="200"></Tinymce>
        <el-button @click="submitForm" type="danger" style="margin-top: 20px;" v-if="$route.name=='edit'">提交更改
        </el-button>
        <el-button @click="submitForm" type="danger" style="margin-top: 20px;" v-else>提交</el-button>
    </div>
</template>

<script>
    import imgUpload from '@/components/imgUpload.vue'
    import Tinymce from '@/components/Tinymce'

    export default {
        components: {Tinymce, imgUpload},
        name: 'goodsManage',
        data() {
            let msg = '该信息为必填信息';
            let needNum = '此处必须填入数字'
            return {
                inputData: '',
                tags: [], //存放所有的标签
                brands: [], //存放获取到的品牌列表
                addData: {
                    name: '',
                    tag: ''
                },
                selectionData: [],
                formData: {
                    gbl_id: 0,  //平台添加商品默认添加字段。默认为0
                    type: [],   //商品分类
                    p_address: '', //采购地   国内或者国外的
                    country: '',    //采购地国家
                    cat_id: '', //传输给后端使用的分类id。仅传最后一个选择的id。从type中取出
                    tag_id: [],//标签分类
                    brand_id: '', //商品品牌
                    name: '',  //商品名称
                    title: '',  //商品简介
                    products: [     //商品规格
//                        {
//                            颜色: [''],    //规格名称
//                            tag: ['黄色'],   //规格对应标签
//                            empty: ''               //临时存放
//                        }

                    ],
                    content: '',
                    ems_price: '',     //邮费
                    s_address: '',    //发货地
                    img: [],    //商品轮播图
                    stock_type: '', //库存类型
                    state: 0,     //上下架状态
                    browse_num: "5", //浏览量
                    share_num: 2, //分享量
                    agent_num: 0, //商品代理数
                    common: '',   //普通会员价格
                    first: '',    //1级会员价格
                    second: '',     //2级会员价格
                    third: '',      //3级会员价格
                    fourth: ''      //4级会员价格
                },
                countryList: [],
                countryData: [{label: '大陆', value: 0}, {label: '国外以及港澳台', value: 1}],
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
                    ems_price: [{required: true, message: needNum, trigger: 'blur', type: 'number'}],
                    title: [{required: true, message: msg, trigger: 'blur'}],
                    brand: [{required: true, message: msg, trigger: 'blur'}]
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
            this.getTags();
            this.getBrands();
            this.getCountry();
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
                            stock: ''
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
                let notEmptyTag = this.formData.products.some(val => val.stock.trim() == '')  //判断是否有规格的标签未填写
                if (notEmptyTag) {
                    this.$message({
                        message: '存在未添加标签的规格，请检查规格列表是否为填写完整',
                        type: 'warning'
                    });
                }
                else {
                    let canSubmit = !this.formData.type || !this.formData.name || !this.formData.common || !this.formData.first || !this.formData.second || !this.formData.third || !this.formData.fourth;
                    if (canSubmit) {
                        this.$message({
                            message: '请检查是否填写完整必填信息',
                            type: 'warning'
                        })
                    }
                    else { //提交操作
                        //选择分类选择表的最后一个id提交给后端
                        this.formData.cat_id = this.formData.type[this.formData.type.length-1];

                        //决定ajax提交的地址是新建还是修改
                        let address = this.$route.name === 'edit' ? 'updateGood' : 'addGood'

                        this.$axios.post(address, this.formData, res => {
                            this.$message.success('操作成功，正在跳转商品列表...')
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
                    this.formData.brand_id = res.data[0].brand.id
                    if (res.data[0].s_category) {
                        this.formData.type = [res.data[0].f_category.id, res.data[0].s_category.id]
                    }
                    else {
                        this.formData.type = [res.data[0].f_category.id]
                    }
                    this.formData.tag_id = res.data[0].tags.map(val => {
                        val = val.id;
                        return val;
                    })
                })
            },
            getTags() {
                this.$axios.get('getTag', {}, res => {
                    this.tags = res.data;
                })
            },
            getBrands() {
                this.$axios.get('getBrands', {}, res => {
                    this.brands = res.data;
                })
            },
            getCountry() {
                this.$axios.get('getCountry', {}, res => {
                    this.countryList = res.data;
                })
            }
        },
        computed: {
            isShowSelect () {
                return this.formData.p_address == 1;
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

<style scoped>
    .wrap h3 {
        font-weight: 200;
    }
</style>
