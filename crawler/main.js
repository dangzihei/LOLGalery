const puppeteer = require('puppeteer');
const fs = require('fs');
const url = require('node:url');
const baseUrl = require('./env.json')

let pptBrowser = undefined
let result1 = undefined;
async function start() {
    // 启动浏览器
    pptBrowser = await puppeteer.launch({
        headless: false, // 默认是无头模式，这里为了示范所以使用正常模式
    })

    let page = await pptBrowser.newPage()

    await page.goto('https://101.qq.com/#/hero')

    await page.waitForSelector('#app > div > div.app-main > div > div > ul > li:nth-child(1) > a')

    let heroLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.hero-list > li > a')).map(i => {
            return i.href
        })
    })

    // 测试使用 使用10  heroLinks.length
    for (let index = 0; index < 2; index++) {
        try {
            await getHeroData(heroLinks[index])
        } catch (error) {
            console.error(error)
        }
    }
    console.log(result1);
    pptBrowser.close()
}


async function getHeroData(link) {
    // 控制浏览器打开新标签页面
    let page = await pptBrowser.newPage()
    // 在新标签中打开要爬取的网页
    await page.goto(link)

    // 使用evaluate方法在浏览器中执行传入函数（完全的浏览器环境，所以函数内可以直接使用window、document等所有对象和方法）
    await page.waitForSelector('#app > div > div.app-main > div > div.hero-details.hero-details-5v5 > div.details-container > div.details-content > div > div.left > div.rune-recommend > div:nth-child(2) > div.rune-primary-wrap.rune-wrap2 > div:nth-child(2) > div > img')

    let data = await page.evaluate(async () => {
        let res = {}
        let heroName = document.querySelector('.hero-show .hero-intro .hero-name')
        let heroType = document.querySelector('.hero-show .hero-intro .hero-type')
        let win = document.querySelector('.hero-show .win-text')
        let ban = document.querySelector('.hero-show .ban-text')
        let show = document.querySelector('.hero-show .show-text')
        let dbRank = document.querySelectorAll('.bestdb img')
        let runeList = document.querySelectorAll('.rune-recommend .rune-item')
        let equipmentRecommend = document.querySelectorAll('.equipment-recommend .equipment-cont')
        let alignment = document.querySelector('.data-screening .right .alignment-wrap')
        let tabList = alignment.querySelectorAll('.tab-con a')
        res['name'] = heroName.innerText;
        res['type'] = heroType.innerText;
        res['win'] = win.innerText;
        res['ban'] = ban.innerText;
        res['show'] = show.innerText;
        res['dbRank'] = [];
        res['runeCommend'] = [];
        res.equipmentRecommend = {}
        res.alignment = {}

        for (let i = 0; i < dbRank.length; i++) {
            res['dbRank'].push({
                url: dbRank[i].getAttribute('src').slice(2),
                alt: dbRank[i].getAttribute('alt')
            })
        }
        // 天赋推荐
        runeList.forEach(item => {
            let obj = { rune: [], show: '', win: '' }
            item.querySelectorAll('.rune-primary').forEach(it => {
                let box = it.querySelector('.rune-box img')
                let src = box.getAttribute('src');
                let alt = box.getAttribute('alt');
                obj.rune.push({
                    src,
                    alt
                })
            });
            obj.show = item.querySelector('.onstage-chance span').innerText;
            obj.win = item.querySelector('.win-chance span').innerText;
            res.runeCommend.push(obj);
        })
        // 装备推荐
        equipmentRecommend.forEach(item => {
            res.equipmentRecommend[item.querySelector('.head .rec-text').innerText] = {
                rec: item.querySelector('.head .rec-text').innerText,
                onstage: item.querySelector('.head .onstage-text').innerText,
                win: item.querySelector('.head .win-text').innerText,
                list: Array.from(item.querySelectorAll('.list .list-item')).map(it => {
                    return {
                        onstage: it.querySelector('.onstage-text').innerText,
                        win: it.querySelector('.win-text').innerText,
                        icons: [...it.querySelectorAll('.equipment-box .equipment')].map(v => {
                            return {
                                src: v.querySelector('img').getAttribute('src'),
                                alt: v.querySelector('img').getAttribute('alt')
                            }
                        })
                    }
                })
            }

        })
        // 四张趋势图

        // 右侧优势对象和劣势对线
        res.alignment[titleText(tabList)] = alignmentFun(alignment);
        tabList[1].click();
        result1 =[tabList[1].innerText,titleText(tabList)]
        // setTimeout(()=>{
        //     res.alignment[titleText(tabList)] = alignmentFun(alignment);
        // },2000)


        // 根据爬取的数据
        function alignmentFun(params) {
            let listItem = params.querySelectorAll('.alignment-list .list-item')
            console.log(listItem, 1111);
            let titleList = params.querySelectorAll('.tab-con a')
            let title = titleText(titleList)
            let list = (() => {
                let res = [];
                for (let i = 0; i < listItem.length; i++) {
                    console.log(i);
                    res.push({
                        id: listItem[i].querySelector('.idx').innerText,
                        url: listItem[i].querySelector('.head-pic img').getAttribute('src'),
                        alt: listItem[i].querySelector('.head-pic img').getAttribute('alt'),
                        rate: listItem[i].querySelector('.progress-box span').innerText,
                    })
                }
                return res
            })()
            return {
                title,
                list
            }
        }

        // 根据传进来的数组来判断现在点击的字段
        function titleText(list) {
            let res;
            for (let i = 0; i < list.length; i++) {
                if ([...list[i].classList].includes('on')) {
                    res = list[i].innerText
                    break;
                };
            }
            return res
        }
        // await page.click(tabList[1]);
        // res.alignment[titleText(tabList)] = alignmentFun(alignment);
        return res
    })
    // console.log(url.parse(link).hash.split('=')[1]);
    // 此处是网站根目录../web/detail.data.json
    // fs.writeFileSync(`../web/public/heros/detail.${url.parse(link).hash.split('=')[1]}.json`, JSON.stringify(data))
    //发布时C:/inetpub/wwwroot/lol/detail.detail.${url.parse(link).hash.split('=')[1]}.json`.json
    // fs.writeFileSync(`C:/inetpub/wwwroot/lol/heros/detail.${url.parse(link).hash.split('=')[1]}.json1`,JSON.stringify(data))
    // console.log(data);
    fs.writeFileSync(baseUrl.basePath + `/detail.${url.parse(link).hash.split('=')[1]}.json`, JSON.stringify(data))
    page.close()
}

start()
setInterval(() => {
    start()
}, 6 * 60 * 60 * 1000)