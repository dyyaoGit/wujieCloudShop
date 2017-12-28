<template>
    <div>
        我是测试页
        <div v-html="res">

        </div>
    </div>
</template>

<script>
    import ImgUp from '../goodsManage/imgUpload.vue'
    import bgDiv from '../../components/bgDiv.vue'
    import axios from 'axios'
    export default {
        name: '',
        components: {ImgUp,bgDiv},
        data() {
            return {
                formData: {
                    markImg: [],
                    markName: ''
                },
                tableData: [

                ],
                res: ''
            }
        },
        methods: {
           test() {
               axios.get('https://dev.api.gxczd.cn/v1/news', {params: {type: '咨询', id: 28}}).then(res => {
                   console.log(res)
               })
               axios.get('https://dev.api.gxczd.cn/v1/webUrl?type=资讯&id=23').then(res => {
                   console.log(res)
                   this.res = res.data;
               })
           }
        },
        mounted() {
            this.test()
        }
    }
</script>


<style scoped>
.test {

}

</style>
