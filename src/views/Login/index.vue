<template>
    <div class="login height-100">
        <div class="left height-100">
            <img src="@/assets/images/login.gif" alt="">
        </div>
        <div class="login-box height-100">
            <h1>智门禁</h1>
            <el-form ref="login" :model="userInfo">
                <el-form-item prop="FUserName" :rules="[{ required: true, message: '请输入用户名'}]">
                    <el-input v-model="userInfo.FUserName" placeholder="请输入用户名/手机号码" @focus="errText = null"></el-input>
                </el-form-item>
                <el-form-item prop="FPassword" :rules="[{ required: true, message: '请输入密码'}]">
                    <el-input type="password" v-model="userInfo.FPassword" placeholder="请输入密码" @focus="errText = null"></el-input>
                </el-form-item>
                <p>
                    <el-checkbox v-model="isSave" size='medium'>记住账号与密码</el-checkbox>
                    <span class="err-text" v-if="errText">{{errText}}</span> 
                </p>
                <el-button @click="login()">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userInfo:{
                FUserName:'',
                FPassword:'',
            },
            isSave:true, //是否记住用户名和密码
            errText:''
        }
    },
    created(){
        this.clickEnter()
    },
    methods:{
        /**
         * 点击Enter键登录
         */
        clickEnter(){
            document.onkeydown = e =>
             {
              let event = window.event||e
              let _key = event.keyCode;
              if (_key === 13) {
                  this.login()
              }
            };
            let userInfo = localStorage.getItem('userInfo')
            if(userInfo){
                this.userInfo = JSON.parse(userInfo)
            }
        },
        /**
         * 记住用户名和密码
         */
        saveUserInfo(){
            if(this.isSave){
                localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
            }else{
                localStorage.removeItem('userInfo')
            }
        },
        async login(){
            await new Promise(resolve => {
                this.$refs.login.validate((valid) => {
                  if (valid) {
                      resolve()
                  } 
                });
            })
            this.$post('/checklogin',{
                ...this.userInfo,
                TerminalType:'PC'
            })
            .then((result) => {
                this.saveUserInfo()
                sessionStorage.setItem('FToken',result.FObject.FTokenID)
                sessionStorage.setItem('FContacts',result.FObject.FContacts)
                this.$router.push('/')
            }).catch((err) => {
                if(err.Result == 103){
                    this.errText = '用户名或密码错误'
                }else{
                    this.errText = '未知错误，请联系管理员'
                    }
            });
            /* this.$router.push('/') */
        }
    }
}
</script>
<style lang="scss">
.login{
    display: flex;
    >div.left{
        width: 1050px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &-box{
        width: 600px;
        overflow: hidden;
        h1{
            margin-top: 152px;
            margin-bottom: 90px;
            font-size:40px;
            font-family:FZZhengHeiS-DB-GB;
            color:#30D883;
        }
        .el-form{
            &-item{
                margin-bottom: 33px;
                .el-input{
                    width: 600px;
                    &__inner{
                        width: 100%;
                        height: 130px;
                        border-radius: 0;
                        font-size: 26px;
                        &::placeholder{
                            color: #999999;
                            font-size: 26px;
                        }
                    }
                }
            }
            p{
                padding-left: 37px;
                margin-bottom: 50px;
                text-align: left;
                .el-checkbox{
                    &__input{
                        .el-checkbox__inner{
                            width: 40px;
                            height: 40px;
                            &::after{
                                height: 20px;
                                left: 17px;
                                width: 10px;
                            }
                        }
                    }
                    .el-checkbox__input.is-checked .el-checkbox__inner, 
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner{
                        background-color: #31BA8B;
                        border-color: #31BA8B
                    }
                    &__label{
                        font-size:20px;
                        color: #999999;
                        font-weight:bold;
                    }
                }
                .err-text{
                    color: red;
                    margin-left: 70px;
                }
            }
            .el-button{
                width:100%;
                height:130px;
                line-height: 130px;
                background:#31BA8B;
                border-radius:0px;
                font-size:22px;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
        }
    }
}
</style>