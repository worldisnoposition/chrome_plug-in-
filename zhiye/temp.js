$(document).ready(function () {
    $("body").on("click", ".operate-box .like", function () {
        if (!$(this).hasClass("disable-click")) {
            var s = $(this), a = $(this).data("id"), o = { position_id: a }; $(this).addClass("disable-click"),
                $.ajax({
                    url: "/job_positions/like_job",
                    dataType: "json",
                    data: o,
                    method: "post",
                    success: function () {
                        s.toggleClass("favorite"), s.removeClass("disable-click"), s.hasClass("favorite") ? (s.parents(".operate-box").find(".shadow-tips").addClass("shadow-show"), setTimeout(function () { s.parents(".operate-box").find(".shadow-tips").removeClass("shadow-show") }, 2600)) : s.parents(".operate-box").find(".shadow-tips").removeClass("shadow-show")
                    },
                    error: function () {
                        Essage.show({ message: "\u8bf7\u6c42\u5931\u8d25", status: "error" }, 2e3), s.removeClass("disable-click")
                    }
                })
        }
    })
});