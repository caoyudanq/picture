function showPic(whichpic) {
	if(!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
	var placeholder = document.getElementById("placeholder");
	if(placeholder.tagName != "IMG") return false;

	placeholder.setAttribute("src", source);
	if(document.getElementById("description")){
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}

function prepareGallery() {
	if (!document.createElement) return false;
	if (!document.createTextNode) return false; 
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false;
	var gallary = document.getElementById("imagegallery");
	var links = gallary.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this) ? false : true;
		}
	}
}

// window.onload = function(){
// 	prepareGallery();
// 	preparePlaceHolder();
// }
function preparePlaceHolder(){
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("alt", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.jpg");
	var para = document.createElement("p");
	para.setAttribute("id", "description");
	var txt = document.createTextNode("Choose an image");
	para.append(txt);
	insertAfter(placeholder,document.getElementsByTagName("ul")[0]);
	insertAfter(para,placeholder);
}
function insertAfter(newNode,targetNode) {
	var parent = targetNode.parentNode;
	if (parent.lastChild == targetNode) {
		parent.append(newNode);
	}
	else {
		parent.insertBefore(newNode,targetNode.nextSibling)
	}
}
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

addLoadEvent(prepareGallery());
addLoadEvent(preparePlaceHolder());
