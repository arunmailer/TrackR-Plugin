var lastTweetid = 0;
var runscript = function() {
    var Tlist = document.getElementById("stream-items-id").getElementsByTagName("li");
    var count = 0;
    var firstTweet = true;
    var lastTweet = 0;
    var curTweet = 0;
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
                var retweetid = dList[k].getAttribute("data-retweet-id");
                //console.log(tweetid);
                //console.log(tweetScreen);
                if (firstTweet)
                {
                    firstTweet = false;
                    if (retweetid)
                    {
                        //console.log(retweetid);
                        lastTweet = retweetid;
                        curTweet = retweetid;
                    }
                    else
                    {
                        //console.log("not retweet");
                        lastTweet = tweetid;
                        curTweet = tweetid;
                    }
                }
                else
                {
                    if (retweetid)
                    {
                        //console.log(retweetid);
                        curTweet = retweetid;
                    }
                    else
                    {
                        //console.log("not retweet");
                        curTweet = tweetid;
                    }
                }
                if (curTweet > lastTweetid)
                {
                    count++;
                    //console.log(curTweet);
                    console.log(tweetid);
                    console.log(tweetScreen);
                    console.log(tweet);
                    fetchStatus(tweetid, tweetScreen, tweet);
                }
                break;
            }
        }
     }
     lastTweetid = lastTweet;
     //console.log(count);
     setTimeout(runscript, 30000);
};

function fetchStatus(tweetId, handle, tweet) {
    var promise = $.post("http://localhost:3500/api/twitter/search", {tweetId: tweetId, handle: handle, tweet: tweet});
    promise.done(function(data) {
        if (data != null) {
            var status = data.status;
            $("div[data-tweet-id='" + tweetId + "']").append("Status: " + status);
        } else {
            $("div[data-tweet-id='" + tweetId + "']").append("Status: Not being tracked");
        }
    });
}

 runscript();
//document.body.addEventListener("DOMNodeInserted", runscript, false);
//document.body.addEventListener("DOMNodeInsertedIntoDocument", runscript, true);
