<template>
    <div class="flex-zhong alertSetting">
        <div class="alertSetting-in" :class="fullpage">
            <div class="alertSetting-title flex">
                <p class="alertSetting-name"><slot name="name">编辑</slot></p>
                <div class="alertSetting-handle">
                    <a v-if="!fullPage" href="javascript:;" @click="changeFullPage">
                    	<i class="iconfont icon-fangxingweixuanzhong"></i>
                    </a>
                    <a v-else href="javascript:;" @click="changeFullPage">
                    	<i class="iconfont icon-duozhongzhifu"></i>
                    </a>
                    <a href="javascript:;" @click="close">
                    	<i class="el-dialog__close el-icon el-icon-close"></i>
                    </a>
                </div>
            </div>
            <div class="alertSetting-container">
                <slot name="con"></slot>
            </div>
            <div class="alertSetting-footers flex">
            	<div class="footer-left flex-zhong">
					<el-pagination v-if="total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="sizes"
                        :current-page="page"
                        :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
					</el-pagination>
            	</div>
            	<div class="footer-right">
            		<slot name="bottombtns">
            			<button class="border" @click="close">返回</button>
            			<button class="blue" @click="submitMessage" v-if="type != 1">提交</button>
            		</slot>
            	</div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
    	props: [
            "size",
            "page",
            "total",
            "pagesize",
            "type",
            "sizes",
        ],
        data(){
            return{
                fullPage: false,
            }
        },
        computed: {
            fullpage: function () {
                return {
                    alertSettingWindow: !this.fullPage,
                    alertSettingFullPage: this.fullPage,
                }
            },
        },
        methods:{
            close(){
                this.$emit('close', '')
            },
            submitMessage(){
            	this.$emit('submitMessage', '')
            },
            changeFullPage(){
                this.fullPage = !this.fullPage;
            },
			handleCurrentChange(val){
				this.$emit('handdleCurrent', val)
			},
            handleSizeChange(val){
                this.$emit('handleSize', val)
            }
        },
        created(){
        }
    }
</script>
<style lang="scss">
    .alertSetting{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        .alertSetting-in{
        	position: relative;
            background: #fff;
            border-radius: 5px;
            overflow: hidden;
            border-radius: 3px;
    		box-shadow: 0 1px 3px rgba(0,0,0,.3);
        }
        .alertSettingWindow{
            width: 800px;
            height: 90%;
        }
        .alertSettingFullPage{
            width: 100%;
            height: 100%;
        }

        .alertSetting-title{
            padding: 0 5px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: #fff;
        }
        .alertSetting-name{
        	padding-left: 20px;
        	font-size: 16px;
        	font-weight: 600;
            width: 50%;
            height: 100%;
        }
        .alertSetting-handle{
            width: 50%;
            height: 100%;
            text-align: right;
            a{
                color: #20a0ff;
                margin-right: 20px;
            }
        }
        .alertSetting-container{
            position: absolute;
            top: 52px;
            bottom: 45px;
            right: 0;
            left: 0;
        	padding: 0 20px 0;
            width: auto;
            height: auto;
            overflow: auto;
        }
        .alertSetting-footers{
            position: absolute;
            bottom: 0;
            z-index: 999999;
        	width: 100%;
        	height: 44px;
        	background: #fff;
        	.footer-left{
        		width: 75%;
        		height: 100%;
        	}
        	.footer-right{
        		width: 25%;
        		height: 100%;
        		button{
        			float: right;
        			margin-left: 10px;
        			margin-top: 7px;
        			margin-right: 10px;
        			width: 70px;
        			height: 30px;
        			background: #fff;
        			cursor: pointer;
        			border: 0;
        		}
        		.blue{
        			background: #20a0ff;
        			color: #fff;
        			border-radius: 3px;
        		}
        		.border{
        			border-radius: 3px;
        			border: 1px solid #ccc;
        		}
        	}
        }
    }
</style>

</style>
