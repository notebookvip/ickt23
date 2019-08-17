//管子的实例
function Pipe(pipe_up,pipe_down,step,x){
	//上管子
	this.pipe_up = pipe_up;
	
	//下馆子
	this.pipe_down = pipe_down;
	
	//步长值
	this.step = step;
	
	//图片的x值
	this.x = x;
	
	//上馆子的高度
	this.up_height = parseInt(Math.random() * 249) +1;
	
	//下馆子的高度
	this.down_height = 250 - this.up_height;
	
	//定义计数器
	this.count = 0;
	
	
}


//创建管子的方法
Pipe.prototype.createPipe = function(){
	return new Pipe(this.pipe_up,this.pipe_down,this.step,this.x);
}

