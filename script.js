// prepare div
var items = document.querySelectorAll("article.offer");
for (var i = 0; i < items.length; ++i) {
    var downloadDiv = document.createElement('div');
    downloadDiv.setAttribute('class', 'molotok_downloader');
    downloadDiv.setAttribute('data-id', items[i].getAttribute('data-id'));
    downloadDiv.textContent = 'Download';
    downloadDiv.addEventListener("click", processEvent, false);

    // Insert next to .details element.
    var details = items[i].querySelector("div.details");
    details.parentNode.insertBefore(downloadDiv, details.nextSibling);
}

function processEvent(e){
    e.stopPropagation();
    var item = document.getElementById('item-' + e.target.getAttribute('data-id'));
    eval('var photodata = ' + item.querySelector("div.photo").getAttribute('data-img'));
    var re = /photos\/\w+\//;
    for (var i = 0; i < photodata.length; ++i) {
        var url = photodata[i][0];
        url = url.replace(re, "photos/oryginal/");
        chrome.runtime.sendMessage({url: url});
    }
}