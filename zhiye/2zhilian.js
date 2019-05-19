
var current
var count = ""

var getInfo = function () {
    let positionArray = document.querySelectorAll(".contentpile__content__wrapper")
    let zw_values = []
    for (let i = 0; i < positionArray.length; i++) {
        let zw_value = {}
        try {
            zw_value.第三方名 = "智联"
            zw_value.第三方唯一标识 = positionArray[i].getElementsByTagName("a")[0].getAttribute("zp-stat-jdno")
            zw_value.url = positionArray[i].getElementsByTagName("a")[0].href
            zw_value.薪酬范围 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__job__saray")[0].innerText
            zw_value.薪酬下限 = zw_value.薪酬范围.split('-')[0].split('K')[0] + '000'
            zw_value.薪酬上限 = zw_value.薪酬范围.split('-')[1].split('K')[0] + '000'
            zw_value.工作地点 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__job__demand__item")[0].innerText
            zw_value.职位 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__jobname__title")[0].getAttribute("title")
            zw_value.年限 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__job__demand__item")[0].innerText
            zw_value.要求 = zw_value.年限
            zw_value.学历 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__job__demand__item")[0].innerText
            zw_value.公司名 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__cname__title company_title")[0].innerText
            zw_value.公司规模 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__job__comdec__item")[0].innerText
            zw_value.公司详情 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__job__comdec__item")[0].innerText
            zw_value.公司唯一标识 = positionArray[i].getElementsByClassName("contentpile__content__wrapper__item__info__box__cname__title company_title")[0].getAttribute("href")
            zw_value.福利 = getWelfare(positionArray[i])
            zw_value.福利 = zw_value.福利 == undefined ? "" : zw_value.福利.innerText
            // var publishDate = info_publis.getElementsByTagName("p")[0].innerText  
            let date = new Date()
            //zw_value.职位日期 = date.getYear() + 1900 + '-' + publishDate.substr(3, 2) + '-' + publishDate.substr(6, 2)
            zw_value.爬取日期 = date.getYear() + 1900 + '-' + (Array(2).join(0) + (date.getMonth() + 1)).slice(-2) + '-' + (Array(2).join(0) + date.getDate()).slice(-2)
            zw_value.其他信息 = ''
        } catch (error) {
            console.log(error)
        }
        zw_values.push(zw_value)
    }
    return zw_values
}

var getWelfare = function (position) {
    let result = ""
    let welfare = document.getElementsByClassName("contentpile__content__wrapper__item__info__box__welfare__item")
    for (let i = 0; i < welfare.length; i++) {
        result += welfare.innerText + ","
    }
    return result
}

var openNextPage = function () {
    let next = document.getElementsByClassName("btn soupager__btn")[1]
    if (next != undefined) {
        next.click()
        startNext()
    }
}

var startWork = function () {
    initDownloadElement()
    let datas = getInfo()
    saveInfo(datas)
}

var startNext = function () {
    //判断page是否相等
    count += current
    if (current != document.getElementsByClassName("soupager__index soupager__index--active")[0].innerText) {
        current = document.getElementsByClassName("soupager__index soupager__index--active")[0].innerText
        count += "---" + current + "\n"
        startWork()
    } else {
        count += "\n"
        setTimeout(startNext, 1000);
    }
}

var checkLoadEnd = function (){
+    setTimeout(() => {
        document.getElementsByClassName("soupager__index soupager__index--active")[0] ? startWork() : checkLoadEnd()
    }, 1000);
}

window.onload = checkLoadEnd()