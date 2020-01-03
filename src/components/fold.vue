<style scoped>
.fold-box,.fold-check-box{
    width: 300px;
    list-style: none;
}
.fold-box > li ,.fold-check-box > article{
    margin-bottom: 10px;
    transition: all 0.3s;
}
.fold-box > li:hover > .fold-content{
    max-height: 300px;
    border: 1px solid red;
    border-top: none;
}
.fold-title , .fold-check-box label{
    background: greenyellow;
    height: 30px;
    line-height: 30px;
    margin: 0;
    width: 100%;
    display: block;
    cursor: pointer;
}
.fold-check-box input{
    display: none;
}
.fold-content,.fold-check-box > article > div{
    max-height: 0;
    overflow: hidden;
    padding: 0 10px;
    border:none;
}
.fold-checkbox:nth-child(1):checked ~ article:nth-of-type(1) div,
.fold-checkbox:nth-child(2):checked ~ article:nth-of-type(2) div,
.fold-checkbox:nth-child(3):checked ~ article:nth-of-type(3) div{
   max-height: 300px;
    border: 1px solid red;
    border-top: none;
}
</style>
<template>
  <div>
    <h5>折页盒子</h5>
    <p>通过Max-height 控制 显示/隐藏 </p>
    <h6>hover</h6>
    <ul class="fold-box">
        <li>
            <h6 class="fold-title">列表一</h6>
            <div class="fold-content">
                内容 <br>
                内容2 <br>
                内容2 <br>
            </div>
        </li>
        <li>
            <h6 class="fold-title">列表二</h6>
            <div class="fold-content">
                内容  <br>
                内容2 <br>
                内容2 <br>
            </div>
        </li>
        <li>
            <h6 class="fold-title">列表三</h6>
            <div class="fold-content">内容</div>
        </li>
    </ul>
    <h6>check</h6>
    <ul class="fold-check-box">
        <input type="checkbox" class="fold-checkbox" id="collapse1">
        <input type="checkbox" class="fold-checkbox" id="collapse2">
        <input type="checkbox" class="fold-checkbox" id="collapse3">
        <article>
			<label for="collapse1">列表1</label>
			<div>内容1<br>内容2<br>内容3<br>内容4</div>
		</article>
        <article>
			<label for="collapse2">列表2</label>
			<div>内容1<br>内容2<br>内容3<br>内容4</div>
		</article>
        <article>
			<label for="collapse3">列表3</label>
			<div>内容1<br>内容2<br>内容3<br>内容4</div>
		</article>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class fold extends Vue{
  mounted () {
    
  }
  
}
</script>


