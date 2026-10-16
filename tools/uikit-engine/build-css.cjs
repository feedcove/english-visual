// Генерирует uikit-dark.css: :root из движка кита (значения вычислены tokens()/cssVars()) + срезы CSS рецептов из v6 + материалы.
const fs = require("fs");
const E = require("./engine.cjs");
// Песочница UI-кита v6: путь вторым аргументом или по умолчанию ~/dev/uikit.
const SRC = process.argv[3] ?? require("path").join(require("os").homedir(), "dev/uikit/Песочница UI-кита (6).html");
const OUT = process.argv[2];
const lines = fs.readFileSync(SRC, "utf8").split("\n");
const slice = (a, b) => lines.slice(a - 1, b).map(l => l.replace(/^ {6}/, "")).join("\n");

const m = { theme:"dark", contrast:"normal", transparency:"normal", motion:"normal", neutral:"cool", shape:"capsule", size:"md", accH:237, accC:0.14, accL:0.7, accOn:"auto", ascope:"cta" };
const T = E.tokens(m), V = E.cssVars(T);
const oklch = (rgb) => { const [L,C,h] = E.lchOf(rgb); return `oklch(${L.toFixed(3)} ${C.toFixed(4)} ${C < 1e-4 ? 0 : h.toFixed(0)})`; };

// --- :root ---
const g = (keys, ind = "  ") => keys.map(k => `${ind}${k}: ${V[k]};`).join("\n");
const nKeys = Array.from({length:11},(_,i)=>"--n"+i);
const nLines = nKeys.map((k,i)=>`  ${k}: ${V[k]}; /* ${oklch(T.n[i])} */`).join("\n");
const eKeys = Array.from({length:7},(_,i)=>"--e"+i);
const thKeys = ["--th0","--th1","--th2","--th3","--th4","--thE"];

const root = `/* Сгенерировано из движка UI-кита v6 (tokens() + cssVars()) для режима:
   тема тёмная · контраст обычный · прозрачность обычная · движение обычное ·
   акцент голубой (OKLCH h237 c0.14 L0.70) · где акцент «действие» · текст на акценте авто ·
   нейтраль холодная (c0.0065 h275) · форма капсула · размер md.
   Значения не править руками: пересчитываются скриптом tools/uikit-engine/build-css.cjs */
:root {
  color-scheme: dark;
  box-sizing: border-box;

  /* Нейтраль: лестница n0–n10. n0 — чистый чёрный (bg0), n1–n10 — OKLCH L = .215, .265, .315, .365, .40, .435, .47, .505, .54, .575; C .0065, h 275 */
${nLines}
  /* Поднятый слой (data-level="e"): n2–n8 */
${g(eKeys)}
  /* Бегунок сегмента на уровне L: n(L+3) */
${g(thKeys)}

  /* Ink (цвет содержимого): oklch(.985 .0039 275). c1–c4 — его прозрачность */
${g(["--k-ink","--k-on-ink","--knob","--c1","--c2","--c3","--c4","--c2-a"])}
  /* Линии: sep — разделитель, s1 — слабая обводка, s2 — обычная, s3 — сильная (единственная проходит 3:1) */
${g(["--sep","--s1","--s2","--s3","--line-w","--dot"])}

  /* Акцент: заливка / текст на заливке / цвет текста-акцента. Акцент — oklch(.75 .14 237), текст на нём чёрный */
${g(["--accent","--on-accent","--accent-text","--acc-c2-a"])}
  /* Danger (в ките это роль «удаление»; цвет — h27 c.20) */
${g(["--danger","--on-danger","--danger-text"])}

  /* Тени и поднятая поверхность */
${g(["--sh1","--sh2"])}

  /* Радиусы: форма «капсула» */
${g(["--r-sm","--r-md","--r-lg","--r-card","--r-round"])}

  /* Движение (обычное) */
${g(["--dur-fast","--dur","--dur-slow"])}
  --m-move: 1;
  --m-shimmer: shimmer;
  --m-spin: 0.8s;
  --spring: linear(0, 0.2 6%, 0.62 16%, 0.9 27%, 1.03 38%, 1.05 46%, 1.02 60%, 1 76%, 1);

  /* Стекло для навигации/таббара (.glass) */
${g(["--glass-bg","--glass-blur","--glass-hi","--glass-edge","--edge-blur"])}

  /* Где акцент = «действие»: акцент только у главного действия, остальное — ink. 1 включает акцент */
  --ax-st: 0;
  --ax-ios: 0;

  --font-ui: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
body {
  margin: 0;
  background: var(--lv);
  color: var(--c1);
  font-family: var(--font-ui);
}
`;

// --- материалы ---
const MATS = { thick:[0.8,26], regular:[0.64,22], thin:[0.48,18], ultrathin:[0.3,14], glass:[0.42,10,true], clear:[0.1,4,true,true] };
const ink = E.rgbStr(T.ink), tintDark = E.rgbStr(T.n[1]);
const FILL_A = [0.07,0.12,0.17,0.22,0.27,0.32];
const thumb = E.hexOf(T.e[3]);
let mats = `/* ---------- Материалы (тёмная тема, обычная прозрачность) ----------
   Берутся из paintMaterial() v6. Панель: class="k-mat" data-material="thin". Шаги заливки полупрозрачные (--a1…--a6 = ink 7…32 %),
   поэтому внутри панели уровни data-level не нужны. clear считается как тёмная тема и лежит на фото с затемнением 35 % под ним (.k-dim). */
`;
for (const [name,[a,blur,glass,clear]] of Object.entries(MATS)) {
  const tint = clear ? "255,255,255" : tintDark;
  const shadow = glass
    ? `inset 0 1px 0 rgba(255,255,255,${clear?".5":".6"}), 0 0 0 1px rgba(255,255,255,.22), 0 12px 32px rgba(0,0,0,.2)`
    : `0 0 0 .5px rgba(0,0,0,.14), 0 12px 32px rgba(0,0,0,.16)`;
  mats += `.k-mat[data-material="${name}"] {
  --mat-bg: rgba(${tint},${a});
  --mat-blur: ${blur}px;
${FILL_A.map((x,i)=>`  --a${i+1}: rgba(${ink},${x});`).join("\n")}
  --mat-thumb: ${thumb};
  --mat-shadow: ${shadow};
}
`;
}
mats += `.k-mat[data-material="opaque"] {
  --mat-bg: var(--lv);
  --mat-blur: 0px;
  --mat-shadow: 0 0 0 1px rgba(255,255,255,.08), 0 14px 40px rgba(0,0,0,.5);
}
/* затемнение 35 % под clear */
.k-dim { background: rgba(0,0,0,.35); }
`;

let kit = [];
kit.push("/* ================= Кит: уровни (v6, строки 633–706) ================= */");
kit.push(slice(633,706).replace('[data-level="0"] {', ':root,\n[data-level="0"] {'));
kit.push("/* ================= Размеры контрола (v6, 707–752) ================= */");
kit.push(slice(707,752).replace('[data-size="md"] {', ':root,\n[data-size="md"] {'));
kit.push("/* ================= Примитивы, контролы, поля, сегмент, переключатель, флажок, прогресс, карточка, строка списка (v6, 775–1659) ================= */");
kit.push(slice(775,842)); kit.push(slice(843,843)); kit.push(slice(860,1659));
kit.push("/* ================= Вложенность и токен-чип (v6, 2311–2334) ================= */");
kit.push(slice(2311,2334));
kit.push("/* ================= Материал-контейнер (v6, 2418–2437) ================= */");
kit.push(slice(2418,2437));
fs.writeFileSync(OUT, root + "\n" + kit.join("\n") + "\n\n" + mats + `
/* Адаптация (в ките этого нет, отражает те же системные настройки): уменьшение движения и прозрачности */
@media (prefers-reduced-motion: reduce) {
  :root { --m-move: 0; --m-shimmer: none; --m-spin: 1.6s; --spring: cubic-bezier(0.2, 0.8, 0.2, 1); }
}
@media (prefers-reduced-transparency: reduce) {
  .k-mat[data-material]:not([data-material="opaque"]) { --mat-bg: var(--n2); --mat-blur: 0px; -webkit-backdrop-filter: none; backdrop-filter: none; }
}
`);
console.log("ok");
