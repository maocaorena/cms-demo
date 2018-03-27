<template>
    <div id="navBAr">
        <!-- <el-tag class="tab-tag" type="primary">{{$route.meta.name}}</el-tag> -->
        <div class="userInfo flex-zhong">
            <p>{{name}}</p>
            <el-button type="text" @click.native="outLigin">退出登录</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                name: this.User.getUf().name
            }
        },
        computed:{
        },
        methods:{
            outLigin(){
                console.log('www');
                this.User.outLogin();
                this.$router.push('/login')
            }
        },
        created(){

        },
        mounted(){

        }
    }
</script>
<style lang='scss' scoped>
    @import "./navBar";
</style>
