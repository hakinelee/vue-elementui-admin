<!-- 普通侧边栏 -->
<template>
  <div class="">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
        <h3>{{ isCollapse ? '后台' : '后台管理系统' }}</h3>
        <el-menu-item v-on:click="clickMenu(item)" v-for="item in noChildren" :key="item.name" v-bind:index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <!-- <el-submenu index="1">
        <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
    height: 100vh;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>

<script>
export default {
  data() {
    return {
      menuData: [
        {
            path: "/",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
        },
        {
            path: "/user",
            name: "user",
            label: "用户管理",
            icon: "user",
            url: "UserManage/UserManage",
        },
        // {
        //     path: "/table",
        //     name: "table",
        //     label: "人员管理",
        //     icon: "user",
        //     url: "Table/Table",
        // },
        // {
        //     label: "其他",
        //     icon: "location",
        //     children: [
        //         {
        //             path: "/page1",
        //             name: "page1",
        //             label: "页面1",
        //             icon: "setting",
        //             url: "Other/PageOne",
        //         },
        //         {
        //             path: "/page2",
        //             name: "page2",
        //             label: "页面2",
        //             icon: "setting",
        //             url: "Other/PageTwo",
        //         }
        //     ]
        // }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击菜单
    clickMenu(item) {
        //当页面路由与跳转的路由不一致时，才允许跳转
        if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
            this.$router.push(item.path)
        }
        this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    //没有子菜单
    noChildren() {
        return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren() {
        return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>