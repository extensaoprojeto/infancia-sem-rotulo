const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const url = window.location.href;
const qr = document.getElementById("qrcode");
const qrUrl = document.getElementById("qr-url");

if (qr && window.QRCode) {
  new QRCode(qr, {
    text: url,
    width: 180,
    height: 180,
    colorDark: "#262626",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  qrUrl.textContent = url;
} else if (qr) {
  qr.innerHTML = '<p style="font-size:.85rem;color:#68645D;margin:0">Abra o link pelo botão abaixo para compartilhar.</p>';
  qrUrl.textContent = url;
}

document.getElementById("copy-link")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    const btn = document.getElementById("copy-link");
    const old = btn.textContent;
    btn.textContent = "Link copiado!";
    setTimeout(() => btn.textContent = old, 1600);
  } catch {
    alert("Não foi possível copiar automaticamente. Copie o endereço da página pelo navegador.");
  }
});
