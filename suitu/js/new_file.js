(function(){
	//把所有的语句写在IIFE中，可以有效地避免作用域的相互污染
	//获取元素
	var $carousel = $('#carousel');
//	console.log(carousel);
	var $cir = $('#cir ol li');
//	console.log(cir);
	var $imgs = $('#imgs ul li');
//	console.log(imgs);
    var $maoni = $('<li class="maoni"></li>').appendTo($('#imgs ul'));
  
	//页面刷新之后蒙版右淡入效过
	$(".mask").eq(0).fadeOut(0).fadeIn(1000);
	 //点击X号的时候蒙版要淡出
	$('.close').click(function(){
		$(this).parent('.mask').fadeOut(1000);
		
	})
	
	//定义数组保存所有的碎图
	var arr =(function(){
		//定义数组
		var temp = [];
		
		//将图片分成3*6的格式
		for(var i = 0; i< 3; i++){
			for(var j = 0;j < 6;j++){
				temp.push($("<div></div>").css({
					'position':'absolute',
					'width':0,
					'height':0,
                    'background': 'url(img/images/slider-img1.jpg)' + j * -138.33 + 'px ' + i * -143.66 +'px',
                    'left': j * 138.33,
                    'top': i * 143.66
				}).appendTo($maoni));
			}
		}
		//返回数组
		return temp;
	})()
	console.log(arr);
	
	//定义小圆点信号量
	var small_idx = 0;
	//定义大图信号量
	var big_idx = 0;
	
	//定义锁
	var lock = true;
	
	//开启定时器
	var timer = setInterval(function(){
		//小圆点信号量改变
		small_idx++;
		//边界判断
		if(small_idx > $cir.length - 1){
			small_idx = 0;
		}
		
		//执行change 函数并改变this指向
		change.call($cir.eq(small_idx));
		
	},7000);
	
	//当鼠标移入carousel的时候要清楚定时器
	$carousel.mouseenter(function(){
		//要清楚定时器
		clearInterval(timer);
	})
	//离开的时候重新开启定时器
	$carousel.mouseleave(function(){
		//设表先关
		clearInterval(timer);
		//重新赋值timer
		timer = setInterval(function(){
			//小圆点信号量改变
			small_idx++;
			if(small_idx > $cir.length - 1){
				small_idx = 0;
				
			}
			
			//change函数改变this指向
			change.call($cir.eq(small_idx));
		},7000);
	})
	
	//为小圆点添加点击事件
	$cir.click(change);
	//定义函数用于复用
	function change(){
		//函数节流
		if(!lock){
			return;
		}
		//关闭锁
		lock = false;
		//改变小圆点的信号量
		small_idx = $(this).index();
        //当小圆点的信号量与大图的信号量相等的时候，什么也不做
        if(small_idx === big_idx){
        	//开锁
        	lock = true;
        	//什么也不做
        	return;
        }
        //当前小圆点加cur
        $(this).addClass('cur').siblings().removeClass('cur');
        //对应大图的蒙版消失
        $('.mask').eq(big_idx).fadeOut(1000);
        //猫腻图要出现
        $maoni.addClass('active');
        
        //开始轮换图片
        $.each(arr,function(index,value){
        	//此时，value表示每一个div
        	value.css('backgroundImage', 'url(img/images/slider-img' + (small_idx + 1) +'.jpg)').animate({
        		width:138.33,
        		height:143.66
        	},300 + Math.random()* 3000);
        })
        
        //开启延时器，保证所有动画完毕之后再去执行
        setTimeout(function(){
        	//当所有动画完毕之后，让所有元素的宽高变为0
         $.each(arr,function(index,value){
         	value.css({
         		width:0,
         		height:0
         	})
         })
         //改变大图信号量
         big_idx = small_idx;
         //对应大图的信号量出现
         $imgs.eq(big_idx).addClass('active').siblings().removeClass('active');
         //对应大图的蒙版淡入
         $('.mask').eq(big_idx).fadeOut(0).fadeIn(1000);
         //当所有事情完成之后，开锁
         lock = true;
        },3310)
	}
	
	
	
})()
