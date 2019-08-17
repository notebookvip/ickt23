//Game整个游戏类
//ctx画笔
//bird鸟的实例
//pipe管子的实例
//land背景的实例
//mountain背景的实例

function Game(ctx, bird, pipe, land, mountain) {
	this.ctx = ctx;
	this.bird = bird;
	// 由于管子有多根，所以将管子存储在数组中
	this.pipeArr = [pipe];
	this.land = land;
	this.mountain = mountain;
	// 定义变量
	this.timer = null;
	// 定义计数器
	this.iframe = 0;


	// 执行init
	this.init();
}

//初始化
Game.prototype.init = function() {
	this.start();
	this.bindEvent();
}


// 渲染山
Game.prototype.renderMountain = function() {
	// 获取图片
	var img = this.mountain.img;
	// console.log(img);

	// 要改变图片的x值
	this.mountain.x -= this.mountain.step;

	// 判断图片的位置
	if (this.mountain.x < -img.width) {
		this.mountain.x = 0;
	}

	// 绘制图片
	this.ctx.drawImage(img, this.mountain.x, this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);
	this.ctx.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y);
}







// 渲染地面
Game.prototype.renderLand = function() {
	// 获取图片
	var img = this.land.img;

	// 改变图片的x值
	this.land.x -= this.land.step;

	// 判断图片的位置
	if (this.land.x < -img.width) {
		this.land.x = 0;
	}

	// 绘制图片
	this.ctx.drawImage(img, this.land.x, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width, this.land.y);
	this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);
}

// 渲染鸟
Game.prototype.renderBird = function() {
	// 获取鸟的图片
	var img = this.bird.img;
	// 保存canvas的状态
	this.ctx.save();
	// 平移坐标系
	this.ctx.translate(this.bird.x, this.bird.y);
	
	//绘制矩形
    //this.ctx.strokeRect(-this.bird.img.width / 2 + 5, -this.bird.img.height / 2 + 5,this.bird.img.width - 10,this.bird.img.height - 10);
	
	
	
	// 定义角度
	var deg = this.bird.state === 'D' ?  Math.PI / 180 * this.bird.speed : -Math.PI / 180 * this.bird.speed;
	// 旋转
	this.ctx.rotate(deg);	
	// 绘制图片
	this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
	// 恢复状态
	this.ctx.restore();

}












// 清屏的方法
Game.prototype.clear = function() {
	this.ctx.clearRect(0, 0, 360, 512);
}






// 游戏开始
Game.prototype.start = function() {
	// 缓存this
	var me = this;

	// 赋值定时器
	this.timer = setInterval(function() {
		// 改变计数器
		me.iframe++;
		// 清屏
		me.clear();
		// 渲染山
		me.renderMountain();
		// 渲染地面
		me.renderLand();
		// 渲染鸟
		me.renderBird();
		
		//渲染鸟的四个点
		me.renderBirdPoints();
		
		//渲染管子的八个点
		me.renderPipePoints();
		
		if (!(me.iframe % 10)) {
			// 鸟飞翔
			me.bird.fly();
		}
		
		//管子每移动65次创建另一根管子
		if(me.iframe %  65 == 0){
			//创建管子
			me.createPipe();
		}
		
		// 鸟下降
		me.bird.fallDown();
		// 先渲染管子在移动
		me.renderPipe();
		// 移动
		me.movePipe();
		
		//清理管子
		me.clearPipe();
		
		//碰撞检测
		me.check();

	}, 20)
}



// 绑定事件
Game.prototype.bindEvent = function() {
	// 缓存this
	var me = this;
	// 为canvas注册点击事件
	this.ctx.canvas.onclick = function() {
		// 调用鸟上升的方法
		me.bird.goUp();
	}
}


// 渲染管子
Game.prototype.renderPipe = function() {
	/**
	 * 地面往上的距离是400, 我们将两根管子的开口距离定义为 150
	 * 剩下250的距离由两根管子去填充，我们让上管子的高度是随机生成的
	 * Math.random() * 250 取证之后是 0 ~ 249 之间
	 * 由于管子只需要一部分渲染在canvas中所以我们应该使用drawImage的9个参数的使用方式
	 */
	
	// 缓存this
	var me = this;

	// 由于管子存储在数组中，所以我们要循环渲染
	this.pipeArr.forEach(function(item) {
		// 获取上管子的图片
		var img_up = item.pipe_up;
		// 截取的图片的x点
		var img_x = 0;
		// 截取的图片的y点
		var img_y = img_up.height - item.up_height;
		// 截取的图片的宽
		var img_w = img_up.width;
		// 截取的图片的高
		var img_h = item.up_height;

		// 在canvas中的x点  用canvas的宽度 - 每次移动的步长值 * 计数器
		var canvas_x = me.ctx.canvas.width - item.step * item.count;
		// 在canvas中的y点
		var canvas_y = 0;
		// 在canvas中的宽
		var canvas_w = img_up.width;
		// 在canvas中的高
		var canvas_h = item.up_height;

		// 绘制图片
		me.ctx.drawImage(img_up, img_x, img_y, img_w, img_h, canvas_x, canvas_y, canvas_w, canvas_h);

		// 获取下管子的图片
		var img_down = item.pipe_down;
		// 截取的图片的x点
		var img_down_x = 0;
		// 截取的图片的y点
		var img_down_y = 0;
		// 截取的图片的宽
		var img_down_w = img_down.width;
		// 截取的图片的高
		var img_down_h = item.down_height;
		// 在canvas中的x点
		var canvas_down_x = me.ctx.canvas.width - item.step * item.count;
		// 在canvas中的y点
		var canvas_down_y = item.up_height + 150;
		// 在canvas中的宽
		var canvas_down_w = img_down.width;
		// 在canvas中的高
		var canvas_down_h = item.down_height;

		// 绘制图片
		me.ctx.drawImage(img_down, img_down_x, img_down_y, img_down_w, img_down_h, canvas_down_x, canvas_down_y, canvas_down_w, canvas_down_h);
		
	})
}

//管子的移动
Game.prototype.movePipe = function(){
	this.pipeArr.forEach(function(item){
		item.count++;
	})
}

//创建多根管子
Game.prototype.createPipe = function(){
	//创建管子的实例
	var pipe = this.pipeArr[0].createPipe();
	
	//每创建一个存储到数组中
	this.pipeArr.push(pipe);
	
}


//清理管子
Game.prototype.clearPipe = function(){
	//备份this
	var me = this;
	//循环清楚
	this.pipeArr.forEach(function(item,index){
		
		//判断图片在canvas中的X值
		if(me.ctx.canvas.width - item.step * item.count < -item.pipe_up.width){
			
			console.log('第' + index + '图片出去了');
			//清楚数组中当前这一项
			me.pipeArr.splice(index,1);
			return;
		}
		
	})
}

//渲染鸟的四个点
Game.prototype.renderBirdPoints = function(){
	//定义鸟的A点
	var Bird_A = {
		x:-this.bird.img.width / 2 + 5 + this.bird.x,
		y:-this.bird.img.height / 2 + 5 + this.bird.y
	}
	//定义鸟的B点
	var Bird_B = {
		x:Bird_A.x + this.bird.img.width - 10,
		y:Bird_A.y
	}
	//定义鸟的c点
	var Bird_C = {
		x:Bird_A.x,
		y:Bird_A.y + this.bird.img.height - 10
	}
	//定义鸟的d点
	var Bird_D = {
		x:Bird_B.x,
		y:Bird_C.y 
	}
	
	//连线
	//开启路径
	this.ctx.beginPath();
	//移动画笔到某个位置
	this.ctx.moveTo(Bird_A.x,Bird_A.y);
	this.ctx.lineTo(Bird_B.x,Bird_B.y);
	this.ctx.lineTo(Bird_D.x,Bird_D.y);
	this.ctx.lineTo(Bird_C.x,Bird_C.y);
	
	//闭合路径
	this.ctx.closePath();
	//改变描边色
	this.ctx.strokeStyle = 'blue';
	
	//描边
	this.ctx.stroke();
	
}

//渲染管子的八个点
Game.prototype.renderPipePoints = function(){
	//由于管子有多根于是要使用循环处理
	for(var i = 0;i < this.pipeArr.length; i++){
		//获取一根管子
		var pipe = this.pipeArr[i];
		
		//绘制上管子
		//绘制A点
		var Pipe_A = {
			x:pipe.x - pipe.step * pipe.count,
			y:0
		}
		
		//绘制B点
		var Pipe_B = {
			x:Pipe_A.x + pipe.pipe_up.width,
			y:0
		}
		
		//绘制管子的C点
		var Pipe_C = {
			x:Pipe_A.x,
			y:Pipe_A.y + pipe.up_height
		}
		
		//绘制管子的D点
		var Pipe_D = {
			x:Pipe_B.x,
			y:Pipe_C.y
		}
		
		//连线
		//开启路径
		this.ctx.beginPath();
		//移动画笔到某个位置
		this.ctx.moveTo(Pipe_A.x,Pipe_A.y);
		this.ctx.lineTo(Pipe_B.x,Pipe_B.y);
		this.ctx.lineTo(Pipe_D.x,Pipe_D.y);
		this.ctx.lineTo(Pipe_C.x,Pipe_C.y);
		
		//闭合路径
		this.ctx.closePath();
		//改变描边色
		this.ctx.strokeStyle= 'red';
		//描边
		this.ctx.stroke();
		
		
		
	
	//绘制下管子
	//管子的A点
	var Pipe_down_A = {
		x:pipe.x - pipe.step * pipe.count,
		y:pipe.up_height + 150
	}
	
	//管子的B点
	var Pipe_down_B = {
		x:Pipe_down_A.x + pipe.pipe_up.width,
		y:pipe.up_height + 150
	}
	
	//管子的C点
	var Pipe_down_C = {
		x:Pipe_down_A.x,
		y:400
	}
	
	//管子的D点
	var Pipe_down_D = {
		x:Pipe_down_B.x,
		y:400
	}
	
	//连线
	//开启路径
	this.ctx.beginPath();
	//移动画笔到某个位置
	this.ctx.moveTo(Pipe_down_A.x,Pipe_down_A.y);
	this.ctx.lineTo(Pipe_down_B.x,Pipe_down_B.y);
	this.ctx.lineTo(Pipe_down_D.x,Pipe_down_D.y);
	this.ctx.lineTo(Pipe_down_C.x,Pipe_down_C.y);
	
	//闭合路径
	this.ctx.closePath();
	//改变描边色
	this.ctx.strokeStyle = 'red';
	//描边
	this.ctx.stroke();
		
		
	}
	
	
}

//碰撞检测
Game.prototype.check = function(){
	for(var i =0; i< this.pipeArr.length;i++){
		//获取一根管子
		var pipe = this.pipeArr[i];
		//绘制上管子
		//绘制A点
		var Pipe_A = {
			x:pipe.x - pipe.step * pipe.count,
			y:0
		}
		
		//绘制B点
		var Pipe_B = {
			x:Pipe_A.x + pipe.pipe_up.width,
			y:0
		}
		
		//绘制管子的C点
		var Pipe_C = {
			x:Pipe_A.x,
			y:Pipe_A.y + pipe.up_height
		}
		
		//绘制管子的D点
		var Pipe_D = {
			x:Pipe_B.x,
			y:Pipe_C.y
		}
		
		
		//绘制下管子
			//管子的A点
	var Pipe_down_A = {
		x:pipe.x - pipe.step * pipe.count,
		y:pipe.up_height + 150
	}
	
	//管子的B点
	var Pipe_down_B = {
		x:Pipe_down_A.x + pipe.pipe_up.width,
		y:pipe.up_height + 150
	}
	
	//管子的C点
	var Pipe_down_C = {
		x:Pipe_down_A.x,
		y:400
	}
	
	//管子的D点
	var Pipe_down_D = {
		x:Pipe_down_B.x,
		y:400
	}
	
	//鸟的四个点
	//定义鸟的A点
	var Bird_A = {
		x:-this.bird.img.width / 2 + 5 + this.bird.x,
		y:-this.bird.img.height / 2 + 5 + this.bird.y
	}
	//定义鸟的B点
	var Bird_B = {
		x:Bird_A.x + this.bird.img.width - 10,
		y:Bird_A.y
	}
	//定义鸟的c点
	var Bird_C = {
		x:Bird_A.x,
		y:Bird_A.y + this.bird.img.height - 10
	}
	//定义鸟的d点
	var Bird_D = {
		x:Bird_B.x,
		y:Bird_C.y 
	}
	
	//用鸟Bird_B与上管子的Pipe_C点进行判断
	if(Bird_B.x >= Pipe_C.x && Bird_B.y <= Pipe_C.y &&Bird_A.x < Pipe_B.x){
		console.log('撞到上管子了');
		this.gameOver();
	}
	
	//用鸟Bird_D与下管子的Pipe_A点进行判断
	if(Bird_D.x >= Pipe_down_A.x && Bird_D.y >= Pipe_down_A.y && Bird_A.x < Pipe_down_B.x){
		console.log('撞到下馆子了');
		this.gameOver();
	}
		
	}
}



//游戏结束
Game.prototype.gameOver = function(){
	//清楚定时器
	clearInterval(this.timer);
              alert('O(∩_∩)O哈哈~撞到啦');
}
