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

  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;

  // Accessibilité : si l'utilisateur préfère réduire les animations
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const ctx = canvas.getContext("2d");

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const chars = "01#@&$%*+";
  const fontSize = 16;
  let columns = Math.floor(canvas.clientWidth / fontSize);
  let drops = Array(columns).fill(0);

  function tick() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // fond légèrement transparent pour la traînée
    ctx.fillStyle = "rgba(0,0,0,0.10)";
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px monospace`;
    ctx.fillStyle = "rgba(86, 190, 100, 0.85)"; // ton vert theme

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      // reset aléatoire en bas (lent + discret)
      if (y > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }

    requestAnimationFrame(tick);
  }

  // recalcul colonnes au resize
  window.addEventListener("resize", () => {
    columns = Math.floor(canvas.clientWidth / fontSize);
    drops = Array(columns).fill(0);
  });

  tick();

});