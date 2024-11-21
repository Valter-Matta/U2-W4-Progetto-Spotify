const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

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
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();

  // Controlla se la search bar è vuota o contiene solo il placeholder
  if (query === "") {
    searchResults.style.display = 'none'; // Nasconde i risultati se non c'è nulla scritto
  } else {
    searchMusic(query); // Chiama la funzione di ricerca
  }
});

// Event listener sul focus per gestire caso di placeholder vuoto
searchInput.addEventListener('focus', () => {
  // Se la barra è vuota e ha solo il placeholder, nascondi i risultati
  if (!searchInput.value.trim()) {
    searchInput.focus();
    searchResults.style.display = 'none';
  }
});

