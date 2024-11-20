// DODOC FIXME
function queryByGenres(genre, callback) {
	fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`)
		.then(result => {
			if (result.ok) return result.json();
			else throw new Error("C'è un errore nella chiamata"); // FIXME
		})
		.then(({ data: songs }) => {
			console.log(songs); //TEMP
			callback.call(songs);
		});
}

// DODOC FIXME
function addSongToBuonaseraCollection(genre) {
	const container = document.getElementById("buonasera-collection");

	queryByGenres(genre, function () {
		const songObj = this[Math.floor(Math.random() * this.length)];
		new GraphicSong(songObj, container).render();
	});
}

// DODOC
function addPlaylistToPlaylistCollection(genre) {
	const container = document.getElementById("player-card-container");

	queryByGenres(genre, function () {
		// FIXME
		function foo({ album: { id } }) {
			fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
				.then(result => {
					if (result.ok) return result.json();
					else throw new Error("C'è un errore nella chiamata"); // FIXME
				})
				.then(({ tracks: { data: songs } }) => {
					if (songs.length >= 15) console.log("CACCA", songs); //FIXME
					else {
						if (songObj.length === 0) return;
						foo(songObj.pop());
					}
				});
		}

		const songObj = this.sort(_ => Math.random() - 0.5);
		foo(songObj.pop());
	});
}

["gemitaiz", "marracash", "salmo", "punkrock", "defcon1", "fuck"].forEach(
	genre => addSongToBuonaseraCollection(genre),
);

addPlaylistToPlaylistCollection("punkrock");
