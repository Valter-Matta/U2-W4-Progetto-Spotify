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

// const addSongToSongContainer = addSong.bind(songsContainer);
// const addPlaylistToPlaylistContainer = addPlaylist.bind(playlistsContainer);

// ["gemitaiz", "marracash", "salmo", "punkrock", "defcon1", "fuck"].forEach(
// 	genre =>
// 		addSongToSongContainer(genre).then(spinnerSongs.classList.add("d-none")),
// );

// ["gemitaiz", "marracash", "salmo", "punkrock", "defcon1"].forEach(genre =>
// 	addPlaylistToPlaylistContainer(genre).then(
// 		spinnerAlbums.classList.add("d-none"),
// 	),
// );

// COLOR

// const colorThief = new ColorThief();
// const img = document.querySelector("img");

// image.addEventListener("load", function () {
// 	console.log(colorThief.getColor(img));
// });
