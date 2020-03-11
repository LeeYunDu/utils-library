<style scoped>
.swiper-box {
  height: 400px;
  width: 400px;
  overflow: hidden;
}
.swiper-container{
    position: relative;
}
.swiper-wrapper {
  display: flex;
  transition: all .5s;
}
.swiper-item {
  flex: 0 0 400px;
  height: 400px;
}
.thumbs-box {
  height: 100px;
  width: 400px;
  overflow: hidden;
}
.thumbs-swiper-wrapper{
    display: flex;
    transition: all .5s;
}
.thumbs-swiper-item{
    flex: 0 0 25%;
    height: 100px;
    line-height: 100px;
    overflow: hidden;
}
.icon-arrow{
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

}
.swiper-img{
    width: 100%;
    height: 400px;
}
.thumbs-swiper-img{
    width: 100%;
    height: 100px;
    opacity: .5;
}
.thumbs-swiper-img-active{
    opacity: 1;
}
</style>
<template>
  <div>
    <div class="swiper-box">
      <div class="swiper-container">
        <div class="swiper-wrapper" :style="swiperWrapperStyle">
            <div class="swiper-item" v-for="(item,index) in imgs" :key="index">
                <img class="swiper-img" :src="item"  />
            </div>
        </div>
        <img class="icon-arrow" v-show="swiperIndex>0" @click="arrow('left')" style="left:0" src="/static/images/arrow-lift.png" alt="">
        <img class="icon-arrow" v-show="swiperIndex<(imgs.length-1)" @click="arrow('right')" style="right:0" src="/static/images/arrow-right.png" alt="">
      </div>
    </div>
    <div class="thumbs-box">
      <div class="thumbs-container">
        <div class="thumbs-swiper-wrapper" :style="thumbsSwiperWrapper">
            <div class="thumbs-swiper-item" v-for="(item,index) in imgs" :key="index">
                <img :class="['thumbs-swiper-img',thumbsIndex==index?'thumbs-swiper-img-active':'']" :src="item"  />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {}
})
export default class SwiperImg extends Vue {
    imgs = [
        '/static/images/gd.jpg',
        '/static/images/Chrysanthemum.jpg',
        '/static/images/Desert.jpg',
        '/static/images/Hydrangeas.jpg',
        '/static/images/Jellyfish.jpg',
        '/static/images/Koala.jpg',
        '/static/images/Lighthouse.jpg',
        '/static/images/Penguins.jpg',
        '/static/images/Tulips.jpg',
    ]
    swiperIndex = 0
    thumbsIndex = 0
    swiperWrapperStyle = '';
    thumbsSwiperWrapper = '';
    arrow(to){
        if(to==='left'){
            this.swiperIndex--;
            this.thumbsIndex--;
        }else{
            this.swiperIndex++;
            this.thumbsIndex++;
        }
        if(this.thumbsIndex>=4){
            this.thumbsSwiperWrapper = `transform: translateX(${(this.thumbsIndex-3)*-1*25}%);`
        }else{
            this.thumbsSwiperWrapper = ''
        }
        this.swiperWrapperStyle = `transform: translateX(${this.swiperIndex*-1*400}px);`
    }
}
</script>



