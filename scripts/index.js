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

// COLOR

// const colorThief = new ColorThief();
// const img = document.querySelector("img");

// Make sure image is finished loading
if (img.complete) console.log(colorThief.getColor(img));
else
	image.addEventListener("load", function () {
		console.log(colorThief.getColor(img));
	});




	//JS PER GLI STICKY BUTTON SU MOBILE//
		// Bottone "Home"
		const homeButton = document.querySelector('#StickyButtons .fa-home');
		homeButton.addEventListener('click', () => {
		  alert('Hai cliccato su Home!');
		  //QUI PER ADESSO NON MI SERVE NIENTE, SONO GIA IN HOME
		});
	  
		// Bottone "Search"
		const searchButton = document.querySelector('#StickyButtons .fa-search');
		searchButton.addEventListener('click', () => {
		  alert('Hai cliccato su Search!');
		  // QUI DEVO APRIRE LA PAGINA SEARCH-PAGE MOBILE
		  window.location.href = './../search-page-mobile.html';
		});
	  
		// Bottone "La tua Libreria"
		const libraryButton = document.querySelector('#StickyButtons .fa-book');
		libraryButton.addEventListener('click', () => {
		  alert('Hai cliccato su La tua Libreria!');
		  // QUI DEVO APRIRE LA PAGINA LIBRERIA
		});
