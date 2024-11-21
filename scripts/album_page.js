class AlbumPage extends Spotify {
	#table;
	#idAlbum;
	#albumCover;
	#albumTitle;
	#albumArtist;
	#songCover;
	#musicElements;
	#musicPlayer;

	constructor(
		idAlbum,
		{ table, albumCover, albumTitle, albumArtist, songCover },
		musicElements,
	) {
		super();

		if (
			![table, albumCover, albumTitle, albumArtist, songCover].every(
				element => element instanceof HTMLElement,
			)
		)
			throw new Error("Elements bust be istances of HTMLElements");

		this.#table = table;
		this.#idAlbum = idAlbum;
		this.#albumCover = albumCover;
		this.#albumTitle = albumTitle;
		this.#songCover = songCover;
		this.#albumArtist = albumArtist;
		this.#musicElements = musicElements;

		this.#table.addEventListener("click", e => this.#changeCurrentSong(e));
	}

	#changeCurrentSong(e) {
		this.#table.querySelectorAll(".table-row").forEach(element => {
			if (element.contains(e.srcElement))
				this.#musicPlayer.jumpToNumber(element.dataset.index);
		});
	}

	populateTable() {
		return this.queryBySong(this.#idAlbum, tracks => {
			const playlist = new GraphicPlaylist(
				this.#table,
				...tracks.map(track => new Song(track)),
			).renderAlbumPage();

			this.#musicPlayer = new MusicPlayer(this.#musicElements, playlist);
		});
	}

	populateHero() {
		return this.queryBySong(this.#idAlbum, ([track]) => {
			const song = new Song(track);
			this.#albumCover.src = this.#songCover.src = song.cover;
			this.#albumCover.alt = this.#songCover.alt = song.albumTitle;
			this.#albumTitle.textContent = song.albumTitle;
			this.#albumArtist.textContent = song.artist;
		});
	}
}
