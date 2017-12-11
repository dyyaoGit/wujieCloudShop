<template>
    <div class="wrap">
        <el-form :model="formData" size="small">
            <el-form-item label="商品类型">
                <el-select v-model="formData.type">
                    <el-option v-for="item in initData.type" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" label-position="top">
                商品详情
                <!--<textarea  id="editorArea"></textarea>-->

                <textarea id="myfield" name="myfield" ref="myfield"></textarea>
                <!--<script id="container" name="content" type="text/plain">-->
                <!--这里写你的初始化内容-->
                <!--</script>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import CKEDITOR from "CKEDITOR";
    //import UE from 'ueditor'
    import Ckeditor from 'vue-ckeditor2'

    export default {
        name: 'commoditiesManage',
        components: {Ckeditor},
        data() {
            return {
                formData: {
                    type: ''
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
                    ]
                },
                editor: null,
                config: {
                    toolbar: [
                        ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
                    ],
                    height: 300
                },
                content: ''
            }
        },
        mounted() {
            this.$nextTick(()=>{
                CKEDITOR.replace("myfield", {height: "300px", width: "100%", toolbar: "Full"}); //初始化富文本
                this.editor = CKEDITOR.instances.myfield;
                console.log(this.editor)
                this.editor.on('paste',(evt) => {
                    console.log(evt)
                })
            })
        },
        methods: {
            onBlur(editor) {
                console.log(editor)
            },
            onFocus(editor) {
                console.log(editor)
            }
        }
    }
</script>


<style>
    .edit {
        z-index: 1;
    }

</style>
