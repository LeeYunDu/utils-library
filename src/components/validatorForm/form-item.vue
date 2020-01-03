<style scoped>
  
  .form-item > input {
    border: none;
    display: inline-block;
    flex: 1;
    /* border: 1px solid red; */
    /* outline:none; */
  }
  .form-item{
    height: 40px;
    margin-bottom: 10px;
    /* line-height: 40px; */
    display: flex;
    overflow: hidden;
  }
  .form-item-icon{
    width: 20px;
    height: 20px;
    margin-right: 4px;
    display: inline-block;
    position:absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0px;
  }
</style>
<template>
  <div class="form-item">
      <formLabel :labelName='label' :labelWidth='labelWidth'>
        
        <label for=""><img class="form-item-icon" :src="imgPath" alt="">{{label}}</label>
      </formLabel>
      <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop , Inject } from "vue-property-decorator";
import formLabel from './form-label.vue'
@Component({
    name:'leeFormItem',
    components:{
        formLabel
    }
})
export default class FormItem extends Vue{
  @Inject('leeForm') leeFrom:any
  @Prop() label:string
  @Prop() width:number|string
  @Prop() icon:string

  private baseImgUrl = '/static/images'

  mounted () {
    console.log(this.label,this.width)
  }
  get labelWidth(){
    let width = '';
    if(this.width==='auto'){
      return 'auto'
    }else{
      return this.width
    }
  }

  get imgPath(){
    console.log(`${this.baseImgUrl}/${this.icon}.png`)
    if(this.icon){
      return `${this.baseImgUrl}/${this.icon}.png`
    }else{
      return ''
    }
    
  }
}
</script>


