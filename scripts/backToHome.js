// Seleziona il bottone con l'id LiHome
const homeButton = document.querySelector(".TastoHome");

// Aggiungi l'event listener per il click
if (homeButton) {
  homeButton.addEventListener("click", () => {
    // Specifica l'URL della pagina a cui vuoi reindirizzare
    const targetURL = "./../../index.html"; // Sostituisci con il link desiderato
    window.location.href = targetURL;
  });
}
