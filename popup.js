
function click(e) {
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.executeScript(null,{file:"script.js"});
	var divs = document.getElementById("pid");
	divs.addEventListener('click', click);
});
