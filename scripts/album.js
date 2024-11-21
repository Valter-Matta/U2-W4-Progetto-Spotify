"use strict";

const id = new URLSearchParams(window.location.href).get("id");
const table = document.querySelector("#table");
const albumCover = document.querySelector("#album-image");
const albumTitle = document.querySelector("#album-title");
const albumArtist = document.querySelector("#album-artist");

const musicPlayerElement = document.querySelector(".music-player");
const songElement = document.getElementById("playing-song");
const playPauseButton = document.getElementById("player-play-pause-button");
const nextButton = document.getElementById("player-next-button");
const previousButton = document.getElementById("player-previous-button");
const progressBar = document.querySelector(".progress");
const progressWrapper = document.querySelector(".progress-wrapper");
const volumeBar = document.querySelector(".volume-bar");
const volumeWrapper = document.querySelector(".volume-wrapper");

console.log(id);

if (!id) window.location.href = "index.html";

const albumPageApp = new AlbumPage(
	id,
	{
		table,
		albumCover,
		albumTitle,
		albumArtist,
	},
	{
		musicPlayerElement,
		songElement,
		playPauseButton,
		nextButton,
		previousButton,
		progressBar,
		progressWrapper,
		volumeBar,
		volumeWrapper,
	},
);
albumPageApp.populateTable();
albumPageApp.populateHero();
