





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
  const inHtmlFolder = location.pathname.includes("/html/", "/html/projet/", "/html/veille/");
  const base = inHtmlFolder ? "partials/" : "html/partials/";

  try {
    await loadInto("#navbarindex", base + "indexNavbar.html");
    await loadInto("#navbar", base + "navbar.html");
    await loadInto("#footer", base + "footer.html");
  } catch (e) {
    console.error(e);
  }
});
