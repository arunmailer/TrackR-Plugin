var runscript = function() {
    var Tlist = document.getElementById("stream-items-id").getElementsByTagName("li");
    //var count = 0;
    for (var i = 0; i < Tlist.length; i++) {
        var pList = Tlist[i].getElementsByTagName("p");
        for (var j = 0; j < pList.length; j++) {
            var tweet = pList[j].textContent;
            //console.log(tweet);
            //count++;
            var dList = Tlist[i].getElementsByTagName("div");
            for (var k = 0; k < dList.length; k++) {
                var tweetid = dList[k].getAttribute("data-tweet-id");
                var tweetScreen = dList[k].getAttribute("data-screen-name");
                //console.log(tweetid);
                //console.log(tweetScreen);
                break;
            }
        }
     }
     //console.log(count);
     setTimeout(runscript, 30000);
};

 runscript();
//document.body.addEventListener("DOMNodeInserted", runscript, false);
//document.body.addEventListener("DOMNodeInsertedIntoDocument", runscript, true);
