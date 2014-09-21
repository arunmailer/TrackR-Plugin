function initUI() {
    $(".nav.right-actions").append('<li><button type="button" class="UserActions-editButton edit-button btn" data-scribe-element="profile_edit_button" style="padding: 10px; margin-left: 10px; margin-top: 5px;" id="btnStatus"><span class="button-text">Status</span></button></li>');

    $("#btnStatus").on("click", function() {
        extractTweets();
    });
}

initUI();

function extractTweets() {
    var tweets = $("div[data-tweet-id]");
    for (var i = 0; i < tweets.length; i++) {
        var tweet = $(tweets[i]).find('p.js-tweet-text').text();
        var tweetId = $(tweets[i]).data("tweetId");
        var handle = $(tweets[i]).data("screenName");

        fetchStatus(tweetId, handle, tweet);
    }
}

function fetchStatus(tweetId, handle, tweet) {
    var promise = $.post("http://localhost:3500/api/twitter/search", {tweetId: tweetId, handle: handle, tweet: tweet});
    promise.always(function(res) {
        var baseUrl = "http://localhost:3500/img/";
        if (res == null) {
            return;
        }

        $("div[data-tweet-id='" + tweetId + "']").find('.trackr-actions').remove();
        if (res.matchMethod == "tweetId") {
            var status = res.data.status;
            var type = res.data.type;
            if (status == "closed") {
                $("div[data-tweet-id='" + tweetId + "']").find('.js-actions').hide();
                $("div[data-tweet-id='" + tweetId + "']").append("<div class='trackr-actions' style='margin-left: 30px; margin-top: 5px; padding-top: 10px; border-top: dashed 1px #AAA;'>" +
                                                                    "<img src='" + baseUrl + type + "-32.png'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: This tweet is no longer valid. Please don't share it.</div>" +
                                                                "</div>");
            } else {
                $("div[data-tweet-id='" + tweetId + "']").append("<div class='trackr-actions' style='margin-left: 30px; margin-top: 5px; padding-top: 10px; border-top: dashed 1px #AAA;'>" +
                                                                    "<img src='" + baseUrl + type + "-32.png'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: This tweet is still open. Please RT.</div>" + 
                                                                "</div>");
            }
        } else if (res.matchMethod == "fuzzy") {
            if (res.data == null) {
                var type = res.matchType;
                $("div[data-tweet-id='" + tweetId + "']").append("<div class='trackr-actions' style='margin-left: 30px; margin-top: 5px; padding-top: 10px; border-top: dashed 1px #AAA;'>" +
                                                                    "<img src='" + baseUrl + type + "-32.png'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: This tweet is not being tracked.</div>" + 
                                                                "</div>");
            } else {
                var status = res.data.status;
                var type = res.data.type;
                var url = res.data.url;
                if (status == "closed") {
                    $("div[data-tweet-id='" + tweetId + "']").find('.js-actions').hide();
                    $("div[data-tweet-id='" + tweetId + "']").append("<div class='trackr-actions' style='margin-left: 30px; margin-top: 5px; padding-top: 10px; border-top: dashed 1px #AAA;'>" +
                                                                        "<img src='" + baseUrl + type + "-32.png'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: We found a <a href='" + url + "' target='_blank'>similar tweet</a> which is no longer valid. Please don't share it.</div>" + 
                                                                    "</div>");
                } else {
                    $("div[data-tweet-id='" + tweetId + "']").append("Status of a similar tweet: " + status);
                    $("div[data-tweet-id='" + tweetId + "']").append("<div class='trackr-actions' style='margin-left: 30px; margin-top: 5px; padding-top: 10px; border-top: dashed 1px #AAA;'>" +
                                                                        "<img src='" + baseUrl + type + "-32.png'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: We found a <a href='" + url + "' target='_blank'>similar tweet</a> which is still open. Please don't share it.</div>" + 
                                                                    "</div>");
                }
            }
        }
    });
}