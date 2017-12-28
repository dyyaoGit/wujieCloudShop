<template>
    <div>
        <div>
            <el-form :model="formData" label-width="80px" label-position="left" size="small">
                <el-form-item label="素材描述">
                    <el-input type="textarea" :rows="3" v-model="formData.content" :disabled="true"></el-input>
                </el-form-item>
            </el-form>

            <div class="img-container clearfix">
                <div :style="'backgroundImage: url(' + item + ')'" v-for="(item, index) in formData.img" class="div-img-item" ></div>
            </div>

            <el-button @click="$router.back()" type="danger">
                返回
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'fodderManage',
        data() {
            return {
                formData: {
//                    name: '花花公子官方素材',
                    content: '',
                    img: []
                }
            }
        },
        methods: {
            getEditData() {
                this.$axios.get('getFodder', {id: this.$route.query.id}, res => {
                    this.formData = res.data[0];
                })
            }
        },
        mounted() {
            this.getEditData();
        }
    }
</script>


<style scoped>
    .img-container {
        margin-top: 20px;
        padding: 10px;

    }


</style>
