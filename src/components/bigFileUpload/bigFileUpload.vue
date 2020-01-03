<style scoped>
</style>
<template>
  <div>
    <h5>实现大文件断点续传/分片上传功能</h5>
    <input
      type="file"
      name="file"
      id="file"
      ref="file"
      @change="fileChange()"
      accept="image/*;video/*;audio/*;aplication/rar;aplication/zip;application/msword;application/vnd.ms-excel;application/vnd.ms-powerpoint"
    />
  <button @click="testPost">测试post请求</button>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Form from "../validatorForm/form.vue";

@Component({
  components: {}
})
export default class BigFileUpload extends Vue {
    fileChange(){
        let form = new FormData();
        let file = (this.$refs.file as any).files[0];
        form.append('file',file,file.name);
        form.append('author','LeeDogEgg');
        console.log(form)
        // api/test/uploadFile
        this.$postRequest('/api/user/uploadFile',form).then((result) => {
          console.log(result)
        }).catch((err) => {
          
        });
    }
    testPost(){
      let param = {
        name:'leedogegg',
        age:15
      }
      this.$postRequest('/api/user/registerUser',param).then((result) => {
        console.log(result)
      }).catch((err) => {
        
      });
    }
}
</script>
<style scope>
</style>


