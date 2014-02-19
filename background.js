chrome.extension.onMessage.addListener(
    function(params, sender) {
        chrome.downloads.download({
            url: params.url
        }, function(id){});
        return true;
});

chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
    var options = {
        filename: item.filename,
        conflict_action: 'overwrite',
        conflictAction: 'overwrite'
    };
    if (localStorage.pathtosave.length) {
        options.filename = localStorage.pathtosave + '/' +item.filename;
    }
    suggest(options);
});
