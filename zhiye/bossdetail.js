// debugger
localStorage.bossDetailUrlArray = localStorage.bossDetailUrlArray ? localStorage.bossDetailUrlArray.replace(window.location.href + 'Ж', '') : ''
//todo 校验第一个是不是当前值，然后移除
//todo爬取数据，调用接口
var getSingleInfo = function () {
    try {
        let zw_value = { jobDetail: {}, companyDetail: {} }
        var info_primary = document.getElementsByClassName("info-primary")[0]
        var siderCompany = document.getElementsByClassName("sider-company")[0]
        var gongshangXinxi = document.getElementsByClassName("job-sec prop-item")[0].nextElementSibling
        var companyDetail = document.getElementsByClassName("job-sec company-info")[0]
        var jobHistory = JSON.parse(localStorage._Job_History)[0]

        zw_value.channelName = "boss直聘"
        zw_value.url = window.location.href
        zw_value.jobId = jobHistory.job_id
        zw_value.jobTime = siderCompany.getElementsByClassName("gray")[0].textContent.substr(4) + ':00'
        zw_value.others = ''

        zw_value.jobDetail.salary = jobHistory.job_salary
        zw_value.jobDetail.salaryLow = jobHistory.job_salary.split('-')[0] + '000'
        zw_value.jobDetail.salaryHigh = jobHistory.job_salary.split('-')[1].replace('k', '000').replace('K', '000')
        zw_value.jobDetail.city = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="dolt"></em>')[0]
        zw_value.jobDetail.workAddress = document.getElementsByClassName("location-address")[0].textContent
        zw_value.jobDetail.jobName = jobHistory.job_name
        zw_value.jobDetail.workYears = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="dolt"></em>')[1]
        zw_value.jobDetail.requirement = document.getElementsByClassName("detail-content")[0].getElementsByClassName("text")[0].textContent
        zw_value.jobDetail.education = info_primary.getElementsByTagName("p")[0].innerHTML.split('<em class="dolt"></em>')[2]

        zw_value.companyDetail.companyName = jobHistory.company
        zw_value.companyDetail.financStage = siderCompany.getElementsByClassName("icon-stage")[0].nextSibling.textContent
        zw_value.companyDetail.companySize = siderCompany.getElementsByClassName("icon-scale")[0].nextSibling.textContent
        zw_value.companyDetail.detail = companyDetail ? companyDetail.getElementsByClassName("text")[0].textContent : ''
        zw_value.companyDetail.companyId = siderCompany.getElementsByTagName("a")[0].href
        zw_value.companyDetail.companyFullName = gongshangXinxi.getElementsByTagName("h3")[0].textContent
        zw_value.companyDetail.registrationInformatinon = gongshangXinxi.getElementsByClassName('level-list')[0].textContent
        zw_value.companyDetail.welFare = document.getElementsByClassName("tag-all job-tags")[1].innerHTML

        return zw_value
    } catch (error) {
        console.error(error)
        localStorage.bossDetailErrorUrlArray = localStorage.bossDetailErrorUrlArray ? window.location.href + 'Ж' : localStorage.bossDetailErrorUrlArray + window.location.href + 'Ж'
    }
}
// console.log(getSingleInfo())
window.onload = saveSingleInfo(getSingleInfo(), function (resp) {
    debugger
    localStorage.bossDetailUrlArray && setTimeout(window.open(localStorage.bossDetailUrlArray.split('Ж')[0], '_self'), resp)
})
//todo调用下一页
//https://www.zhipin.com/job_detail/1afdc29e81e2fa2b03d53N-9FVQ~.html