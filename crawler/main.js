const puppeteer = require('puppeteer');
const fs = require('fs');
const url = require('node:url');
const baseUrl = require('./env.json')


let pptBrowser = undefined

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

    for (let index = 0; index < heroLinks.length; index++) {
        try {
            await getHeroData(heroLinks[index])
        } catch (error) {
            console.error(error)
        }
    }

   pptBrowser.close()
}


async function getHeroData(link) {
    // 控制浏览器打开新标签页面
    let page = await pptBrowser.newPage()
    // 在新标签中打开要爬取的网页
    await page.goto(link)

    // 使用evaluate方法在浏览器中执行传入函数（完全的浏览器环境，所以函数内可以直接使用window、document等所有对象和方法）
    await page.waitForSelector('#app > div > div.app-main > div > div.hero-details.hero-details-5v5 > div.hero-show > div.hero-intro > p')

    let data = await page.evaluate(() => {
        let res = {}
        let heroName = document.querySelector('.hero-show .hero-intro .hero-name')
        let heroType = document.querySelector('.hero-show .hero-intro .hero-type')
        let win = document.querySelector('.hero-show .win-text')
        let ban = document.querySelector('.hero-show .ban-text')
        let show = document.querySelector('.hero-show .show-text')
        let dbRank = document.querySelectorAll('.bestdb img')
        res['name'] = heroName.innerText;
        res['type'] = heroType.innerText;
        res['win'] = win.innerText;
        res['ban'] = ban.innerText;
        res['show'] = show.innerText;
        res['dbRank'] = [];
        for (let i = 0; i < dbRank.length; i++) {
            res['dbRank'].push({
                url: dbRank[i].getAttribute('src').slice(2),
                alt: dbRank[i].getAttribute('alt')
            })
        }
        return res
    })
    // console.log(url.parse(link).hash.split('=')[1]);
    // 此处是网站根目录../web/detail.data.json
    // fs.writeFileSync(`../web/public/heros/detail.${url.parse(link).hash.split('=')[1]}.json`, JSON.stringify(data))
    //发布时C:/inetpub/wwwroot/lol/detail.detail.${url.parse(link).hash.split('=')[1]}.json`.json
    // fs.writeFileSync(`C:/inetpub/wwwroot/lol/heros/detail.${url.parse(link).hash.split('=')[1]}.json1`,JSON.stringify(data))
    
    fs.writeFileSync(baseUrl.basePath+`/detail.${url.parse(link).hash.split('=')[1]}.json`, JSON.stringify(data))
    page.close()
}

start()
console.log(123);

setInterval(() => {}, 5000)