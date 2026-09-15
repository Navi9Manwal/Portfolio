let certificates = [];

// Fetch data from certificate.json (singular, matching your screenshot)
async function loadCertificates() {
  try {
    const response = await fetch("certificate.json");
    if (!response.ok) throw new Error("Failed to load JSON data");
    
    certificates = await response.json();
    renderGrid(certificates);
  } catch (error) {
    console.error("Error loading certificates:", error);
    const grid = document.getElementById("portfolio-grid");
    if (grid) {
      grid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--danger-color, #ff4d4d);">// ERROR: UNABLE TO FETCH CERTIFICATE DATABASE. MAKE SURE YOU ARE RUNNING A LOCAL SERVER (LIKE VS CODE LIVE SERVER).</div>`;
    }
  }
}

// Render Certificate Cards
function renderGrid(list = certificates) {
  const grid = document.getElementById("portfolio-grid");
  const countLabel = document.getElementById("cert-count-num");
  if (!grid) return;

  grid.innerHTML = "";

  if (countLabel) {
    countLabel.textContent = list.length;
  }

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-muted);">// NO MATCHING CERTIFICATE RECORDS FOUND.</div>`;
    return;
  }

  list.forEach((cert, index) => {
    const card = document.createElement("div");
    card.className = "cert-card";
    const recordNum = String(index + 1).padStart(2, '0');
    
    card.innerHTML = `
      <div>
        <div class="cert-img-wrap" onclick="openImageViewer('${escapeHTML(cert.image)}', '${escapeHTML(cert.title)}')">
          <img src="${escapeHTML(cert.image)}" alt="${escapeHTML(cert.title)}" loading="lazy">
        </div>
        <div class="cert-meta">/07.${recordNum} RECORD_ID</div>
        <div class="cert-title">${escapeHTML(cert.title)}</div>
        <div class="cert-issuer">ISSUED BY: ${escapeHTML(cert.issuer)}</div>
      </div>
      <div class="cert-actions">
        <button class="btn-outline" style="flex:1;" onclick="openImageViewer('${escapeHTML(cert.image)}', '${escapeHTML(cert.title)}')">View Image</button>
        ${cert.verifyLink && cert.verifyLink !== '#' ? `<a href="${escapeHTML(cert.verifyLink)}" target="_blank" class="btn-primary">Verify ↗</a>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });
}

// Live Search Filter
function filterCertificates() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = certificates.filter(cert => 
    cert.title.toLowerCase().includes(query) || 
    cert.issuer.toLowerCase().includes(query)
  );
  renderGrid(filtered);
}

// Modal Lightbox Controls
function openImageViewer(src, title) {
  const img = document.getElementById("viewerImage");
  const caption = document.getElementById("viewerCaption");
  const modal = document.getElementById("imageViewerModal");
  if (img && caption && modal) {
    img.src = src;
    caption.textContent = `RECORD_PREVIEW // ${title.toUpperCase()}`;
    modal.classList.add("active");
  }
}

function closeImageViewer() {
  const modal = document.getElementById("imageViewerModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

// Close Modal on Escape Key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeImageViewer();
});

// HTML Escaping Helper
function escapeHTML(str) {
  return String(str || '')
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Initialize on Document Ready
document.addEventListener("DOMContentLoaded", loadCertificates);