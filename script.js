var linkText = 'Скачать изображения';

function populateElements() {
    // Get all items for sale.
    var items = document.querySelectorAll('article.offer');
    // Generate div element, add event and populate them on the page.
    for (var i = 0; i < items.length; ++i) {
        var downloadDiv = document.createElement('div');
        downloadDiv.setAttribute('class', 'molotok_downloader');
        downloadDiv.setAttribute('data-id', items[i].getAttribute('data-id'));
        downloadDiv.textContent = linkText;
        downloadDiv.addEventListener('click', processEvent, false);

        // Insert next to .details element.
        var details = items[i].querySelector("div.details");
        details.parentNode.insertBefore(downloadDiv, details.nextSibling);
    }
}

function processEvent(e){
    e.stopPropagation();
    // Retrieve item we need to download images for.
    var item = document.getElementById('item-' + e.target.getAttribute('data-id'));
    // Retrieve its data-img attribute content.
    eval('var photodata = ' + item.querySelector('div.photo').getAttribute('data-img'));
    var re = /photos\/\w+\//;
    // Download each image in its original size.
    for (var i = 0; i < photodata.length; ++i) {
        var url = photodata[i][0];
        url = url.replace(re, 'photos/oryginal/');
        chrome.runtime.sendMessage({url: url});
    }
}

// Initial load.
window.addEventListener('load', populateElements, false);

var listingDiv = document.querySelector('div#listing');
var offerPreviewDiv = document.querySelector('article.offer-preview');

// Update the links after AJAX page changes (e.g. page or sorting change).
// Create an observer instance.
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // Re-populate links after AJAX call (listingDiv element content change).
    if (mutation.target.id == 'listing' && mutation.addedNodes[0].nodeType == 3) {
        populateElements();
    }
    // Add listener to link in the offer preview window.
    if (mutation.target.id == 'offer-preview' && mutation.addedNodes[0].nodeType == 3) {
        var downloadDiv = mutation.target.querySelector('div.molotok_downloader');
        downloadDiv.addEventListener('click', processEvent, false);
    }
  });
});

// Pass in the target node, as well as the observer options.
observer.observe(listingDiv, { childList: true });
observer.observe(offerPreviewDiv, { childList: true });