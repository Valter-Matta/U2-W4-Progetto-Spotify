"use strict";

const id = new URLSearchParams(window.location.href).get("id");
const table = document.querySelector("#table");
const albumCover = document.querySelector("#album-image");
const albumTitle = document.querySelector("#album-title");
const albumArtist = document.querySelector("#album-artist");

console.log(id);

if (!id) window.location.href = "index.html";

const albumPageApp = new AlbumPage(id, {
	table,
	albumCover,
	albumTitle,
	albumArtist,
});
albumPageApp.populateTable();
albumPageApp.populateHero();
