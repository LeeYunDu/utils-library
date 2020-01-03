<style scoped>
.paging-box {
  justify-content: center;
  display: flex;
}
.paging-icon {
  width: 15px;
  height: 15px;
}

.paging-box > li {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #666;
  border-radius: 5px;
  margin: 0 4px;
  overflow: hidden;
  font-size: 14px;
}
.paging-more {
  width: 100%;
  height: auto;
  margin-top: 4px;
}
.currentPage {
  color: red;
  background: blue;
}
.paging-box > .disabled{
  cursor: not-allowed
}
</style>
<template>
  <div>
    <h5>分页</h5>
    <ul class="paging-box">
      <li :class="[currentPage==1?'disabled':'']" @click="turnPage('prev')">
        <img class="paging-icon" src="/static/images/icon-left.png" alt="上一页" />
      </li>
      <li :class="[currentPage==1?'currentPage':'']" @click="changePage(1)">1</li>
      <li class v-if="showPrevMore" @click="MorePage('prev')">
        <img class="paging-more" src="/static/images/icon-more.png" alt />
      </li>
      <li
        :class="[currentPage==item?'currentPage':'','']"
        v-for="item in paging"
        :key="item"
        @click="changePage(item)"
      >{{item}}</li>
      <li class v-if="showNextMore" @click="MorePage('next')">
        <img class="paging-more" src="/static/images/icon-more.png" alt />
      </li>
      <li
        v-if="pageNumber>1"
        :class="[currentPage==pageNumber?'currentPage':'','']"
        @click="changePage(pageNumber)"
      >{{pageNumber}}</li>
      <li :class="[currentPage==pageNumber?'disabled':'']" @click="turnPage('next')">
        <img class="paging-icon" src="/static/images/icon-right.png" alt="下一页" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop , Watch } from "vue-property-decorator";

@Component({})
export default class Paging extends Vue {
  //总数
  @Prop(Number)
  total: number;
  //每页显示几个
  @Prop(Number)
  row: number;
  //当前页
  currentPage: number = 1;
  //最多显示页数
  moreShowPage: number = 7;
  //快速翻页
  turnNumber = 0;
  showPrevMore = false;
  showNextMore = false;

  mounted() {}
  //当前页
  changePage(page) {
    this.currentPage = page;
  }
  MorePage(direction) {
    if (direction == "next") {
      this.currentPage = this.currentPage + (this.moreShowPage - 2);
    } else {
      this.currentPage = this.currentPage - (this.moreShowPage - 2);
    }
  }
  turnPage(direction) {
    if (direction == "next" && this.currentPage != this.pageNumber) {
      this.currentPage++;
    } else if (direction == "prev" && this.currentPage != 1) {
      this.currentPage--;
    }
  }
  //显示页码
  get paging() {
    const moreShowPage = this.moreShowPage; //页面最多显示几个按钮
    const centerPage = (moreShowPage - 1) / 2; //中间值
    const pageCount = this.pageNumber; //总页数
    const currentPage = this.currentPage; //当前页

    let arr = [];
    let showPrevMore = false;
    let showNextMore = false;

    if (pageCount > moreShowPage) {
      if (currentPage > moreShowPage - centerPage) {
        showPrevMore = true;
      }
      if (currentPage < pageCount - centerPage) {
        showNextMore = true;
      }
    }
    if (showNextMore && !showPrevMore) {
      //只有下翻
      for (let i = 2; i < moreShowPage; i++) {
        arr.push(i);
      }
    } else if (showPrevMore && !showNextMore) {
      //只有上翻
      for (let i = pageCount - (moreShowPage - 2); i < pageCount; i++) {
        arr.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      //同时存在 上下翻
      let offset = Math.floor(moreShowPage / 2) - 1;
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        arr.push(i);
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        arr.push(i);
      }
    }

    this.showPrevMore = showPrevMore;
    this.showNextMore = showNextMore;
    return arr;
  }
  //返回页数
  get pageNumber(): number {
    let total = this.total;
    let row = this.row;
    if (total % row != 0) {
      return Math.floor(total / row) + 1;
    } else {
      return total / row;
    }
  }
  //监听 页码变化
  @Watch('currentPage', { immediate: true, deep: true })
  onPageChange(val,oldVal){
    if(val&&oldVal){
      //触发事件
      console.log('页码发生变化')
    }
  }
}
</script>


