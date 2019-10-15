function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
			
		window.onload = func();
	}
	else {
		window.onload = function (){
			oldonload();
			func();
		}
	}
}
function randomGenBox(div_box_element){//为当前格子创建随机数字
	var random = Math.floor(Math.random()*10)<5?2:4;
	var p_num = div_box_element.getElementsByTagName("p")[0];
	var text_num = document.createTextNode(random);
	p_num.appendChild(text_num);
	p_num.setAttribute("id", "num"+text_num.nodeValue);

}
function gameInit(){//游戏初始化，创建两个格子
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;

	var divs_row = document.getElementsByClassName("row");
	for(var i =0;i<divs_row.length;i++){
		var divs_box = document.getElementsByClassName("box");
		for(var j=0;j<divs_box.length;j++){
			var p_node = divs_box[j].getElementsByTagName("p")[0];
			if(p_node.firstChild!=null && p_node.firstChild.nodeType==3) return false;
		}
	}
	var random = Math.floor(Math.random()*16);
	var div_box_element = document.getElementById("pos_"+random);

	randomGenBox(div_box_element);
	var random1 = Math.floor(Math.random()*16);

	while (random1==random) {
		random1 = Math.floor(Math.random()*16);
	}
	var div_box_element1 = document.getElementById("pos_"+random1);
	randomGenBox(div_box_element1);
}

function addBtnEvent(){
	n = 4;
	var keys = document.getElementsByClassName("operate_btn");
	for(var i=0;i<keys.length;i++){
		var key = keys[i];
		key.onclick = function() {
			var keyValue = this.getAttribute("id");
			do{
				var random = Math.floor(Math.random()*(n*n));
				var random_ele = document.getElementById("pos_"+random);
				var random_num = random_ele.firstChild.innerText;
			}while (random_num != "") ;
			randomGenBox(random_ele);

			switch (keyValue) {
				case "up":
					moveFunction("up");
					break;
				case "down":
					// statements_1
					break;
				case "left":
					// statements_1
					break;
				case "right":
					// statements_1
					break;										
				default:
					// statements_def
					break;
			}
		}
	}
}

function moveFunction(){
	var direction = arguments[0];

	if(direction = "up"){
		var final_content = new Array(n);//保存最终的二维数组格子值
		for(var i=0;i<n;i++){		
			var operate_content =new Array(n);//保存经过计算的一维格子值
			var line_content = new Array(n);//保存当前列非空的格子值
			var index = 0;//非空格子值索引
			for(var j=0;j<n;j++){
				var pos = 4*j+i;
				var num = document.getElementById("pos_"+pos).firstChild.innerText;
				if(num != ""){
					line_content[index] = num;
					index++;
				}
			}
			console.log(line_content);
			for(var m= 0;m<n;m++){
				if(line_content[m] == undefined)
					line_content[m] =0;
			}
			var operate_index = 0;
			for(var k=0;k<n-1;k++){
				var first_val = line_content[k];
				var second_val = line_content[k+1];
				if(first_val==second_val && first_val != 0 && second_val!=0){
					operate_content[operate_index] = parseInt(first_val)+parseInt(second_val);
					operate_index++;
					line_content[k+1] = 3;
					console.log(operate_content);
				}
			}
			final_content[i] = operate_content;
			operate_content = null;
			line_content = null;
		}
		console.log(final_content);
		for(var i=0;i<n;i++){
			for(var j=0;j<n;j++){
				var num = final_content[i][j];
				var flag = 4*i+j;
				var element = document.getElementById("pos_"+flag);
				element.setAttribute("id","pos_"+num);
			}
		}
	}
}

 addLoadEvent(gameInit);
 addLoadEvent(addBtnEvent);
