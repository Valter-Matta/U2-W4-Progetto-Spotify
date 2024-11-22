class GraphicSong extends Song {
	constructor(song, container) {
		super(song);
		this.container = container;
	}

	render() {
		this.container.insertAdjacentHTML(
			"beforeend",
			`
					<div class="graphic-song col col-6 col-md-4 p-0 d-flex align-items-center" data-id="${this.id}">
							<div class="d-flex align-items-center mx-3 sfondo w-100">
									<img
											class="rounded-start-2"
											src="${this.cover}"
											width="80px"
											alt=""
									/>
									<div>
											<p class="testo-a-capo px-2 m-0 fw-bold">${this.title}</p>
											<p class=" px-2 m-0 fw-lighter titoloartista">${this.artist}</p>
									</div>
							</div>
					</div>
					`,
		);
	}
}
