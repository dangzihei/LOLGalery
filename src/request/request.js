export default {
    requestHeroList: async () => {
        let response = await fetch("https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js")
        return await response.json()
    }
}
