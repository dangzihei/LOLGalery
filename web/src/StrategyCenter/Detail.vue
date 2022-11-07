<template>
    <div class="detail">
        <img v-if="skinList[0]" :src="skinList[0].sourceImg" alt="">
        <div class="left">
            <div>
                <el-carousel indicator-position="none" arrow="always" :loop="false" height="450" :autoplay="false">
                    <el-carousel-item v-for="item in showSkins" :key="item.skinId">
                        <img :src="item.loadingImg">
                    </el-carousel-item>
                </el-carousel>
                <el-row>
                    <p>{{ dataObj.name }}</p>
                </el-row>
                <el-row>
                    <p>{{ dataObj.type }}</p>
                </el-row>
                <el-row>
                    <el-popover placement="top-start" :width="200" trigger="hover" v-for="item, index in spells"
                        :key="index">
                        <template #reference>
                            <div>
                                <img :src="item.abilityIconPath" class="skinItemImg">
                            </div>
                        </template>
                        <template #default>
                            <div class="spellsDetail" style="display: flex; gap: 16px; flex-direction: column">
                                <div> <span>{{ item.name }}</span> <span>{{ item.spellType }}</span></div>
                                <div v-if="item.cost">
                                    <p>技能消耗:<span>{{ item.cost.join('/') }}</span></p>
                                    <p>技能冷却(秒):<span>{{ item.cooldown.join('/') }}</span></p>
                                    <p>范围:<span>{{ item.range.join('/') }}</span></p>
                                </div>
                                <p>
                                    {{ item.description }}
                                </p>
                            </div>
                        </template>
                    </el-popover>
                </el-row>
                <el-row>
                    <span>难度</span>
                    <div class="difficulty">
                        <i v-for="item, index in 3" :key="index" :class="index < heros.difficultyL ? 'light' : ''">
                        </i>
                    </div>
                </el-row>
                <el-row>
                    <span>胜率:</span><span>{{ dataObj.win }}</span>
                </el-row>
                <el-row>
                    <span>ban率:</span><span>{{ dataObj.ban }}</span>
                </el-row>
                <el-row>
                    <span>登场率:</span> <span>{{ dataObj.show }}</span>
                </el-row>
                <el-row>
                    <span>最佳双排:</span>
                    <div v-if="dataObj.dbRank" class="dbRank">
                        <img v-for="item in dataObj.dbRank" :src="'https://' + item.url">
                    </div>
                    <span v-else>
                        暂无
                    </span>
                </el-row>
            </div>
        </div>
        <div class="right">
            <div >
                <div class="tab">
                    <el-button v-for="item,index in tabList" :key="index"  @click="changeComIndex(index)">
                        {{item.name}}    
                    </el-button>
                </div>
                <component :is="tabList[componentIndex].component">
                </component>
            </div>
        </div>
    </div>
</template>
<script setup>
// error
// import request  from '../request/request'
// console.log(request,'222');
// request.createScriptEl('https://lol.qq.com/act/lbp/common/guides/champDetail/champDetail_1.js?ts=2779196');
import { reactive, ref,shallowRef } from "vue";
import { useRoute } from "vue-router";
import DateOverview from '../components/DataOverview.vue'
import SkinShow from '../components/SkinShow.vue'
let route = useRoute();

// 传递的参数
console.log(route.query.id);
// 接口请求到的数据
var skinList = ref([])
var spells = ref([])
var heros = ref({})
// 展示的图片的数组
var showSkins = reactive([]);
// 爬虫的数据
var dataObj = ref({});
// 切换的默认tab组件
console.log(route.query.type,33333);
var componentIndex = ref(route.query.type);
var tabList = ref([
    {
        name:"大神攻略",
        components:shallowRef(DateOverview)
    },
    {
        name:"数据总览",
        component:shallowRef(DateOverview)
    },
    // {
    //     name:"英雄克制"
    // },
    // {
    //     name:"装备推荐"
    // },
    // {
    //     name:"符文推荐"
    // },
    // {
    //     name:"数据曲线"
    // },
    {
        name:"皮肤展示",
        component:shallowRef(SkinShow)
    }
])
fetch(`https://game.gtimg.cn/images/lol/act/img/js/hero/${route.query.id}.js?ts=2779096`).then(res => res.json()).then(res => {
    // skins是皮肤  spells是技能 difficultyL是难度
    console.log(res, '444', res.hero.difficultyL);
    skinList.value = res.skins;
    heros.value = res.hero;
    spells.value = [...res.spells];
    console.log(res.spells);
    // 技能列表进行排序
    for (let ind = 0; ind < res.spells.length; ind++) {
        switch (res.spells[ind].spellKey) {
            case "passive":
                spells.value.splice(0, 1, res.spells[ind])
                spells.value[ind].spellType = '被动技能'
                break;
            case "q":
                spells.value.splice(1, 1, res.spells[ind])
                spells.value[ind].spellType = '快捷键:Q'
                break;
            case "w":
                spells.value.splice(2, 1, res.spells[ind])
                spells.value[ind].spellType = '快捷键:W'
                break;
            case "e":
                spells.value.splice(3, 1, res.spells[ind])
                spells.value[ind].spellType = '快捷键:E'
                break;
            case "r":
                spells.value.splice(4, 1, res.spells[ind])
                spells.value[ind].spellType = '快捷键:R'
                console.log(spells.value);
                break;
            default:
                break;
        }
    }
    skinList.value.forEach(item => {
        if (item.loadingImg) {
            showSkins.push(item);
        }
    });
})

fetch(import.meta.env.BASE_URL + `heros/detail.${route.query.id}.json`).then(res => {
    return res.json()
}).then(res => {
    console.log(res);
    dataObj.value = res;
    // console.log(data);
})

function changeComIndex(params) {
    componentIndex.value = params;
    console.log(componentIndex.value);
}
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

.detail>img {
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
    flex-shrink: 0
}

.right {
    height: 100%;
    width: 80%;
    border: 1px solid rgb(32, 232, 95);
    overflow: auto;
    z-index: 6;
}

.right>div {
    width: 100%;

}

.el-carousel {
    width: 95%;
    margin: 2% auto;
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

.difficulty {
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
}

.difficulty i {
    height: 8px;
    width: 25px;
    background-color: rgba(181, 151, 88, .2);
}

.difficulty .light {
    background-color: #b59758;
}

.dbRank {
    display: flex
}

.dbRank img {
    width: 24px;
    height: 24px;
}

.skinItemImg {
    width: 30px;
    height: 30px;
}
</style>