const post_api = "http://haha"+"login_check";
    const map = new Map([ // 要提交数据
        ["username", "username"],
        ["token",  "token"],
    ]);
    // 拼装post要提交的数据
    let body = "";
    for (let [k, v] of map) { body += k+"="+v+"&"; } console.log(body);
    fetch(post_api, {
        method: "post",     // get/post
        mode: "cors",       // same-origin/no-cors/cors
        cache: "no-cache",  // 不缓存
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: body,         // 格式："key1=val1&key2=val2"
    }).then(function (response){
        if (response.status === 200){
            return response;
        }
    }).then(function (data) {
        return data.text();
    }).then(function(text){
        // 格式校验
        let back = null;
        let datas = null;
        if (typeof text === "string"){ // TP一般返回string
            back = text;
            datas = JSON.parse(text);
        }else if (typeof text === "object"){ // laraval一般返回object
            back = JSON.stringify(text);
            datas = text;
        }
        console_log("类型：" + typeof text + "\n数据：" + back);
        // 解析与渲染数据 datas
        if (datas.state === 0){
            console_log(datas.msg);
 
        }else if (datas.state === 1){
            // 其他
 
 
        }
 
    }).catch(function(error){
        console.log("Fetch错误：" + error);
        alert_txt("接口请求错误或者网络不通", 2500);
    });