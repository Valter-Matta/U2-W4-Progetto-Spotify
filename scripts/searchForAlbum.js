// Seleziona il contenitore tra i due div
const searchContainer = document.querySelector("#search-container");

// Funzione per creare e inserire la barra di ricerca
function insertSearchBar() {
  // Evita di aggiungere una nuova barra se già esiste
  if (document.getElementById('search-bar')) return;

  const searchBar = document.createElement('div');
  searchBar.id = 'search-bar';
  searchBar.style.margin = '15px 0';
  searchBar.style.backgroundColor = '#121212';
  searchBar.style.borderRadius = '5px';
  searchBar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.3)';

  const input = document.createElement('input');
  input.id = 'search-input';
  input.type = 'text';
  input.placeholder = 'Cerca qualcosa...';
  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.border = 'none';
  input.style.borderRadius = '5px';
  input.style.fontSize = '16px';
  input.style.fontFamily = '"Spotify Circular", sans-serif';
  input.style.backgroundColor = '#1B1B1B';
  input.style.color = 'white';
  input.style.outline = 'none';
  searchBar.appendChild(input);

  const searchResults = document.createElement('div');
  searchResults.id = 'search-results';
  searchResults.style.display = 'none'
  searchResults.style.maxHeight = '300px'; // Limita l'altezza dei risultati
searchResults.style.overflowY = 'auto';;
  searchBar.appendChild(searchResults);

  // Inserisci la barra di ricerca nel contenitore
  searchContainer.appendChild(searchBar);

  input.focus();

  async function searchMusic(query) {
    if (!query) {
      searchResults.style.display = 'none';
      return;
    }

    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      const filteredTracks = data.data.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredTracks.length === 0) {
        searchResults.innerHTML = '<p>Nessun risultato trovato.</p>';
        searchResults.style.display = 'block';
      } else {
        displayResults(filteredTracks);
      }
    } catch (error) {
      console.error('Errore durante la ricerca:', error);
      searchResults.innerHTML = '<p>Errore durante la ricerca. Riprova.</p>';
      searchResults.style.display = 'block';
    }
  }

  function displayResults(results) {
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';

    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.style.display = 'flex';
      resultItem.style.alignItems = 'center';
      resultItem.style.marginBottom = '10px';

      const img = document.createElement('img');
      img.src = result.album.cover_small;
      img.alt = `${result.album.title} Cover`;
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.marginRight = '10px';
      img.style.borderRadius = '5px';

      const details = document.createElement('div');
      details.style.display = 'flex';
      details.style.flexDirection = 'column';

      const title = document.createElement('p');
      title.textContent = result.title;
      title.style.margin = '0';
      title.style.color = 'white';

      details.appendChild(title);
      resultItem.appendChild(img);
      resultItem.appendChild(details);
      searchResults.appendChild(resultItem);
    });
  }

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query === "") {
      searchResults.style.display = 'none';
    } else {
      searchMusic(query);
    }
  });
}

// Aggiungi l'event listener sull’icona per attivare la barra di ricerca
const searchIcon = document.querySelector(".search");
console.log(searchIcon)
if (searchIcon) {
    console.log("ciato a tutti")
  searchIcon.addEventListener("click", insertSearchBar);
}
