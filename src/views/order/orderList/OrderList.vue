<template>
    <div id="orderList" class="wrapper flex flex-s">
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
                    <el-input v-model="keywords" clearable placeholder="开发者名称/订单号"></el-input>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <p>产品：</p>
                <div class="item-wrapper" style="width: 120px;">
                    <el-select v-model="productId" clearable placeholder="请选择">
						<el-option v-for="item in productList"
						:key="item.id"
						:label="item.productName"
						:value="item.id"></el-option>
					</el-select>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <p>支付方式：</p>
                <div class="item-wrapper" style="width: 120px;">
                    <el-select v-model="payChannel" clearable placeholder="请选择">
                        <el-option label="支付宝" value="1"></el-option>
                        <el-option label="微信" value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="seach-bar-item flex flex-sc">
                <p>支付状态：</p>
                <div class="item-wrapper" style="width: 120px;">
                    <el-select v-model="payState" clearable placeholder="请选择">
                        <el-option label="未支付 " value="0"></el-option>
                        <el-option label="已支付 " value="1"></el-option>
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
            <el-table :data="list" height="''" border style="height:100%;width: 100%"
                v-loading.body="loading">
                <el-table-column prop="oid" label="订单编号" width="180"></el-table-column>
                <el-table-column prop="created" label="日期" width="180"></el-table-column>
                <el-table-column prop="appName" label="开发者" width="250"> </el-table-column>
                <el-table-column prop="productName" label="产品名称" width="150"> </el-table-column>
                <el-table-column prop="orderAmount" label="金额" width="150"> </el-table-column>
                <el-table-column label="支付方式" width="150">
                    <template slot-scope="scope">
                        {{scope.row.payChannel==1?'支付宝':'微信'}}
                    </template>
                </el-table-column>
                <el-table-column prop="roomUv" label="支付状态" min-width="150">
                    <template slot-scope="scope">
                        {{scope.row.payState==1?'已支付':'未支付'}}
                    </template>
                </el-table-column>
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
    import { getList, getProductList} from "@/api/order/order.js";
    export default {
        data() {
            return {
                pageNum: 1,//页码
                pageSize: 10,//一页多少条
                orderParam: 'created',
                orderType: 'desc',
                keywords: '',
                startTime: '',
                endTime: '',
                payState: '',
                payChannel: '',
                productId: '',
                productList: [],
                value7: [new Date(Date.now() - 86400000), new Date(Date.now())], //时间
                total: 0,//总共多少条
                pageSizes: [10, 20, 30, 40],
                list: [],
                loading: false,
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
                console.log(val)
                this.pageNum = val;
                this.getList();
            },
            reset() {
                this.keywords = '';
                this.productId = '';
                this.payState = '';
                this.payChannel = '';
                this.value7 = [new Date(Date.now() - 86400000), new Date(Date.now())];//时间
            },
            toOut() {
                this.Util.goSearch(this.api.commonUrl() + 'appOperateData/exportExcel', {
                    startTime: this.startTime,
                    endTime: this.endTime,
                    keywords: this.keywords,
                    userId: this.User.getUserId(),
                    token: this.User.getToken()
                });
            },
            getList() {
                this.loading = true;
                getList({
                		pageNum: this.pageNum,
                		pageSize: this.pageSize,
                        keywords: this.Util.trim(this.keywords),
                		startTime: this.startTime,
                        endTime: this.endTime,
                        productId: this.productId,
                        payState: this.payState,
                        payChannel: this.payChannel
                } ).then(res=>{
                	this.loading = false;
                	if(res.data.successed){
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
            getCode(str){//获取字典列表
                getProductList({
                }).then((res)=>{
                    if(res.data.successed){
                        this.productList = res.data.returnValue;
                    }else{
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
            this.search();
        },
        mounted() {

        },
    }
</script>

<style lang="scss" scoped>
</style>