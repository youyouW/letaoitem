/**
 * Created by Administrator on 2017/10/31.
 */
$(document).ajaxStart(function () {
    //让进度条显示出来
    NProgress.start();
})


$(document).ajaxStop(function () {
    setTimeout(function () {
        //让进度条结束
        NProgress.done();
    }, 500);
});