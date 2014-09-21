var nextCabInfo = '4 minutes away.'; // Hard coding it as OLA doesn't support CORS
function initUI() {
    $("#blueBarNAXAnchor ul").append('<li class="_2pdh _3zm- _55bi _3zm- _55bh"><a class="_1ayn" id="btnStatus">TrackR<div class="_5ah- _5ahy"><div class="_5ahz"></div></div></a></li>');
    console.log($("#btnStatus"));
    $(document).on("click", "#btnStatus", function() {
        nextCabInfo = '';
        $.ajax({
            url: 'http://console.olacabs.com/city/3/category/1/availability.json?lat=12.967166&lng=77.595566',
            type: 'POST',
            headers: {
                'X-User-Agent': 'OlaDocumentation.v1',
                'X-Ola-API-Key-Auth': 'cb9f5e28c1e447497111a43f801cccd0'
            }
        })
        .done(function(data) {
            if (data.status && data.status == "SUCCESS") {
                if (data.availability && data.availability.present) {
                    nextCabInfo = "Closest OLA cab is about " + data.availability.duration.value + " " + data.availability.duration.unit + " away";
                }
            }
        })
        .fail(function() {
            console.log("Damn!! OLA cabs not supporting CORS");
            // hard coding for the demo
            nextCabInfo = "4 minutes away.";
        })
        .always(function() {
            console.log("complete");
            extractPosts();
        });

        return false;
    });
    extractPosts();
}

initUI();

function extractPosts() {
    var posts = $(".userContentWrapper");
    for (var i = 0; i < posts.length; i++) {
        var post = $(posts[i]).text();
        console.log(post);
        //fetchStatus(99999999999, '', tweet);
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
                                                                    "<img src='" + baseUrl + type + "-32.png' style='opacity: 0.5'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: This tweet is no longer valid. Please don't share it.</div>" +
                                                                "</div>");
            } else {
                $("div[data-tweet-id='" + tweetId + "']").append("<div class='trackr-actions' style='margin-left: 30px; margin-top: 5px; padding-top: 10px; border-top: dashed 1px #AAA;'>" +
                                                                    "<img src='" + baseUrl + type + "-32.png'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: This tweet is still open. Please RT.</div>" + 
                                                                    (type == "blood" && nextCabInfo != "" ? "<div style='margin-left: 45px'>" + nextCabInfo + ". Ride with <a href='http://www.olacabs.com/' target='_blank'><img src='" + baseUrl + "/ola-32.png'/> OLA cabs</a></div>" : "") + 
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
                                                                        "<img src='" + baseUrl + type + "-32.png' style='opacity: 0.5'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: We found a <a href='" + url + "' target='_blank'>similar tweet</a> which is no longer valid. Please don't share it.</div>" + 
                                                                    "</div>");
                } else {
                    $("div[data-tweet-id='" + tweetId + "']").append("Status of a similar tweet: " + status);
                    $("div[data-tweet-id='" + tweetId + "']").append("<div class='trackr-actions' style='margin-left: 30px; margin-top: 5px; padding-top: 10px; border-top: dashed 1px #AAA;'>" +
                                                                        "<img src='" + baseUrl + type + "-32.png'/>&nbsp;<div style='margin-top: -32px; margin-left: 45px'><strong>TrackR</strong>: We found a <a href='" + url + "' target='_blank'>similar tweet</a> which is still open. Please don't share it.</div>" + 
                                                                        (type == "blood" && nextCabInfo != "" ? "<div style='margin-left: 45px'>" + nextCabInfo + ". Ride with <a href='http://www.olacabs.com/' target='_blank'><img src='" + baseUrl + "/ola-32.png'/> OLA cabs</a></div>" : "") + 
                                                                    "</div>");
                }
            }
        }
    });
}