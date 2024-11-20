class GraphicPlaylist extends Playlist {
	#container;

	constructor(container, ...songs) {
		super(...songs);
		this.#container = container;
	}

	// DODOC
	#get4Songs() {
		// NOTE we are shuffling
		const songs = Array.from(this);
		const shuffledSongs = songs.sort(_ => Math.random() - 0.5);
		return shuffledSongs.slice(0, 4);
	}

	// DODOC
	#createImageHTML(song) {
		return `
			<img
				src="${song.cover}"
				class="w-50"
				alt="${song.title}"
			/>
		`;
	}

	render() {
		let html = `
			<div class="col col-12 col-md-6 p-3 p-lg-2 col-lg-4 col-xxl d-flex flex-column justify-content-center m-0">
				<div class="rounded-4 sfondo-card h-100">
          <div class="pb-md-3">
            <div class="d-flex flex-md-column p-3 pb-0 ">
              <div class="mb-3 me-3 me-md-0 d-flex flex-column rounded rounded-3 overflow-hidden ">
                <div class="d-flex w-100">
                  %image
									%image
                </div>
                <div class="d-flex rounded-4">
                  %image
                  %image
                </div>
              </div>
              <div class="col-6 text-white w-100">
                <div class="card-body">
                  <h5 class="opacity-50 fw-light">
                    Playlist <span>${Array.from(this)[0].artist}</span>
                  </h5>
                  <p class="card-text fw-bold">LE MIE PALLE</p>
                </div>
              </div>
            </div>
          </div>
          <section class="d-flex justify-content-between align-items-center p-3 pt-0 p-lg-2">
            <div>
              <i class="fas fa-heart"></i>
              <i class="fas fa-ellipsis-v"></i>
            </div>
            <div class="d-flex align-items-center">
              <p class="m-0 d-lg-none">${this.length} Brani</p>
              <i class="fas fa-play-circle"></i>
            </div>
          </section>
        </div>
			</div>
		`;

		this.#get4Songs().forEach(
			song => (html = html.replace("%image", this.#createImageHTML(song))),
		);

		this.#container.insertAdjacentHTML("beforeend", html);
	}
}
