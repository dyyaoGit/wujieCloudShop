<template>
    <div>
        <div class="bg-img"
             v-for="(item,index) in imgList"
             :style="'background-image: url(' + item + '); width:' + width + 'px; height: '+ height + 'px; line-height: ' + height + 'px;'"
             @click="remove(index)"
             >
        </div>
        <div class="bg-img" v-if="currentImg.trim()!== ''"
             :style="'background-image: url(' + currentImg + '); width:' + width + 'px; height: '+ height + 'px; line-height: ' + height + 'px;'"
             @click="removeSelf"
        >
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            height: {
                type: Number,
                default: 200
            },
            width: {
                type: Number,
                default: 200
            },
            imgList: {
                type: Array
            },
            imgStr: {
                type: String
            },
            isCanEdit: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                currentImg: this.imgStr || ''
            }
        },
        methods: {
            remove(index) {
                if(this.isCanEdit){
                    this.imgList.splice(index, 1);
                }
            },
            removeSelf() {
                if(this.isCanEdit){
                    this.currentImg = ''
                }
            }
        },
        mounted() {
            console.log(this.imgList)
        },
        watch: {
            imgStr(val) {
                this.currentImg = val;
            }
        }
    }

</script>

<style scoped>
    .bg-img {
        position: relative;
        display: block;
        float: left;
        width: 200px;
        height: 200px;
        border-radius: 8px;
        border: 1px dashed #999;
        margin: 0 10px 10px 0;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .bg-img:hover::after {
        font-family:"iconfont" !important;
        font-size:40px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        content: '\e617';
        text-align: center;
        line-height: 200px;
        color: rgba(255,255,255,.5);
        background-color: rgba(0,0,0,.5);
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
</style>
