const GenPlayList = function (genere) {
  const SongsUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${genere}`
  fetch(SongsUrl)
    .then((result) => {
      console.log('risposta', result)
      if (result.ok) {
        return result.json()
      } else {
        throw new Error("C'è un errore nella chiamata")
      }
    })
    .then((playlist) => {
      console.log('canzoni recuperate', playlist.data)
      arrayOfSongs = playlist.data

      const playListSection = document.getElementById('player-card-container')
      playListSection.innerHTML = `
      <div
              class="col col-12 col-md-6 p-3 p-lg-2 col-lg-4 col-xxl d-flex flex-column"
            >
              <div class="rounded-4 mt-3 sfondo-card">
                <div class="pb-md-3">
                  <div class="d-flex flex-md-column p-3 pb-0 ">
                    <div class="mb-3 me-3 me-md-0 d-flex flex-column ">
                     <div class="d-flex rounded rounded-4">
                      <img
                        src="${arrayOfSongs[0].album.cover_medium}"
                        class="w-50"
                        alt="..."
                      />
                      <img
                        src="${arrayOfSongs[1].album.cover_medium}"
                        class="w-50 "
                        alt="..."
                      />
                      </div>
                      <div class="d-flex rounded-4">
                      <img
                        src="${arrayOfSongs[2].album.cover_medium}"
                        class="w-50"
                        alt="..."
                      />
                      <img
                        src="${arrayOfSongs[3].album.cover_medium}"
                        class="w-50 "
                        alt="..."
                      />
                      </div>
                      
                    </div>
                    <div class="col-6 text-white">
                      <div class="card-body">
                        <h5 class="opacity-50 fw-light">Playlist</h5>
                        <p class="card-text fw-bold">Study and work space</p>
                      </div>
                    </div>
                  </div>
                </div>
                <section
                  class="d-flex justify-content-between align-items-center p-3 pt-0 p-lg-2"
                >
                  <div>
                    <i class="fas fa-heart"></i
                    ><i class="fas fa-ellipsis-v"></i>
                  </div>
                  <div class="d-flex align-items-center">
                    <p class="m-0 d-lg-none">n°brani js</p>
                    <i class="fas fa-play-circle"></i>
                  </div>
                </section>
              </div>
            </div>
      `
    })
    .catch((err) => console.log('Qualcosa non va:', err))
}

GenPlayList('queen')
