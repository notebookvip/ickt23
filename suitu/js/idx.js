(function(){
	//把语句写在IIFE中防止全局污染
	var $carousel = $('#carousel');
//	console.log(carousel);
	var $cir = $('#cir ol li');
//	console.log(cir);
	var $imgs = $('#imgs ul li');
//	console.log(imgs);
	
	//制作猫腻图
	var $maoni =$('<li class="maini"></li>').appendTo($('#imgs ul'));
	//页面刷新的时候蒙版淡入
	$('.mask').eq(0).fadeOut(0).fadeIn(1000);
	//点击叉号的时候蒙版要淡入
	$('.close').click(function(){
		$(this).parent('.mask').fadeOut(1000);
	})
	//定义数组用于保存所有的碎图
	var arr = (function(){
		var temp = [];
		
	for(i = 0; i < 3;i++){
		for(j = 0; j < 6;j++){
			//数组末尾添加div用于存储碎图
			temp.push($('<div></div>').css({
				'position':'absolute',
				'width':138.33,
				'height':143.66,
				'background':'url(img/images/slider-img1.jpg)' + j * -138.33 +'px ' + i * -143.66 + 'px',
				'left':j * 138.33,
				'top': i * 143.66
				//把碎片添加到猫腻图中
			}).appendTo($maoni));
		}
	}
	//返回数组，
	return temp;
	
	})()
//	console.log(arr);
    
    //定义小圆点信号量
    var small_idx = 0;
    //定义大图信号量
    var big_idx = 0;
    //定义锁
    var lock = true;
    
    //开启定时器
//  var timer = setInterval(function(){
//  	//改变小圆点信号量
//  	small_idx++;
//  	
//  	//边界判断
//  	if(small_idx > $cir.length - 1){
//  		//小圆点信号赋值0
//  		small_idx = 0;
//  	}
//  	//执行函数，并改变this指向
//  	change.call($cir.eq(small_idx));
//  	
//  },7000);
    
    
     //为小圆点添加点击事件
     $cir.click(change);
     
     //定义函数用于复用
     
    
	
	
	
	
	
})()
