<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
            <h3 class="title">无界云店管理后台</h3>
            <el-form-item prop="phone">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
                <el-input name="phone" type="text" v-model="loginForm.phone" autoComplete="on"
                          placeholder="请输入手机号"/>
            </el-form-item>

            <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on"
                          placeholder="请输入密码"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"/></span>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>
            <div style="overflow: hidden;">
                <router-link to="/signUp" style="float: right; color: #39f;">没有账号？立即注册</router-link>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {isvalidphone} from '@/utils/validate'

    export default {
        name: 'login',
        data() {
            const validatephone = (rule, value, callback) => { //用户名验证
                console.log(isvalidphone(value.trim()))
                if (!isvalidphone(value.trim())) {
                    callback(new Error('请输入正确的手机号码'))
                } else {
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => { //密码验证
                if (value.length < 5) {
                    callback(new Error('密码不能小于5位'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    phone: '',
                    password: ''
                },
                loginRules: {
                    phone: [{required: true, trigger: 'blur', validator: validatephone}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}]
                },
                loading: false,
                pwdType: 'password'
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true //如果验证信息通过 ，此处开始发送ajax登录
                        this.$axios.post('login', this.loginForm, res => {
                            if(res.ret == true){
                                this.$message.success('登录成功，正在为您跳转首页...')
                                setTimeout(() => {this.$router.push('/'); this.loading = false}, 1500)
                            }
                        })
                        this.loading = false;

                    } else {
                        console.log('error submit!!') //此处登录验证不通过，提示用户输入正确的信息
                        this.loading = false;
                        return false
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";

    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        @include relative;
        height: 100vh;
        background-color: $bg;
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
        .thirdparty-button {
            position: absolute;
            right: 35px;
            bottom: 28px;
        }
    }
</style>
