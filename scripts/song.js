class Song {
	constructor(song) {
		this.cover = song.album.cover_medium;
		this.title = song.title;
		this.artist = song.artist.name;
		this.albumTitle = song.album.title;
		// TODO private field
	}
}
