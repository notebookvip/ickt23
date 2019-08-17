// 鸟的实例
function Bird(imgArr, x, y) {
	// 图片数组属性
	this.imgArr = imgArr;
	// 定义图片的索引值
	this.index = parseInt(Math.random() * this.imgArr.length);
	// 精确一张图片
	this.img = this.imgArr[this.index];
	// 图片的x值
	this.x = x;
	// 图片的y值
	this.y = y;
	
	//定义鸟的状态
	this.state = 'D';//D:down 下降  U：up上升
	
	//为了确保鸟的上升与下降的速度，定义另外一个属性
	this.speed = 0;
}

//鸟飞翔
Bird.prototype.fly = function(){
	//改变图片的索引值
	this.index++;
	
	//判断图片索引的有效值
	if(this.index > this.imgArr.length - 1){
		this.index = 0;
	}
	//由于图片的索引值改变了，但是图片本身没有改变，所以要设置
	this.img = this.imgArr[this.index];
    
	
}

//鸟下降
Bird.prototype.fallDown = function(){
	  //判断鸟的状态
    if(this.state === 'D'){
    	//让speed属性改变
    	this.speed++;
    	//鸟应该下降了
    	this.y += Math.sqrt(this.speed);
    	
    }else{
    	//让speed属性改变
    	this.speed--;
    	
    	if(this.speed === 0){
    		//鸟上升到一定高度要下降了
    		this.state = 'D';
    		return;
    	}
    	//鸟应该上升
    	this.y -= Math.sqrt(this.speed);
    }
}
//鸟上升
Bird.prototype.goUp = function(){
	//改变speed属性值
	this.speed = 20;
	//改变鸟的状态
	this.state = 'U';
	
}
