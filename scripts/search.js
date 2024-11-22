// Seleziona il div che contiene il titolo "Buonasera" e il successivo ul
const buonaseraDiv = document.querySelector("#buonasera-collection .header");
const buonaseraUl = document.querySelector("#buonasera-collection ul");

// Funzione per creare e inserire la barra di ricerca
function insertSearchBar() {
  if (document.getElementById('search-bar')) return;

  const playlistSection = document.querySelector(".playlist-section");
  if (playlistSection) {
    playlistSection.style.height = "calc(97vh - 270px)";
  }

  const searchBar = document.createElement('div');
  searchBar.id = 'search-bar';
  searchBar.style.margin = '20px 0';
  searchBar.style.padding = '10px';
  searchBar.style.backgroundColor = '#121212';
  searchBar.style.borderRadius = '5px';
  searchBar.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.3)';

  const input = document.createElement('input');
  input.id = 'search-input';
  input.type = 'text';
  input.placeholder = 'Cerca qualcosa...';
  input.style.width = '100%';
  input.style.padding = '10px';
  input.style.paddingRight = '2em';
  input.style.paddingLeft = '1em';
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
  searchResults.style.display = 'none';
  searchBar.appendChild(searchResults);

  if (buonaseraUl) {
    buonaseraUl.parentNode.insertBefore(searchBar, buonaseraUl);
  }

  input.focus();

  document.addEventListener("click", function handleClickOutside(e) {
    if (!searchBar.contains(e.target) && e.target !== document.querySelector(".search")) {
      searchBar.remove();
      if (playlistSection) {
        playlistSection.style.height = "";
      }
      document.removeEventListener("click", handleClickOutside);
    }
  });

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
      const filteredAlbums = data.data.filter(result =>
        result.album.title.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredTracks.length === 0 && filteredAlbums.length === 0) {
        searchResults.innerHTML = '<p>Nessun risultato trovato.</p>';
        searchResults.style.display = 'block';
      } else {
        displayResults([...filteredTracks, ...filteredAlbums]);
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

    if (results.length === 0) {
      searchResults.innerHTML = '<p>Nessun risultato trovato.</p>';
      return;
    }

    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.style.display = 'flex';
      resultItem.style.alignItems = 'center';
      resultItem.style.marginBottom = '10px';

      const isTrack = result.type === 'track';

      const img = document.createElement('img');
      img.src = isTrack ? result.artist.picture_small : result.album.cover_small;
      img.alt = isTrack ? `${result.artist.name} Picture` : `${result.album.title} Cover`;
      img.style.width = '50px';
      img.style.height = '50px';
      img.style.marginRight = '10px';
      img.style.borderRadius = '5px';

      const details = document.createElement('div');
      details.style.display = 'flex';
      details.style.flexDirection = 'column';

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

      details.appendChild(title);
      details.appendChild(version);
      resultItem.appendChild(img);
      resultItem.appendChild(details);

      resultItem.addEventListener('click', () => {
        alert(`Hai selezionato: ${result.title} di ${isTrack ? result.artist.name : result.album.title}`);
      });

      searchResults.appendChild(resultItem);
    });
  }

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query === "") {
      searchResults.style.display = 'none';
    } else {
        console.log("ciao a tutti")
      searchMusic(query);
    }
  });
}

const searchIcon = document.querySelector(".search");
if (searchIcon) {
  searchIcon.addEventListener("click", insertSearchBar);
}
