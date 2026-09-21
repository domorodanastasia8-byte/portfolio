const documents = {
  processes: { title: "Карта процессов отдела маркетинга", data: "table-data/processes.json" },
  analytics: { title: "Пример маркетинговой аналитики", data: "table-data/analytics.json" }
};

const params = new URLSearchParams(window.location.search);
const selected = documents[params.get("doc")];
const title = document.querySelector("#document-title");
const tabs = document.querySelector("#sheet-tabs");
const status = document.querySelector("#table-status");
const viewport = document.querySelector("#sheet-viewport");
const stage = document.querySelector("#sheet-stage");
const zoomValue = document.querySelector("#zoom-value");
const zoomOut = document.querySelector("#zoom-out");
const zoomIn = document.querySelector("#zoom-in");
const fitWidth = document.querySelector("#fit-width");

let workbook = null;
let activeSheet = 0;
let zoom = 1;

function styleText(style) {
  const css = [];
  if (style.bg) css.push(`background:${style.bg}`);
  if (style.color) css.push(`color:${style.color}`);
  if (style.bold) css.push("font-weight:700");
  if (style.italic) css.push("font-style:italic");
  if (style.size) css.push(`font-size:${Math.max(10, Math.min(20, style.size))}px`);
  if (style.align) css.push(`text-align:${style.align === "general" ? "left" : style.align}`);
  if (style.vertical) css.push(`vertical-align:${style.vertical === "center" ? "middle" : style.vertical}`);
  if (style.wrap === false) css.push("white-space:nowrap");
  if (style.top) css.push(`border-top:${style.top}`);
  if (style.right) css.push(`border-right:${style.right}`);
  if (style.bottom) css.push(`border-bottom:${style.bottom}`);
  if (style.left) css.push(`border-left:${style.left}`);
  return css.join(";");
}

function renderTabs() {
  tabs.replaceChildren();
  workbook.sheets.forEach((sheet, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sheet-tab";
    button.textContent = sheet.name;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", index === activeSheet ? "true" : "false");
    button.addEventListener("click", () => {
      activeSheet = index;
      zoom = 1;
      renderTabs();
      renderSheet();
    });
    tabs.append(button);
  });
}

function renderSheet() {
  const sheet = workbook.sheets[activeSheet];
  const cellMap = new Map(sheet.cells.map(([row, column, value, style]) => [`${row}:${column}`, { value, style }]));
  const mergeStarts = new Map();
  const mergeCovered = new Set();
  sheet.merges.forEach(([startRow, startColumn, endRow, endColumn]) => {
    mergeStarts.set(`${startRow}:${startColumn}`, { rowSpan: endRow - startRow + 1, colSpan: endColumn - startColumn + 1 });
    for (let row = startRow; row <= endRow; row += 1) {
      for (let column = startColumn; column <= endColumn; column += 1) {
        if (row !== startRow || column !== startColumn) mergeCovered.add(`${row}:${column}`);
      }
    }
  });

  const table = document.createElement("table");
  table.className = "workbook-table";
  table.setAttribute("aria-label", sheet.name);
  const colgroup = document.createElement("colgroup");
  sheet.widths.forEach(width => {
    const col = document.createElement("col");
    col.style.width = `${width}px`;
    colgroup.append(col);
  });
  table.append(colgroup);

  const body = document.createElement("tbody");
  for (let row = 0; row < sheet.rows; row += 1) {
    const tr = document.createElement("tr");
    tr.style.height = `${sheet.heights[row] || 27}px`;
    for (let column = 0; column < sheet.cols; column += 1) {
      const key = `${row}:${column}`;
      if (mergeCovered.has(key)) continue;
      const cell = document.createElement("td");
      const entry = cellMap.get(key);
      if (entry) {
        cell.textContent = entry.value;
        const style = sheet.styles[entry.style] || {};
        cell.style.cssText = styleText(style);
      }
      const merge = mergeStarts.get(key);
      if (merge) {
        cell.rowSpan = merge.rowSpan;
        cell.colSpan = merge.colSpan;
      }
      tr.append(cell);
    }
    body.append(tr);
  }
  table.append(body);
  stage.replaceChildren(table);
  viewport.scrollTo({ top: 0, left: 0 });
  applyZoom();

  if (params.get("doc") === "processes") requestAnimationFrame(fitToWidth);
}

function applyZoom() {
  stage.style.transform = `scale(${zoom})`;
  const table = stage.querySelector("table");
  if (table) {
    stage.style.width = `${Math.ceil(table.offsetWidth * zoom)}px`;
    stage.style.height = `${Math.ceil(table.offsetHeight * zoom)}px`;
  }
  zoomValue.textContent = `${Math.round(zoom * 100)}%`;
  zoomOut.disabled = zoom <= 0.45;
  zoomIn.disabled = zoom >= 1.5;
}

function fitToWidth() {
  const table = stage.querySelector("table");
  if (!table) return;
  const available = Math.max(320, viewport.clientWidth - 8);
  zoom = Math.max(0.45, Math.min(1, available / table.offsetWidth));
  applyZoom();
  viewport.scrollTo({ top: 0, left: 0 });
}

async function openWorkbook() {
  if (!selected) {
    title.textContent = "Таблица не найдена";
    status.textContent = "Вернитесь в портфолио и выберите материал ещё раз.";
    return;
  }
  title.textContent = selected.title;
  document.title = `${selected.title} | Анастасия Домород`;
  try {
    const response = await fetch(selected.data, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    workbook = await response.json();
    renderTabs();
    status.hidden = true;
    viewport.hidden = false;
    renderSheet();
  } catch (error) {
    console.error(error);
    status.textContent = "Не удалось открыть таблицу. Попробуйте обновить страницу.";
  }
}

zoomOut.addEventListener("click", () => { zoom = Math.max(0.45, zoom - 0.1); applyZoom(); });
zoomIn.addEventListener("click", () => { zoom = Math.min(1.5, zoom + 0.1); applyZoom(); });
fitWidth.addEventListener("click", fitToWidth);
window.addEventListener("contextmenu", event => event.preventDefault());
window.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && ["s", "p"].includes(event.key.toLowerCase())) event.preventDefault();
});

openWorkbook();
