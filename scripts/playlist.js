class Playlist {
	#songList;
	#currentSongIndex;

	/**
	 * Creates a new Playlist instance.
	 *
	 * @constructor
	 * @param {...Song} songs - The songs to be added to the playlist. Each song must be an instance of the Song class.
	 * @throws {Error} If any of the provided songs are not instances of the Song class.
	 * @throws {Error} If the playlist does not contain at least one song.
	 * @private
	 */
	constructor(...songs) {
		// every songs must be an instance of the Song class
		if (!songs.every(song => song instanceof Song))
			throw new Error(
				"Invalid song: all songs must be instances of the Song class",
			);

		// the playlist must contain at least one song
		if (!songs.length)
			throw new Error(
				"Invalid playlist: the playlist must contain at least one song",
			);

		this.#songList = [...songs];
		this.#currentSongIndex = 0;
	}

	/**
	 * Gets the length of the song list.
	 * @returns {number} The number of songs in the song list.
	 */
	get length() {
		return this.#songList.length;
	}

	/**
	 * Returns the current song from the playlist.
	 *
	 * @returns {Song} The current song object.
	 */
	current() {
		return this.#songList[this.#currentSongIndex];
	}

	/**
	 * Advances to the next song in the playlist.
	 * If the current song is the last one in the list, it wraps around to the first song.
	 * @returns {Song} The new song that is now playing.
	 */
	next() {
		if (this.#songList.length - 1 > this.#currentSongIndex)
			this.#currentSongIndex++;
		else this.#currentSongIndex = 0;
		return this.current();
	}

	/**
	 * Moves to the previous song in the playlist.
	 * If the current song is the first one, it wraps around to the last song in the playlist.
	 * @returns {Song} The new song that is now playing.
	 */
	previous() {
		if (this.#currentSongIndex > 0) this.#currentSongIndex--;
		else this.#currentSongIndex = this.#songList.length - 1;
		return this.current();
	}

	/**
	 * Returns a new array iterator object that contains the values for each index in the playlist.
	 * @returns {Iterator} An array iterator object.
	 */
	[Symbol.iterator]() {
		return this.#songList.values();
	}
}
