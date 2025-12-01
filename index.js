if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/PWA-FINAL/sw.js")
  .then(res => console.log("SW registrado:", res))
  .catch(err => console.log("Erro ao registrar SW:", err));
}
