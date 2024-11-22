// Seleziona il bottone con l'id LiHome
const homeButtonArtist = document.querySelector(".TastoHome");

// Aggiungi l'event listener per il click
if (homeButtonArtist) {
    homeButtonArtist.addEventListener("click", () => {
    // Specifica l'URL della pagina a cui vuoi reindirizzare
    const targetURL = "./../../index.html"; // Sostituisci con il link desiderato
    window.location.href = targetURL;
  });
}
