"use strict";

const songsContainer = document.getElementById("buonasera-collection");
const playlistsContainer = document.getElementById("player-card-container");
const spinnerSongs = document.querySelector(".spinner-0");
const spinnerAlbums = document.querySelector(".spinner-1");

const musicPlayerElement = document.querySelector(".music-player");
const songElement = document.getElementById("playing-song");
const playPauseButton = document.getElementById("player-play-pause-button");
const nextButton = document.getElementById("player-next-button");
const previousButton = document.getElementById("player-previous-button");
const progressBar = document.querySelector(".progress");
const progressWrapper = document.querySelector(".progress-wrapper");
const volumeBar = document.querySelector(".volume-bar");
const volumeWrapper = document.querySelector(".volume-wrapper");

const homePageApp = new HomePage(
	{
		songsContainer,
		playlistsContainer,
		spinnerSongs,
		spinnerAlbums,
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

homePageApp.populateSongs(
	"gemitaiz",
	"marracash",
	"salmo",
	"punkrock",
	"defcon1",
	"fuck",
);

homePageApp.populateAlbums(
	"gemitaiz",
	"marracash",
	"salmo",
	"punkrock",
	"defcon1",
	"rock",
);

// COLOR

// const colorThief = new ColorThief();
// const img = document.querySelector("img");

// image.addEventListener("load", function () {
// 	console.log(colorThief.getColor(img));
// });
