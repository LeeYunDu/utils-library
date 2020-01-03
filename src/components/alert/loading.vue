<style scoped>
.loading-box {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  padding: 15px 8px;
  border-radius: 5px;
  width: 115px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  z-index: 999;
}
.loading-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
}
.loading {
  width: 80px;
  margin: 0 auto;
  display: flex;
  padding: 10px 0;
}
.loading-item {
  width: 4px;
  height: 50px;
  background: white;
  animation: loading 1s infinite;
  margin: 0 auto;
}
.loading-item:nth-child(1) {
  animation-delay: -0.9s;
}
.loading-item:nth-child(2) {
  animation-delay: -0.8s;
}
.loading-item:nth-child(3) {
  animation-delay: -0.7s;
}
.loading-item:nth-child(4) {
  animation-delay: -0.6s;
}
.loading-item:nth-child(5) {
  animation-delay: -0.5s;
}
.loading-item:nth-child(6) {
  animation-delay: -0.4s;
}
@keyframes loading {
  0%,
  40%,
  100% {
    transform: scaleY(0.25);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
<template>
  <div class="loading">
    <!-- 遮罩层防穿透 -->
    <div class="loading-mask" v-if="loading.mask"></div>
    <div class="loading-box" v-if="loading !=''">
      <div class="loading">
        <div class="loading-item" v-for="item in 6" :key="item"></div>
      </div>
      <!-- 消息 一行设置7个汉字，最多2行-->
      <span v-if="loading.content">{{loading.content}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Loading extends Vue {
  private loading = "";
  private count = 0;
  mounted() {}

  private setLoadingID() {
    return "loading_" + this.count;
  }
  private add(loading) {
    // 关闭之前调用的loading
    if (this.loading) {
      this.close();
    }

    this.loading = loading;
    if ((this.loading as any).success) {
      try {
        (this.loading as any).success();
      } catch (error) {
        console.error(error);
      }
    }
  }
  public close() {
    this.loading = "";
  }
}
</script>


