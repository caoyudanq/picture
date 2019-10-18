/*
思路：每个格子由div和p元素组成
div的ip为pos_0格式，标记固定位置
p的ip在代码中动态生成，为num0格式，与p中文本节点的文本保持一致
初始时p元素没有id和文本节点
格子的不同颜色通过p元素id设置。

游戏功能：
初始时产生两个格子
按下上下左右键时，判断能否移动格子，能：移动格子，同时在空白位置生成新的格子 否：等待下次按键
当16个格子的p元素均有文本节点时，且上下左右均无法移动格子时，游戏结束。
1.按键
2.判断该方向能否移动
3.能移动，移动格子，同时自动生成格子
4.判断游戏是否结束
5.游戏未结束，等待再次按键，循环1


数据结构：
用4*4的二维数组final_boxs存储处理后的16个格子文本值（按键后棋盘从初始状态将要合并计算得到的状态）
对final_boxs进行两次循环操作：第一次取curruent_box中非零值组成新数组1，第二次将数组1数字计算合并后得到final_boxs
用4*4的二维数组current_boxs存储当前的16个格子文本值（按键后棋盘的初始状态）


工具函数：
1.为特定div格子的p元素生成随机数字的文本节点，并设置p的id randomGenBox(div_ele)
2.获取当前棋盘getCurBoxs(); return cur_boxs;
3.获取当前非空棋盘getNotEmptyBox(cur_boxs); return nempty_boxs;
4.获取计算后的棋盘getFinalBoxs(nempty_boxs); return final_boxs;
5.判断棋盘能否移动：nempty_box 是否等于 final_boxs; var canMove;
2.判断棋盘是否满：通过遍历div格子中p元素是否有子节点，且子节点为文本节点，且id值是否设置
3.判断能否移动：
 */

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func();
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
/*
为当前div中p元素创建随机数字，写入id
先判断当前p中是否有文本节点，有的话清除，以及重写id
 */
function randomGenBox(div_box_element) { //为当前格子p元素创建随机数字，并写id属性。
    var random = Math.floor(Math.random() * 10) < 5 ? 2 : 4;
    var p_num = div_box_element.firstChild;
    if (p_num.getAttribute("id") != null) {
        p_num.setAttribute("id", "");
        var text_ele = p_num.firstChild;
        p_num.removeChild(text_ele);
    }
    var text_num = document.createTextNode(random);
    p_num.appendChild(text_num);
    p_num.setAttribute("id", "num" + text_num.nodeValue);
}

function gameInit() { //游戏初始化，创建两个格子
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;

    var divs_row = document.getElementsByClassName("row");
    var random = Math.floor(Math.random() * 16);
    var div_box_element = document.getElementById("pos_" + random);
    randomGenBox(div_box_element);

    var random1 = Math.floor(Math.random() * 16);
    while (random1 == random) {
        random1 = Math.floor(Math.random() * 16);
    }
    var div_box_element1 = document.getElementById("pos_" + random1);
    randomGenBox(div_box_element1);
}

//2.获取当前棋盘
function getCurBoxs() {
    var curBoxs = new Array(n);
    for (var i = 0; i < n; i++) {
        var lineBoxs = new Array(n);
        for (var j = 0; j < n; j++) { //遍历第i列格子，获取cur_boxs数组
            var pos = 4 * j + i;
            var div_ele = document.getElementById("pos_" + pos);
            var p_ele = div_ele.firstChild;
            if (p_ele.getAttribute("id") != null) {
                if (p_ele.firstChild == null) {
                    alert("bug1");
                    return;
                }
                var text = p_ele.firstChild.nodeValue;
                lineBoxs[j] = text;
            } else {
                lineBoxs[j] = 0;
            }
        }
        curBoxs[i] = lineBoxs;
        console.log("lineBoxs  = " + lineBoxs);
    }
    console.log("-------------curBoxs = " + curBoxs)
    return curBoxs;
}

//3.获取当前非空棋盘
function getNotEmptyBox(cur_boxs) {
    var notEmpBoxs = new Array(n);
    for (var i = 0; i < n; i++) {
        var lineBoxs = new Array(n);
        var index = 0;
        for (var j = 0; j < n; j++) {
            if (curBoxs[i][j] != 0) {
                lineBoxs[index] = curBoxs[i][j];
                index++;
            }
        }
        lineBoxs = addZero(lineBoxs, index, n);
        notEmpBoxs[i] = lineBoxs;
        console.log("notEmpty lineBoxs = " + lineBoxs);
    }
    console.log("-------------notEmpBoxs = " + notEmpBoxs);
    return notEmpBoxs;
}
//4.获取计算后的棋盘
function getFinalBoxs(nempty_boxs) {
    var finalBoxs = new Array(n);
    for (var i = 0; i < n; i++) {
        var lineBoxs = nempty_boxs[i];
        var length = 0;
        for (var j = 0; j < n; j++) {
            if (lineBoxs[j] != 0) {
                length++;
            }
        }
        if (length == 0) {
            lineBoxs[0] = lineBoxs[1] = lineBoxs[2] = lineBoxs[3] = 0;
        } else if (length == 1) {
            lineBoxs[1] = lineBoxs[2] = lineBoxs[3] = 0;
        } else if (length == 2) {
            if (lineBoxs[0] == lineBoxs[1]) {
                lineBoxs[0] = parseInt(lineBoxs[0]) * 2;
                lineBoxs[1] = 0;
            }
        } else if (length == 3) {
            if (lineBoxs[0] == lineBoxs[1]) {
                lineBoxs[0] = parseInt(lineBoxs[0]) * 2;
                lineBoxs[1] = lineBoxs[2];
                lineBoxs[2] = 0;
            } else if (lineBoxs[1] == lineBoxs[2]) {
                lineBoxs[1] = parseInt(lineBoxs[1]) * 2;
                lineBoxs[2] = 0;
            }
        } else if (length == 4) {
            if (lineBoxs[0] != lineBoxs[1]) {
                if (lineBoxs[1] == lineBoxs[2]) {
                    lineBoxs[1] = parseInt(lineBoxs[1]) * 2;
                    lineBoxs[2] = lineBoxs[3];
                } else {
                    if (lineBoxs[2] == lineBoxs[3]) {
                        lineBoxs[2] = parseInt(lineBoxs[2]) * 2;
                        lineBoxs[3] = 0;
                    }
                }

            } else if (lineBoxs[0] == lineBoxs[1]) {
                if (lineBoxs[1] != lineBoxs[2]) {
                    if (lineBoxs[2] == lineBoxs[3]) {
                        lineBoxs[0] = parseInt(lineBoxs[0]) * 2;
                        lineBoxs[1] = lineBoxs[2] * 2;
                        lineBoxs[2] = 0;
                        lineBoxs[3] = 0;
                    } else {
                        lineBoxs[0] = parseInt(lineBoxs[0]) * 2;
                        lineBoxs[1] = lineBoxs[2];
                        lineBoxs[2] = lineBoxs[3];
                        lineBoxs[3] = 0;
                    }
                } else {
                    if (lineBoxs[2] == lineBoxs[3]) {
                        lineBoxs[0] = parseInt(lineBoxs[0]) * 2;
                        lineBoxs[1] = lineBoxs[2] * 2;
                        lineBoxs[2] = 0;
                        lineBoxs[3] = 0;
                    } else {
                        lineBoxs[0] = parseInt(lineBoxs[0]) * 2;
                        lineBoxs[1] = lineBoxs[2];
                        lineBoxs[2] = lineBoxs[3];
                        lineBoxs[3] = 0;
                    }
                }
            }
        }
        finalBoxs[i] = lineBoxs;

        console.log("lineBoxs = " + lineBoxs);
    }
    finalBoxs = addZero(finalBoxs, n);
    console.log("finalBoxs = " + finalBoxs);

    return finalBoxs;
}

//刷新棋盘
function freshBoxs(fianlBox) {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var num = fianlBox[i][j];
            var pos = n * j + i;
            var div_ele = document.getElementById("pos_" + pos);
            var p_ele = div_ele.firstChild;
            if (num != 0) {
                if (p_ele.getAttribute("id") != null) {
                    p_ele.setAttribute("id", "num" + num);
                    if (p_ele.firstChild == null) {
                        alert("bug2");
                        return false;
                    } else {
                        var text_ele = p_ele.firstChild;
                        p_ele.removeChild(text_ele);
                        var text_new_ele = document.createTextNode(num);
                        p_ele.appendChild(text_new_ele);
                    }

                } else {
                    var text_new_ele = document.createTextNode(num);
                    p_ele.appendChild(text_new_ele);
                    p_ele.setAttribute("id", "num" + num);
                }
            } else {
                if (p_ele.getAttribute("id") != null) {
                    p_ele.removeAttribute("id");
                    var text_ele = p_ele.firstChild;
                    p_ele.removeChild(text_ele);
                }
            }
        }
    }
}

function addBtnEvent() {
    n = 4;
    var keys = document.getElementsByClassName("operate_btn");
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        key.onclick = function() {
            var keyValue = this.getAttribute("id");
            switch (keyValue) {
                case "up":
                    curBoxs = getCurBoxs();
                    moveFunction();
                    break;
                case "down":
                    genUpToDown();
                    curBoxs = getCurBoxs();
                    moveFunction();
                    resumeUp();
                    break;
                case "left":
                    genUpToLeft();
                    curBoxs = getCurBoxs();
                    moveFunction();
                    resumeUp();
                    break;
                case "right":
                    genUpToLeft();
                    reverse();
                    curBoxs = getCurBoxs();
                    moveFunction();
                    resumeUp();
                    break;
                default:
                    break;
            }
            var gameOver = isOver();
            if(gameOver) {
                setTimeout(function(){alert("游戏结束！")},"500");
            }
        }
    }
}

function resumeUp() {
    var divBoxs = document.getElementsByClassName("box");
    for (var i = 0; i < divBoxs.length; i++) {
        divBoxs[i].setAttribute("id", "pos_" + i);
    }
}

function genUpToDown() {
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < 2; j++) {
            var pos1 = 4 * j + i;
            var pos2 = 4 * (3 - j) + i;
            var pos1_div = document.getElementById("pos_" + pos1);
            var pos2_div = document.getElementById("pos_" + pos2);
            pos1_div.setAttribute("id", "pos_" + pos2);
            pos2_div.setAttribute("id", "pos_" + pos1);
        }
    }
}

function genUpToLeft() {
    for (var i = 0; i < n; i++) {
        for (var j = n - 1; j > i; j--) {
            var pos1 = 4 * i + j;
            var pos2 = 4 * j + i;
            var pos1_div = document.getElementById("pos_" + pos1);
            var pos2_div = document.getElementById("pos_" + pos2);
            pos1_div.setAttribute("id", "pos_" + pos2);
            pos2_div.setAttribute("id", "pos_" + pos1);
        }
    }
}

function reverse() {
    for (var i = 0; i < n * n / 2; i++) {
        var pos1 = i;
        var pos2 = 15 - i;
        var pos1_div = document.getElementById("pos_" + pos1);
        var pos2_div = document.getElementById("pos_" + pos2);
        pos1_div.setAttribute("id", "pos_" + pos2);
        pos2_div.setAttribute("id", "pos_" + pos1);

    }
}

function moveFunction() {
    var notEmptyBoxs = getNotEmptyBox(curBoxs);
    var finalBoxs = getFinalBoxs(notEmptyBoxs);
    console.log("finalBoxs:" + finalBoxs);
    console.log("notEmptyBoxs:" + notEmptyBoxs);
    var canMove = false;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (curBoxs[i][j] != notEmptyBoxs[i][j] || finalBoxs[i][j] != notEmptyBoxs[i][j]) {
                canMove = true;
                break;
            }
        }
    }
    if (canMove) {//刷新棋盘，同时生成一个新的格子
        freshBoxs(finalBoxs);
        var random_indexs = new Array();
        var index = 0;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (finalBoxs[i][j] == 0) {
                    random_indexs[index] = j * n + i;
                    index++;
                }
            }
        }
        if(index != 0){
            var num = Math.floor(Math.random() * index);
            var div_ele = document.getElementById("pos_" + random_indexs[num]);
            randomGenBox(div_ele);
        }
        canMove = false;
    }
}

function addZero(myArray, index, n) {
    for (var i = index; i < n; i++) {
        myArray[i] = 0;
    }
    return myArray;
}
function isOver(){
    var isOverUp = false;
    var isOverDown = false;
    var isOverLeft = false;
    var isOverDown = false;

    curBoxs = getCurBoxs();
    isOverUp = isOverDirect(curBoxs);

    genUpToDown();
    curBoxs = getCurBoxs();
    isOverDown = isOverDirect(curBoxs);
    resumeUp();

    genUpToLeft();
    curBoxs = getCurBoxs();
    isOverLeft = isOverDirect(curBoxs);
    resumeUp();

    genUpToLeft();
    reverse();
    curBoxs = getCurBoxs();
    isOverRight = isOverDirect(curBoxs);
    resumeUp();

    if(isOverUp&&isOverDown&&isOverLeft&&isOverRight){
        return true;
    }else {
        return false;
    }
}

function isOverDirect(curBoxs){  
    var notEmptyBoxs = getNotEmptyBox(curBoxs);
    var finalBoxs = getFinalBoxs(notEmptyBoxs);
    var canMove = false;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (curBoxs[i][j] != notEmptyBoxs[i][j] || finalBoxs[i][j] != notEmptyBoxs[i][j]) {
                canMove = true;
                break;
            }
        }
        if(canMove){
            return false;
        } 
    }
    return true;
}
addLoadEvent(gameInit);
addLoadEvent(addBtnEvent);