class Spotify {
	#query(query, error, callback) {
		return fetch(query)
			.then(result => {
				if (result.ok) return result.json();
				else throw error;
			})
			.then(response => callback(response));
	}

	queryByGenre(genre, callback) {
		return this.#query(
			`https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`,
			new Error(
				`Error fetching data from Deezer API: https://striveschool-api.herokuapp.com/api/deezer/search?q=${genre}`,
			),
			({ data: songs }) => callback(songs),
		);
	}

	queryBySong(id, callback) {
		return this.#query(
			`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`,
			new Error(
				`Error fetching data from Deezer API: https://striveschool-api.herokuapp.com/api/deezer/album/${id}`,
			),
			({ tracks: { data: songs } }) => callback(songs),
		);
	}
}
