function displayAbbreviations(){
	var p_node = document.createElement("h2");
	var p_text_node = document.createTextNode("Abbreviations");
	p_node.append(p_text_node);
	document.getElementsByTagName("body")[0].append(p_node);
	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length<1) return;
	var defs = new Array();
	var dl_node = document.createElement("dl");
	for(var i=0;i<abbreviations.length;i++){
		var abbrviation = abbreviations[i];
		var definition = abbrviation.getAttribute("title");
		var key = abbrviation.lastChild.nodeValue;
		defs[key] = definition;	
	}
	for (key in defs) {
		var definition = defs[key];
		var dt_node = document.createElement("dt");
		var dt_text_node = document.createTextNode(key);
		dt_node.append(dt_text_node);

		var dd_node = document.createElement("dd");
		var dd_text_node = document.createTextNode(definition);
		dd_node.append(dd_text_node);

		dl_node.append(dt_node);
		dl_node.append(dd_node);
	}

	document.getElementsByTagName("body")[0].append(dl_node);
}

window.onload = function(){
	displayAbbreviations();
}