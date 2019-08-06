//存储图片的名称
var pics =[1,2,3,4];//一般情况夏，图片的后缀是一样的，但名字一般为英文单词
//console.log(pics);
//获取图片
var currentImg=document.querySelector(".str img");



var currentStr=document.querySelector(".str");
//console.log(currentImg);
var left=document.querySelector(".left");//通过类选择器获取左边元素
//console.log(left);
var right =document.querySelector(".right");//通过类选择器获取右边元素
//console.log(right);
//lis变量名，通过类选择器获取多个元素
var lis =document.querySelectorAll(".menu-bar li");
//console.log(lis);

var cur =document.querySelector(".cur");


//设置定时器
var spe =document.querySelector(".spe1-5");
console.log(spe);
//console.log(cur);
//设置初始显示图片的索引
var strIndex = 0;

//设置自动轮播
//var timer =setInterval(slideShow,2000);
left.onclick = function(){
	if(--strIndex < 0){
		strIndex =3;
	}
	currentImg.src = 'img/carousel_'+pics[strIndex]+'.png';
}
right.onclick = function(){
	if(++strIndex > 3){
		strIndex = 0;
	}
	currentImg.src = 'img/carousel_'+pics[strIndex]+'.png';
	
}

//设置自动轮播
var timer = setInterval(str,2000);

//设置轮播函数

//設置圖片輪播執行
var timer = null;
var speed = 2000;

timer = setInterval(runAni,speed);

function runAni(){
	if(++strIndex > 3){
		strIndex =0;
	}
	currentImg.src = 'img/carousel_'+pics[strIndex]+'.png';
}
//设置底部ul轮播切换
function str(){

	for(var a = 0; a <= 3; a++){
		lis[a].classList.remove("cur");
	}
	lis[strIndex].classList.add("cur");  
}

//設置底部ul輪播切換
for (var i = 0; i < lis.length; i++){
	
	//將循環的下標複製給對飲的li元素
	lis[i].index = i;
	lis[i].onclick =function(){
		
		for (var j = 0; j < lis.length; j++){
			lis[j].classList.remove('cur');			
		}
		this.classList.add("cur");
		
		//將當前點擊的導航給對應的索引複製給要展示的圖片數組
		strIndex = this.index;
//		console.log(i);
		
		currentImg.src = 'img/carousel_'+ (++strIndex) +'.png';
		console.log(currentImg.src);
	}
}
	



//設置鼠標滑過離開輪播效果
currentStr.onmouseenter = function(){
	clearInterval(timer);
}

currentStr.onmouseleave = function(){
	clearInterval(timer);
	timer = setInterval(runAni,speed);
}




//设置定时器
//var iNum =56;
//		var timer = setInterval(function(){
//			if(iNum === 60){
//				//清楚指定定时器
//				clearInterval(timer);
//				//window.close();
//					
//		
//			}
//			spe.innerHTML = iNum--;
//		},1000);
var iNum =60;
var timer = setInterval(function(){
	    if (iNum ===0){
	    	
    	setTimeout(timer);
	    }
	    spe.innerHTML = iNum--;
},1000)
//var iNum = i;
//for(i = 0 ;i < 60; i++ ){
//	iNum ===0;
//}
//  spe.innerText = iNum++;
//var int;
//function Reset()//重置
//{
//	window.clearInterval(int);
////	console.log(int);
//}
//function star()//开始
//{
//	int =setInterval(timer,1000);
//}
//function timer()//计时
//{
//	int = int+1;
//	if(int >=60){
//		int = 0;
//		
//	}
//}
//spe();