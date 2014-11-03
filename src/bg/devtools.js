chrome.devtools.panels.create("Selenium IDE",
    "icons/icon16.png",
    "/src/SeleniumIDE.html",
    function(panel) {
      // code invoked on panel creation
    }
);



var page_getProperties = function() {

	var formatCSharpId = function(text)
	{
		if (text.indexOf('-') > -1)
			text = text.replace(/-/g, '');
		if (text.indexOf('.') > -1)
			text = text.replace(/./g, '');
		if (text.indexOf(' ') > -1)
			text = text.replace(/ /g, '');
		return text;
	};

	var data = window.jQuery && $0 ? jQuery($0) : {};
	
	var hasId = data.attr("id") ? true : false;
	var id = hasId ? data.attr("id") : undefined;
	var hasText = data.text != undefined ? true : false;
	var text = hasText ? data.text() : undefined;
	var hasCssClass = data.attr("class");
	var cssClass = hasCssClass ? data.attr("class") : undefined;
	
	// Constants
	var assertEqual = 'Assert.AreEqual("';
	var findElement = 'driver.FindElement';

	var selenium = {
		"C# get element by id": hasId ?
			'var ' + formatCSharpId(id) + ' = ' + findElement + '(By.Id("' + id + '"));' : 'Element has no id',
		"C# get element css class": hasCssClass ?
			'var ' + formatCSharpId(cssClass) + ' = ' + findElement + '(By.CssSelector("' + cssClass + '"));' :
			'Element has css class',
		"C# assert text by id": hasText && hasId ? 
			assertEqual + text + '", ' + findElement + '(By.Id("' + id + '")).Text);"' :
		 	'Element has no id or no text',

		"C# assert text by css class":  hasText && hasCssClass ?
		 	assertEqual + text + '", ' + findElement + '(By.CssSelector("' + cssClass + '")).Text);' :
		  	"Element has no css class or no text"
	};
	

	

	return selenium;
}

chrome.devtools.panels.elements.createSidebarPane(
    "Selenium IDE",
    function(sidebar) {
	  function updateElementProperties() {
	    sidebar.setExpression("(" + page_getProperties.toString() + ")()");
	  }
	  updateElementProperties();
	  chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
	}
);