<template>
  <div>
    <h5>布局快速查看元素位置 添加 html * {outline：1px solid red}</h5>
    <h5>文字溢出</h5>
    <div class="font-box font-overflow-2">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
    <h5>attr抓取元素上data- 属性</h5>
    <div class="tip-box" :data-tip='dataTip'>提示框</div>
    <borderStyle></borderStyle>
    <FoldBox></FoldBox>
    <mixBlendMode></mixBlendMode>
  </div>

</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import borderStyle from "@/components/borderStyle.vue";
import mixBlendMode from "@/components/mix-blend-mode.vue";
import FoldBox from "@/components/fold.vue";
@Component({
  components:{
    borderStyle,
    mixBlendMode,
    FoldBox
  }
})
export default class cssText extends Vue{
  dataTip = 'this is tip'
  mounted () {
    
  }
  
}
</script>

<style scoped>
html *{
  outline:1px solid red
}
/* 文字溢出 */
.font-box {
  width: 100px;
  /* display: -webkit-box; */
  /* -webkit-box-orient: vertical; */
  /* -webkit-line-clamp: 3; */
  /* overflow: hidden; */
}
/* attr 抓取data- */
.tip-box{
  border-radius: 10px;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
  background: purple;
  position: relative;
}
.tip-box::after{
  content:attr(data-tip);
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  opacity: 0;
  font-size: 13px;
  transition: all 300ms;
}
.tip-box:hover::after{
  opacity: 1;
  left: calc(100% + 20px);
}
</style>
