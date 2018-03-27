<template>
    <div id="productConfig" class="wrapper flex flex-s">
        <div class="search-bar flex flex-hw">
            <div class="seach-bar-item flex flex-sc">
                <p>关键字：</p>
                <div class="item-wrapper" style="width:260px">
                    <el-input v-model="keywords" clearable placeholder="产品名称"></el-input>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <p>状态：</p>
                <div class="item-wrapper" style="width: 120px;">
                    <el-select v-model="state" clearable placeholder="请选择">
                        <el-option label="启用 " value="0"></el-option>
                        <el-option label="禁用" value="1"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <el-button type="primary" @click="search()">查询</el-button>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <el-button type="primary" @click="reset()">重置</el-button>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <el-button type="primary" @click="edit(0)">新增</el-button>
            </div>
        </div>
        <div class="content flex">
            <el-table :data="list" height="''" border style="height:100%;width: 100%" v-loading.body="loading">
                <el-table-column label="产品图片" width="160">
                    <template slot-scope="scope">
                        <img style="max-width: 150px;max-height: 150px;" :src="scope.row.productImg" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="productName" label="产品名称" width="180"></el-table-column>
                <el-table-column prop="id" label="id" width="80"></el-table-column>
                <el-table-column prop="productUrl" label="产品链接" min-width="240"></el-table-column>
                <el-table-column prop="publicNumberName" label="产品状态" width="100">
                    <template slot-scope="scope">
                        {{scope.row.state==0?'启用':'禁用'}}
                    </template>
                </el-table-column>
                <el-table-column width="180" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="edit(1,scope.row)" size="small">编辑</el-button>
                        <el-button type="text" @click="handle(0,scope.row.id)" size="small" v-if="scope.row.state === 1">启用</el-button>
                        <el-button type="text" @click="handle(1,scope.row.id)" size="small" v-if="scope.row.state === 0">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination flex-zhong">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <transition name="el-fade-in">
            <addoredit v-if="addOrEditState" :message="addOrEditMessage" v-on:subSuccessed="getList" v-on:close="closeAddOrEdit"></addoredit>
        </transition>
    </div>
</template>

<script>
    import { getList, updateConfig } from "@/api/productConfig/productConfig.js";
    import addOrEdit from './addOrEdit.vue';
    export default {
        data() {
            return {
                keywords: '',
                state: '',
                pageSize: 10,//一页多少条
                pageNum: 1,//页码
                total: 0,//总共多少条
                pageSizes: [10, 20, 30, 40],
                loading: false,
                list: [],
                addOrEditState: false,
                addOrEditMessage: {
                    type: 0
                },
            }
        },
        components: {
            'addoredit': addOrEdit
        },
        methods: {
            closeAddOrEdit() {//关闭编辑或新增弹窗
                this.addOrEditState = false;
            },
            edit(type, item) {//打开编辑或新增弹窗 0 新增  1 编辑
                this.addOrEditMessage = {
                    type: type,
                    message: item || {}
                };
                this.addOrEditState = true;
            },
            handle(type, id) {
                this.$confirm('确定' + (type == 0 ? '启用' : '禁用') + '?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    updateConfig({
                        id: id,
                        state: type
                    }).then(res => {
                        this.loading = false;
                        if (res.data.successed) {
                            this.$notify({
                                title: '成功',
                                message: '操作成功！',
                                type: 'success',
                                duration: this.Util.time1()
                            });
                            this.getList();
                        }
                    });
                }).catch((err) => {
                    console.log(err)
                });
            },
            search() {
                this.pageNum = 1;
                this.getList();
            },
            addZero(num) {
                if (num < 10) {
                    return '0' + num;
                }
                return num;
            },
            handleSizeChange(val) {
                //每页多少条
                this.pageNum = 1;
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getList();
            },
            reset() {
                this.keywords = '';
                this.state = '';
            },
            toOut() {
                this.Util.goSearch(this.api.commonUrl() + 'appOperateData/exportExcel', {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    keywords: this.Util.trim(this.keywords),
                    userId: this.User.getUserId(),
                    token: this.User.getToken()
                });
            },
            getList() {
                this.loading = true;
                getList({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    keywords: this.keywords,
                    state: this.state
                }).then(res => {
                    this.loading = false;
                    if (res.data.successed) {
                        this.list = res.data.returnValue.list;
                        this.total = res.data.returnValue.total;
                        this.$message.success({
                            message: '获取列表成功',
                            duration: this.Util.time()
                        });
                    }
                })
            },
            sort(column, prop, order) {
                this.orderParam = column.prop;
                this.orderType = column.order == 'descending' ? 'desc' : 'asc';
                this.search();
            },
            getCode() {//获取字典列表
                getProductList({
                }).then((res) => {
                    if (res.data.successed) {
                        this.productList = res.data.returnValue;
                    } else {
                        this.$message.error({
                            message: res.data.msg,
                            duration: Util.time()
                        });
                    }
                })
            },
        },
        created() {
            this.getList()
        },
        mounted() {

        },
    }
</script>

<style lang="scss" scoped>
</style>