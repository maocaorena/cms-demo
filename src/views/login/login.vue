<template>
    <div id="login" v-loading.body="loading" element-loading-text="登录中...">
        <div class="login-wrapper">
            <el-form ref="form" :model="form" label-width="80px">
                <h3 class="title">算命后台登录</h3>
                <el-form-item label-width="0">
                    <el-input placeholder="请输入账号" clearable v-model="form.username">
                        <template slot="prepend">
                            <div class="start">账号：</div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-input placeholder="请输入密码" clearable type="passWord" v-model="form.password">
                        <template slot="prepend">
                            <div class="start">密码：</div>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item :inline="true" label-width="0">
                    <el-col :span="15">
                        <el-input placeholder="请输入验证码" clearable v-model="form.imgValidateCode">
                            <template slot="prepend">
                                <div class="start">验证码：</div>
                            </template>
                        </el-input>
                    </el-col>
                    <el-col :span="2">
                        <div style="height: 10px;"></div>
                    </el-col>
                    <el-col :span="7">
                        <img @click="getPiccode" style="width: 100%;height: 100%;" :src="piccode" />
                    </el-col>
                </el-form-item>
                <el-form-item label-width="0">
                    <div id="loginIn" @click="login">
                        登录
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { login } from "@/api/login/login.js"
    import { md } from '@/utils/md5.js';
    import $ from 'jquery';
    export default {
        data() {
            return {
                piccode: this.Util.nowUrl() + "getImgValidate?width=200&height=80&is_create_interference_line=true&interference_line_num=0",
                form: {
                    username: '',
                    password: '',
                    imgValidateCode: '',
                },
                loading: false
            }
        },
        methods: {
            //获取图片验证码
            getPiccode(event) {
                event.target.src = this.piccode + '&' + new Date().getTime();
            },
            login() {
                if (this.Util.trim(this.form.username).length <= 0) {
                    this.$message.error({
                        message: '请输入账号',
                        duration: this.Util.time()
                    });
                } else if (this.Util.trim(this.form.password).length <= 0) {
                    this.$message.error({
                        message: '请输入密码',
                        duration: this.Util.time()
                    });
                } else if (this.Util.trim(this.form.imgValidateCode).length <= 0) {
                    this.$message.error({
                        message: '请输入验证码',
                        duration: this.Util.time()
                    });
                } else {
                    this.loading = true;
                    login({
                        username: this.Util.trim(this.form.username),
                        password: md.md5(this.form.password),
                        imgValidateCode: md.md5(this.Util.trim(this.form.imgValidateCode))
                    }).then(res => {
                        this.loading = false;
                        if (res.data.successed) {
                            this.Storage.setItem('uf', res.data.returnValue);
                            this.$router.replace({
                                path: '/layout'
                            })
                        }
                    }).catch((e) => {
                        this.loading = false;
                    });
                };
            },
        },
        mounted() {
            $(document).on('keydown', event => {
                if (event.keyCode === 13) {
                    this.login()
                };
            })
        },
        beforeDestroy() {
            $(document).off('keydown');
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "./login";
</style>