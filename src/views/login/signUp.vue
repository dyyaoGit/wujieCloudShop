<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
                 class="card-box login-form">
            <h3 class="title">注册无界云店</h3>
            <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="手机号码" >
                    <el-button slot="append">{{time}}</el-button>
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                          placeholder="请输入短信验证码">
                </el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { isvalidUsername } from '@/utils/validate'

    export default {
        name: '',
        data() {
            const validateUsername = (rule, value, callback) => { //用户名验证
                let reg = /0?(13|14|15|17|18|19)[0-9]{9}/
                if (!reg.test(value.trim())) {
                    callback(new Error('请输入正确的手机号码'))
                } else {
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => { //密码验证
                if (value.length < 7) {
                    callback(new Error('请输入验证码'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePass }]
                },
                loading: false,
                pwdType: 'password',
                time: '获取验证码'
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
                        this.$axios.post('getMsg',{phone: this.loginForm.username}, res => {
                            console.log(res)
//                            this.$router.push('/')
                            this.loading = false;
                        })




                    } else {
                        console.log('error submit!!') //此处登录验证不通过，提示用户输入正确的信息
                        this.loading = false;
                        return false
                    }
                })
            },
            getCode() {
                let reg = /0?(13|14|15|17|18|19)[0-9]{9}/
                if(reg.test(this.loginForm.username.trim())){
                    this.$axios.post('getMsg',{phone: this.loginForm.username}, res => {
                        this.time = 60;
                        let time = 60;
                        let timer = setInterval(() => {
                            this.time = --time;
                            if(time == 1){clearInterval(timer)}
                        }, 1000)
                    })
                }

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    $bg:#2d3a4b;
    $dark_gray:#889aa4;
    $light_gray:#eee;

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
            width: 500px;
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
            user-select:none;
        }
        .thirdparty-button{
            position: absolute;
            right: 35px;
            bottom: 28px;
        }
    }
</style>
