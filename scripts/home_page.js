class HomePage {
	#songsContainer;
	#playlistsContainer;

	constructor() {}
}

/**
 * Makes a fetch request to the given query URL and processes the response.
 *
 * @param {string} query - The URL to fetch.
 * @param {Error} error - The error to throw if the fetch request fails.
 * @param {function} callback - The callback function to execute with the response data.
 * @returns {Promise<void>} A promise that resolves when the fetch and callback are complete.
 */
function query(query, error, callback) {
	return fetch(query)
		.then(result => {
			if (result.ok) return result.json();
			else throw error;
		})
		.then(response => callback(response));
}

/**
 * Fetches songs from the Deezer API based on the specified genre and executes a callback with the results.
 *
 * @param {string} genre - The genre to search for.
 * @param {function} callback - The callback function to execute with the fetched songs.
 * @returns {Promise<void>} A promise that resolves when the fetch and callback are complete.
 */
function queryByGenre(genre, callback) {
	return query(
		`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`,
		new Error(
			`Error fetching data from Deezer API: https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`,
		),
		({ data: songs }) => callback.call(songs),
	);
}

/**
 * Fetches song data from the Deezer API by album ID and executes a callback with the song data.
 *
 * @param {string} id - The ID of the album to query.
 * @param {function} callback - The callback function to execute with the song data.
 * @returns {Promise<void>} - A promise that resolves when the query is complete.
 * @throws {Error} - Throws an error if there is an issue fetching data from the Deezer API.
 */
function queryBySong(id, callback) {
	return query(
		`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`,
		new Error(
			`Error fetching data from Deezer API: https://striveschool-api.herokuapp.com/api/deezer/album/${id}`,
		),
		({ tracks: { data: songs } }) => callback.call(songs),
	);
}

/**
 * Adds a song of the specified genre to the given container.
 *
 * @param {string} genre - The genre of the song to add.
 * @this {HTMLElement} The container element where the song will be rendered.
 * @returns {Promise<void>} A promise that resolves when the fetch and callback are complete.
 */
function addSong(genre) {
	const container = this;
	return queryByGenre(genre, function () {
		const songObj = this[Math.floor(Math.random() * this.length)];
		new GraphicSong(songObj, container).render();
	});
}

/**
 * Adds a playlist of the specified genre to the given container.
 *
 * @param {string} genre - The genre of the playlist to add.
 * @this {HTMLElement}The container element where the playlist will be rendered.
 * @returns {Promise<void>} A promise that resolves when the fetch and callback are complete.
 */
function addPlaylist(genre) {
	const container = this;
	return queryByGenre(genre, function () {
		const songs = this.sort(_ => Math.random() - 0.5);
		foo(songs.pop());

		function foo({ album: { id } }) {
			queryBySong(id, function () {
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
