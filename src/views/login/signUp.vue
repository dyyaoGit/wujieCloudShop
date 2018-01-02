<template>
    <div class="signUp-container">
        <el-form autoComplete="on" :model="signUpForm" :rules="loginRules" ref="signUpForm" label-position="left" label-width="0px"
                 class="card-box login-form">
            <h3 class="title">注册无界云店</h3>
            <el-form-item prop="phone">
                <el-input name="phone" type="text" v-model="signUpForm.phone" autoComplete="on" placeholder="手机号码" >
                    <el-button slot="append" @click="getCode">{{time}}</el-button>
                </el-input>
            </el-form-item>

            <el-form-item prop="code">
                <el-input name="code"   v-model="signUpForm.code" autoComplete="on"
                          placeholder="请输入短信验证码">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="code" :type="pwdType"  v-model="signUpForm.password" autoComplete="on"
                          placeholder="请输入您的密码">
                </el-input>
                <span class="show-pwd" @click="showPwd(false)"><svg-icon icon-class="eye" /></span>
            </el-form-item>
            <el-form-item prop="confirm">
                <el-input name="code" :type="pwdType1"  v-model="signUpForm.confirm" autoComplete="on"
                          placeholder="请确认您的密码">
                </el-input>
                <span class="show-pwd" @click="showPwd(true)"><svg-icon icon-class="eye" /></span>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="width:100%;"  @click.native.prevent="handleLogin">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { isvalidphone } from '@/utils/validate'

    export default {
        name: '',
        data() {
            const validatephone = (rule, value, callback) => { //用户名验证
                let reg = /0?(13|14|15|17|18|19)[0-9]{9}/
                if (!reg.test(value.trim())) {
                    callback(new Error('请输入正确的手机号码'))
                } else {
                    callback()
                }
            }
            const validateCode = (rule, value, callback) => { //验证码验证
                if ((value.trim().length!=4)) {
                    callback(new Error('请输入4位验证码'))
                } else {
                    callback()
                }
            }
            const validatePwd = (rule, value, callback) => { //密码验证
                if(value.trim() == ''){
                    callback(new Error('请输入密码'));
                }
                else{
                    callback();
                }
            }
            const validateCf = (rule, val, cb) => {
                if(val.trim() === ''){
                    cb(new Error('请确认您的密码'))
                }else if(val.trim() !== this.signUpForm.password){
                    cb(new Error('两次密码不一致'))
                }else{
                    cb();
                }
            }
            return {
                signUpForm: {
                    phone: '',
                    code: '',
                    password: '',
                    confirm: ''
                },
                loginRules: {
                    phone: [{ required: true, trigger: 'blur', validator: validatephone }],
                    code: [{ required: true, trigger: 'blur', validator: validateCode }],
                    password: [{required: true, trigger: 'blur', validator: validatePwd}],
                    confirm: [{required: true, trigger: 'blur', validator: validateCf}]
                },
                loading: false,
                pwdType: 'password',
                pwdType1: 'password',
                time: '获取验证码',
                isSend: false
            }
        },
        methods: {
            handleLogin() {
                this.$refs.signUpForm.validate(valid => {
                    if (valid) {
                        this.loading = true //如果验证信息通过 ，此处开始发送ajax登录
                        this.$axios.post('register', this.signUpForm, res => {
                            this.$message.success('恭喜您注册成功！正在为您进行跳转......')
                            setTimeout(() => {this.$router.push('/login'); this.loading = false}, 1500)

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
                if(reg.test(this.signUpForm.phone.trim())){
                    if(!this.isSend){
                        this.isSend = true;
                        this.$axios.post('getMsg',{phone: this.signUpForm.phone}, res => {
                            this.time = 60;
                            let time = 60;
                            let timer = setInterval(() => {
                                this.time = --time;
                                if(time == 0){
                                    clearInterval(timer)
                                    this.time = '获取验证码'
                                    this.isSend = false;
                                }
                            }, 1000)
                        })
                    }
                }
                else {
                    this.$message.warning('请输入正确的手机号码')
                }

            },
            showPwd(type=false) {
                console.log(type)
                if(!type){
                    this.pwdType = this.pwdType == '' ? 'password' : ''
                }
                else{
                    this.pwdType1 = this.pwdType1 == '' ? 'password' : ''
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

    .signUp-container {
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
