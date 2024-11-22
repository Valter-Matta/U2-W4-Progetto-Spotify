function getAllTitoliArtistiWithDelay() {
    return new Promise((resolve, reject) => {
      const checkInterval = setInterval(() => {
        const titoloArtisti = document.querySelectorAll('.titoloartista');
  
        // Controlla se ci sono 6 elementi
        if (titoloArtisti.length === 6) {
          clearInterval(checkInterval); // Ferma il controllo quando ci sono 6 elementi
          const artistiArray = Array.from(titoloArtisti).map(el => el.textContent);
  
          // Aggiungi un event listener di click a ciascun elemento trovato
          titoloArtisti.forEach(el => {
            el.addEventListener('click', () => {
              const artistaName = el.textContent.trim();
              localStorage.setItem('artistName', artistaName);
              const artistPageUrl = `/artist.html?&artist=${encodeURIComponent(artistaName)}`;
              window.location.href = artistPageUrl; // Redirige alla tua pagina dell'artista
            });
          });
  
          resolve(artistiArray); // Restituisce l'array degli artisti
        }
      }, 100); // Controlla ogni 100ms se gli elementi sono presenti
    });
  }
  
  // Uso della funzione
  getAllTitoliArtistiWithDelay().then(artistiArray => {
    console.log(artistiArray); // Qui vedrai i 6 artisti
  }).catch(err => {
    console.error('Errore:', err);
  });
  