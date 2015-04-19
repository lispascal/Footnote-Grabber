document.addEventListener("mousedown", function(event){
	if(event.button == 2) // rightclick
	{
		var node = event.srcElement;

		//if not a ref link or inserted footnote, return
		if(node.hasAttribute("href"))
		{
			
			
			var target = node.getAttribute("href");
			if(target.search("#cite") == -1) // make sure it's a relative url with #cite by returning if not
				return;
			
			var newId = target.slice(1) + "-ins";
			var pastins = document.getElementById(newId); // see if what we would make already exists
			if(pastins != null)
			{	
				pastins.parentNode.removeChild(pastins); // remove if so
				return;
			}

			//get object
			var ref = document.getElementById(target.slice(1)).getElementsByClassName("reference-text")[0];

			//clone it
			var insertedref = ref.cloneNode(true);
			insertedref.setAttribute('id', newId);
			node.parentNode.insertBefore(insertedref, node.nextSibling); // to insert something after. courtesy of http://xahlee.info/js/js_insert_after.html
		}
		else if(node.hasAttribute("id") && node.getAttribute("id").search("-ins") != -1) // if it is an inserted footnote, remove it
		{
			node.parentNode.removeChild(node); // remove if so
			return;
		}
		else
			return;
	}
}, true);
