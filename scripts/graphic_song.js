class GraphicSong extends Song {
	constructor(song, container) {
		super(song);
		this.container = container;
		this.renderedElement = null; // Salva un riferimento all'elemento DOM creato
		this.initResizeListener(); // Inizializza il listener per il resize
	}

	render() {
		// Rimuovi il vecchio elemento se esiste
		if (this.renderedElement) {
			this.renderedElement.remove();
		}

		// Ottieni la larghezza dello schermo e imposta la classe corretta
		const screenWidth = window.innerWidth;
		const colClass = screenWidth > 375 && screenWidth <= 475 ? "col-6" : "col-12";

		// Inserisci il nuovo elemento nel container
		this.container.insertAdjacentHTML(
			"beforeend",
			`
			<div class="graphic-song col ${colClass} p-0 d-flex align-items-center" data-id="${this.id}">
				<div class="d-flex align-items-center mx-3 sfondo w-100">
					<img
						class="rounded-start-2"
						src="${this.cover}"
						width="80px"
						alt=""
					/>
					<div>
						<p class="px-2 m-0 fw-bold">${this.title}</p>
						<p class="px-2 m-0 fw-lighter">${this.artist}</p>
					</div>
				</div>
			</div>
			`,
		);

		// Salva un riferimento all'elemento appena creato
		this.renderedElement = this.container.querySelector(
			`.graphic-song[data-id="${this.id}"]`,
		);
	}

	initResizeListener() {
		// Ascolta l'evento resize e aggiorna il rendering
		window.addEventListener("resize", () => this.render());
	}
}
