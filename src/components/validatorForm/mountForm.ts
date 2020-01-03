import FormItem from './form-item.vue' 
import Form from './form.vue'
import Vue from 'vue'

const form = Vue.extend(Form);
const formItem = Vue.extend(FormItem);
const mountForm = () => {
    Vue.component('lee-form',form)
    Vue.component('lee-form-item',formItem)
}
export default mountForm



