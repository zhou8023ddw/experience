/**
 * Created by Administrator on 2017/4/10 0010.
 */
function voiceList(data) {
    $("#listDiv").html("");
    data.forEach(function(item, index) {
        $("<img/>").css({
            width: 241.5,
            height: 40.5,
            left: 0,
            top: 73 * index,
            position: "absolute",
        }).attr("src", game.baseUrl+"img/page_9_002.png")
            .attr("id", "bottle" + index + "")
            .appendTo($("#listDiv"));
        $("<img/>").css({
            width: 159 / 60 * item.duration,
            height: 28,
            left: 6,
            top: 72 * index + 6.5 + index,
            position: "absolute",
            "border-radius":"5px"
        }).attr("src", game.baseUrl+"img/page_9_003.png")
            .attr("id", "tiao" + index + "")
            .appendTo($("#listDiv"));

        $("<span>" + item.duration + '”' + "</span>").css({
            color: "#FFFFFF",
            "font-family": "Arial",
            "font-size": "12.6px",
            left: 12 + 159 / 60 * item.duration,
            top: 72 * index + 16.5 + index,
            position: "absolute"
        }).attr("id", "time" + index + "")
            .appendTo($("#listDiv"));

        $("<img/>").css({
            width: 10,
            height: 14.5,
            left: 11,
            top: 72 * index + 14 + index,
            position: "absolute"
        }).attr("src", game.baseUrl+"img/page_9_004.png")
            .attr("id", "three" + index + "")
            .appendTo($("#listDiv"));

        $("<span>" + item.title + "</span>").css({
            color: "#FFFFFF",
            "font-size": "12.6px",
            "font-family": "SourceHanSansCN",
            left: 0,
            top: 72 * index + 50.5 + index,
            position: "absolute"
        }).attr("id", "title" + index + "")
            .appendTo($("#listDiv"));
        if (item.likeNum > 0) {
            var src = game.baseUrl+"img/page_9_008.png";
            var color ="#b34341";
        } else {
            var src = game.baseUrl+"img/page_9_009.png";
            var color = "#FFFFFF";
        }
        var titleLength = $("#title" + index + "").width();
        $("<img/>").css({
            width: 12.5,
            height: 11.5,
            left: titleLength+3,
            top: 72 * index + 51.5 + index,
            position: "absolute",
        }).attr("src", src)
            .attr("id", "heart" + index + "")
            .addClass("on")
            .appendTo($("#listDiv"));
        $("<span>" + item.likeNum + "</span>").css({
            color: color,
            "font-size": "12.6px",
            "font-family": "Arial",
            left: titleLength + 22,
            top: 72 * index + 51.5 + index,
            position: "absolute",
        }).attr("id", "likeNum" + index + "")
            .appendTo($("#listDiv"));
    });
}
function bookName(title) {
    //设置书名号
    if(title.indexOf('《')>0){
          title= title.replace("《","")
    }
    if(title.indexOf('》')>0){
        title= title.replace("》","")
    }
    if(title.indexOf('<<')>0){
        title= title.replace("<<","")
    }
    if(title.indexOf('>>')>0){
        title= title.replace(">>","")
    }
    return title;
}
function zhen(parent){


};