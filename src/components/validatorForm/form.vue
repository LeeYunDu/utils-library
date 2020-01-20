<template>
    <div>
        <h5>表单验证 全局挂载</h5>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue ,Provide } from 'vue-property-decorator';
import {Validator} from './validator';
// @ts-ignore:不可达代码错误
@Component({
    name:'leeForm'
})
export default class Form extends Vue {
    @Provide('leeForm') leeForm = this;
    private form = {
        Name:{value:'',rule:'isNonEmpty',err:'名称不能为空'},
        Address:{value:'',rule:'minLength:6',err:'最小长度不少于6个字符'},
        Phone:{value:'',rule:'isMobile',err:'手机格式错误'},
    };

    mounted() {
        this.validator(this.form)
    }
    public validator(form){
        let validator = new Validator();
        for (const key in form) {
            if (form.hasOwnProperty(key)) {
                const element = form[key];
                if(element.rule){
                    validator.add(element);
                }
            }
        }
        // 验证
        let errorMsg = validator.start();
        console.log(errorMsg,'表单验证')
        if(errorMsg) {
            return false;
        }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
