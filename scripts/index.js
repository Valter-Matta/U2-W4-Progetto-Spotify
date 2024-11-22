"use strict";

const songsContainer = document.getElementById("buonasera-collection");
const playlistsContainer = document.getElementById("player-card-container");
const spinnerSongs = document.querySelector(".spinner-0");
const spinnerAlbums = document.querySelector(".spinner-1");

const homePageApp = new HomePage({
	songsContainer,
	playlistsContainer,
	spinnerSongs,
	spinnerAlbums,
});

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
);
