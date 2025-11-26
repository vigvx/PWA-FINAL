if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js", {
        scope: "./",
      })
      .then((registration) => {
        let serviceWorker;
  
        if (registration.installing) {
          serviceWorker = registration.installing;
          document.querySelector("#kind").textContent = "installing";
        } else if (registration.waiting) {
          serviceWorker = registration.waiting;
          document.querySelector("#kind").textContent = "waiting";
        } else if (registration.active) {
          serviceWorker = registration.active;
          document.querySelector("#kind").textContent = "active";
        }
  
        if (serviceWorker) {
          serviceWorker.addEventListener("statechange", (e) => {
            console.log("SW state changed to:", e.target.state);
            document.querySelector("#kind").textContent = e.target.state;
          });
        }
      })
      .catch((error) => {
        console.error("Erro ao registrar o Service Worker:", error);
      });
  } else {
    alert("Este navegador não suporta Service Worker.");
  }
  
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
})