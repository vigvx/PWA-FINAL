index
if ("serviceWorker" in navigator) {
    console.log("Service Worker is supported");
navigator.serviceWorker
.then(objtQueRepORegistro =>
    console.log(objtQueRepORegistro)
);
    
}else {
   alert("Service Worker is not supported");
}
