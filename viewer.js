import * as pdfjsLib from "./vendor/pdfjs/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "./vendor/pdfjs/pdf.worker.min.mjs";

const documents = {
  strategy: { title: "Пример маркетинговой стратегии", file: "files/marketing-strategy.pdf" },
  research: { title: "Исследование целевой аудитории", file: "files/customer-research.pdf" },
  processes: { title: "Карта процессов отдела маркетинга", file: "files/process-map.pdf" },
  analytics: { title: "Пример маркетинговой аналитики", file: "files/marketing-analytics.pdf" },
  channels: { title: "Аналитика рекламных источников", file: "files/channel-analytics.pdf" },
  recommendation: { title: "Рекомендательное письмо · IDOL FACE", file: "files/recommendation-letter-idol-face.pdf" },
  recommendationStretch: { title: "Рекомендательное письмо · Stretch House", file: "files/recommendation-letter-stretch-house.pdf" }
};

const params = new URLSearchParams(window.location.search);
const selected = documents[params.get("doc")];
const canvas = document.querySelector("#pdf-canvas");
const context = canvas.getContext("2d", { alpha: false });
const status = document.querySelector("#viewer-status");
const title = document.querySelector("#document-title");
const pageInput = document.querySelector("#page-number");
const pageCount = document.querySelector("#page-count");
const prevButton = document.querySelector("#prev-page");
const nextButton = document.querySelector("#next-page");
const zoomOut = document.querySelector("#zoom-out");
const zoomIn = document.querySelector("#zoom-in");
const zoomValue = document.querySelector("#zoom-value");

let pdf = null;
let pageNumber = 1;
let scale = 1;
let rendering = false;

function syncControls() {
  pageInput.value = pageNumber;
  pageInput.max = pdf?.numPages || 1;
  pageCount.textContent = `из ${pdf?.numPages || "—"}`;
  prevButton.disabled = !pdf || pageNumber <= 1 || rendering;
  nextButton.disabled = !pdf || pageNumber >= pdf.numPages || rendering;
  zoomOut.disabled = rendering || scale <= 0.6;
  zoomIn.disabled = rendering || scale >= 2;
  zoomValue.textContent = `${Math.round(scale * 100)}%`;
}

async function renderPage() {
  if (!pdf || rendering) return;
  rendering = true;
  syncControls();
  status.hidden = false;
  status.textContent = `Открываем страницу ${pageNumber}…`;
  canvas.classList.remove("ready");

  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const availableWidth = Math.min(window.innerWidth - 32, 1180);
  const fitScale = Math.min(1.6, availableWidth / baseViewport.width);
  const viewport = page.getViewport({ scale: fitScale * scale });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(viewport.width * pixelRatio);
  canvas.height = Math.floor(viewport.height * pixelRatio);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  await page.render({ canvasContext: context, viewport, transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0] }).promise;
  status.hidden = true;
  canvas.classList.add("ready");
  rendering = false;
  syncControls();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function openDocument() {
  if (!selected) {
    title.textContent = "Документ не найден";
    status.textContent = "Вернитесь в портфолио и выберите материал ещё раз.";
    return;
  }

  title.textContent = selected.title;
  document.title = `${selected.title} | Анастасия Домород`;

  try {
    pdf = await pdfjsLib.getDocument({ url: selected.file, disableFontFace: false }).promise;
    await renderPage();
  } catch (error) {
    console.error(error);
    status.hidden = false;
    status.textContent = "Не удалось открыть документ. Попробуйте обновить страницу.";
  }
}

prevButton.addEventListener("click", () => { if (pageNumber > 1) { pageNumber -= 1; renderPage(); } });
nextButton.addEventListener("click", () => { if (pdf && pageNumber < pdf.numPages) { pageNumber += 1; renderPage(); } });
pageInput.addEventListener("change", () => {
  if (!pdf) return;
  pageNumber = Math.min(pdf.numPages, Math.max(1, Number.parseInt(pageInput.value, 10) || 1));
  renderPage();
});
zoomOut.addEventListener("click", () => { scale = Math.max(0.6, scale - 0.2); renderPage(); });
zoomIn.addEventListener("click", () => { scale = Math.min(2, scale + 0.2); renderPage(); });
window.addEventListener("contextmenu", event => event.preventDefault());
window.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && ["s", "p"].includes(event.key.toLowerCase())) event.preventDefault();
});

syncControls();
openDocument();
