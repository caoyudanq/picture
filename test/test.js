function insertParagraph(text) {
	var str = "<p>";
	str += text;
	str += "</p>";
	document.write(str);
}
window.onload = function() {
	var textdiv = document.getElementById("testdiv");
	var para = document.createElement("p");
	var txt = document.createTextNode("Hello World!");
	textdiv.appendChild(para);
	para.appendChild(txt);
}