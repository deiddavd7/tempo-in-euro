let euroOra = 0;
let secondi = 0;
let timer = null;
let attivo = false;

const tempoSpan = document.getElementById("tempo");
const totaleSpan = document.getElementById("totale");
const euroInput = document.getElementById("euroOra");
const toggleBtn = document.getElementById("toggleBtn");
const resetBtn = document.getElementById("resetBtn");

// Carica da localStorage all'avvio
if (localStorage.getItem("secondi")) {
  secondi = parseInt(localStorage.getItem("secondi"));
  euroOra = parseFloat(localStorage.getItem("euroOra")) || 0;
  euroInput.value = euroOra;
  aggiornaDisplay();
}

// Calcola e aggiorna il display
function aggiornaDisplay() {
  const minuti = Math.floor(secondi / 60);
  const sec = secondi % 60;
  tempoSpan.textContent = `${String(minuti).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  const euroSecondo = euroOra / 3600;
  const guadagno = euroSecondo * secondi;
  totaleSpan.textContent = guadagno.toFixed(2);
}

// Aumenta tempo ogni secondo e salva in localStorage
function tick() {
  secondi++;
  localStorage.setItem("secondi", secondi);
  localStorage.setItem("euroOra", euroOra);
  aggiornaDisplay();
}

// Start/Stop
toggleBtn.addEventListener("click", () => {
  if (!attivo) {
    euroOra = parseFloat(euroInput.value) || 0;
    if (euroOra <= 0) {
      alert("Inserisci un valore valido in euro per ora.");
      return;
    }
    timer = setInterval(tick, 1000);
    toggleBtn.textContent = "⏸ Stop";
    attivo = true;
  } else {
    clearInterval(timer);
    toggleBtn.textContent = "▶ Start";
    attivo = false;
  }
});

// Reset totale
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  secondi = 0;
  attivo = false;
  toggleBtn.textContent = "▶ Start";
  euroOra = parseFloat(euroInput.value) || 0;
  localStorage.removeItem("secondi");
  localStorage.removeItem("euroOra");
  aggiornaDisplay();
});

// PWA: registra il service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {
    console.log('Service Worker registrato!');
  });
}

