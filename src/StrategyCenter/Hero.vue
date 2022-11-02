<template>
    <div class="hero">
        <h2>英雄列表</h2>
        <div class="type">
            <el-input v-model="inputText"  placeholder="搜索" :suffix-icon="Search" style="background-color: black;"/>
            <div class="typeFivePos">
                <span :class="typeFivePosInd==0?'highlight':''"  @click="typeFivePosInd = 0">全部定位</span>
                <span :class="typeFivePosInd==1?'highlight':''"  @click="typeFivePosInd = 1">上路</span>
                <span :class="typeFivePosInd==2?'highlight':''"  @click="typeFivePosInd = 2">打野</span>
                <span :class="typeFivePosInd==3?'highlight':''"  @click="typeFivePosInd = 3">中路</span>
                <span :class="typeFivePosInd==4?'highlight':''"  @click="typeFivePosInd = 4">下路</span>
                <span :class="typeFivePosInd==5?'highlight':''"  @click="typeFivePosInd = 5">辅助</span>
            </div>
            <div class="typeSixPos">
                <span :class="typeSixPosInd==0?'highlight':''"  @click="typeSixPosInd = 0">全部定位</span>
                <span :class="typeSixPosInd==1?'highlight':''"  @click="typeSixPosInd = 1">战士</span>
                <span :class="typeSixPosInd==2?'highlight':''"  @click="typeSixPosInd = 2">法师</span>
                <span :class="typeSixPosInd==3?'highlight':''"  @click="typeSixPosInd = 3">刺客</span>
                <span :class="typeSixPosInd==4?'highlight':''"  @click="typeSixPosInd = 4">射手</span>
                <span :class="typeSixPosInd==5?'highlight':''"  @click="typeSixPosInd = 5">坦克</span>
                <span :class="typeSixPosInd==6?'highlight':''"  @click="typeSixPosInd = 6">辅助</span>
            </div>
        </div>
        <ul class="heroList">
            <li>
                <a href="#javascript">
                    <div  class="heroItem">
                        <div>
                            <!-- 精灵图：https://game.gtimg.cn/images/lol/lolstrategy/spr_info_overview.png -->
                            <!-- support 辅助 0 0 22 18
                                jungle 打野 -51 0 18 22
                                bottom 下路 0 -23 19 19
                                top 上路 -27 0 19 19
                                mid  中路 -27 -24 18 18
                                类型而
                                marksman 射手
                                assassin 刺客
                                 -->
                                 <!-- 分路数据：https://lol.qq.com/act/lbp/common/guides/guideschampion_p -->
                            <i></i>
                        </div>
                        <!-- 图片：https://game.gtimg.cn/images/lol/act/img/skinloading/133000.jpg -->
                        <img src="" alt="">
                    </div>
                    <p></p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import{ref} from 'vue'
import {
  Search,
} from '@element-plus/icons-vue'
fetch('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?ts=2778634').then(res => {
    return res.json()
}).then(res => {
    console.log(res, 111);
})
var inputText = ref('') 
var typeSixPosInd = ref(0)
var typeFivePosInd = ref(0)
</script>

<style scoped>
.hero {
    color: rgb(121, 110, 110);
    z-index: 2;
    height: 1000px;
}
.type {
    width: 800px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.type .el-input{
    width: 100px;
}
.typeFivePos{
    display: flex;
}
.typeSixPos{
    display: flex;
    
}
.type span{
    display: block;
    height: 100%;
    padding: 7px;
    border: 1px solid #555;
    font-size: 14px;
    cursor: pointer;
}
.highlight{
    border: 1px solid rgb(195, 143, 44) !important;
    color: rgb(195, 143, 44) !important;
}

</style>