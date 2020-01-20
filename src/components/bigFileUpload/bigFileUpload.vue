<style scoped>
p {
  color: #666;
  font-size: 14px;
  margin: 0;
}
</style>
<template>
  <div>
    <h4>实现大文件断点续传/分片上传功能</h4>
    <p>
      在此之前必须说明，这里用到了html5提供的FileReader接口，目前实现了这个接口的浏览器有FireFox3.6+ 、chrome6+、IE10+
      <br />SparkMD5.hashBinary() 适用于小文件,直接将整个文件的二进制码传入,返回文件的md5 编码
    </p>
    <h5>思路</h5>
    <p v-for="(item,index) in note" :key="index">{{index+1}}、{{item}}</p>
    <h5>问题</h5>
    <p>拷贝文件时，文件丢失，文件破损打开不了</p>
    <p>文件块切块的大小影响文件拷贝，最后一个文件块 小于之前的文件块，请求完毕，合并文件破损。<br>
      <span style="color:red">前端采用 promise.all 来 请求 合并文件 （settimeout来做时间延迟） , node 采用</span>
    </p>
    
    <input
      type="file"
      name="file"
      id="file"
      ref="file"
      @change="fileChange()"
      accept="image/*;video/*;audio/*;aplication/rar;aplication/zip;application/msword;application/vnd.ms-excel;application/vnd.ms-powerpoint"
    />
    <img :src="testImg" alt />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Form from "../validatorForm/form.vue";
import sparkmd5 from "spark-md5";
@Component({
  components: {}
})
export default class BigFileUpload extends Vue {
  note = [
    "首先 设置 文件块大小，将文件切块",
    "用 sparkMD5 对文件进行标志,进行上传",
    "后端根据文件名或者文件MD5编码进行判断,如果文件存在即秒传",
    "如文件不存在,则创建以MD5编码的文件夹,接收前端上传的文件块",
    "当文件上传完毕，将MD5文件夹合并成一个文件，返回结果给前端"
  ];
  running: boolean = false; // 检测是否计算md5
  testImg: string | ArrayBuffer = "";
  md5FileValue = "";
  md5End = "";
  skip:boolean = false;
  file = null
  fileSize:number = null
  chunkSize = 1024 * 1024 * 2  //文件切片为5M
  chunks:number = 0 //切片数量
  currentChunk:number = 0 // 已上传的文件数
  hasUploaded:number = 0 // MD5效验文件 检测到的 已上传的文件块数量
  test = []
  mounted() {
  }

  async fileChange() {
    let form = new FormData();
    let file = (this.$refs.file as any).files[0];
    console.log(file)
    this.file = file;
    this.fileSize = file.size;
    form.append("file", file, file.name);
    // this.$fileRequest('/api/user/uploadFile',form).then((result) => {
    //   console.log(result)
    // }).catch((err) => {
      
    // });
    // return
    if (this.running) {
      return;
    } 
    // md5标记文件
    let md5Filevalue = await this.MD5File(file);
    this.md5FileValue = (md5Filevalue as string);
    let checkFileResult = await this.checkFile(file.name,this.md5FileValue);
    console.log(checkFileResult)
    if(checkFileResult.data.file){
      // 检查出服务器中已存在该文件
      alert('文件已上传')
      return
    }
    this.checkAndUploadChunk(this.md5FileValue,checkFileResult.data.data.info.chunkList)
    // this.fnTow(file);
    // console.log(fileReader.readAsArrayBuffer(file))
    // this.$postRequest('/api/user/uploadFile',form).then((result) => {
    //   console.log(result)
    // }).catch((err) => {

    // });
  }

  // MD5标志文件
  MD5File(file) {
    return new Promise((resolve, reject) => {
      let that = this;
      let blobSlice = File.prototype.slice; // File.prototype.mozSlice , File.prototype.webkitSlice  还有2种方法兼容
      this.chunks = Math.ceil(file.size / this.chunkSize); // 分片数量
      console.log(this.chunks)
      this.currentChunk = 0; // 已上传的分片
      let spark = new sparkmd5(); // 创建 sparkmd5 实例
      let time;
      
      let fileReader = new FileReader();
      // fileReader.readAsDataURL(file);
      fileReader.onload = result => {
        // console.log(fileReader.readyState) fileReader 状态
        spark.appendBinary(result.target.result);
        this.currentChunk++;
        if (this.currentChunk < this.chunks) {
          loadNext();
        } else {
          this.running = false;
          let md5result = spark.end(); // 完成计算  返回结果
          console.log(md5result, "md5计算结果");
          resolve(md5result)
        }
      };
      fileReader.onerror = err => {
        this.running = false;
        alert("计算出错");
      };
      function loadNext() {
        let start = that.currentChunk * that.chunkSize;
        let end =
          start + that.chunkSize >= file.size ? file.size : start + that.chunkSize; // 计算后的结果
        fileReader.readAsBinaryString(blobSlice.call(file, start, end));
      }
      this.running = true;
      loadNext();
    });
  }
  // 校验文件是否存在
  checkFile(fileName,fileMD5Value):any{
    return new Promise((resolve,reject)=>{
      let params = {
        fileName: fileName,
        fileMd5Value:fileMD5Value
      }
      this.$getRequest(`/api/upload/checkFile`,params).then((result) => {
        resolve(result)
      }).catch((err) => {
        reject('效验文件出错')
      });
    })
  }
  // 检查并上传MD5
 async checkAndUploadChunk(fileMD5Value,chunkList){
    // fileMD5Value 唯一标识  chunkList = 已上传的文件块/空数组 文件
    this.hasUploaded = chunkList.length;
    let uploadList = []
    
    for(let i = 0;i<this.chunks;i++){
      // chunkList 返回已上传文件块的名称 以 0 开始
      let hasChunkUpload = chunkList.indexOf(i + '') > -1
      // 不存在该文件块后则上传
      if(!hasChunkUpload){
        uploadList.push(i);
        //  this.uploadFile(i,fileMD5Value).then((result:any) => {
        //    console.log(result)
        //  }).catch((err) => {
           
        //  });
      }
    }
    uploadList.map( async (e)=>{
      this.uploadFile(e,fileMD5Value)
    })
    await Promise.all(uploadList).then((result) => {
      console.log(this.chunks === result.length + this.hasUploaded)
      setTimeout(d=>{
        this.notifyServer(this.md5FileValue)
      },1000)
    }).catch((err) => {
      
    });;
  }
  uploadFile(i,md5FileValue){
    // i 当前的文件块, MD5标识， 需上传文件块总数
    let that = this;
    return new Promise((resolve,reject)=>{
            // 文件分区
      let end = (i+1) * this.chunkSize >= this.fileSize?this.fileSize:(i+1)*this.chunkSize
      let data  =this.file.slice(i*this.chunkSize,end);
      let form = new FormData();
      form.append('data',data);//文件块数据
      form.append('total',this.chunks.toString())// 文件分块总数
      form.append('index',i);// 当前上传的文件块
      form.append('fileMd5Value',md5FileValue)// MD5文件标识

      that.$fileRequest('/api/upload/uploadFile',form).then((result) => {
        this.test.push(i)
        if(result.status===200){
          if(this.chunks==parseInt(result.data.data.res.desc) + 1){
            return
            this.notifyServer(this.md5FileValue)
          }
        }
        resolve(result.data.desc)
      }).catch((err) => {
        
      });
    })
  }
  notifyServer(md5FileValue){
    let params = {
      fileMD5Value:md5FileValue,
      fileName:this.file.name,
      size:this.file.size
    }
    this.$getRequest(`/api/upload/mergeFile`,params).then((result) => {
      console.log(result)
    }).catch((err) => {
      
    });
  }
  // 单独上传
  fnOne(file) {
    let fileReader = new FileReader();
    let time;
    fileReader.readAsDataURL(file); // 读取文件
    fileReader.onload = result => {
      // 文件读取完毕
      console.log(result);
      this.running = false; // 设置 md5 加密中...
      this.testImg = result.target.result; // 上传的图片 64位编码
      if (result.total != file.size) {
        // 文件大小不一致 则表示读取错了。
        alert("文件读取不一致");
      } else {
        this.md5FileValue = sparkmd5.hashBinary(result.target.result); // md5 加密后的结果 328faa73be7ca56994ef8a9ba7a4bdf1
      }
    };
    fileReader.onerror = error => {
      this.running = false;
      alert("文件读取异常");
    };
    this.running = true;
  }
}
</script>
<style scope>
</style>


