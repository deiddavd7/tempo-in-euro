let euroMinuto = 0;
let secondi = 0;
let timer = null;
let attivo = false;


const tempoSpan = document.getElementById("tempo");
const totaleSpan = document.getElementById("totale");
const euroInput = document.getElementById("euroMinuto");
const toggleBtn = document.getElementById("toggleBtn");
const resetBtn = document.getElementById("resetBtn"); // <-- AGGIUNTO QUI

toggleBtn.addEventListener("click", () => {
  // codice per start/stop
});


function aggiornaDisplay() {
  const minuti = Math.floor(secondi / 60);
  const sec = secondi % 60;
  tempoSpan.textContent = `${String(minuti).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  const euroSecondo = euroMinuto / 60;
  const guadagno = euroSecondo * secondi;
  totaleSpan.textContent = guadagno.toFixed(2);
}

function tick() {
  secondi++;
  aggiornaDisplay();
}

toggleBtn.addEventListener("click", () => {
  if (!attivo) {
    euroMinuto = parseFloat(euroInput.value) || 0;
    if (euroMinuto <= 0) {
      alert("Inserisci un valore valido in euro per minuto.");
      return;
    }
    timer = setInterval(tick, 1000);
    toggleBtn.textContent = "Stop";
    attivo = true;
  } else {
    clearInterval(timer);
    toggleBtn.textContent = "Start";
    attivo = false;
  }
});

// 👇 AGGIUNGI QUESTO SUBITO SOTTO
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  secondi = 0;
  attivo = false;
  toggleBtn.textContent = "Start";
  euroMinuto = parseFloat(euroInput.value) || 0;
  aggiornaDisplay();
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('Service Worker registrato!');
  });
}
