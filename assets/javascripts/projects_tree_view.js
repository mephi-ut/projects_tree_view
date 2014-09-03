/* Function to allow the projects to show up as a tree */

/*
	Event.observe(window, 'load', function() {
            if ($('expand_all')) {
		$('expand_all').observe('click', function() {
			$$('table.list tr').each(function(e) { e.addClassName('open'); e.removeClassName('hide'); });
		});
            }
	});
*/

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function _addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function addClass(ele,classes) {
	clar = classes.split(' ');
	for(var key in clar) {
		_addClass(ele, clar[key]);
	}
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

if(document.getElementsByClassName) {
	getElementsByClass = function(classList, node) {    
		return (node || document).getElementsByClassName(classList)
	}
} else {
	getElementsByClass = function(classList, node) {			
		var node = node || document,
		list = node.getElementsByTagName('*'), 
		length = list.length,  
		classArray = classList.split(/\s+/), 
		classes = classArray.length, 
		result = [], i,j
		for(i = 0; i < length; i++) {
			for(j = 0; j < classes; j++)  {
				if(list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
					result.push(list[i])
					break
				}
			}
		}
	
		return result
	}
}

function showAll() {
	var count;
	do {
		count = 0;
		var els = getElementsByClass('closed');
		for(var i=0; i<els.length; i++) {
			var el=els[i];
			addClass(el, 'open');
			removeClass(el, 'closed');
			count++;
		}
		var els = getElementsByClass('hide');
		for(var i=0; i<els.length; i++) {
			var el=els[i];
			addClass(el, 'visible');
			removeClass(el, 'hide');
			count++;
		}
	} while (count>0);

	return false;
}

function hideAll() {
	var count;
	do {
		count = 0;
		var els = getElementsByClass('open');
		for(var i=0; i<els.length; i++) {
			var el=els[i];
			addClass(el, 'closed');
			removeClass(el, 'open');
			count++;
		}
		var els = getElementsByClass('visible');
		for(var i=0; i<els.length; i++) {
			var el=els[i];
			addClass(el, 'hide');
			removeClass(el, 'visible');
			count++;
		}
	} while (count>0);

	return false;
}

function showHide(EL,PM) 
{
	var els = document.getElementsByTagName('tr');
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+EL+"(\\s|$)");
	var cpattern = new RegExp("span");
	var expand = new RegExp("open");
	var collapse = new RegExp("closed");
	var hide = new RegExp("hide");
	var spanid = PM;
	var classid = new RegExp("junk");
	var oddeventoggle = 0;
	for (i = 0; i < elsLen; i++)
	{
		
		if(cpattern.test(els[i].id))
		{
			var tmpspanid = spanid;
			var tmpclassid = classid;
			spanid = els[i].id;
			classid = spanid;
			classid = classid.match(/(\w+)span/)[1];
			classid = new RegExp(classid);
			if(tmpclassid.test(els[i].className) && (tmpspanid.toString() != PM.toString()))
			{
				if(collapse.test(document.getElementById(tmpspanid).className))
				{
					spanid = tmpspanid;
					classid = tmpclassid;
				}			
			}
		}
		
		if ( pattern.test(els[i].className) ) {

		  var cnames = els[i].className;
		  
		  cnames = cnames.replace(/hide/g,'visible');
		  
		  if (expand.test(document.getElementById(PM).className))
		  {
				cnames = cnames.replace(/visible/g,'hide');
		  }
		  else
		  {		
				/* classid test function is buggy and matches incorrect ids 5 matches 50. */
				if((spanid.toString() != PM.toString()) &&
				  (classid.test(els[i].className)))
				{
					  if(collapse.test(document.getElementById(spanid).className))
					  {
						cnames = cnames.replace(/visible/g,'hide');
					  }
				}
		  }
		  
		  els[i].className = cnames;
		  
		}
/*
		if(!(hide.test(els[i].className)))
		{
			var cnames = els[i].className;	
			cnames = cnames.replace(/odd/g,'');
			cnames = cnames.replace(/even/g,'');
		  		
			if(oddeventoggle == 0)
			{
				cnames += ' odd';
			}
			else
			{
				cnames += ' even';
			}
			
			oddeventoggle ^= 1;
			els[i].className = cnames;
		}
*/
	}
	if (collapse.test(document.getElementById(PM).className))
	{
		var cnames = document.getElementById(PM).className;
		cnames = cnames.replace(/closed/,'open');
		document.getElementById(PM).className = cnames;
	}
	else
	{
		var cnames = document.getElementById(PM).className;
		cnames = cnames.replace(/open/,'closed');
		document.getElementById(PM).className = cnames;
	}
}

