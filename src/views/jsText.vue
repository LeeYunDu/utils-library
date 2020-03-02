<style>
body {
  height: 500px;
  overflow: scroll;
}
</style>
<template>
  <div>
    <ul>
      <li @click="router('js01')">js01</li>
    </ul>
    <router-view></router-view>
    <h5>localStorage</h5>
    <input type="text" v-model="localStorageName" />
    <h5>防抖</h5>
    <input type="text" @input="search" />
    <button @click="bibao">闭包</button>
    <div style="height:2000px;">高度2000</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Nav from "@/components/nav.vue";
@Component({
  components: {
    Nav
  }
})
export default class jsText extends Vue {
  person = {
    name: "lee",
    age: 0,
    address: {
      city: "WenZhou",
      number: "007"
    }
  };
  jieliu: any = {};
  //localStorage
  localStorageName = "";
  number = 999;
  @Watch("person", { immediate: true, deep: true })
  onPersonChanged(value, oldVal) {
    console.log(value, oldVal);
  }

  mounted() {
    console.log(this.$store.getters.info.data, 333);
    let time1 = "1996-10-09";
    let time2 = "2001-08-08";
    // console.log(time1 > time2, "时间字符串比较", time1, time2);        false "时间字符串比较" 
    let date = new Date("2019-09-07");
    // console.log(+date, "时间戳 +号 ");       1567814400000 "时间戳 +号 "
    //判断执行
    let arr = [0, 1, 2];
    1 < 2 && this.text();
    this.text2() && this.text();
    //对象合并
    let obj1 = {a: 1, b: 2,c: 3};
    let obj2 = {a: 2,b: 4};
    let obj3 = { ...obj1, ...obj2 };
    // console.log(obj3); {a: 2, b: 4, c: 3}
    //Array.from
    let obj = {name: "",age: 0};
    let peoples = Array.from({ length: 3 }, (value, index) => index);
    // console.log(peoples); [0, 1, 2]
 
    // 监听
    // this.watch1();
    // localStorage
    this.useLocalStorage();
    // promise 测试
    // this.promiseTest1();
    // this.promiseTest2();
    let arr3 = [1, 1, 3, 3, 4, 56, 123, 12];
    // console.log(Array.from(new Set(arr3))); [1, 3, 4, 56, 123, 12]
    var arr4 = [10, 20, 1, 2];
    // console.log(
    // sort 对数组进行排序
    //   arr4.sort((x, y) => {
    //     return x - y;
    //   })
    // );  [1, 2, 10, 20]
    console.log(this.add(5));
    console.log(this.$root);
    // 枚举
    const enum learn {
      math,
      language
    }
    const name = [learn.language, learn.math];
    //闭包
    let bibao = this.bibao();
    bibao();
    bibao();
    //递归
    console.log('递归*********************************')
    function digui(number){
      if(number==1){
        return 1
      }else{
        return digui(number-1) + number
      }
    }
    console.log(digui(999))
    console.log('递归*********************************')
    let arr5 = [1,2,3,4,5,6]
    console.log(typeof arr5,arr5 instanceof Array,Object.prototype.toString.call(arr5))
  }
  router(name){
    this.$router.push({name:name})
  }
  add(number) {
    let count = 0;
    function sum() {
      count = count + number;
      return count;
    }
    sum.toString = function() {
      return number;
    };
    return sum;
  }

  text() {
    
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
  promiseTest1() {
    let fn1 = new Promise((resolve, reject) => {
      resolve(true);
    });
    return fn1;
  }
  promiseTest3() {
    let fn1 = new Promise((resolve, reject) => {
      resolve("promiseTest3");
    });
    return fn1;
  }
  promiseTest2() {
    let fn1 = new Promise((resolve, reject) => {
      let arr = [123];
      resolve(arr);
    });
    let fn2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("两秒");
      }, 2000);
    });

    let fn3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("5秒");
      }, 5000);
    });
    // all 等待 promise 全部执行完毕 才执行 then
    Promise.all([fn1, fn2, fn3]).then(value => {
      console.log(value);
    });
    // race 等待 promise 其中一个执行完毕 才执行 then
    Promise.race([fn1, fn2, fn3]).then(value => {
      console.log(value);
    });
  }
  // async / await
  async asyncTest1() {
    // let res = await this.promiseTest1();
    return 123;
  }
  asyncTest2() {
    setTimeout(() => {
      return "async";
    }, 2000);
  }


  //Vue 专栏 ————————————————————————

  // 测试 watch 深度监测
  watch1() {
    this.person.name = "dogegg";
    console.log("change");
    this.person.address.city = "ningbo";
  }
  // localStorage 客户端存储 用户可随意更改数据！！！
  // 使用场景： 用户登录 存储用户信息 页面刷新重新获取
  //localStorage - 没有时间限制的数据存储
  //sessionStorage - 针对一个 session 的数据存储（关闭窗口，存储的数据清空）
  useLocalStorage() {
    let cats = ["lee", "egg", "aples"];
    let a = JSON.stringify(cats);
    let b = JSON.parse(a);

    if (localStorage.getItem("name")) {
      //序列化 - 转换
      try {
        // this.localStorageName = localStorage.name;
        //换种写法 setItem,removeItem,getItem
        this.localStorageName = JSON.parse(localStorage.getItem("name"));
      } catch (error) {
        // 如果数据被破坏
        localStorage.removeItem("name");
      }
    } else {
      console.log(2);
    }
  }
  @Watch("localStorageName")
  onLocalStorageName(newVal, oldVal) {
    //序列化 - 保存
    localStorage.setItem("name", JSON.stringify(this.localStorageName));
    sessionStorage.setItem("name", JSON.stringify(this.localStorageName));
  }
  //节流
  throttle(fn, delay) {
    var previous = 0;
    return function() {
      let now = Date.now();
      let context = this;
      let args = arguments;
      if (now - previous > delay) {
        fn.apply(context, args);
        previous = now;
      }
    };
  }
  search() {
    //触发搜索
    
  }
  searchResult() {
    //搜索结果
    console.log("搜索结果");
  }
  bibao(){
    let number =0;
    return ()=>{
      number++;
      console.log(number)
    }
  }

}
</script>


