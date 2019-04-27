$(function () {
	var _this = {};

	var init = function(){
		_this.request = getRequest()
		_this.page = _this.request['p']
		_this.zw_values = collectData()//职位信息
	}
	var collectData = function(){
		var newlist = document.getElementsByClassName("newlist")
		var toclick = []
		var result = []
		for(i=1;i<newlist.length;i++){
			//var a = {}
			var zw_value = {}
			a = newlist[i].getElementsByTagName("a")[0]
			//if(a = newlist[i].getElementsByTagName("a")[0]){
			toclick.push(a)
			zw_value.职位名 = a.innerHTML
			zw_value.反馈率 = newlist[i].getElementsByTagName("td")[1].getElementsByTagName("span")[0].innerHTML
			zw_value.公司名 = newlist[i].getElementsByTagName("td")[2].getElementsByTagName("a")[0].innerHTML
			zw_value.月薪 = newlist[i].getElementsByTagName("td")[3].innerHTML
			zw_value.工作地点 = newlist[i].getElementsByTagName("td")[4].innerHTML	
			zw_value.日期 = newlist[i].getElementsByTagName("td")[5].getElementsByTagName("span")[0].innerHTML
			zw_value.公司信息 = newlist[i].getElementsByTagName("td")[6].getElementsByClassName("newlist_deatil_two")[0].innerHTML
			zw_value.要求 = newlist[i].getElementsByTagName("td")[6].getElementsByClassName("newlist_deatil_last")[0].innerHTML
			//"http://jobs.zhaopin.com/CC531858125J00070955005.htm"
			zw_value.url = a.href.substr(24)
			result.push(zw_value)
		//}
		}
		return result
	}

	/*var index = localStorage.getItem("index")
	if(!index){
		index = 0
	}
	localStorage.setItem("index",index + toclick.length)*/
	/*for(i=0;i<zw_values.length;i++){//保存到localStorage
		var a = zw_values[i].职位名
		//保存到localStorage
		if(window.localStorage){
			localStorage.setItem(a.href,zw_values[i])
			//window.open(a.href,'_blank')
		}else{
			alert('浏览器不支持localStorage!')
		}
	}*/

	//下载
	var downloadFile = function(){
		var eleTextarea = JSON.stringify(_this.zw_values)
		var eleButton = document.querySelector('input[type="button"]')

		// 下载文件方法
		var funDownload = function (content, filename) {
			var eleLink = document.createElement('a')
			eleLink.download = filename
			eleLink.style.display = 'none'
			// 字符内容转变成blob地址
			var blob = new Blob([content])
			eleLink.href = URL.createObjectURL(blob)
			// 触发点击
			document.body.appendChild(eleLink)
			eleLink.click();
			// 然后移除
			document.body.removeChild(eleLink)
		};

		if ('download' in document.createElement('a')) {
			// 作为test.html文件下载
			eleButton.addEventListener('click', function () {
				funDownload(eleTextarea, "智联爬取记录_"+JSON.stringify(_this.request.kw)+"_"+_this.page+'.html')  
			})
		} else {
			eleButton.onclick = function () {
				alert('浏览器不支持')   
			};
		}
		eleButton.click()
	}

	//解析url中的参数
	var getRequest = function() { 
		var url = decodeURI(location.search) //获取url中"?"符后的字串 
		var theRequest = new Object()
		if (url.indexOf("?") != -1) { 
			var str = url.substr(1) 
			strs = str.split("&")
			for(var i = 0; i < strs.length; i ++) { 
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]) 
			} 
		} 
		return theRequest
	} 
	//等待1s后跳页（主要是捕捉不到下载后的事件，没法回调）
	var nextPage = function(){
		//调用elasticSearch接口

		var maxPage;
		var pageEle = document.getElementsByClassName("pagesDown")[0].getElementsByTagName("a")
		for(i in pageEle){
			maxPage = parseInt(pageEle[i].innerText)||maxPage
		}
		if(_this.page<=maxPage){
			var toURL = location.search
			toURL = toURL.split('&p=')
			toURL[0] += "&p="+ ++_this.page
			window.location.href=toURL[0]
		}
	}


	init();
	//downloadFile();
	console.log(_this.zw_values)
	console.log($("body"))
	var data = function(){
		debugger
		for(a in _this.zw_values){
			openNewPage(a)  
		}
		setInterval(nextPage,30000)	
	}
	var openNewPage = function(a){
		debugger
		var row = _this.zw_values[a];
		//window.open("http://jobs.zhaopin.com/"+row.url)
		//ifame.onclick = function(){
		    //window.open(row.url);
		//};
		row = JSON.stringify(_this.zw_values[a]);
		console.log(row)
		$.post("http://localhost:9202/zhilian/"+_this.zw_values[a].url+"?pretty",row,function(){
			debugger
			alert(1)
		}) 
	}
	data();    
});