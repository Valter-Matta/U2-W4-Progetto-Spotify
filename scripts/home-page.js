const GenBuonaseraplaylist = function (genere, description, num) {
  const SongsUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${genere}`
  fetch(SongsUrl)
    .then((result) => {
      // console.log('risposta', result)
      if (result.ok) {
        return result.json()
      } else {
        throw new Error("C'è un errore nella chiamata")
      }
    })
    .then((buonaseraPlaylist) => {
      // genero le cards in buonasera
      console.log(`canzoni:${genere}`, buonaseraPlaylist.data)
      arrayOfSongs = buonaseraPlaylist.data
      const buonaseraSection = document.getElementById('buonasera-collection')
      const newDiv = document.createElement('div')
      newDiv.classList.add(
        'col',
        'col-6',
        'col-md-4',
        'p-0',
        'd-flex',
        'align-items-center'
      )
      newDiv.innerHTML = `
          <div class="d-flex align-items-center mx-3 sfondo w-100">
            <img
              class="rounded-start-2"
              src="${arrayOfSongs[num].album.cover_medium}"
              width="80px"
              alt=""
            />
            <div>
            <p class="px-2 m-0 fw-bold">${arrayOfSongs[num].artist.name}</p>
            <p class="px-2 m-0 fw-lighter">${description}</p>
            </div>
          </div>
          `
      document.querySelector('section .spinner-border').classList.add('d-none')
      buonaseraSection.appendChild(newDiv)
    })
}

GenBuonaseraplaylist('gemitaiz', 'Quello che vi consiglio', 1)
GenBuonaseraplaylist('marracash', 'Sabbie mobili', 9)
GenBuonaseraplaylist('salmo', 'Stupido gioco del Rap', 8)
GenBuonaseraplaylist('punkrock', 'lalalala', 1)
GenBuonaseraplaylist('defcon1', 'Australia 2014', 1)
GenBuonaseraplaylist('fuck', 'Fuck Up Friendship', 1)

const GenPlayList = function (genere, description) {
  const SongsUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${genere}`
  fetch(SongsUrl)
    .then((result) => {
      // console.log('risposta', result)
      if (result.ok) {
        return result.json()
      } else {
        throw new Error("C'è un errore nella chiamata")
      }
    })
    .then((playlist) => {
      // console.log(`canzoni:${genere}`, playlist.data)
      arrayOfSongs = playlist.data

      // genero le playlist cards
      const playListSection = document.getElementById('player-card-container')
      const newCol = document.createElement('div')
      newCol.classList.add(
        'col',
        'col-12',
        'col-md-6',
        'p-3',
        'p-lg-2',
        'col-lg-4',
        'col-xxl',
        'd-flex',
        'flex-column',
        'justify-content-center',
        'm-0'
      )
      newCol.innerHTML = `
        <div class="rounded-4 sfondo-card h-100">
          <div class="pb-md-3">
            <div class="d-flex flex-md-column p-3 pb-0 ">
              <div class="mb-3 me-3 me-md-0 d-flex flex-column rounded rounded-3 overflow-hidden ">
                <div class="d-flex w-100">
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
              <div class="col-6 text-white w-100">
                <div class="card-body">
                  <h5 class="opacity-50 fw-light">
                    Playlist <span>${arrayOfSongs[0].artist.name}</span>
                  </h5>
                  <p class="card-text fw-bold">${description}</p>
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
              <p class="m-0 d-lg-none">${arrayOfSongs.length} Brani</p>
              <i class="fas fa-play-circle"></i>
            </div>
          </section>
        </div>`

      document.querySelector('article .spinner-border').classList.add('d-none')
      playListSection.appendChild(newCol)
    })

    .catch((err) => console.log('Qualcosa non va:', err))
}

GenPlayList('queen', 'The story of the Queen')
GenPlayList('anime', 'Best Anime AMV Songs ')
GenPlayList('imagine dragons', 'Only for Believers...')
GenPlayList('asmr', 'Fai la Nanna Sereno')
GenPlayList('indie', 'Indie Music Awards')