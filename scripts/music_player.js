/**
 * Represents the graphical user interface for a music player.
 * It uses a Playlist object to manage the songs and a Song object to represent each song.
 */
class MusicPlayer {
	static #VOLUME_PERCENT = 25;

	// HTML ELEMENTS
	#musicPlayerElement;
	#songElement;
	#playPauseButton;
	#nextButton;
	#previousButton;
	#progressBar;
	#progressWrapper;
	#volumeBar;
	#volumeWrapper;

	// MUSIC PLAYER
	#playlist;
	/**
	 * @private
	 * @type {number} between 0 and 0.1
	 * @description Represents the volume level of the music player. The volume is internally divided by 100 to prevent excessively loud output.
	 */
	#volume;

	/**
	 * Creates an instance of the music player.
	 *
	 * @constructor
	 * @param {Object} elements - The HTML elements required for the music player.
	 * @param {HTMLElement} elements.musicPlayerElement - The main container element for the music player.
	 * @param {HTMLElement} elements.songElement - The audio element that plays the song.
	 * @param {HTMLElement} elements.playPauseButton - The button to play or pause the song.
	 * @param {HTMLElement} elements.nextButton - The button to skip to the next song.
	 * @param {HTMLElement} elements.previousButton - The button to go back to the previous song.
	 * @param {HTMLElement} elements.progressBar - The progress bar that shows the current song's progress.
	 * @param {HTMLElement} elements.progressWrapper - The wrapper element for the progress bar.
	 * @param {HTMLElement} elements.volumeBar - The volume bar that controls the song's volume.
	 * @param {HTMLElement} elements.volumeWrapper - The wrapper element for the volume bar.
	 * @param {Playlist} playlist - The playlist to play.
	 * @throws {Error} Throws an error if any of the provided elements are not instances of HTMLElement.
	 */
	constructor(
		{
			musicPlayerElement,
			songElement,
			playPauseButton,
			nextButton,
			previousButton,
			progressBar,
			progressWrapper,
			volumeBar,
			volumeWrapper,
		},
		playlist,
	) {
		// VALIDATE HTML ELEMENTS
		if (
			![
				musicPlayerElement,
				songElement,
				playPauseButton,
				nextButton,
				previousButton,
				progressBar,
				progressWrapper,
				volumeBar,
				volumeWrapper,
			].every(element => element instanceof HTMLElement)
		)
			throw new Error(
				"Invalid HTML element: all HTML elements must be instances of HTMLElement",
			);

		// ASSIGN HTML ELEMENTS
		this.#musicPlayerElement = musicPlayerElement;
		this.#songElement = songElement;
		this.#playPauseButton = playPauseButton;
		this.#nextButton = nextButton;
		this.#previousButton = previousButton;
		this.#progressBar = progressBar;
		this.#progressWrapper = progressWrapper;
		this.#volumeBar = volumeBar;
		this.#volumeWrapper = volumeWrapper;

		// ASSIGN PLAYLIST
		this.playlist = playlist;
		this.#songElement.src = this.#playlist.current().src;

		// VOLUME
		this.volume = 20;

		// EVENT LISTENERS
		this.#songElement.addEventListener("ended", () => this.#next());
		this.#songElement.addEventListener("timeupdate", e =>
			this.#updateProgressBar(e),
		);
		this.#playPauseButton.addEventListener("click", () => this.#playPause());
		this.#nextButton.addEventListener("click", () => this.#next());
		this.#previousButton.addEventListener("click", () => this.#previous());
		this.#progressWrapper.addEventListener("click", e => this.#jumpToTime(e));
		this.#volumeWrapper.addEventListener("click", e => this.#changeVolume(e));
	}

	// GETTERS AND SETTERS

	/**
	 * Gets the playlist.
	 * @returns {Playlist} The current playlist.
	 */
	get playlist() {
		return this.#playlist;
	}

	/**
	 * Sets the playlist for the music player.
	 *
	 * @param {Playlist} playlist - The playlist to set.
	 * @throws {Error} Throws an error if the provided playlist is not an instance of the Playlist class.
	 */
	set playlist(playlist) {
		if (!(playlist instanceof Playlist))
			throw new Error(
				"Invalid playlist: the playlist must be an instance of the Playlist class",
			);
		this.#playlist = playlist;
	}

	/**
	 * Gets the volume level.
	 * @returns {number} The volume level as a percentage.
	 */
	get volume() {
		return this.#volume * MusicPlayer.#VOLUME_PERCENT;
	}

	/**
	 * Sets the volume of the music player.
	 *
	 * @param {number} volume - The volume level to set, must be a number between 0 and 100.
	 * @throws {Error} If the volume is not a number or not within the range of 0 to 100.
	 */
	set volume(volume) {
		// data validation
		if (!(typeof volume === "number") || !(0 <= volume && volume <= 100))
			throw new Error(
				"Invalid volume: the volume must be a number between 0 and 100",
			);

		// actual setting
		this.#volume = volume / 100 / MusicPlayer.#VOLUME_PERCENT;
		this.#songElement.volume = this.#volume;
		this.#volumeBar.style.width = `${volume.toFixed(0)}%`;
		this.#volumeBar.dataset.volume = volume.toFixed(0);
	}

	// METHODS

	/**
	 * Plays the current song.
	 *
	 * Sets the `data-playing` attribute of the music player element to "true"
	 * and calls the play method on the song element.
	 *
	 * @method play
	 * @private
	 */
	play() {
		this.#musicPlayerElement.dataset.playing = "true";
		this.#songElement.play();
	}

	/**
	 * Pauses the currently playing song and updates the music player state.
	 *
	 * Sets the `data-playing` attribute of the music player element to "false"
	 * and pauses the song element.
	 *
	 * @method pause
	 */
	pause() {
		this.#musicPlayerElement.dataset.playing = "false";
		this.#songElement.pause();
	}

	jumpToNumber(index) {
		this.#changeSong(this.#playlist.getSongByIndex(index));
	}

	/**
	 * Toggles the play/pause state of the music player.
	 * If the music player is currently playing, it will be paused.
	 * If the music player is currently paused, it will start playing.
	 * @private
	 */
	#playPause() {
		if (this.#musicPlayerElement.dataset.playing === "true") this.pause();
		else this.play();
	}

	/**
	 * Advances to the next song in the playlist.
	 * If the current song is the last one in the list, it wraps around to the first song.
	 * @private
	 */
	#next() {
		this.#changeSong(this.#playlist.next());
	}

	/**
	 * Plays the previous song in the playlist.
	 * If the current song is the first one, it wraps around to the last song in the playlist.
	 * @private
	 */
	#previous() {
		this.#changeSong(this.#playlist.previous());
	}

	/**
	 * Changes the current song to the specified song.
	 *
	 * @param {Song} song - The song to be played. Must be an instance of the Song class.
	 * @throws {Error} Throws an error if the provided song is not an instance of the Song class.
	 * @private
	 */
	#changeSong(song) {
		if (!(song instanceof Song))
			throw new Error(
				"Invalid song: the song must be an instance of the Song class",
			);
		this.#songElement.src = song.src;
		this.play();
	}

	/**
	 * Updates the progress bar based on the current time of the audio track.
	 *
	 * @param {Object} event - The event object from the audio element.
	 * @param {HTMLMediaElement} event.srcElement - The source element of the event, typically the audio element.
	 * @private
	 */
	#updateProgressBar({ srcElement }) {
		const { currentTime } = srcElement;
		const duration = this.#songElement.duration;
		const progressPercent = (currentTime / duration) * 100;
		this.#progressBar.style.width = `${progressPercent}%`;
	}

	/**
	 * Jumps to a specific time in the current song based on the click position.
	 *
	 * @param {Object} event - The event object containing the click position.
	 * @param {number} event.offsetX - The horizontal position of the click relative to the progress bar.
	 */
	#jumpToTime({ offsetX }) {
		const width = this.#progressWrapper.clientWidth;
		const duration = this.#songElement.duration;
		this.#songElement.currentTime = (offsetX / width) * duration;
	}

	/**
	 * Changes the volume of the music player based on the offset of a click event.
	 *
	 * @param {Object} event - The event object containing the offsetX property.
	 * @param {number} event.offsetX - The horizontal coordinate of the click event relative to the volume wrapper.
	 */
	#changeVolume({ offsetX }) {
		const width = this.#volumeWrapper.clientWidth;
		this.volume = (offsetX / width) * 100;
	}
}
