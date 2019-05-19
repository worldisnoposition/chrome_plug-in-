var current
var getInfo = function () {
    let positionArray = document.querySelectorAll(".position-item")
    let zw_values = []
    for (let i = 0; i < positionArray.length; i++) {
        let zw_value = {}
        try {
            let position = positionArray[i].getElementsByClassName("position-info")[0]
            let company = positionArray[i].getElementsByClassName("company-info")[0]
            zw_value.第三方名 = "100offer"
            zw_value.第三方唯一标识 = position.getElementsByClassName("like")[0].getAttribute("data-id")
            zw_value.url = "https://cn.100offer.com" + position.getElementsByTagName("a")[0].href
            zw_value.薪酬范围 = position.getElementsByClassName("position-requirement")[0].getElementsByClassName("button-text")[0].innerText
            zw_value.薪酬下限 = zw_value.薪酬范围.split('~')[0].split('¥')[1] + '000'
            zw_value.薪酬上限 = zw_value.薪酬范围.split('~')[1].split('k')[0] + '000'
            zw_value.工作地点 = company.getElementsByClassName("company-detail")[0].getElementsByClassName("p-font")[0].innerText
            zw_value.职位 = position.getElementsByTagName("a")[0].innerText
            zw_value.年限 = position.getElementsByClassName("position-requirement")[0].getElementsByClassName("big-text")[0].innerText
            zw_value.要求 = getYaoQiu(position)
            zw_value.学历 = position.getElementsByClassName("position-requirement")[0].getElementsByClassName("big-text")[1].innerText
                + "," + position.getElementsByClassName("position-requirement")[0].getElementsByClassName("big-text")[2].innerText
            zw_value.公司名 = company.getElementsByClassName("company-name")[0].innerText
            // zw_value.公司规模 = info_company.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[2]
            zw_value.公司详情 = getCompanyDetail(company)
            zw_value.公司唯一标识 = company.getElementsByTagName("a")[0].href.split("/companies/")[1]
            zw_value.福利 = company.getElementsByClassName("welfare-tags")[0]
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

var getYaoQiu = function (position) {
    let result = ""
    let skillTags = position.getElementsByClassName("skill-tag")
    for (var i = 0; i < skillTags.length; i++) {
        result += skillTags[i].innerText + ","
    }
    return result
}

var getCompanyDetail = function (company) {
    var result = ""
    var details = company.getElementsByClassName("company-detail")[0].getElementsByClassName("p-font")
    for (var i = 0; i < details.length; i++) {
        result += details[i].innerText.replace("|", ",")
    }
    return result
}

var openNextPage = function () {
    let next = document.getElementsByClassName("next")[0]
    if (next != undefined) {
        next.click()
        startNext()
    }
}

var startNext = function () {
    //判断page是否相等
    if (current != document.getElementsByClassName("current")[0].innerText) {
        current = document.getElementsByClassName("current")[0].innerText
        startWork()
    } else {
        setTimeout(startNext, 1000);
    }
}

var initSearch = function () {
    let bigSearchInput = document.getElementById('big-search-input')
    bigSearchInput.value ? a.value = window.location.href.split('jobName=')[1] : console.log('开始爬取')
}

var startWork = function () {
    initSearch()
    current = document.getElementsByClassName("current")[0].innerText
    initDownloadElement()
    let datas = getInfo()
    saveInfo(datas)
}
var checkLoadEnd = function (){
    +    setTimeout(() => {
        document.getElementsByClassName("current")[0].innerText ? startWork() : checkLoadEnd()
        }, 1000);
    }
window.onload = checkLoadEnd()