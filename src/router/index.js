import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
// import Table from '../views/Table.vue'

Vue.use(VueRouter)

//1.创建路由组件
//2.组件路由相映射
//3.创建router实例
const routes = [
    //主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',  //重定向
        children: [
            //子路由
            { path: 'home', component: Home }, //首页
            { path: 'user', component: User }, //用户管理
            // { path: 'table', component: Table }, //用户管理
        ]
    }
]
  
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router