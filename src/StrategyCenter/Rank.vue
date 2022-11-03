<template>
    <div class="rank">
    </div>
</template>

<script setup>
import { ref,getCurrentInstance } from 'vue'
const { proxy } =getCurrentInstance();
// 接受全局的请求的数据
var heroList = ref([...proxy.$reqHeroList.hero]);
console.log(heroList.value);
// onBeforeMount(async ()=>{
//     console.log(heroList.value);
// })
// console.log(heroList.value);
// 请求全部数据:https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?ts=2778982
// 英雄头像:https://game.gtimg.cn/images/lol/act/img/champion/Vi.png
    
</script>
<style scoped>
.rank{
    color: rgb(121, 110, 110);
    background-image: url(https://game.gtimg.cn/images/lol/lolstrategy/bg.jpg);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% auto;
    overflow: hidden;
    height: 1000px;
}
</style>