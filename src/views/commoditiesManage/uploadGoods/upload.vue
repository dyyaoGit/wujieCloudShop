<template>
    <div class="wrap">
        <el-form :model="formData" size="small" style="width: 830px;" label-position="left" label-width="85px"
                 ref="form" :rules="rules">
            <el-form-item label="商品类型" class="item-wid" prop="type">
                <el-select v-model="formData.type">
                    <el-option v-for="item in initData.type" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" class="item-wid" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <h3>价格 <span style="font-size: 14px;">(元)</span></h3>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="会员等级1" label-width="90px" prop="level1">
                        <el-input v-model="formData.price.level1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会员等级2" label-width="90px" prop="level2">
                        <el-input v-model="formData.price.level2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="会员等级3" label-width="90px" prop="level3">
                        <el-input v-model="formData.price.level3"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会员等级4" label-width="90px" prop="level4">
                        <el-input v-model="formData.price.level4"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>



        <span>商品详情</span>
        <Tinymce v-model="content" :height="200"></Tinymce>
    </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'

    export default {
        components: {Tinymce},
        name: 'commoditiesManage',
        data() {
            let msg = '该信息为必填信息'
            return {
                formData: {
                    type: '',   //商品分类
                    name: '',  //商品名称
                    //商品规格
                    spec: {
                        name: '',
                        tag: []
                    },
                    spec1: [
                        {
                            name: '',   //规格名称
                            tag: [{label: ''}] //标签名称
                        }


                    ],
                    price: {
                        level1: '',
                        level2: '',
                        level3: '',
                        level4: ''
                    }
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
                },
                editor: null,
                config: {
                    toolbar: [
                        ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                    ],
                    height: 300
                },
                content: '',
                rules: {
//                    type: [{required: true, message: msg, trigger: 'change'}],
                    name: [{required: true, message: msg, trigger: 'blur'}],
                    level1: [{required: true, message: msg, trigger: 'blur'}],
                    level2: [{required: true, message: msg, trigger: 'blur'}],
                    level3: [{required: true, message: msg, trigger: 'blur'}],
                    level4: [{required: true, message: msg, trigger: 'blur'}],
                }
            }
        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        methods: {}
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
