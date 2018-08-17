$(function () {
	//boss里职位详情页的url里带有唯一信息可以作为elasticsearch索引字段
	var zw_value = {}
	var info_primarys = document.querySelectorAll(".info-primary")
	console.log(info_primarys)	
	for(var i=0;i<info_primarys.length;i++){
		var info_primary = info_primarys[i]
		zw_value.第三方名 = "boss直聘"
		zw_value.url = info_primary.getElementsByTagName("a")[0].href
		zw_value.第三方唯一标识 = zw_value.url.substr(34,zw_value.url.indexOf('.html?')-34)
		zw_value.薪酬范围 = info_primary.getElementsByTagName("span")[0].innerText
		zw_value.薪酬上限 = zw_value.薪酬范围.split('-')[0].replace('k','000')
		zw_value.薪酬下线 = zw_value.薪酬范围.split('-')[1].replace('k','000')
		zw_value.工作地点 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[0]
		zw_value.职位
		zw_value.年限 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[1]
		zw_value.要求
		zw_value.学历 = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="vline"></em>')[2] 
		zw_value.公司名
		zw_value.公司规模
		zw_value.公司详情
		zw_value.职位日期
		zw_value.爬去日期
		zw_value.其他信息
	}
})