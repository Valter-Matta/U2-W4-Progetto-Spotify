class Song {
	constructor(song) {
		this.cover = song.album.cover_medium;
		this.title = song.title;
		this.artist = song.artist.name;
		this.albumTitle = song.album.title;
		this.duration = song.duration;
		this.views = song.rank;
		// TODO private field
	}
}
