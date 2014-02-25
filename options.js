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

// Options page JS routines.
window.addEventListener('load', function() {
    if (!localStorage.pathtosave) {
        localStorage.pathtosave = '';
    }

    // Initialise with the current.
    settings.pathtosave.value = localStorage.pathtosave;

    // Update on save.
    settings.save.onclick = function() {
        localStorage.pathtosave = settings.pathtosave.value;
    };
});
