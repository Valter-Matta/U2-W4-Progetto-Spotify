// DODOC
function query(query, error, callback) {
	fetch(query)
		.then(result => {
			if (result.ok) return result.json();
			else throw error;
		})
		.then(response => callback(response));
}

// DODOC
function queryByGenre(genre, callback) {
	query(
		`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`,
		new Error(
			`Error fetching data from Deezer API: https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`,
		),
		({ data: songs }) => callback.call(songs),
	);
}

function queryBySong(id, callback) {
	query(
		`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`,
		new Error(
			`Error fetching data from Deezer API: https://striveschool-api.herokuapp.com/api/deezer/album/${id}`,
		),
		({ tracks: { data: songs } }) => callback.call(songs),
	);
}

// DODOC
function addSong(genre, container) {
	queryByGenre(genre, function () {
		const songObj = this[Math.floor(Math.random() * this.length)];
		new GraphicSong(songObj, container).render();
	});
}

// DODOC
function addPlaylist(genre, container) {
	queryByGenre(genre, function () {
		const songs = this.sort(_ => Math.random() - 0.5);
		foo(songs.pop());

		function foo({ album: { id } }) {
			queryBySong(id, function () {
				console.log(this);
				if (this.length >= 4)
					new GraphicPlaylist(
						container,
						...this.map(song => new Song(song)),
					).render();
				else {
					if (songs.length === 0) return;
					foo(songs.pop(), songs);
				}
			});
		}
	});
}

// MAIN

const songContainer = document.getElementById("buonasera-collection");
const playlistContainer = document.getElementById("player-card-container");

// NOTE bind
["gemitaiz", "marracash", "salmo", "punkrock", "defcon1", "fuck"].forEach(
	genre => addSong(genre, songContainer),
);

["gemitaiz", "marracash", "salmo", "punkrock", "defcon1"].forEach(genre =>
	addPlaylist(genre, playlistContainer),
);
