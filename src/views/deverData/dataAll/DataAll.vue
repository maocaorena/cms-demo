<template>
    <div id="dataAll" class="wrapper flex flex-s">
        <div class="search-bar flex flex-hw">
            <div class="seach-bar-item flex flex-sc">
                <p>日期：</p>
                <div class="item-wrapper">
                    <el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :clearable="false">
                    </el-date-picker>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <p>关键字：</p>
                <div class="item-wrapper">
                    <el-input v-model="keywords" clearable placeholder="开发者名称"></el-input>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <p>产品：</p>
                <div class="item-wrapper" style="width: 120px;">
                    <el-select v-model="productId" clearable placeholder="请选择">
                        <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <el-button type="primary" @click="search()">查询</el-button>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <el-button type="primary" @click="reset()">重置</el-button>
            </div>
            <!-- <div class="seach-bar-item flex flex-sc">
                <el-button type="primary" @click="toOut()">导出</el-button>
            </div> -->
        </div>
        <div class="content flex">
            <el-table :data="list" height="''" border style="height:100%;width: 100%" v-on:sort-change="sort" :default-sort="{prop: 'dateTime', order: 'descending'}"
                v-loading.body="loading">
                <el-table-column prop="dateTime" sortable="dateTime" label="日期" width="180">
                    <template slot-scope="scope">
                        {{startTime}} - {{endTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="appName" label="开发者" width="250"> </el-table-column>
                <el-table-column prop="productName" label="产品" width="200"> </el-table-column>
                <el-table-column prop="uv" sortable="uv" label="UV" width="100"> </el-table-column>
                <el-table-column prop="pv" sortable="pv" label="PV" width="100"> </el-table-column>
                <el-table-column prop="payUv" sortable="payUv" label="支付页UV" width="130"> </el-table-column>

                <el-table-column prop="orderNum" sortable="orderNum" label="消费订单数" width="130"> </el-table-column>
                <el-table-column prop="orderAmount" sortable="orderAmount" label="消费金额" width="150"> </el-table-column>
                <el-table-column prop="orderProfit" sortable="orderProfit" label="收益" width="150"> </el-table-column>
                <el-table-column prop="uvArup" sortable="uvArup" label="ARPU" min-width="160"> </el-table-column>

            </el-table>
        </div>
        <div class="pagination flex-zhong">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { getList, getProductList } from "@/api/deverData/dataAll.js";
    export default {
        data() {
            return {
                productList: [],
                productId: '',
                keywords: '',
                orderParam: 'dateTime',
                orderType: 'desc',
                startTime: '',
                endTime: '',
                pageSize: 10,//一页多少条
                pageNum: 1,//页码
                total: 0,//总共多少条
                pageSizes: [10, 20, 30, 40],
                loading: false,
                list: [],
                value7: [new Date(Date.now() - 86400000), new Date(Date.now())], //时间
            }
        },
        components: {
        },
        methods: {
            search() {
                let _start = new Date(this.value7[0]) || '';
                let _end = new Date(this.value7[1]) || '';
                if (JSON.stringify(_start) == 'null' || _start.getFullYear() < 2015) {
                    this.startTime = '';
                    this.endTime = '';
                } else {
                    this.startTime = _start.getFullYear() + '-' + this.addZero(_start.getMonth() + 1) + '-' + this.addZero(_start.getDate());
                    this.endTime = _end.getFullYear() + '-' + this.addZero(_end.getMonth() + 1) + '-' + this.addZero(_end.getDate());
                };
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
                this.productId = '';
                this.value7 = [new Date(Date.now() - 86400000), new Date(Date.now())];//时间
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
                    startTime: this.startTime,
                    endTime: this.endTime,
                    productId: this.productId,
                    orderType: this.orderType,
                    orderParam: this.orderParam
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
            this.getCode();
        },
        mounted() {

        },
    }
</script>

<style lang="scss" scoped>
</style>