<template>
    <alert-v v-on:close="close" v-on:submitMessage="submitList('ruleForm')">
        <span slot="name">{{message.type===0?'新增':'编辑'}}产品</span>
        <div class="activeSetting" style="margin-bottom: 200px;" slot="con">
            <wjcon>
                <span slot="tit">优惠券信息</span>
                <template slot="main">
                    <el-form :label-width="formLabelWidth">

                        <!-- 优惠券名称 -->
                        <el-form-item label="产品名称">
                            <el-input v-model="form.productName" clearable placeholder="请输入产品名称">
                            </el-input>
                        </el-form-item>

                        <!-- 优惠券名称 -->
                        <el-form-item label="产品链接">
                            <el-input v-model="form.productUrl" clearable placeholder="请输入产品链接">
                            </el-input>
                        </el-form-item>

                         <!-- 产品图片 -->
                        <el-form-item label="产品图片" prop="img">
                        <label class="smallHandle" for="upbanner">上传</label>
                        （图片请选择500k以下）
                        <input type="file" id="upbanner" name="fileToUpload" class="fileToUpload" @change="upImg" accept="image/jpg,image/jpeg,image/png" />
                        </el-form-item>
                        <el-form-item v-loading.body="loading">
                            <img style="max-width:300px; max-height:300px;" :src="form.productImg" alt="" />
                        </el-form-item>

                    </el-form>
                </template>
            </wjcon>
        </div>
    </alert-v>
</template>

<script>
    import { addConfig, upImg, updateConfig, getById} from "@/api/productConfig/addOrEdit.js";
    import alert from "@/components/alert.vue";
    export default {
        data() {
            return {
                loading: false,
                formLabelWidth: '100px',
                subLoading: false,
                selectLoading: false,
                appList: [],
                show22: false,
                form: {
                    productName:'',
                    productUrl: '',
                    productImg: '',
                },
            }
        },
        props: [
            'message'
        ],
        components: {
            "alert-v": alert,
        },
        methods: {
            upImg() { //上传图片
                let reader = new FileReader();
                let input = document.getElementById("upbanner");
                let files = input.files;
                if (/image\/\w+/.test(files[0].type)) {
                    reader.readAsDataURL(files[0]);
                    reader.onload = () => {
                        if (files[0].size > 512000) {
                            this.$message({
                                message: '请选择小于500k的图片',
                                duration: this.Util.time()
                            });
                            input.value = '';
                        } else {
                            this.loading = true;
                            let param = new FormData();
                            param.append('file', files[0], files[0].name);
                            param.append('userId', this.User.getUserId());
                            upImg({
                                params: param,
                                progress: function(res) {
                                    console.log('上传中...');
                                }
                            }).then(res=>{
                                this.loading = false;
                                if (res.data.successed) {
                                    this.form.productImg = res.data.returnValue[0];
                                } else {
                                    this.form.productImg = '';
                                    this.$message.success({
                                        message: '上传失败，请重试',
                                        duration: this.Util.time()
                                    });
                                }
                            })
                        }
                    };
                };
            },
            submitList() {
                let message = this.Util.jm(this.form);
                if (message.productName.length <= 0 || message.productName.length > 10) {
                    this.$message.warning({
                        message: '请填写1-10字符的产品名称',
                        duration: this.Util.time()
                    });
                    return;
                };

                if (message.productUrl.length <= 0 ) {
                    this.$message.warning({
                        message: '请填写产品链接',
                        duration: this.Util.time()
                    });
                    return;
                };

                if (message.productImg.length <= 0) {
                    this.$message.warning({
                        message: '请上传图片',
                        duration: this.Util.time()
                    });
                    return;
                };

                this.$confirm('确定提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.submitMessage(message)
                }).catch((err) => {
                    console.log(err)
                });

            },
            submitMessage(message) {
                let _message = {};

                _message.productName = this.Util.trim(message.productName);
                _message.productUrl = this.Util.trim(message.productUrl);
                _message.productImg = message.productImg;

                this.subLoading = true;
                if (this.message.type === 0) {
                    addConfig( 
                        _message
                    ).then(res => {
                        this.subLoading = false;
                        if (res.data.successed) {
                            this.$emit('subSuccessed', '');
                            this.$notify({
                                title: '成功',
                                message: '新增成功！',
                                type: 'success',
                                duration: this.Util.time1()
                            });
                            this.close();
                        }
                    }).catch(error => {
                        this.subLoading = false;
                    })
                }else{
                    _message.id = this.message.message.id;//id
                    console.log(_message)
                    updateConfig(
                        _message
                    ).then(res => {
                        this.subLoading = false;
                        if (res.data.successed) {
                            this.$emit('subSuccessed', '');
                            this.$notify({
                                title: '成功',
                                message: '修改成功！',
                                type: 'success',
                                duration: this.Util.time1()
                            });
                            this.close();
                        }
                    }).catch(error => {
                        this.subLoading = false;
                    })
                }
            },
            close() {
                this.$emit('close', '')
            },
            getByIdd(){
                this.loading = true;
                getById({
                    id: this.message.message.id
                }).then( res => {
                    this.loading = false;
                    if(res.data.successed){
                        this.$message.success({
                            message: '获取配置详情成功',
                            duration: this.Util.time()
                        });
                        this.form.productName = res.data.returnValue.productName;
                        this.form.productUrl = res.data.returnValue.productUrl;
                        this.form.productImg = res.data.returnValue.productImg;
                    }else{
                        this.$message.error({
                            message: '获取配置详情失败',
                            duration: this.Util.time()
                        });
                    }
                })
            }
        },
        created(){
            if(this.message.type === 1 ){
                this.getByIdd();
            };
        }
    }
</script>

<style lang="scss">
    #upbanner {
        display: none;
    }

    .dialogCotainer {
        overflow: auto;
    }

    .smallHandle {
        padding: 10px 15px;
        border: 0;
        background: #20a0ff;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
    }

    .img100 {
        width: 90%;
    }
</style>