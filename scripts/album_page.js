class AlbumPage extends Spotify {
	#table;

	constructor({ table }) {
		if (![table].every(element => element instanceof HTMLElement))
			throw new Error("Elements bust be istances of HTMLElements");

		this.#table = table;
	}
}
