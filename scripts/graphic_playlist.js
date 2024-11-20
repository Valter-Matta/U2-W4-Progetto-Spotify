class GraphicPlaylist extends Playlist {
	#container;

	constructor(container, ...songs) {
		super(...songs);
		this.#container = container;
	}

	render() {
		const song = Array.from(this)[0];

		const html = `
			<div class="col col-12 col-md-6 p-3 p-lg-2 col-lg-4 col-xxl d-flex flex-column justify-content-center m-0">
				<div class="rounded-4 sfondo-card h-100">
          <div class="pb-md-3">
            <div class="d-flex flex-md-column p-3 pb-0 ">
              <div class="mb-3 me-3 me-md-0 d-flex flex-column rounded rounded-3 overflow-hidden ">
                <img
									src="${song.cover}"
									class="w-50"
									alt="${song.title}"
								/>
              </div>
              <div class="col-6 text-white w-100">
                <div class="card-body">
                  <h5 class="opacity-50 fw-light">
                    <span>${song.artist}</span>
                  </h5>
                  <p class="card-text fw-bold">${song.albumTitle}</p>
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

		this.#container.insertAdjacentHTML("beforeend", html);
	}
}
