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



// Funzione per creare e inserire la barra di ricerca
function insertSearchBar() {
    // Controlla se la barra di ricerca esiste già
    if (document.getElementById('search-bar')) return;
  
    // Seleziona la posizione dove inserire la barra di ricerca
    const targetSection = document.querySelector('.mt-3'); // Modifica il selettore in base alla tua struttura HTML
    if (!targetSection) {
      console.error('Sezione target non trovata!');
      return;
    }
  
    // Crea un contenitore per la barra di ricerca
    const searchBarContainer = document.createElement('div');
    searchBarContainer.id = 'search-bar';
    searchBarContainer.style.margin = '20px 0'; // Margine sopra e sotto
    searchBarContainer.style.padding = '10px'; // Padding interno
    searchBarContainer.style.backgroundColor = '#121212'; // Colore di sfondo
    searchBarContainer.style.borderRadius = '5px'; // Angoli arrotondati
    searchBarContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.3)'; // Ombra
  
    // Crea un input di ricerca
    const input = document.createElement('input');
    input.id = 'search-input'; // Assicurati di dare un ID all'input
    input.type = 'text';
    input.placeholder = 'Cerca qualcosa...';
    input.style.width = '100%';
    input.style.padding = '10px';
    input.style.border = 'none';
    input.style.borderRadius = '5px';
    input.style.fontSize = '16px';
    input.style.fontFamily = '"Spotify Circular", sans-serif'; // Font personalizzato
    input.style.backgroundColor = '#1B1B1B';
    input.style.color = 'white';
    input.style.outline = 'none';
  
    // Aggiungi l'input al contenitore della barra di ricerca
    searchBarContainer.appendChild(input);
  
    // Crea un elemento per i risultati della ricerca
    const searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    searchResults.style.display = 'none'; // Nascondi i risultati inizialmente
    searchResults.style.marginTop = '10px'; // Margine per separare i risultati dall'input
    searchResults.style.padding = '10px';
    searchResults.style.backgroundColor = '#1B1B1B';
    searchResults.style.borderRadius = '5px';
    searchResults.style.color = 'white';
  
    // Aggiungi i risultati al contenitore della barra di ricerca
    searchBarContainer.appendChild(searchResults);
  
    // Inserisci la barra di ricerca dopo la sezione target
    targetSection.parentNode.insertBefore(searchBarContainer, targetSection.nextSibling);
  
    // Focus automatico sull'input
    input.focus();
  
    // Rimuovi la barra di ricerca cliccando fuori
    document.addEventListener("click", function handleClickOutside(e) {
      if (!searchBarContainer.contains(e.target) && e.target !== document.querySelector(".search")) {
        searchBarContainer.remove();
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
  
        // Mostra i risultati
        displayResults(data.data);
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
  
        // Immagine
        const img = document.createElement('img');
        img.src = result.album.cover_small;
        img.alt = result.title;
        img.style.width = '50px';
        img.style.height = '50px';
        img.style.marginRight = '10px';
        img.style.borderRadius = '5px';
  
        // Dettagli del risultato
        const details = document.createElement('div');
        details.style.display = 'flex';
        details.style.flexDirection = 'column';
  
        const title = document.createElement('p');
        title.textContent = result.title;
        title.style.margin = '0';
        title.style.color = 'white';
        title.style.fontSize = '14px';
  
        const artist = document.createElement('p');
        artist.textContent = result.artist.name;
        artist.style.margin = '0';
        artist.style.color = 'gray';
        artist.style.fontSize = '12px';
  
        details.appendChild(title);
        details.appendChild(artist);
        resultItem.appendChild(img);
        resultItem.appendChild(details);
  
        resultItem.addEventListener('click', () => {
          alert(`Hai selezionato: ${result.title} di ${result.artist.name}`);
        });
  
        searchResults.appendChild(resultItem);
      });
    }
  
    // Event listener sull'input
    input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
  
      if (!query) {
        searchResults.style.display = 'none'; // Nasconde i risultati se non c'è nulla scritto
      } else {
        searchMusic(query); // Chiama la funzione di ricerca
      }
    });
  }
  
  // Evento per aggiungere la barra di ricerca quando si clicca sull'icona di ricerca
  const searchIcon = document.querySelector(".search");
  if (searchIcon) {
    searchIcon.addEventListener("click", insertSearchBar);
  }
  






 // Estrai i parametri dalla query string
const urlParams = new URLSearchParams(window.location.search);

// Ottieni il valore del parametro 'artist'
const artistNameFromURL = urlParams.get('artist');

// Salva il valore in una costante
console.log("Nome dell'artista dalla URL:", artistNameFromURL);

// URL per ottenere i dati dell'artista
const url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${encodeURIComponent(artistNameFromURL)}`;

console.log("URL per ottenere i dati dell'artista:", url);

// Funzione per creare una riga della canzone
const rowSample = ({ index, title, artist, views, duration }) => `
  <div class="table-row d-flex p-3 justify-content-between align-items-center" data-index="${index}">
    <div class="d-flex align-items-center w-50">
      <span class="index-column pe-3 d-none d-lg-inline-block">${index}</span>
      <div class="d-flex flex-column ps-2 justify-content-start align-items-start spans-4">
        <span>${title}</span>
        <span>${artist}</span>
      </div>
    </div>
    <span class="w-25 text-end d-none d-lg-inline-block">${views}</span>
    <span class="w-25 text-end d-none d-lg-inline-block">${duration}</span>
    <span class="w-25 text-end d-lg-none fs-3">
      <i class="bi bi-three-dots-vertical px-2 px-md-4 px-lg-3 order-lg-2"></i>
    </span>
  </div>
`;

fetch(url) // URL da dove recuperiamo i dati dell'artista
  .then(response => response.json())  // Risposta JSON
  .then(data => {
    if (data) {
      // Salviamo i dati in costanti
      const artistId = data.id;
      const artistName = data.name;
      const artistLink = data.link;
      const artistImage = data.picture_big; // Immagine di dimensione grande
      const artistAlbumsCount = data.nb_album;
      const artistFansCount = data.nb_fan;
      const artistTracklist = data.tracklist;

      // Stampa i dati nella console (per verifica)
      console.log("Artist ID:", artistId);
      console.log("Artist Name:", artistName);
      console.log("Artist Link:", artistLink);
      console.log("Artist Image:", artistImage);
      console.log("Artist Albums Count:", artistAlbumsCount);
      console.log("Artist Fans Count:", artistFansCount);
      console.log("Artist Tracklist:", artistTracklist);

      // Impostiamo dinamicamente l'immagine di sfondo per .SezioneArtista
      document.querySelector(".uniresection").style.backgroundImage = `url(${artistImage})`;
      document.querySelector(".nomeartista").innerHTML = artistName;
      document.querySelector(".nbfan").innerHTML = artistFansCount.toLocaleString() + " ascoltatori mensili";
      
      // Recupera la tracklist (canzoni) dell'artista
      fetch(artistTracklist)
        .then(response => response.json())
        .then(trackData => {
          if (trackData && trackData.data) {
            // Genera la lista delle canzoni
            const trackListContainer = document.querySelector(".tracklist-container"); // Assicurati di avere un contenitore per la tracklist
            trackData.data.forEach((track, index) => {
              const trackHTML = rowSample({
                index: index + 1, // Indice canzone
                title: track.title, // Titolo della canzone
                artist: track.artist.name, // Nome artista
                views: track.nb_playback, // Numero di visualizzazioni
                duration: new Date(track.duration * 1000).toISOString().substr(14, 5) // Durata in formato MM:SS
              });
              trackListContainer.innerHTML += trackHTML;
            });
          } else {
            console.log("Nessuna traccia trovata.");
          }
        })
        .catch(error => {
          console.log("Errore nel recupero della tracklist:", error);
        });
    } else {
      console.log("Artista non trovato.");
    }
  })
  .catch(error => {
    console.log("Errore:", error);
  });
