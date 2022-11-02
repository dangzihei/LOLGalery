<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '70px' : '140px'">
        <div class="leftBarImg">
          <img :style='{ width: `${isCollapse ? "90%" : "60%"}` }'
            src="https://game.gtimg.cn/images/lol/lolstrategy/logo-lol.png">
        </div>
        <!-- 菜单栏 -->
        <el-menu default-active="/" class="el-menu-vertical-demo" :collapse="isCollapse" router collapse-transition
          active-text-color="#fff5e0">
          <el-menu-item v-for="item, index in leftTabBar" :index="item.path">
            <svg width="21px" height="17px" v-if="index == 0">
              <path stroke-width="0" fill-rule="evenodd"
                d="M15.572,7.186 L18.908,6.074 L18.908,8.298 L15.572,11.635 L16.684,11.635 L16.684,12.747 L14.459,13.859 L14.459,11.635 L14.459,7.186 L14.459,3.849 L20.020,0.513 L20.020,3.849 L15.572,7.186 ZM7.786,13.859 L7.786,2.737 L12.235,2.737 L12.235,13.859 L10.010,16.084 L7.786,13.859 ZM3.337,11.635 L4.449,11.635 L1.113,8.298 L1.113,6.074 L4.449,7.186 L0.001,3.849 L0.001,0.513 L5.562,3.849 L5.562,7.186 L5.562,11.635 L5.562,13.859 L3.337,12.747 L3.337,11.635 Z">
              </path>
            </svg>
            <svg width="20px" height="18px" v-else-if="index == 1">
              <path stroke-width="0" fill-rule="evenodd"
                d="M19.456,9.386 L18.024,15.969 C17.787,17.060 16.691,17.756 15.576,17.524 L8.850,16.122 C7.736,15.890 7.025,14.817 7.262,13.726 L8.694,7.143 C8.932,6.053 10.027,5.357 11.142,5.589 L17.868,6.991 C18.982,7.223 19.693,8.295 19.456,9.386 ZM10.991,11.378 C10.153,11.199 9.327,11.735 9.149,12.576 C8.970,13.417 9.505,14.244 10.345,14.423 C11.184,14.602 12.009,14.066 12.187,13.225 C12.366,12.384 11.831,11.557 10.991,11.378 ZM16.200,8.233 C15.351,8.052 14.516,8.595 14.335,9.446 C14.154,10.297 14.696,11.135 15.545,11.316 C16.394,11.497 17.229,10.954 17.410,10.103 C17.590,9.251 17.049,8.414 16.200,8.233 ZM6.957,5.170 C6.737,5.105 6.504,5.075 6.262,5.112 C5.394,5.246 4.799,6.051 4.934,6.911 C5.045,7.620 5.622,8.119 6.305,8.207 L5.401,12.457 L4.230,12.635 C3.104,12.806 2.049,12.052 1.874,10.950 L0.819,4.298 C0.644,3.197 1.414,2.164 2.540,1.993 L9.336,0.960 C10.462,0.789 11.516,1.543 11.691,2.645 L11.811,3.400 L10.256,3.069 C8.764,2.751 7.301,3.691 6.957,5.170 Z">
              </path>
            </svg>
            <svg width="22px" height="16px" v-else-if="index == 2">
              <path stroke-width="0" fill-rule="evenodd"
                d="M21.830,8.265 C21.457,8.833 19.823,7.863 19.823,7.863 C19.823,7.863 19.272,9.721 17.378,10.611 C17.083,10.218 17.165,9.165 14.979,7.360 C14.854,6.533 14.067,5.700 13.418,5.120 C12.002,3.888 11.267,3.904 11.249,3.882 C11.824,3.050 12.915,1.840 14.402,1.840 L15.406,0.033 L16.409,1.840 C16.409,1.840 18.819,2.047 19.823,4.651 C19.823,4.651 22.418,7.372 21.830,8.265 ZM17.941,5.253 C17.419,5.249 16.788,6.012 16.811,6.643 C16.835,7.290 17.433,7.686 17.800,7.663 C18.166,7.640 18.591,7.453 18.788,6.847 C18.985,6.241 18.196,5.254 17.941,5.253 Z">
              </path>
              <path stroke-width="0" fill-rule="evenodd"
                d="M17.197,12.394 C16.709,13.122 14.579,11.878 14.579,11.878 C14.579,11.878 13.346,15.971 8.558,16.000 C3.994,16.027 2.799,11.878 2.799,11.878 C2.799,11.878 0.967,13.027 0.181,12.394 C-0.605,11.760 2.164,8.243 2.799,7.757 C2.799,7.757 4.556,4.151 7.511,4.151 L8.819,1.832 L10.128,4.151 C10.128,4.151 13.271,4.416 14.579,7.757 C14.579,7.757 17.963,11.247 17.197,12.394 ZM5.491,8.577 C5.153,8.579 4.108,9.825 4.369,10.590 C4.630,11.355 5.193,11.592 5.678,11.621 C6.164,11.650 6.955,11.150 6.987,10.333 C7.018,9.535 6.183,8.572 5.491,8.577 ZM12.125,8.529 C11.444,8.524 10.621,9.502 10.652,10.312 C10.683,11.142 11.463,11.650 11.941,11.621 C12.419,11.591 12.973,11.351 13.230,10.574 C13.486,9.797 12.458,8.531 12.125,8.529 Z">
              </path>
            </svg>
            <svg width="20px" height="15px" v-else-if="index == 3">
              <path stroke-width="0" fill-rule="evenodd"
                d="M7.348,14.215 L7.348,11.562 L19.285,11.562 L19.285,14.215 L7.348,14.215 ZM7.348,6.256 L19.285,6.256 L19.285,8.909 L7.348,8.909 L7.348,6.256 ZM7.348,0.951 L19.285,0.951 L19.285,3.603 L7.348,3.603 L7.348,0.951 ZM0.715,11.562 L4.695,11.562 L4.695,14.215 L0.715,14.215 L0.715,11.562 ZM0.715,6.256 L4.695,6.256 L4.695,8.909 L0.715,8.909 L0.715,6.256 ZM0.715,0.951 L4.695,0.951 L4.695,3.603 L0.715,3.603 L0.715,0.951 Z">
              </path>
            </svg>
            <svg width="16px" height="18px" v-else-if="index == 4">
              <path stroke-width="0" fill-rule="evenodd"
                d="M14.187,6.874 C14.187,2.212 7.838,0.525 7.838,0.525 C7.838,0.525 1.488,2.206 1.488,6.874 C1.488,11.543 1.499,12.140 0.430,13.224 C0.430,13.224 1.952,17.456 5.721,17.456 C5.721,17.456 4.663,16.415 4.663,11.107 C4.663,11.107 2.547,10.656 2.547,6.874 C5.234,6.874 6.779,8.991 6.779,8.991 L6.779,13.224 L7.838,14.282 L8.896,13.224 L8.896,8.991 C8.896,8.991 10.307,6.874 13.128,6.874 C13.128,10.601 11.012,11.107 11.012,11.107 C11.012,16.393 9.954,17.456 9.954,17.456 C13.723,17.456 15.245,13.224 15.245,13.224 C14.092,12.055 14.187,11.537 14.187,6.874 Z">
              </path>
            </svg>
            <svg width="18px" height="18px" v-else-if="index == 5">
              <path stroke-width="0" fill-rule="evenodd"
                d="M2.990,11.682 L0.161,11.682 L0.868,9.561 L4.404,10.268 L14.303,0.368 L17.132,0.368 L17.132,3.197 L7.232,13.096 L7.939,16.632 L5.818,17.339 L5.818,14.510 L3.697,15.218 L3.697,16.632 L0.868,16.632 L0.868,13.803 L2.282,13.803 L2.990,11.682 Z">
              </path>
            </svg>
            <svg width="20px" height="16px" v-else="index == 6">
              <path stroke-width="0" fill-rule="evenodd"
                d="M20.004,0.907 L14.612,1.986 C14.612,1.986 13.254,0.907 10.298,0.907 C7.342,0.907 5.984,1.986 5.984,1.986 L0.591,0.907 L1.670,6.299 L0.591,9.535 C1.877,12.138 5.536,16.006 10.298,16.006 C15.060,16.006 18.247,12.537 20.004,9.535 L18.925,6.299 L20.004,0.907 ZM3.827,8.456 L3.827,7.378 C3.827,7.378 4.690,5.237 6.010,5.237 C7.331,5.237 8.141,7.378 8.141,7.378 L8.141,8.456 C8.141,8.456 7.275,7.378 5.987,7.378 C4.699,7.378 3.827,8.456 3.827,8.456 ZM10.298,12.782 C8.131,12.782 7.062,10.613 7.062,10.613 L7.062,9.535 C7.062,9.535 8.139,10.613 10.298,10.613 C12.457,10.613 13.533,9.535 13.533,9.535 L13.533,10.613 C13.533,10.613 12.464,12.782 10.298,12.782 ZM16.769,8.456 C16.769,8.456 16.261,7.316 14.593,7.316 C12.924,7.316 12.455,8.456 12.455,8.456 L12.455,7.378 C12.455,7.378 13.087,5.213 14.616,5.213 C16.145,5.213 16.769,7.378 16.769,7.378 L16.769,8.456 Z">
              </path>
            </svg>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </el-menu>

        <div class="leftBarBottom">
          <div class="leftBarBottomIcon" v-show="isCollapse" @click="isCollapse = !isCollapse">
            <el-icon>
              <ArrowRight />
            </el-icon>
          </div>
          <div class="leftBarBottomIcon" v-show="!isCollapse" @click="isCollapse = !isCollapse">
            <el-icon>
              <ArrowLeft />
            </el-icon>
          </div>
        </div>
      </el-aside>

      <!-- 右边栏 -->
      <el-container class="right" :style='{ left: `${isCollapse ? "70px" : "140px"}` }'>
        <!-- 右边导航栏 -->
        <el-header>
          <div>
            <div>
              <span>英雄联盟攻略中心</span>
            </div>
          </div>
        </el-header>
        <!-- 右边内容栏 -->
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
} from '@element-plus/icons-vue'
var leftTabBar = ref([
  {
    title: '峡谷排位',
    path: '/'
  },
  {
    title: '大乱斗',
    path: 'Melee'
  },
  {
    title: '最佳双排',
    path: 'DbRank'
  },
  {
    title: '精品攻略',
    path: 'Strategy'
  },
  {
    title: '英雄列表',
    path: 'Hero'
  },
  {
    title: '装备列表',
    path: 'Kit'
  },
  {
    title: '趣味数据',
    path: 'FunData'
  },
])
// 展开或关闭的变量
const isCollapse = ref(true)

</script>

<style scoped>
/* 左边 */
.el-aside {
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all .5s;
  padding-top: 5vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(22, 26, 32);
  z-index: 5;
}

/* 左边上面 */
.leftBarImg {
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.leftBarImg img {
  width: 100%;
}

/* 左边中间 */
.el-menu {
  border: none;
  background-color: rgb(22, 26, 32);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}

.el-menu-item {
  justify-content: space-evenly;
  color: #7e807d;
}

.el-menu-item:hover {
  background-color: #333;
}

.el-menu-item svg {
  fill: #7e807d;
  stroke: #7e807d;
}

.is-active svg {
  fill: #fff5e0;
  stroke: #fff5e0;
}

/* 左边底部 */
.leftBarBottom {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 左边下面的按钮 */
.leftBarBottomIcon {
  width: 20px;
  height: 20px;
  line-height: 23px;
  padding-left: 1.25px;
  box-sizing: border-box;
  border: 1px solid #666;
  border-radius: 50%;
  color: white;
}

/* 右边 */
.right {
  width: 100%;
  position: absolute;
  top: 0;
  transition: all .5s;
}

/* 右边顶部 */
.el-header {
  width: 100vw;
  height: 50px;
  background-color: rgb(26, 32, 38);
  min-width: 1130px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}

.el-header>div {
  height: 50px;
  width: calc(100vw - 400px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 200px;
  top: 0;
  color: rgb(195, 143, 44);
}

.el-header>div span {
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 右边内容 */
.el-main {
  position: fixed;
  top: 50px;
  min-width: 1130px;
  border: 1px solid #000;
  background-color: rgb(27, 33, 40);
  position: relative;
  background-image: url(https://game.gtimg.cn/images/lol/lolstrategy/bg.jpg);
  background-position: 0 0;
  background-size: 100% auto;
  background-repeat: no-repeat;
}


/* 移动端页面布局 */
</style>
