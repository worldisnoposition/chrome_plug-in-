
var eleLink
var eleButton
var current
//调用各个分部的js，获取数据，传一个搜索参数
//各个js回调这里的函数，统一由这个js，上传
var upload = function (datas) {
    try {
        $.post("http://localhost:8080/entry/chufa?", JSON.stringify(datas), function (data) {
            debugger
            console.log(data)
            setTimeout(openNextPage, data)
            // openNextPage();
        })
    } catch (error) {
        log.error('系统异常了' + error);
    }
}

var saveInfo = function (datas) {
    //不走接口那么也可以保存到本地
    // downloadFile(datas);
    upload(datas)
}

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
    let eleTextarea = JSON.stringify(datas)

    // 下载文件方法
    let funDownload = function (content, filename) {
        eleLink.download = filename
        // 字符内容转变成blob地址
        var blob = new Blob([content])
        eleLink.href = URL.createObjectURL(blob)
        eleLink.click();
        // 然后移除
        // document.body.removeChild(eleButton)
        console.log(eleButton)
    };

    if ('download' in document.createElement('a')) {
        // 作为test.html文件下载
        eleButton.addEventListener('click', function () {
            eleButton.removeEventListener("click", this, false);
            funDownload(eleTextarea, "爬取记录_" + (new Date()) + "_" + (current ? current : 'default') + '.html')
        })
    } else {
        eleButton.onclick = function () {
            alert('浏览器不支持')
        };
    }
    eleButton.click()
}
var setLocalStorage = function (keyValue) {
    keyValue = decodeURI(keyValue)
    let num = keyValue.indexOf("=");
    if (num > 0) {
        localStorage.setItem(keyValue.substring(0, num), keyValue.substr(num + 1))
    }
}

var initLocalStorage = function () {
    //todo 获取 localstorage
    if (localStorage.getItem('first')) {
        localStorage.setItem('first', false)
        localStorage.setItem('newSearch', true)
    } else {
        let url = window.location.href;
        console.log('url' + url)
        let paramArr = url.substr(url.indexOf('?') + 1).split("&")
        paramArr.forEach(p => setLocalStorage(p))
    }
}
