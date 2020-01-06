<style scoped>
</style>
<template>
  <div>
      <h5>全局挂载 alert/loading</h5>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {}
})
export default class HelloWorld extends Vue {
  mounted() {
    console.log(this.$route);
    this.$Toast.info({
      message: "提交成功", //
      duration: 500,
      icon: "success",
      mask: true,
      success: () => {
        console.log("调用成功");
      }
    });
    // this.$Toast.loading({
    //   message: "加载中",
    //   duration: 30000,
    //   mask: true,
    //   success: () => {
    //     console.log("调用成功");
    //   }
    // });
    // setTimeout(() => {
    //   this.$Toast.close();
    // }, 100000);
  }
}
</script>
<style scope>
</style>


