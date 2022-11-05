<template>
    <div class="hero">
        <div class="type">
            <el-input v-model="inputText" placeholder="请输入" style="background-color: rgb(25,29,36);" @input="searchHero"
                :suffix-icon="Search">
            </el-input>
            <div class="typeFivePos">
                <span :class="road == 'all' ? 'highlight' : ''" @click="changeLoadFun('all')">全部定位</span>
                <span :class="road == 'top' ? 'highlight' : ''" @click="changeLoadFun('top')">上路</span>
                <span :class="road == 'jungle' ? 'highlight' : ''" @click="changeLoadFun('jungle')">打野</span>
                <span :class="road == 'mid' ? 'highlight' : ''" @click="changeLoadFun('mid')">中路</span>
                <span :class="road == 'bottom' ? 'highlight' : ''" @click="changeLoadFun('bottom')">下路</span>
                <span :class="road == 'support' ? 'highlight' : ''" @click="changeLoadFun('support')">辅助</span>
            </div>
            <div class="typeSixPos">
                <span :class="type == 'all' ? 'highlight' : ''" @click="changeTypeFun('all')">全部定位</span>
                <span :class="type == 'fighter' ? 'highlight' : ''" @click="changeTypeFun('fighter')">战士</span>
                <span :class="type == 'mage' ? 'highlight' : ''" @click="changeTypeFun('mage')">法师</span>
                <span :class="type == 'assassin' ? 'highlight' : ''" @click="changeTypeFun('assassin')">刺客</span>
                <span :class="type == 'marksman' ? 'highlight' : ''" @click="changeTypeFun('marksman')">射手</span>
                <span :class="type == 'tank' ? 'highlight' : ''" @click="changeTypeFun('tank')">坦克</span>
                <span :class="type == 'support' ? 'highlight' : ''" @click="changeTypeFun('support')">辅助</span>
            </div>
        </div>
        <ul class="heroList">
            <li v-for="item in heroShowList" :key="item.heroId">
                <a :href='basePath+"Detail?id="+item.heroId'>
                    <div class="heroItem">
                        <div>
                            <!-- 精灵图：https://game.gtimg.cn/images/lol/lolstrategy/spr_info_overview.png -->
                            <!-- 
                                load
                                support 辅助 0 0 22 18
                                jungle 打野 -51 0 18 22
                                bottom 下路 0 -23 19 19
                                top 上路 -27 0 19 19
                                mid  中路 -27 -24 18 18
                                type
                                marksman 射手
                                assassin 刺客
                                mage 法师
                                fighter 战士
                                tank  坦克
                                support 辅助
                                 -->
                            <i></i>
                        </div>
                        <!-- 图片：https://game.gtimg.cn/images/lol/act/img/skinloading/133000.jpg -->
                        <img :src="item.src" alt="">
                    </div>
                    <p>{{ item.name }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
    Search,
} from '@element-plus/icons-vue'
const basePath = import.meta.env.BASE_URL;
// 存放请求来的全部数据
var heroList = ref([])
// 存放用来渲染的数组
var heroShowList = ref([]);
// 记录英雄性质
var type = ref('all')
// 记录英雄分路
var road = ref('all')
// 搜索框
var inputText = ref('')
// 根据heroId显示分路  CHAMPION_POSITION
// 请求全部数据
function heroListReq() {
    //     https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?ts=2778982
    fetch('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?ts=2778634')
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res.hero,33333);
            heroList.value = res.hero;
            heroList.value.forEach(el => {
                // 给英雄的图片存放在每一个的对象的src字段中
                el.src = `https://game.gtimg.cn/images/lol/act/img/skinloading/${el.heroId}000.jpg`
                // 将英雄的分路存放在每一个的对象的road字段中
                switch (el.heroId * 1) {
                    case 70:
                        el.road = ["mid", "jungle", "support"]
                        break;
                    case 71:
                        el.road = ["bottom"]
                        break;
                    case 72:
                        el.road = ["mid", "top",]
                        break;
                    case 73:
                        el.road = ["top"]
                        break;
                    case 136:
                        el.road = ["mid"]
                        break;
                    case 427:
                        el.road = ["jungle"]
                        break;
                    default:
                        if (CHAMPION_POSITION.list[el.heroId] == undefined) {
                            el.road = ["all"]
                        } else {
                            el.road = Object.keys(CHAMPION_POSITION.list[el.heroId])
                        }
                        break;
                    }
                });
                // el.road = Object.keys(CHAMPION_POSITION.list[el.heroId])
            heroShowList.value = heroList.value
        })
}
heroListReq();

// 点击更换道路方法
function changeLoadFun(para) {
    if (road.value == para) {
        return
    }
    road.value = para;
    heroShowFun()
}
// 点击更换类型方法
function changeTypeFun(params) {
    if (type.value == params) {
        return
    }
    type.value = params
    heroShowFun()
}
// 根据要求返回指定的数组
function heroShowFun() {
    // heroList中每一个元素的roles字段存放type变量对应的英雄的角色类型;road字段中存放road变量对应的分路
    heroShowList.value = [];
    if (type.value == "all" && road.value == "all") {
        heroShowList.value = heroList.value
    }
    else if (type.value == "all" && road.value != "all") {
        heroList.value.forEach(v => {
            if (v['road'].includes(road.value)) {
                heroShowList.value.push(v)
            }
        })
    }
    else if (type.value != "all" && road.value == "all") {
        heroList.value.forEach(v => {
            if (v['roles'].includes(type.value)) {
                heroShowList.value.push(v)
            }
        })
    }
    else {
        heroList.value.forEach(v => {
            if (v['roles'].includes(type.value) && v['road'].includes(road.value)) {
                heroShowList.value.push(v)
            }
        })
    }
}
// 搜索英雄的按钮
function searchHero() {
    heroShowList.value = [];
    if (!inputText.value) {
        heroShowFun()
        return
    }
    // console.log(inputText.value);
    // keywords字段存储的搜索关键字
    heroList.value.forEach(v => {
        if (v['keywords'].includes(inputText.value)) {
            heroShowList.value.push(v)
        }
    })
}

// 跳转详情界面
// function goDetail(params){
//     console.log(params);
//     console.log(router);
// }
</script>

<style scoped>
.hero {
    color: rgb(121, 110, 110);
    background-image: url(https://game.gtimg.cn/images/lol/lolstrategy/bg.jpg);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% auto;
    overflow: hidden;
}

.type {
    margin: 150px auto 20px;
    width: 86%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}

.type .el-input {
    width: 200px;
    margin-bottom: 30px;
}

.typeFivePos {
    display: flex;
    min-width: 295px;
    background-color: rgb(25, 29, 36);
    margin-bottom: 30px;
}

.typeSixPos {
    display: flex;
    min-width: 295px;
    background-color: rgb(25, 29, 36);
    margin-bottom: 30px;
}

.type span {
    display: block;
    height: 100%;
    padding: 7px;
    border: 1px solid #555;
    font-size: 14px;
    cursor: pointer;
}

.highlight {
    border: 1px solid rgb(195, 143, 44) !important;
    color: rgb(195, 143, 44) !important;
}

.heroList {
    width: 90%;
    margin: 40px auto 0;
    /* border: 1px solid rgb(235, 68, 68); */
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
}

.heroList>li {
    width: 15%;
    margin-right: 1.4%;
    margin-bottom: 10px;
    border: 1px solid #313e4c;
    background-color: rgb(17, 20, 25);
    transition: all .3s;
}

.heroList>li:hover {
    border: 1px solid rgb(195, 143, 44);
    transform: scale(1.1) translateY(-20px);
}

.heroItem {
    width: 94%;
    margin: 3%;
}

.heroItem img {
    width: 100%;
}

.heroList>li p {
    text-align: center;
    color: rgb(212, 203, 203);
}

/* load
    support 辅助 0 0 22 18
    jungle 打野 -51 0 18 22
    bottom 下路 0 -23 19 19
    top 上路 -27 0 19 19
    mid  中路 -27 -24 18 18 */
.top {
    background-image: url(https://game.gtimg.cn/images/lol/lolstrategy/spr_info_overview.png);
    background-position: 0 0;
    background-size: 100% auto;
    background-repeat: no-repeat;
}
</style>