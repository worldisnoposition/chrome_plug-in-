$(function () {

    var current = document.getElementsByClassName("current")[0].innerText

    var getInfo = function () {
        var positionArray = document.querySelectorAll(".position-item")
        var zw_values = []
        for (var i = 0; i < positionArray.length; i++) {
            var zw_value = {}
            try {
                var position = positionArray[i].getElementsByClassName("position-info")[0]
                var company = positionArray[i].getElementsByClassName("company-info")[0]
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
                var date = new Date()
                //zw_value.职位日期 = date.getYear() + 1900 + '-' + publishDate.substr(3, 2) + '-' + publishDate.substr(6, 2)
                zw_value.爬取日期=date.getYear()+1900+'-'+(Array(2).join(0)+date.getMonth()+1).slice(-2)+'-'+(Array(2).join(0)+date.getDate()).slice(-2)
                zw_value.其他信息 = ''
            } catch (error) {
                console.log(error)
            }
            zw_values.push(zw_value)
        }
        return zw_values
    }

    var getYaoQiu = function (position) {
        var result = ""
        var skillTags = position.getElementsByClassName("skill-tag")
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
        debugger
        var next = document.getElementsByClassName("next")[0]
        if (next != undefined) {
            next.click()
            startNext()
        }
    }

    var saveInfo = function (datas) {
        downloadFile(datas);
    }

    var eleLink
    var eleButton
    var initDownloadElement = function () {
        eleLink = document.createElement('a')
        eleLink.innerText = "哈哈哈"
        eleLink.style.display = 'none'
        eleButton = document.createElement('input')
        eleButton.innerText = "哈哈哈"
        eleButton.style.display = 'none'
        document.body.appendChild(eleLink)
        document.body.appendChild(eleButton)
    }

    var downloadFile = function (datas) {
        var eleTextarea = JSON.stringify(datas)

        // 下载文件方法
        var funDownload = function (content, filename) {
            eleLink.download = filename
            // 字符内容转变成blob地址
            var blob = new Blob([content])
            eleLink.href = URL.createObjectURL(blob)
            eleLink.click();
            // 然后移除
			// document.body.removeChild(eleButton)
            debugger
            console.log(eleButton)
        };

        if ('download' in document.createElement('a')) {
            // 作为test.html文件下载
            eleButton.addEventListener('click', function () {
                eleButton.removeEventListener("click",this,false);
                funDownload(eleTextarea, "100offer爬取记录_" + (new Date()) + "_" + current + '.html')
            })
        } else {
            eleButton.onclick = function () {
                alert('浏览器不支持')
            };
        }
        eleButton.click()
    }

    var startWork = function () {
        initDownloadElement()
        var datas = getInfo()
        saveInfo(datas)
        openNextPage()
    }
    var count = ""
    var startNext = function () {
        //判断page是否相等
        count += current
        if (current != document.getElementsByClassName("current")[0].innerText) {
            current = document.getElementsByClassName("current")[0].innerText
            count += "---" + current + "\n"
            startWork()
        } else {
            count += "\n"
            setTimeout(startNext, 1000);
        }
    }
    startWork()
    // var buttonToStartWork = document.getElementById("switch")
    // buttonToStartWork.addEventListener('click', startWork())
})