const songContainer = document.getElementById("buonasera-collection");
const playlistContainer = document.getElementById("player-card-container");
const spinnerSongs = document.querySelector(".spinner-0");
const spinnerAlbums = document.querySelector(".spinner-1");

const addSongToSongContainer = addSong.bind(songContainer);
const addPlaylistToPlaylistContainer = addPlaylist.bind(playlistContainer);

["gemitaiz", "marracash", "salmo", "punkrock", "defcon1", "fuck"].forEach(
	genre =>
		addSongToSongContainer(genre).then(spinnerSongs.classList.add("d-none")),
);

["gemitaiz", "marracash", "salmo", "punkrock", "defcon1"].forEach(genre =>
	addPlaylistToPlaylistContainer(genre).then(
		spinnerAlbums.classList.add("d-none"),
	),
);

// COLOR

// const colorThief = new ColorThief();
// const img = document.querySelector("img");

// image.addEventListener("load", function () {
// 	console.log(colorThief.getColor(img));
// });
