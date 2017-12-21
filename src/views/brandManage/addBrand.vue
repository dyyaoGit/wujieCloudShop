<template>
<div>
    <el-form :model="formData">
        <el-form-item label="品牌名">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌宣传语">
            <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="品牌图片">
            
        </el-form-item>
        <el-form-item label="品牌描述">
            <el-input type="textarea" v-model="formData.content"></el-input>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "联想",
        title: "因为拥有联想，世界充满希望",
        logo: "",
        content: "我是品牌描述"
      }
    };
  }
};
</script>
