<template>
    <div class="container">
        <div class="container-in">
            <div class="container-tit">
                <slot name="tit"></slot>
            </div>
            <div class="container-main">
                <slot name="main"></slot>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                list: [],
            }
        },
        methods:{

        },
        created(){

        }
    }
</script>
<style lang="scss">
    .container{
        width: 100%;
        padding: 10px;
        background: #fff;
        .container-in{
            border: 1px solid #ebebeb;
            border-radius: 3px;
            transition: .2s;
            &:hover{
                box-shadow: 0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);
            }
        }

        .container-tit{
            height: 44px;
            line-height: 44px;
            color: #409eff;
            font-weight: 600;
            font-size: 16px;
            text-indent: 15px;
            border-bottom: 1px solid #ebebeb;
        }
        .container-main{
            width: 100%;
            padding: 10px;
        }
    }
</style>
