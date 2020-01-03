<template>
  <div>
    <h5>拾色器  mix-blend-mode</h5>
    <div class="bruce">
        <div class="color-changer">
            <input type="color" value="#ff6666">
            <img src="https://yangzw.vip/static/codepen/car.jpg">
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class mixBlendMode extends Vue{
  mounted () {
    
  }
  
}
</script>

<style scoped>
.color-changer{
    position: relative;
    width: 500px;
    height: 100%;
    overflow: hidden;
}
input{
    position:absolute;
    width: 500px;
    height: 100%;
    cursor: pointer;
    mix-blend-mode: hue;
    border: none;
}
img{
    width: 500px;
    height: auto;
    object-fit: cover;
}
</style>
