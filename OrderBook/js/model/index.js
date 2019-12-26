//适配手机
var height = $(window).height();
var width = $(window).width();
$("#box").css("-webkit-transform", "translate(" + (width - 320) / 2 + "px," + (height - 504) / 2 + "px) scale(" + height / 504 + ") ");
$("#box").css("transform", "translate(" + (width - 320) / 2 + "px," + (height - 504) / 2 + "px) scale(" + height / 504 + ") ");
//动态创建节点
var index = function() {
	config.forEach(function(item){
		$("<div></div>").css({
				width: item.rect.w,
				height: item.rect.h,
				left:item.rect.x,
				top:item.rect.y,
				position: "absolute",
				display: item.display,
				"z-index":item.zindex
			})
			.addClass(item.class)
			.attr("id", item.id)
			.appendTo($("#box"));
		item.dom.forEach(function(item1) {
			 if(item1.type == "img"){
				$("<img />").css({
					width: item1.rect.w,
					height: item1.rect.h,
					top: item1.rect.y,
					left: item1.rect.x,
					position: "absolute",
					"z-index": item1.zIndex
				})
				.addClass(item1.className)
			    .attr("src", game.baseUrl+item1.src)
			    .attr("id", item1.id)
			    .appendTo($("#"+item.id+""));
			}
			});
	});
};
index();
