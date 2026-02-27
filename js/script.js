//Include ///////////////////////////////////////////////////////////////////////////////
//Test de chargement
async function loadInto(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Impossible de charger ${url}`);
  el.innerHTML = await res.text();
}


// Inclusion de header/footer
document.addEventListener("DOMContentLoaded", async () => {
  const inHtmlFolder = location.pathname.includes("/html/");
  const base = inHtmlFolder ? "partials/" : "html/partials/";

  try {
    await loadInto("#navbarindex", base + "indexNavbar.html");
    await loadInto("#navbar", base + "navbar.html");
    await loadInto("#footer", base + "footer.html");
  } catch (e) {
    console.error(e);
  }
});



// EmailJS
window.sendEmail = function () {
  const form = document.getElementById("contactForm");

  if (!form.checkValidity()) {
    alert("Veuillez remplir tous les champs requis.");
    return;
  }

  const emailParams = {
    nom: document.getElementById("nom").value,
    email: document.getElementById("email").value,
    telephone: document.getElementById("telephone").value,
    entreprise: document.getElementById("entreprise").value,
    poste: document.getElementById("poste").value,
    message: document.getElementById("message").value,
    to_email: "lambert.noah@lycee-saintdenis.com"
  };

  emailjs.send("service_t9n0r99", "template_tm8urmr", emailParams, "GpONeU1BAYKvEK-4N")
    .then(() => {
      alert("Email envoyé avec succès !");
      form.reset();
    })
    .catch((error) => {
      alert("Échec de l'envoi de l'email.");
      console.error("EmailJS error:", error);
    });
};


/* Redirection sans .html */
(function cleanUrlRedirect() {
  const path = location.pathname;

  if (path.endsWith(".html") || path.includes(".")) return;
  const slug = path.replace(/\/+$/, "").split("/").pop();

  const routes = {
    "projet": "projet.html",
    "projets": "projet.html",
    "veille": "veille.html",
    "competence": "competence.html",
    "competences": "competence.html",
    "contact": "contact.html",
    "accueil": "index.html"
  };

  if (!routes[slug]) return;

  const inHtmlFolder = location.pathname.includes("/html/");
  const base = inHtmlFolder ? "" : "html/";

  location.replace("/" + base + routes[slug]);

})();


// ==============================
// LIGHTBOX (CORRECTION ICI)
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".zoomable");
  if (!images.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";

  const img = document.createElement("img");
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  images.forEach((image) => {
    image.addEventListener("click", () => {
      img.src = image.src;
      overlay.classList.add("active");
    });
  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

});