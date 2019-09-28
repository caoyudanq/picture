function showPic(whichpic) {
	if(!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
	var placeholder = document.getElementById("placeholder");
	if(placeholder.tagName != "IMG") return false;

	placeholder.setAttribute("src", source);
	if(document.getElementById("description")){
		var description = document.getElementById("description");	
		if(description.firstChild.nodeType ==3) {
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}
function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallary = document.getElementById("imagegallery");		
	var links = gallary.getElementsByTagName("a");
	for(var i =0;i<links.length;i++){
		links[i].onclick = function(){
			return showPic(this)?false:true;
		}
		// links[i].onkeypress = links[i].onclick;

	}
}

window.onload = function(){
	prepareGallery();
}
