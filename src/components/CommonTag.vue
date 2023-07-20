<!--  -->
<template>
  <div class="tags">
    <el-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      effect="dark"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  props: [],
  setup(props, ctx) {
    return {};
  },
};
</script>
<style scoped>
/*@import url(); 引入公共css类*/
</style>