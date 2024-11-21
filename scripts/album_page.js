class AlbumPage extends Spotify {
	#table;
	#idAlbum;
	#albumCover;
	#albumTitle;
	#albumArtist;

	constructor(idAlbum, { table, albumCover, albumTitle, albumArtist }) {
		super();

		if (
			![table, albumCover, albumTitle, albumArtist].every(
				element => element instanceof HTMLElement,
			)
		)
			throw new Error("Elements bust be istances of HTMLElements");

		this.#table = table;
		this.#idAlbum = idAlbum;
		this.#albumCover = albumCover;
		this.#albumTitle = albumTitle;
		this.#albumArtist = albumArtist;
	}

	populateTable() {
		return this.queryBySong(this.#idAlbum, tracks =>
			new GraphicPlaylist(
				this.#table,
				...tracks.map(track => new Song(track)),
			).renderAlbumPage(),
		);
	}

	populateHero() {
		return this.queryBySong(this.#idAlbum, ([track]) => {
			const song = new Song(track);
			this.#albumCover.src = song.cover;
			this.#albumCover.alt = song.albumTitle;
			this.#albumTitle.textContent = song.albumTitle;
			this.#albumArtist.textContent = song.artist;
		});
	}
}
