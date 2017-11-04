/**
 * Created by Administrator on 2017/11/1.
 */
// mui(".mui-scroll-wrapper").scroll({
//     indicators:false
// });
mui(".mui-scroll-wrapper").scroll({
    indicators:false
});
function  getHistory(){
    var search_history = localStorage.getItem("lt_search_history") || "[]";
    var arr = JSON.parse(search_history);
   return arr;

}
function render() {
    var arr = getHistory();
    $(".LT_HISTORY").html(template("tpl", {arr: arr}));

}
render();

$(".lt_history").on("click", ".icon_empty", function () {
   localStorage.removeItem("lt_search_history");
    render();
});
// $(".lt_history").on("click", ".icon_empty", function () {
// localStorage.removeItem("lt_search_history");
// render();
// });


$(".lt_history").on("click", "fa-close", function () {
    var btnArray = ["是", "否"];
    var $this = $(this);
    mui.confirm("你确定要删除这条记录吗", "警告", btnArray, function (data) {
        if (data.index == 0) {
            var arr = getHistory();
            var index = $this.data("index");
            arr.splice(index, 1);
            localStorage.setItem("lt_search_history", JSON.stringify(arr));
            render();
            mui.toast("操作成功");
        } else {
            mui.toast("操作取消");
        }
    });
});
// $("lt_history").on.("click", "fa-close", function () {
//     var btnArray = ["是", "否"];
//     mui.confirm("你确定要删除这条记录吗","警告", btnArray, function (data) {
//
//         if(data.index == 0){
//             var arr = getHistory();
//             var index = $(this).data("index");
//             //数组如何删除某一项  push unshift pop shift  slice(原数组不变)  splice()
//             arr.splice(index, 1);
//             //stringify ：字符串化  simple simplify:
//             localStorage.setItem("lt_search_history", JSON.stringify(arr));
//             render();
//             mui.toast("操作成功");
//         }else {
//             mui.toast("操作取消");
//         }
//
//     });
//
//
// });

$(".search_btn").on("click", function () {
    //把首尾的空格去掉
    var key = $(".search_text").val().trim();

    if (key === "") {
        mui.alert("亲，你想买啥", "温馨提示")
        return;
    }
    var arr = getHistory();
    var index = arr.indexOf(key);
    if (index > -1) {
        //说明有
        arr.splice(index, 1);
    }
    //如果数组的长度>=10，也需要删除最后一条
    if (arr.length >= 10) {
        arr.pop();
    }
    //把key存到数组的第一条
    arr.unshift(key);

    //存储到缓存中
    localStorage.setItem("lt_search_history", JSON.stringify(arr));


    //页面跳转
    location.href = "searchList.html?key="+key;

})
