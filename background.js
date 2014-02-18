chrome.extension.onMessage.addListener(
    function(params, sender) {
        chrome.downloads.download({
            url: params.url
        }, function(id){});
        return true;
});