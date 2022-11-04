export default {
    requestHeroList: async () => {
        let response = await fetch("https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js")
        return await response.json()
    }
    ,
    createScriptEl(url){
        var el = document.createElement("script");
        el.src = url;
        document.body.appendChild(el)
        console.log(CHAMPION_DETAIL_1,000);
    }
}
