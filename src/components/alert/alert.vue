<style scoped>
.alert-box {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  padding: 10px 8px;
  border-radius: 5px;
  width: 115px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  z-index: 999;
}
.alert-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: black;
  opacity: .6;
}
.alert-icon {
  width: 50px;
  height: 50px;
}
</style>
<template>
  <div class="alert">
    <!-- 遮罩层防穿透 -->
    <div class="alert-mask" v-if="messageInfo.mask"></div>
    <div class="alert-box" v-if="messageInfo.content">
      <!-- icon -->
      <div v-if="messageInfo.icon==='success'">
        <img class="alert-icon" src="/static/images/icon-success.png" alt />
      </div>
      <!-- 消息 一行设置7个汉字，最多2行-->
      <span>{{messageInfo.content}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class vueText extends Vue {
  private messageInfo: Object = {};
  private count = 0;
  public setMsgID() {
    return "alert_" + this.count++;
  }
  public add(msg) {
    let id = this.setMsgID();
    msg = Object.assign({ id: id }, msg);
    this.messageInfo = msg;
    const duration = msg.duration;
    if ((this.messageInfo as any).success) {
      try {
        (this.messageInfo as any).success();
      } catch (error) {
        console.error(error);
      }
    }
    setTimeout(() => {
      this.remove(msg.id);
    }, duration);
  }
  public remove(id) {
    this.messageInfo = {};
    return;
  }
  mounted() {}
}
</script>


