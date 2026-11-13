// Bibliothèque commune aux deux formations Espace Pro — Maison du Store AM.
// Charte : css/variables.css (site) + public/admin.css (tokens Espace Pro).
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

const IMG = path.join(__dirname, "img");
const DIMS = JSON.parse(fs.readFileSync(path.join(IMG, "dims.json"), "utf8"));

const HEX = {
  white: "FFFFFF", panel: "F9F8F4", bg: "F4F4F1", ink: "1C1C1C", text: "353535", text2: "6B665E",
  line: "E8E4DB", lineStrong: "DCD6CB", gold: "C09F6A", goldText: "84642F", goldTint: "F6F0E4",
  goldLight: "D8B47A", sapin: "20332C", sapin2: "2C423A", sapinText: "D3DCD7", sapinMuted: "A9BAB2",
};
const TONES = {
  ok: ["2F7350", "E5F1EA"], info: ["3F6285", "E8EEF5"], warn: ["8C5F0E", "FBF3E2"],
  error: ["B3392F", "F8E6E4"], neutral: ["5C5852", "F1F0EC"], progress: ["84642F", "F6F0E4"],
};
// Libellés, teintes et glyphes repris de App\Services\StaffInterface::STATUSES.
const STATUS = {
  pending: ["À traiter", "warn", "!"], draft: ["Brouillon", "neutral", "○"], approved: ["Validé", "info", "◆"],
  accepted: ["Accepté", "ok", "✓"], rejected: ["Refusé", "error", "×"], cancelled: ["Annulé", "neutral", "–"],
  confirmed: ["Confirmé", "ok", "✓"], completed: ["Terminé", "ok", "✓"], planned: ["Planifié", "info", "○"],
  in_progress: ["En cours", "progress", "◐"], issued: ["Émise", "info", "◆"], paid: ["Payée", "ok", "✓"],
  sent: ["Envoyé", "ok", "✓"], uncertain: ["Envoi à vérifier", "warn", "!"], shared: ["Partagé manuellement", "ok", "✓"],
};

const THEME = {
  name: "Maison du Store AM — Espace Pro",
  headFontFace: "Cormorant Garamond",
  bodyFontFace: "Inter",
  colors: {
    dk1: HEX.ink, lt1: HEX.white, dk2: HEX.sapin, lt2: HEX.panel,
    accent1: HEX.gold, accent2: HEX.goldText, accent3: "2F7350", accent4: "3F6285", accent5: "B3392F", accent6: "8C5F0E",
    hlink: HEX.goldText, folHlink: HEX.text2,
  },
};
const MONO = "IBM Plex Mono";
const W = 13.333, H = 7.5, MX = 0.6;

function shadow() { return { type: "outer", color: "3C3018", opacity: 0.12, blur: 10, offset: 2, angle: 90 }; }

function createDeck({ audience, title }) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = title; pres.subject = "Formation Espace Pro"; pres.author = "Maison du Store AM";
  pres.company = "Maison du Store AM";
  const footer = `MAISON DU STORE AM · ${audience.toUpperCase()}`;

  pres.defineSlideMaster({
    title: "MDS_COVER", background: { color: HEX.sapin },
    objects: [
      { placeholder: { options: { name: "kicker", type: "body", x: 0.9, y: 2.2, w: 8, h: 0.4, fontFace: MONO, fontSize: 12, color: HEX.goldLight, charSpacing: 3, margin: 0 }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 2.65, w: 8.6, h: 2.0, fontFace: THEME.headFontFace, fontSize: 44, color: HEX.white, valign: "top", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.9, y: 4.85, w: 7.6, h: 1.0, fontSize: 18, color: HEX.sapinText, valign: "top", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "MDS_DIVIDER", background: { color: HEX.sapin },
    objects: [
      { text: { text: footer, options: { x: MX, y: 6.95, w: 8, h: 0.3, fontFace: MONO, fontSize: 9, color: HEX.sapinMuted, charSpacing: 2, margin: 0 } } },
      { placeholder: { options: { name: "kicker", type: "body", x: 0.9, y: 2.35, w: 8, h: 0.4, fontFace: MONO, fontSize: 12, color: HEX.goldLight, charSpacing: 3, margin: 0 }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 2.8, w: 9, h: 1.3, fontFace: THEME.headFontFace, fontSize: 46, color: HEX.white, valign: "top", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.9, y: 4.2, w: 7.4, h: 1.4, fontSize: 17, color: HEX.sapinText, valign: "top", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.15, y: 6.95, w: 0.6, h: 0.3, fontFace: MONO, fontSize: 9, color: HEX.sapinMuted, align: "right" },
  });
  pres.defineSlideMaster({
    title: "MDS_CONTENT", background: { color: HEX.white },
    objects: [
      { text: { text: footer, options: { x: MX, y: 6.98, w: 8, h: 0.3, fontFace: MONO, fontSize: 9, color: HEX.text2, charSpacing: 2, margin: 0 } } },
      { placeholder: { options: { name: "kicker", type: "body", x: MX, y: 0.42, w: 9, h: 0.3, fontFace: MONO, fontSize: 11, color: HEX.goldText, charSpacing: 2, margin: 0 }, text: "" } },
      { placeholder: { options: { name: "title", type: "title", x: MX, y: 0.74, w: 9.8, h: 0.7, fontFace: THEME.headFontFace, fontSize: 31, color: HEX.ink, valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.15, y: 6.98, w: 0.6, h: 0.3, fontFace: MONO, fontSize: 9, color: HEX.text2, align: "right" },
  });
  return pres;
}

// ---------- éléments de composition ----------
const tb = (o) => ({ isTextBox: true, margin: 0, valign: "top", ...o });

function img(key) { return path.join(IMG, key + (key === "logo" ? ".png" : ".jpg")); }
function fit(key, maxW, maxH) {
  const [iw, ih] = DIMS[key]; const r = Math.min(maxW / iw, maxH / ih);
  return { w: iw * r, h: ih * r };
}

/** Capture d'écran encadrée (carte blanche + ombre) ; renvoie le rectangle de l'image. */
function shot(pres, s, key, box, opts = {}) {
  const pad = 0.07;
  const { w, h } = fit(key, box.w - 2 * pad, box.h - 2 * pad - (opts.caption ? 0.32 : 0));
  const x = opts.align === "left" ? box.x : box.x + (box.w - w - 2 * pad) / 2;
  const y = box.y;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: w + 2 * pad, h: h + 2 * pad, rectRadius: 0.08, fill: { color: HEX.white }, line: { color: HEX.line, width: 0.75 }, shadow: shadow(), objectName: "Cadre " + key });
  s.addImage({ path: img(key), x: x + pad, y: y + pad, w, h, altText: opts.alt || ("Maquette Espace Pro : " + key), objectName: "Capture " + key });
  if (opts.caption) s.addText(opts.caption.toUpperCase(), tb({ x, y: y + h + 2 * pad + 0.1, w: Math.max(w + 2 * pad, 3), h: 0.25, fontFace: MONO, fontSize: 9, color: HEX.text2, charSpacing: 1.5 }));
  return { x: x + pad, y: y + pad, w, h };
}

/** Capture mobile dans un cadre de téléphone (encre, coins arrondis) ; renvoie le rectangle de l'image. */
function phone(pres, s, key, { x, y, h, caption }) {
  const pad = 0.08;
  const ih = h - 2 * pad - (caption ? 0.32 : 0);
  const [iw0, ih0] = DIMS[key];
  const iw = ih * iw0 / ih0;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: iw + 2 * pad, h: ih + 2 * pad, rectRadius: 0.22, fill: { color: HEX.ink }, line: { color: HEX.ink, width: 0.75 }, shadow: shadow(), objectName: "Téléphone " + key });
  s.addImage({ path: img(key), x: x + pad, y: y + pad, w: iw, h: ih, altText: "Maquette mobile Espace Pro : " + key, objectName: "Capture mobile " + key });
  if (caption) s.addText(caption.toUpperCase(), tb({ x: x - 0.2, y: y + ih + 2 * pad + 0.1, w: iw + 2 * pad + 0.4, h: 0.25, align: "center", fontFace: MONO, fontSize: 8.5, color: HEX.text2, charSpacing: 1 }));
  return { x: x + pad, y: y + pad, w: iw, h: ih, fw: iw + 2 * pad };
}

/** Pastille numérotée or posée sur une capture (fx, fy en fraction de l'image). */
function marker(pres, s, rect, n, fx, fy) {
  const d = 0.34;
  s.addShape(pres.shapes.OVAL, { x: rect.x + rect.w * fx - d / 2, y: rect.y + rect.h * fy - d / 2, w: d, h: d, fill: { color: HEX.gold }, line: { color: HEX.white, width: 1.5 }, shadow: shadow(), objectName: "Repère " + n });
  s.addText(String(n), tb({ x: rect.x + rect.w * fx - d / 2, y: rect.y + rect.h * fy - d / 2, w: d, h: d, align: "center", valign: "middle", fontFace: MONO, fontSize: 11, bold: true, color: HEX.ink }));
}

/** Liste d'explications numérotées (repères des captures). items: [[titre, texte], ...] */
function legend(pres, s, items, { x, y, w, gap = 0.12, rowH = 0.72, size = 14, start = 1 }) {
  items.forEach(([t, d], i) => {
    const yy = y + i * (rowH + gap);
    s.addShape(pres.shapes.OVAL, { x, y: yy + 0.02, w: 0.32, h: 0.32, fill: { color: HEX.gold }, line: { color: HEX.gold }, objectName: "Puce " + (i + start) });
    s.addText(String(i + start), tb({ x, y: yy + 0.02, w: 0.32, h: 0.32, align: "center", valign: "middle", fontFace: MONO, fontSize: 10.5, bold: true, color: HEX.ink }));
    s.addText([{ text: t, options: { bold: true, color: HEX.ink, breakLine: true } }, { text: d, options: { color: HEX.text } }],
      tb({ x: x + 0.47, y: yy, w: w - 0.47, h: rowH, fontSize: size, paraSpaceAfter: 2 }));
  });
}

/** Pastille de statut (couleur + glyphe, comme dans l'interface). */
function badge(pres, s, key, x, y, opts = {}) {
  const [label, tone, glyph] = STATUS[key] || [key, "neutral", "·"];
  const [fg, bgc] = TONES[opts.tone || tone];
  const text = `${opts.glyph || glyph}  ${opts.label || label}`;
  const fs = opts.size || 12;
  const w = opts.w || (0.3 + text.length * fs * 0.0078);
  const h = opts.h || fs / 40 + 0.06;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: { color: bgc }, line: { color: bgc }, objectName: "Statut " + label });
  s.addText(text, tb({ x, y, w, h, align: "center", valign: "middle", fontSize: fs, bold: true, color: fg }));
  return w;
}

/** Carte arrondie (teinte claire, filet fin). */
function card(pres, s, { x, y, w, h, fill = HEX.panel, line = HEX.line, sh = false, name = "Carte" }) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: fill }, line: { color: line, width: 0.75 }, shadow: sh ? shadow() : undefined, objectName: name });
}

/** Petite étiquette mono en capitales. */
function tag(s, text, x, y, w, color = HEX.goldText, size = 10) {
  s.addText(text.toUpperCase(), tb({ x, y, w, h: 0.25, fontFace: MONO, fontSize: size, color, charSpacing: 1.5 }));
}

/** « La tringle » : frise d'avancement de l'Espace Pro (seul ornement de la charte). */
function tringle(pres, s, { x, y, w, n, active, dark = false, d = 0.16, labels = null, labelColor }) {
  const lineCol = dark ? HEX.sapinMuted : HEX.lineStrong;
  const step = n > 1 ? (w - d) / (n - 1) : 0;
  s.addShape(pres.shapes.LINE, { x: x + d / 2, y: y + d / 2, w: w - d, h: 0, line: { color: lineCol, width: 1.25 }, objectName: "Tringle" });
  if (active > 0) s.addShape(pres.shapes.LINE, { x: x + d / 2, y: y + d / 2, w: step * (active - 1), h: 0, line: { color: HEX.gold, width: 2 }, objectName: "Tringle active" });
  for (let i = 0; i < n; i++) {
    const on = i < active;
    s.addShape(pres.shapes.OVAL, { x: x + i * step, y, w: d, h: d, fill: { color: on ? HEX.gold : (dark ? HEX.sapin : HEX.white) }, line: { color: on ? HEX.gold : lineCol, width: 1.25 }, objectName: "Anneau " + (i + 1) });
    if (labels) s.addText(labels[i], tb({ x: x + i * step - 0.8 + d / 2, y: y + d + 0.1, w: 1.6, h: 0.5, align: "center", fontSize: 11, color: labelColor || (dark ? HEX.sapinText : HEX.text) }));
  }
}

/** Repère de module en haut à droite des diapositives de contenu. */
function moduleTrack(pres, s, mod, total) {
  tringle(pres, s, { x: 10.55, y: 0.5, w: 2.15, n: total, active: mod, d: 0.14 });
}

function content(pres, { section, kicker, title, mod, total, notes }) {
  const s = pres.addSlide({ masterName: "MDS_CONTENT", sectionTitle: section });
  s.addText(kicker.toUpperCase(), { placeholder: "kicker" });
  s.addText(title, { placeholder: "title" });
  if (mod) moduleTrack(pres, s, mod, total);
  if (notes) s.addNotes(notes);
  return s;
}

function divider(pres, { section, kicker, title, body, mod, total, notes }) {
  pres.addSection({ title: section });
  const s = pres.addSlide({ masterName: "MDS_DIVIDER", sectionTitle: section });
  s.addText(kicker.toUpperCase(), { placeholder: "kicker" });
  s.addText(title, { placeholder: "title" });
  if (body) s.addText(body, { placeholder: "body" });
  tringle(pres, s, { x: 0.9, y: 1.55, w: 4.2, n: total, active: mod, dark: true, d: 0.2 });
  s.addText(String(mod).padStart(2, "0"), tb({ x: 9.6, y: 1.7, w: 3.2, h: 3.4, align: "right", fontFace: THEME.headFontFace, fontSize: 200, color: HEX.sapin2 }));
  if (notes) s.addNotes(notes);
  return s;
}

/** Tableau charté (en-tête sapin, lignes alternées). rows: [[...], ...] */
function table(pres, s, header, rows, { x, y, w, colW, size = 12, rowH }) {
  const head = header.map((t) => ({ text: t, options: { bold: true, color: HEX.white, fill: { color: HEX.sapin }, fontFace: MONO, fontSize: 10, charSpacing: 1 } }));
  const body = rows.map((r, i) => r.map((c, j) => {
    const cell = typeof c === "string" ? { text: c } : c;
    return { text: cell.text, options: { color: j === 0 ? HEX.ink : HEX.text, bold: j === 0, fill: { color: i % 2 ? HEX.panel : HEX.white }, fontSize: size, ...(cell.options || {}) } };
  }));
  s.addTable([head, ...body], { x, y, w, colW, border: { type: "solid", color: HEX.line, pt: 0.75 }, margin: [0.06, 0.1, 0.06, 0.1], valign: "middle", rowH, autoPage: false });
}

/** Liste à puces sobre. */
function bullets(s, items, { x, y, w, h, size = 15, color = HEX.text, space = 8 }) {
  s.addText(items.map((t, i) => {
    const runs = Array.isArray(t) ? t : [{ text: t }];
    return runs.map((r, k) => ({ text: r.text, options: { bullet: k === 0 ? { indent: 16 } : undefined, bold: r.bold, color: r.color || (r.bold ? HEX.ink : color), breakLine: k === runs.length - 1 && i < items.length - 1, paraSpaceAfter: space } }));
  }).flat(), tb({ x, y, w, h, fontSize: size }));
}

module.exports = { pptxgen, createDeck, HEX, TONES, STATUS, THEME, MONO, W, H, MX, tb, img, fit, shot, phone, marker, legend, badge, card, tag, tringle, content, divider, table, bullets, shadow };
