<!-- 主路由 -->
<template>
    <div class="">
        <el-container>
            <el-aside width="auto">
                <common-aside />
            </el-aside>
        <el-container>
        <el-header>
            <common-header/>
        </el-header>
        
        <el-main>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
// @ts-ignore
import CommonAside from "../components/CommonAside.vue";
// @ts-ignore
import CommonHeader from "../components/CommonHeader.vue";
export default {
    data() {
        return {};
    },
    components: {
        CommonAside,
        CommonHeader,
    },
};
</script>

<style lang="less" scoped>
    .el-header {
        padding: 0;
    }
</style>