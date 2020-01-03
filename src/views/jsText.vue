<style>
body {
  height: 500px;
  overflow: scroll;
}
</style>
<template>
  <div>
    <h5>localStorage</h5>
    <input type="text" v-model="localStorageName">
    <h5>防抖</h5>
    <input type="text" @input="search">
    <div style="height:2000px;">高度2000</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Nav from '@/components/nav.vue'
@Component({
  components:{
    Nav
  }
})
export default class jsText extends Vue {
  
  person = {
    name:'lee',
    age:0,
    address:{
      city:'WenZhou',
      number:'007'
    },
  }
  jieliu:any={}
  //localStorage
  localStorageName = '';

  @Watch('person',{immediate:true,deep:true})
  onPersonChanged(value,oldVal){
    console.log(value,oldVal)
  }

  mounted() {
    console.log(this.$store.getters.info.data,333)
    let time1 = "1996-10-09";
    let time2 = "2001-08-08";
    console.log(time1 > time2, "时间字符串比较", time1, time2);
    console.log(this.star(4), "评论星级");
    let date = new Date("2019-09-07");
    console.log(+date, "时间戳 +号 ");
    //判断执行
    1 > 2 ? this.star(2) : "";
    let arr = [0, 1, 2];
    1 < 2 && this.text();
    this.text2() && this.text();
    //对象合并
    let obj1 = {
      a: 1,
      b: 2,
      c: 3
    };
    let obj2 = {
      a: 2,
      b: 4
    };
    let obj3 = { ...obj1, ...obj2 };
    console.log(obj3);
    //Array.from
    let obj = {
      name: "",
      age: 0
    };
    let peoples = Array.from({ length: 3 }, (value,index) => index);
    console.log(peoples);
    //监听页面滚动
    this.jieliu = this.throttle(this.getScrollTop,1000);
    window.addEventListener("scroll", () => {
      //节流
      // this.jieliu();

      //防抖
      this.throttle(this.getScrollTop,1000)();
      this.throttle(this.getScrollHeight,1000)();
      this.throttle(this.getWindowHeight,1000)();
    });
    // 监听
    this.watch1();
    // localStorage
    this.useLocalStorage();
    // promise 测试
    // this.promiseTest1();
    // this.promiseTest2();
    let arr3 = [1,1,3,3,4,56,123,12];
    console.log(Array.from(new Set(arr3)))
    var arr4 = [10, 20, 1, 2];
    console.log(arr4.sort((x,y)=>{
      return x-y
    }))
    console.log(this.add(5))
    console.log(this.$root)
    const enum learn {
      math,
      language
    }
    const name = [learn.language,learn.math]
    console.log(name)
  }
  add(number){
    let count = 0
    function sum() {
      count = count + number
      return count
    }
    sum.toString = function(){
      return number 
    }
    return sum

  }
  //评论星级
  star(count) {
    let stars = "★★★★★☆☆☆☆☆";
    let result = stars.slice(5 - count, 10 - count);
    return result;
  }
  text() {
    console.log("执行判断text");
  }
  text2() {
    return true;
  }
  func1() {
    if (1 > 2) {
      this.func1 = function() {
        console.log("a");
      };
    } else {
      this.func1 = function() {
        console.log("b");
      };
    }
    return this.func1();
  }
  promiseTest1(){
    let fn1 = new Promise((resolve,reject)=>{
      resolve(true)
      
    })
    return fn1;
  }
  promiseTest3(){
    let fn1 = new Promise((resolve,reject)=>{
      console.log(1)
      resolve('promiseTest3')
    })
    return fn1;
  }
  promiseTest2(){
    let fn1 = new Promise((resolve,reject)=>{
      let arr = [123]
      resolve(arr)
    })
    let fn2 = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('两秒')
      },2000)
    })

    let fn3 = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('5秒')
      },5000)
    })
    // all 等待 promise 全部执行完毕 才执行 then
    Promise.all([fn1,fn2,fn3]).then((value)=>{
      console.log(value)
    })
    // race 等待 promise 其中一个执行完毕 才执行 then
    Promise.race([fn1,fn2,fn3]).then((value)=>{
      console.log(value)
    })
  }
  // async / await
  async asyncTest1(){
    // let res = await this.promiseTest1();
    return 123
    
  }
  asyncTest2(){
    setTimeout(()=>{
      return 'async'
    },2000)
  }
  // 获取文档的总高度
  getScrollHeight() {
    let scrollHeight = 0;
    let bodyScrollHeight = 0;
    let documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
      console.log(documentScrollHeight, "浏览器内容总高度");
    }
  }
  //获取滚动条在Y轴上的距离
  getScrollTop() {
    let scroll = 0;
    let bodyScrollTop = 0;
    let documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
      console.log(documentScrollTop, "滚动条滚动高度");
    }
  }
  //浏览器视口的高度
  getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    console.log(windowHeight, "浏览器窗口高度");
    return windowHeight;
  }
  
  //Vue 专栏 ————————————————————————
  
  // 测试 watch 深度监测
  watch1(){
    this.person.name = 'dogegg';
    console.log('change')
    this.person.address.city ='ningbo';
  }
  // localStorage 客户端存储 用户可随意更改数据！！！
  // 使用场景： 用户登录 存储用户信息 页面刷新重新获取
  //localStorage - 没有时间限制的数据存储
  //sessionStorage - 针对一个 session 的数据存储（关闭窗口，存储的数据清空）
  useLocalStorage(){
    let cats = ['lee','egg','aples']
    let a = JSON.stringify(cats);
    let b = JSON.parse(a)
    
    if(localStorage.getItem('name')){
      //序列化 - 转换
      try {
        // this.localStorageName = localStorage.name; 
        //换种写法 setItem,removeItem,getItem
        this.localStorageName = JSON.parse(localStorage.getItem('name'))
      } catch (error) {
        // 如果数据被破坏
        localStorage.removeItem('name')
      }
    }else{
      console.log(2)
    }
  }
  @Watch('localStorageName')
  onLocalStorageName(newVal,oldVal){
    //序列化 - 保存
    localStorage.setItem('name',JSON.stringify(this.localStorageName))
    sessionStorage.setItem('name',JSON.stringify(this.localStorageName))
  }
  //防抖
  debounce(fn,delay){
    return (args?)=>{
      if(fn.id) clearTimeout(fn.id);
      fn.id = setTimeout(()=>{
        fn.apply(this,args);
      },delay);
    }
  }
  //节流
  throttle (fn,delay){
    var previous = 0;
    return function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > delay) {
            fn.apply(context, args);
            previous = now;
        }
    }
  }
  search(){
    //触发搜索
    this.debounce(this.searchResult,2000)()
  }
  searchResult(){
    //搜索结果
    console.log('搜索结果')
  }
}
</script>


