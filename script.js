// This file is part of Molotok Downloader Chrome extension.
// Copyright (C) 2014 Ruslan Kabalin <ruslan.kabalin@gmail.com>
//
// Molotok Downloader Chrome extension is free software: you can redistribute
// it and/or modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation, either version 3 of the License,
// or (at your option) any later version.
//
// Molotok Downloader Chrome extension is distributed in the hope that it will
// be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
// Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with Molotok Downloader Chrome extension.  If not, see
// <http://www.gnu.org/licenses/>.

// Main script for page modification and events processing.
var linkText = 'Скачать изображения';

function populateDownloadElements() {
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
window.addEventListener('load', function() {
    // Fetch listing.
    var listingDiv = document.querySelector('div#listing');
    if (listingDiv) {
        // We are on search results listing page.
        populateDownloadElements();

        // Create an observer instance.
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            // Re-populate links after AJAX call (listingDiv element content change).
            if (mutation.target.id == 'listing' && mutation.addedNodes[0].nodeType == 3) {
                populateDownloadElements();
            }
            // Add listener to link in the offer preview window (offerPreviewDiv element content change).
            if (mutation.target.id == 'offer-preview' && mutation.addedNodes[0].nodeType == 3) {
                var downloadDiv = mutation.target.querySelector('div.molotok_downloader');
                downloadDiv.addEventListener('click', processEvent, false);
            }
          });
        });

        // Update the links after AJAX page changes (e.g. page or sorting change).
        observer.observe(listingDiv, { childList: true });
        // Add the link on offer preview window display.
        var offerPreviewDiv = document.querySelector('article.offer-preview');
        observer.observe(offerPreviewDiv, { childList: true });
    }
}, false);