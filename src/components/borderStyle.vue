<template>
  <div>
    <h5>边框样式</h5>
    <div class="border-box">
      <div class="one">hover</div>
      <div>CSS</div>
      <div>CSS</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class borderStyle extends Vue {
  mounted() {}
}
</script>

<style scoped>
.border-box {
  display: flex;
}
.border-box > div {
  width: 80px;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
.one {
  background: linear-gradient(0, red 1px, red 1px) no-repeat left top/0 1px,
    linear-gradient(-90deg, red 1px, red 1px) no-repeat right top/1px 0,
    linear-gradient(-180deg, red 1px, red 1px) no-repeat right bottom/0 1px,
    linear-gradient(-170deg, red 1px, red 1px) no-repeat left bottom/1px 0;
  transition: all 0.3s;
}
.one:hover {
  background-size: 100% 1px, 1px 100%, 100% 1px, 1px 100%;
}
</style>
