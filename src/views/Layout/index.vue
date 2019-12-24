<template>
    <div class="layout height-100">
        <div class="layout-menu l height-100">
             <h5>
                 <img src="@/assets/images/nav_logo.png" alt="">
             </h5>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-door"
          router
         >
          <el-menu-item index="/project">
            <i class="iconfont icon-ZS-Projectmanagement"></i>
            <span slot="title">项目信息</span>
          </el-menu-item>
          <el-menu-item index="/doorInfo">
            <i class="iconfont icon-EntranceGuard"></i>
            <span slot="title">门禁信息</span>
          </el-menu-item>
          <el-menu-item index="/userAddress">
            <i class="iconfont icon-ZS-Generatehouse"></i>
            <span slot="title">户址信息</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="iconfont icon-ZS-Owner"></i>
            <span slot="title">用户信息</span>
          </el-menu-item>
          <el-menu-item index="/visitorRecord">
            <i class="iconfont icon-Authorizationrecord"></i>
            <span slot="title">访客记录</span>
          </el-menu-item>
          <el-menu-item index="/entryRecord">
            <i class="iconfont icon-Accessrecords"></i>
            <span slot="title">出入记录</span>
          </el-menu-item>
        </el-menu>
        </div>
        <div class="layout-main height-100">
            <header>
                <div class="r">
                    <el-dropdown>
                      <div class="el-dropdown-link icon-item">
                        <i class="iconfont icon-ZS-headportrait"></i>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >设置密码</el-dropdown-item>
                        <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <span>{{userName}}</span>
                </div>
            </header>
            <div class="layout-main-body">
                <div class="height-100">
                    <router-view>

                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userName:sessionStorage.getItem('FContacts')||'--'
        }
    },
    methods:{
        logOut(){
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss">
.layout{
    transform: translate3d(0,0,0);
    &-menu{
        width: 322px;
        h5{
            height:108px;
            background: #E8E3E5;
        }
        .el-menu-vertical-door.el-menu{
            >li{
                height: 86px;
                line-height: 86px;
                text-align: left;
                color: #626262;
                .iconfont{
                    margin-left: 24px;
                    margin-right: 34px;
                    font-size: 34px;
                }
                span{
                    font-size: 22px;
                }
            }
            >li.is-active{
                background: #31BA8B;
                color: white;
            }
        }
    }
    &-main{
        margin-left: 322px;
        >header{
            height:108px;
            /* line-height: 108px; */
            padding-right: 60px;
            font-size: 22px;
            color: white;
            background:linear-gradient(87deg,rgba(49,186,139,0.86),rgba(48,216,131,0.86));
            >div.r{
                margin-top: 32px;
            }
            .iconfont{
                font-size: 30px;
                margin-right: 10px;
                color: white;
            }
        }
        &-body{
            height: 972px;
            padding: 28px 32px 30px 21px;
            background: #E8E3E5;
        }
    }
}
</style>