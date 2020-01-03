<style scoped>

</style>
<template>
  <div>
    <h5>render函数 批量生成 H5 标签</h5>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class newPage extends Vue{
  @Prop(Number)
  Level:number
  mounted () {
    
  }
  render(createElement) {
    // let tag = ['span','div','p','h1','input'][this.Level];
    //     Array.apply(null,{length:5}).map(()=>{
    //         return h(tag,this.$slots.default)   
    //     })
    return createElement('div',
        Array.apply(null, { length: 20 }).map(function () {
            return createElement('p', 'hi')
        })
    )
  }
  
}
</script>


