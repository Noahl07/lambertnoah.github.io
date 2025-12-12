function includeHTML(selector, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur chargement ${file}`);
      }
      return response.text();
    })
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML("#navbar", "partials/indexNavbar.html");
  includeHTML("#navbar", "partials/navbar.html");
  includeHTML("#footer", "partials/footer.html");
});
