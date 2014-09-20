var Tlist = document.getElementById("stream-items-id").getElementsByTagName("li");
for (var i = 0; i < Tlist.length; i++) {
	
    var pList = Tlist[i].getElementsByTagName("p");
    for (var j = 0; j < pList.length; j++) {
    	var tweet = pList[j].textContent;
    	console.log(tweet);
    	var dList = Tlist[i].getElementsByTagName("div");
		for (var j = 0; j < dList.length; j++) {
			var tweetid = dList[j].getAttribute("data-tweet-id");
			var tweetScreen = dList[j].getAttribute("data-screen-name");
			console.log(tweetid);
			console.log(tweetScreen);
			break;
		}
    }
 }
