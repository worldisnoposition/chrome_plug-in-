var getInfo = function () {
	let zw_values = []
	let job_primarys = document.querySelectorAll(".job-primary")
	for (let i = 0; i < job_primarys.length; i++) {
		// debugger
		let aElement = job_primarys[i].getElementsByTagName("a")[0]
		let url = aElement.href
		let urlArray = localStorage.bossDetailUrlArray
		localStorage.bossDetailUrlArray = localStorage.bossDetailUrlArray == undefined ? url : localStorage.bossDetailUrlArray + 'Ж' + url
		//todo 拼接地址，存储到localstorage，然后判断是否有消费者，如果没有则打开一个新页面作为消费者，打开这些个a标签
		//todo 此页面就作为生产者，生产a标签，存到localStorage中

		// aElement.click()
		// let zw_value = {}
		// let info_primary = job_primarys[i].getElementsByClassName("info-primary")[0]
		// let info_company = job_primarys[i].getElementsByClassName("info-company")[0]
		// let info_publis = job_primarys[i].getElementsByClassName("info-publis")[0]
		// zw_value.第三方名 = "boss直聘"
		// zw_value.url = info_primary.getElementsByTagName("a")[0].href
		// zw_value.第三方唯一标识 = zw_value.url.substr(34, zw_value.url.indexOf('.html') - 34)
		// zw_value.薪酬范围 = info_primary.getElementsByTagName("span")[0].innerText
		// zw_value.薪酬下限 = zw_value.薪酬范围.split('-')[0].replace('k', '000')
		// zw_value.薪酬上限 = zw_value.薪酬范围.split('-')[1].replace('k', '000')
		// zw_value.工作地点 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[0]
		// zw_value.职位 = info_primary.getElementsByTagName("div")[0].innerText
		// zw_value.年限 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[1]
		
		// zw_value.要求 = info_primary.getElementsByClassName("detail-bottom-text").innerHTML
		// zw_value.要求 = getYaoqiu(info)
		// zw_value.学历 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[2]
		// zw_value.公司名 = info_company.getElementsByTagName("a")[0].innerText
		// zw_value.公司规模 = info_company.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[2]
		// zw_value.公司详情 = info_company.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>').slice(0, 2).toString()
		// zw_value.公司唯一标识 = info_company.getElementsByTagName("a")[0].href
		// zw_value.福利 = ""
		// let publishDate = info_publis.getElementsByTagName("p")[0].innerText
		// var date = new Date()
		// zw_value.职位日期 = date.getYear() + 1900 + '-' + publishDate.substr(3, 2) + '-' + publishDate.substr(6, 2)
		// zw_value.爬取日期 = date.getYear() + 1900 + '-' + (Array(2).join(0) + (date.getMonth() + 1)).slice(-2) + '-' + (Array(2).join(0) + date.getDate()).slice(-2)
		// zw_value.其他信息 = ''
		// zw_values.push(zw_value)
		
	}
	// debugger
	console.log(localStorage.bossDetailUrlArray)
	// return zw_values
	//todo 原始数据以获取完毕，剩下往elastic传，以及翻页
}

var openNextPage = function () {
	// debugger
	let nextEle = document.getElementsByClassName("next")[0]
	//如果没到最后一页，就不打开新页面
	nextEle.className.split(" ").indexOf("disabled") == -1 ? nextEle.click() : alert("本城市已结束爬取")
	// document.getElementsByClassName("next")[0].className.split(" ").indexOf("disableds")
}

var startWork = function () {
	initDownloadElement()
	let datas = getInfo()
	saveInfo(datas);
}

window.onload = startWork()
