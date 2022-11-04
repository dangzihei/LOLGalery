const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: false, // 默认是无头模式，这里为了示范所以使用正常模式
    })

    // 控制浏览器打开新标签页面
    const page = await browser.newPage()
    // 在新标签中打开要爬取的网页
    await page.goto('https://101.qq.com/#/hero-detail?heroid=1&tab=overview&hero2_id=115&datatype=5v5')

    // 使用evaluate方法在浏览器中执行传入函数（完全的浏览器环境，所以函数内可以直接使用window、document等所有对象和方法）
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
                url:dbRank[i].getAttribute('src').slice(2),
                alt:dbRank[i].getAttribute('alt')
            })
        }
        return res
    })
    
    console.log(data)
    // 此处是网站根目录
    fs.writeFileSync('../web/detail.data.json',JSON.stringify(data))
    browser.close()
})()