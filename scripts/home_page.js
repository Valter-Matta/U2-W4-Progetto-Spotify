// DODOC
class HomePage extends Spotify {
	#songsContainer;
	#playlistsContainer;
	#spinnerSongs;
	#spinnerAlbums;

	constructor({
		songsContainer,
		playlistsContainer,
		spinnerSongs,
		spinnerAlbums,
	}) {
		super();

		if (
			![songsContainer, playlistsContainer, spinnerSongs, spinnerAlbums].every(
				element => element instanceof HTMLElement,
			)
		)
			throw new Error("Error: Elements must be istances of HTMLElements");

		this.#songsContainer = songsContainer;
		this.#playlistsContainer = playlistsContainer;
		this.#spinnerSongs = spinnerSongs;
		this.#spinnerAlbums = spinnerAlbums;
	}

	#addSong(genre) {
		return this.queryByGenre(genre, songs => {
			const songObj = songs[Math.floor(Math.random() * songs.length)];
			new GraphicSong(songObj, this.#songsContainer).render();
			this.#spinnerSongs.classList.add("d-none");
		});
	}

	#addAlbum(genre) {
		return this.queryByGenre(genre, songs => {
			const createAlbum = ({ album: { id } }) => {
				this.queryBySong(id, albumSongs => {
					console.log(albumSongs);
					if (albumSongs.length >= 4)
						new GraphicPlaylist(
							this.#playlistsContainer,
							...albumSongs.map(song => new Song(song)),
						).render();
					else {
						if (songs.length === 0)
							throw new Error("Add Playlist: No playlist found!");
						createAlbum(shuffledSongs.pop());
					}
				});
			};

			const shuffledSongs = songs.sort(_ => Math.random() - 0.5);
			createAlbum(shuffledSongs.pop());
			this.#spinnerAlbums.classList.add("d-none");
		});
	}

	#populate(genres, callback) {
		genres.forEach(genre => callback.call(this, genre));
	}

	populateSongs(...genres) {
		this.#populate(genres, this.#addSong);
	}

	populateAlbums(...genres) {
		this.#populate(genres, this.#addAlbum);
	}
}
