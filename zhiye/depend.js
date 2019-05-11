var 全局变量 = "全局变量1"
//调用各个分部的js，获取数据，传一个搜索参数
//各个js回调这里的函数，统一由这个js，上传
var upload = function (datas) {
    try {
        $.post("http://localhost:8080/entry/chufa?", JSON.stringify(datas), function () {
            openNextPage();
        })
    } catch (error) {
        log.error('系统异常了' + error);
    }
}
