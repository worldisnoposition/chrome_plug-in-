$(function () {
    var getInfo = function () {
        var zw_values = []
        var positionArray = document.querySelectorAll(".position-item")
        for (var i = 0; i < positionArray.length; i++) {
            var zw_value = {}
            var position = positionArray[i].getElementsByClassName("position-info")[0]
            var company = positionArray[i].getElementsByClassName("company-info")[0]
            console.log(position)
            console.log(company)
            zw_value.第三方名 = "100offer"
            zw_value.第三方唯一标识 = position.getElementsByClassName("like")[0].getAttribute("data-id")
            zw_value.url = "https://cn.100offer.com/job_positions/" + zw_value.第三方唯一标识 
            zw_value.薪酬范围 = position.getElementsByClassName("position-requirement")[0].getElementsByClassName("button-text")[0].innerText
            zw_value.薪酬下限 = zw_value.薪酬范围.split('~')[0].split('￥')[1] + '000'
            zw_value.薪酬上限 = zw_value.薪酬范围.split('-')[1].split('k')[0] + '000'
            // zw_value.工作地点 = position.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[0]
            // zw_value.职位 = info_primary.getElementsByTagName("div")[0].innerText
            // zw_value.年限 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[1]
            // zw_value.要求 = info_primary.getElementsByClassName("detail-bottom-text").innerHTML
            // zw_value.学历 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[2]
            // zw_value.公司名 = info_company.getElementsByTagName("a")[0].innerText
            // zw_value.公司规模 = info_company.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[2]
            // zw_value.公司详情 = info_company.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>').slice(0, 2).toString()
            // zw_value.公司唯一标识 = info_company.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>').slice(0, 2).toString()
            // var publishDate = info_publis.getElementsByTagName("p")[0].innerText
            var date = new Date()
            //zw_value.职位日期 = date.getYear() + 1900 + '-' + publishDate.substr(3, 2) + '-' + publishDate.substr(6, 2)
            zw_value.爬取日期 = date.getYear() + 1900 + '-' + (Array(2).join(0) + date.getMonth()).slice(-2) + '-' + (Array(2).join(0) + date.getDate()).slice(-2)
            zw_value.其他信息 = ''
            zw_values.push(zw_value)
        }
        console.log(zw_values)
    }

    var openNextPage = function () {

    }

    var saveInfo = function (datas) {

    }

    var downloadFile = function () {

    }

    var datas = getInfo();
    console.log(datas)
    saveInfo(datas);
})