//JS PER GLI STICKY BUTTON SU MOBILE//
		// Bottone "Home"
		const homeButton = document.querySelector('#StickyButtons .fa-home');
		homeButton.addEventListener('click', () => {
		  alert('Hai cliccato su Home!');
		  //QUI PER ADESSO NON MI SERVE NIENTE, SONO GIA IN HOME
		});
	  
		// Bottone "Search"
		const searchButton = document.querySelector('#StickyButtons .fa-search');
		searchButton.addEventListener('click', () => {
		  // QUI DEVO APRIRE LA PAGINA SEARCH-PAGE MOBILE
		  window.location.href = './../search-page-mobile.html';
		});
	  
		// Bottone "La tua Libreria"
		const libraryButton = document.querySelector('#StickyButtons .fa-book');
		libraryButton.addEventListener('click', () => {
		  alert('Hai cliccato su La tua Libreria!');
		  // QUI DEVO APRIRE LA PAGINA LIBRERIA
		});




	// Seleziona il div che contiene il titolo "Buonasera" e il successivo ul
const buonaseraDiv = document.querySelector("#buonasera-collection .header");
const buonaseraUl = document.querySelector("#buonasera-collection ul");

// Funzione per creare e inserire la barra di ricerca
function insertSearchBar() {
  // Controlla se la barra di ricerca esiste già
  if (document.getElementById('search-bar')) return;

  // Modifica l'altezza di .playlist-section
  const playlistSection = document.querySelector(".playlist-section");
  if (playlistSection) {
    playlistSection.style.height = "calc(97vh - 270px)";
  }

  // Crea un nuovo elemento div per la barra di ricerca
  const searchBar = document.createElement('div');
  searchBar.id = 'search-bar';
  searchBar.style.margin = '20px 0'; // Margine sopra e sotto
  searchBar.style.padding = '10px'; // Padding interno
  searchBar.style.backgroundColor = '#121212'; // Colore di sfondo
  searchBar.style.borderRadius = '5px'; // Angoli arrotondati
  searchBar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.3)'; // Ombra

  // Crea un input di ricerca
  const input = document.createElement('input');
  input.id = 'search-input'; // Assicurati di dare un ID all'input
  input.type = 'text';
  input.placeholder = 'Cerca qualcosa...';
  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.paddingRight = '2em'; // Padding a destra
  input.style.paddingLeft = '1em'; // Padding a sinistra
  input.style.border = 'none';
  input.style.borderRadius = '5px';
  input.style.fontSize = '16px';
  input.style.fontFamily = '"Spotify Circular", sans-serif'; // Font personalizzato
  input.style.backgroundColor = '#1B1B1B';
  input.style.color = 'white';
  input.style.outline = 'none';

  // Aggiungi il font personalizzato al placeholder
  input.style.setProperty('font-family', '"Spotify Circular", sans-serif'); // Per il testo dell'utente
  input.style.setProperty('font-style', 'normal');
  input.setAttribute('style', `${input.getAttribute('style')}; ::placeholder { font-family: "Spotify Circular", sans-serif; font-style: normal; }`);

  // Aggiungi l'input al div della barra di ricerca
  searchBar.appendChild(input);

  // Crea un elemento per i risultati della ricerca
  const searchResults = document.createElement('div');
  searchResults.id = 'search-results';
  searchResults.style.display = 'none'; // Nascondi i risultati inizialmente
  searchBar.appendChild(searchResults);

  // Inserisci la barra di ricerca prima dell'ul
  if (buonaseraUl) {
    buonaseraUl.parentNode.insertBefore(searchBar, buonaseraUl);
  }

  // Focus automatico sull'input
  input.focus();

  // Rimuovi la barra di ricerca cliccando fuori
  document.addEventListener("click", function handleClickOutside(e) {
    if (!searchBar.contains(e.target) && e.target !== document.querySelector(".search")) {
      searchBar.remove();
      if (playlistSection) {
        playlistSection.style.height = ""; // Ripristina altezza originale
      }
      document.removeEventListener("click", handleClickOutside); // Rimuovi l'evento
    }
  });

  // Funzione per cercare dati dall'API
  async function searchMusic(query) {
    if (!query) {
      searchResults.style.display = 'none'; // Nasconde i risultati se la query è vuota
      return;
    }

    try {
      console.log("Eseguo la ricerca...");
      // Effettua la richiesta all'API di Deezer
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      // Filtra i risultati per tracce e album
      const filteredTracks = data.data.filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase())
      );
      const filteredAlbums = data.data.filter(result => 
        result.album.title.toLowerCase().includes(query.toLowerCase())
      );

      // Mostra i risultati combinati (tracce e album)
      if (filteredTracks.length === 0 && filteredAlbums.length === 0) {
        searchResults.innerHTML = '<p>Nessun risultato trovato.</p>';
        searchResults.style.display = 'block'; // Mostra i risultati anche se non ci sono match
      } else {
        displayResults([...filteredTracks, ...filteredAlbums]); // Unisce tracce e album
      }
    } catch (error) {
      console.error('Errore durante la ricerca:', error);
      searchResults.innerHTML = '<p>Errore durante la ricerca. Riprova.</p>';
      searchResults.style.display = 'block'; // Mostra il messaggio di errore
    }
  }

  // Funzione per mostrare i risultati
  function displayResults(results) {
    searchResults.style.display = 'block'; // Mostra i risultati se ci sono

    searchResults.innerHTML = ''; // Pulisci i risultati precedenti

    if (results.length === 0) {
      searchResults.innerHTML = '<p>Nessun risultato trovato.</p>';
      return;
    }

    // Aggiungi ogni risultato alla lista
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.style.display = 'flex';
      resultItem.style.alignItems = 'center';
      resultItem.style.marginBottom = '10px';

      // Determina se è una traccia o un album
      const isTrack = result.type === 'track';

      // Immagine (per tracce o album)
      const img = document.createElement('img');
      img.src = isTrack ? result.artist.picture_small : result.album.cover_small;
      img.alt = isTrack ? `${result.artist.name} Picture` : `${result.album.title} Cover`;
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.marginRight = '10px';
      img.style.borderRadius = '5px';

      // Dettagli del risultato
      const details = document.createElement('div');
      details.style.display = 'flex';
      details.style.flexDirection = 'column';

      // Visualizza il titolo e la tipologia (Traccia o Album)
      const title = document.createElement('p');
      title.textContent = `${result.title} (${isTrack ? 'Traccia' : 'Album'})`;
      title.style.margin = '0';
      title.style.color = 'white';
      title.style.fontSize = '14px';

      const version = document.createElement('p');
      version.textContent = `Artista: ${isTrack ? result.artist.name : 'N/A'}`;
      version.style.margin = '0';
      version.style.color = 'gray';
      version.style.fontSize = '12px';

      // Append dei dettagli e immagine
      details.appendChild(title);
      details.appendChild(version);
      resultItem.appendChild(img);
      resultItem.appendChild(details);

      // Event listener al click
      resultItem.addEventListener('click', () => {
        alert(`Hai selezionato: ${result.title} di ${isTrack ? result.artist.name : result.album.title}`);
      });

      // Aggiungi il risultato alla lista
      searchResults.appendChild(resultItem);
    });
  }

  // Event listener sull'input
  input.addEventListener('input', (e) => {
    const query = e.target.value.trim();

    // Controlla se la search bar è vuota o contiene solo il placeholder
    if (query === "") {
      searchResults.style.display = 'none'; // Nasconde i risultati se non c'è nulla scritto
    } else {
      searchMusic(query); // Chiama la funzione di ricerca
    }
  });

  // Event listener sul focus per gestire caso di placeholder vuoto
  input.addEventListener('focus', () => {
    // Se la barra è vuota e ha solo il placeholder, nascondi i risultati
    if (!input.value.trim()) {
      input.focus();
      searchResults.style.display = 'block';
    }
  });
}

// Evento per aggiungere la barra di ricerca quando si clicca sull'icona di ricerca
const searchIcon = document.querySelector(".search");
if (searchIcon) {
  searchIcon.addEventListener("click", insertSearchBar);
}


"use strict";

const songsContainer = document.getElementById("buonasera-collection");
const playlistsContainer = document.getElementById("player-card-container");
const spinnerSongs = document.querySelector(".spinner-0");
const spinnerAlbums = document.querySelector(".spinner-1");

const homePageApp = new HomePage({
	songsContainer,
	playlistsContainer,
	spinnerSongs,
	spinnerAlbums,
});

homePageApp.populateSongs(
	"gemitaiz",
	"marracash",
	"salmo",
	"punkrock",
	"defcon1",
	"fuck",
);

homePageApp.populateAlbums(
	"gemitaiz",
	"marracash",
	"salmo",
	"punkrock",
	"defcon1",
);

// COLOR

// const colorThief = new ColorThief();
// const img = document.querySelector("img");

// Make sure image is finished loading
if (img.complete) console.log(colorThief.getColor(img));
else
	image.addEventListener("load", function () {
		console.log(colorThief.getColor(img));
	});
