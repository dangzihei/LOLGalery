<template>
    <div class="detail">
        <img :src="bgImage" alt="">
        <div class="left">
            <div>
                <el-carousel  direction="vertical" :autoplay="false" >
                    <el-carousel-item v-for="item in showSkins" :key="item.skinId">
                        <img :src="item.loadingImg" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class="right">
            <div>

            </div>
        </div>
    </div>
</template>
<script setup>
// error
// import request  from '../request/request'
// console.log(request,'222');
// request.createScriptEl('https://lol.qq.com/act/lbp/common/guides/champDetail/champDetail_1.js?ts=2779196');
import { reactive,ref } from "vue";
import { useRoute } from "vue-router";
let route = useRoute();
// 传递的参数
console.log(route.query.id);
fetch(`https://game.gtimg.cn/images/lol/act/img/js/hero/${route.query.id}.js?ts=2779096`).then(res=>res.json()).then(res=>{
    // skins是皮肤  spells是技能 difficultyL是难度
    console.log(res,'444');
    skinList.push(...res.skins)
    bgImage.value =  res.skins[0].sourceImg;
    res.skins.forEach(item => {
        if (item.loadingImg) {
            showSkins.push(item);
        }
    });
})

// 存放全部皮肤的数组
var skinList = reactive([]);
var bgImage = ref()
var showSkins = reactive([]);
var spellList = reactive([]);
fetch(import.meta.env.BASE_URL+`heros/detail.${route.query.id}.json`).then(res=>{
    return res.json()
}).then(res=>{
    console.log(res);
})
</script>
<style scoped>
.detail {
    color: rgb(121, 110, 110);
    z-index: 3;
    overflow: hidden;
    opacity: .7;
    display: flex;
    box-sizing: border-box;
    height: 100%;
}
.detail>img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: .6;
}

.left {
    height: 100%;
    width: 20%;
    border: 1px solid rgb(232, 32, 32);
    z-index: 6;
}

.right {
    height: 100%;
    width: 80%;
    border: 1px solid rgb(32, 232, 95);
    overflow: auto;
    z-index: 6;

}

.right>div {
    height: 1000px;
    width: 100%;

}

.el-carousel__item img {
    width: 100%;
    height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>