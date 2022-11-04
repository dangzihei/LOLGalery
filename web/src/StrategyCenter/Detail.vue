<template>
    <div class="detail">
        <div class="left">
            <div>
                <el-carousel  direction="vertical" :autoplay="false" >
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 text="2xl" justify="center">{{ item }}</h3>
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
// import request  from '../request/request'
// console.log(request,'222');
// request.createScriptEl('https://lol.qq.com/act/lbp/common/guides/champDetail/champDetail_1.js?ts=2779196');

// skins是皮肤  spells是技能 difficultyL是难度
fetch("https://game.gtimg.cn/images/lol/act/img/js/hero/1.js?ts=2779096").then(res=>res.json()).then(res=>{
    console.log(res,'444');
})
</script>
<style scoped>
.detail {
    color: rgb(121, 110, 110);
    z-index: 3;
    background-image: url(https://game.gtimg.cn/images/lol/act/img/guidetop/guide1000.jpg);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% auto;
    overflow: hidden;
    opacity: .7;
    display: flex;
    box-sizing: border-box;
    height: 100%;
}

.left {
    height: 100%;
    width: 20%;
    border: 1px solid rgb(232, 32, 32);
}

.right {
    height: 100%;
    width: 80%;
    border: 1px solid rgb(32, 232, 95);
    overflow: auto;
}

.right>div {
    height: 1000px;
    width: 100%;

}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>