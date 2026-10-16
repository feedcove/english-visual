"use strict";
        const clamp01 = (x) => Math.min(1, Math.max(0, x));
        const toLin = (x) =>
          x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        const toGam = (x) =>
          x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
        function labToLin(L, a, b) {
          const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
          const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
          const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
          return [
            4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
            -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
            -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
          ];
        }
        function linToLab(c) {
          const l = Math.cbrt(
            0.4122214708 * c[0] + 0.5363325363 * c[1] + 0.0514459929 * c[2],
          );
          const m = Math.cbrt(
            0.2119034982 * c[0] + 0.6806995451 * c[1] + 0.1073969566 * c[2],
          );
          const s = Math.cbrt(
            0.0883024619 * c[0] + 0.2817188376 * c[1] + 0.6299787005 * c[2],
          );
          return [
            0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
            1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
            0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
          ];
        }
        const inGamut = (v) => v.every((x) => x >= -1e-4 && x <= 1 + 1e-4);
        function lch(L, C, h) {
          const hr = (h * Math.PI) / 180,
            ca = Math.cos(hr),
            sa = Math.sin(hr);
          let c = C,
            lin = labToLin(L, c * ca, c * sa);
          if (!inGamut(lin)) {
            let lo = 0,
              hi = C;
            for (let k = 0; k < 24; k++) {
              const mid = (lo + hi) / 2;
              if (inGamut(labToLin(L, mid * ca, mid * sa))) lo = mid;
              else hi = mid;
            }
            c = lo;
            lin = labToLin(L, c * ca, c * sa);
          }
          return {
            rgb: lin.map((x) => clamp01(toGam(clamp01(x)))),
            L,
            C: c,
            h,
          };
        }
        const hexOf = (rgb) =>
          "#" +
          rgb
            .map((x) =>
              Math.round(clamp01(x) * 255)
                .toString(16)
                .padStart(2, "0"),
            )
            .join("")
            .toUpperCase();
        const lumOf = (rgb) => {
          const v = rgb.map(toLin);
          return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
        };
        const ratio = (a, b) => {
          const A = lumOf(a),
            B = lumOf(b);
          return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05);
        };
        const over = (fg, alpha, bg) =>
          fg.map((v, i) => v * alpha + bg[i] * (1 - alpha));
        function mixLab(a, b, t) {
          const A = linToLab(a.map(toLin)),
            B = linToLab(b.map(toLin));
          return labToLin(
            A[0] * (1 - t) + B[0] * t,
            A[1] * (1 - t) + B[1] * t,
            A[2] * (1 - t) + B[2] * t,
          ).map((x) => clamp01(toGam(clamp01(x))));
        }
        const rgbStr = (c) =>
          c.map((x) => Math.round(clamp01(x) * 255)).join(",");
        const WHITE = [1, 1, 1],
          BLACK = [0, 0, 0];
        const f2 = (x) => x.toFixed(2);
        function edge(cond, kind) {
          let lo = 0,
            hi = 1;
          if (kind === "max") {
            if (!cond(0)) return null;
            if (cond(1)) return 1;
            for (let k = 0; k < 28; k++) {
              const mid = (lo + hi) / 2;
              if (cond(mid)) lo = mid;
              else hi = mid;
            }
            return lo;
          }
          if (!cond(1)) return null;
          if (cond(0)) return 0;
          for (let k = 0; k < 28; k++) {
            const mid = (lo + hi) / 2;
            if (cond(mid)) hi = mid;
            else lo = mid;
          }
          return hi;
        }

        /* ---------- Движок токенов ---------- */
        const NEUTRALS = {
          pure: [0, 0],
          cool: [0.0065, 275],
          warm: [0.0065, 75],
        };
        // Тёмная лестница: первые ступени заметные, глубокие мельче, чтобы белый текст держал 4,5:1 даже на нажатии
        const DARK_STEPS = {
          normal: [0.215, 0.05, 0.035],
          high: [0.24, 0.065, 0.03],
        };
        function ladderL(light, hc, i) {
          if (light) return Math.max(0, 1 - (hc ? 0.04 : 0.026) * i);
          if (i === 0) return 0;
          const [b, s1, s2] = DARK_STEPS[hc ? "high" : "normal"];
          return Math.min(
            1,
            i <= 4 ? b + s1 * (i - 1) : b + s1 * 3 + s2 * (i - 4),
          );
        }
        // Состояния сплошных и тонированных заливок: смешивание с цветом содержимого
        const MIX_H = 0.08,
          MIX_P = 0.12,
          TINT = 0.14;
        // запас на округление: браузер рисует цвет в 8 битах, и цвет ровно на границе 3:1 на экране даёт 2,99
        const PAD = 0.05;
        // Заливка с цветом (акцент, danger): подбираем светлоту под контраст текста с запасом на нажатие и под границу с фоном
        function solveFill(m, A, canvas) {
          const light = m.theme === "light",
            hc = m.contrast === "high";
          // на акценте может лежать текст, поэтому цель одна, как для текста: 4,5:1, при повышенном контрасте 7:1
          const target = hc ? 7 : 4.5;
          const want = clamp01(
            A.L + (light ? (hc ? -0.08 : 0) : hc ? 0.1 : 0.05),
          );
          const at = (L) => lch(L, A.c, A.h).rgb;
          // текст: нажатие подмешивает цвет текста, контраст падает — проверяем сразу нажатое состояние
          const maxW = edge(
            (L) => ratio(WHITE, mixLab(at(L), WHITE, MIX_P)) >= target + PAD,
            "max",
          );
          const minK = edge(
            (L) => ratio(BLACK, mixLab(at(L), BLACK, MIX_P)) >= target + PAD,
            "min",
          );
          // граница с фоном 3:1: на светлом фоне годится всё темнее порога, на тёмном — светлее. Красному она не нужна: его кнопку узнают по подписи
          let bLo = 0,
            bHi = 1;
          if (A.boundary !== false) {
            const Yc = lumOf(canvas),
              darker = (Yc + 0.05) / 0.05 >= 1.05 / (Yc + 0.05),
              e = edge(
                (L) => ratio(at(L), canvas) >= 3 + PAD,
                darker ? "max" : "min",
              );
            if (e === null) {
              bLo = 1;
              bHi = 0;
            } else if (darker) bHi = e;
            else bLo = e;
          }
          // для каждого цвета текста — ближайшая к задуманной светлота, при которой выполнены обе цели (both), иначе только цель по тексту
          const cand = [],
            add = (on, lo, hi) => {
              const a = Math.max(lo, bLo),
                b = Math.min(hi, bHi),
                both = a <= b,
                textL = Math.min(hi, Math.max(lo, want));
              const L = both ? Math.min(b, Math.max(a, want)) : textL;
              cand.push({ on, L, textL, both, dist: Math.abs(L - want) });
            };
          if (maxW !== null) add("white", 0, maxW);
          if (minK !== null) add("black", minK, 1);
          const W = cand.find((c) => c.on === "white"),
            K = cand.find((c) => c.on === "black");
          const best = (list) =>
            list
              .slice()
              .sort(
                (a, b) =>
                  b.both - a.both ||
                  a.dist - b.dist ||
                  (a.on === "white" ? -1 : 1),
              )[0];
          // why — почему такой цвет текста: forced задан вручную, hc как в обычном контрасте, boundary с другим кнопка сливается с фоном, closer ближе к задуманному
          let pick,
            why = "single";
          if (A.on === "white" || A.on === "black") {
            pick = (A.on === "white" ? W : K) || W || K;
            why = "forced";
          } else if (hc) {
            // при повышенном контрасте цвет текста по возможности тот же, что в обычном: двигается только светлота
            const base = solveFill(
                Object.assign({}, m, { contrast: "normal" }),
                A,
                canvas,
              ),
              same = cand.find((c) => c.on === base.on);
            pick = same && same.both ? same : best(cand);
            why = pick === same ? "hc" : "boundary";
          } else {
            pick = best(cand);
            if (W && K) {
              const other = pick === W ? K : W;
              why = pick.both && !other.both ? "boundary" : "closer";
            }
          }
          if (!pick) pick = { on: "white", L: want, textL: want };
          const col = lch(pick.L, A.c, A.h),
            onRgb = pick.on === "white" ? WHITE : BLACK;
          return {
            rgb: col.rgb,
            hex: hexOf(col.rgb),
            L: pick.L,
            C: col.C,
            h: A.h,
            on: pick.on,
            onRgb,
            rOn: ratio(onRgb, col.rgb),
            rOnP: ratio(onRgb, mixLab(col.rgb, onRgb, MIX_P)),
            rBg: ratio(col.rgb, canvas),
            target,
            want,
            textL: pick.textL,
            shifted: Math.abs(pick.L - pick.textL) > 1e-6,
            why,
            clipped: col.C < A.c - 0.004,
          };
        }
        // Цветной текст: держит 4,5:1 в самом тяжёлом месте внутри поверхностей bg0–bg2 — в нажатом состоянии на bg2.
        // При повышенном контрасте ещё и 7:1 в покое на bg0.
        function solveText(m, A, n) {
          const light = m.theme === "light",
            hc = m.contrast === "high";
          const want = clamp01(
            A.L + (light ? (hc ? -0.08 : 0) : hc ? 0.1 : 0.05),
          );
          const at = (L) => lch(L, A.c, A.h).rgb;
          // ghost, outline и plain нажаты: n4; surface нажат: n5; soft нажат: n6 — в режиме «как iOS» на нём текст акцента; soft с тоном: 14 % цвета текста на bg2, нажат ещё +12 %
          const worst = (t) => [
            n[4],
            n[5],
            n[6],
            mixLab(mixLab(n[2], t, TINT), t, MIX_P),
          ];
          const ok = (L) => {
            const t = at(L);
            return (
              worst(t).every((b) => ratio(t, b) >= 4.5 + PAD) &&
              (!hc || ratio(t, n[0]) >= 7 + PAD)
            );
          };
          let L = want;
          const lim = edge(ok, light ? "max" : "min");
          if (lim !== null)
            L = light ? Math.min(want, lim) : Math.max(want, lim);
          const col = lch(L, A.c, A.h);
          return {
            rgb: col.rgb,
            hex: hexOf(col.rgb),
            L,
            r: ratio(col.rgb, n[0]),
            rWorst: Math.min(...worst(col.rgb).map((b) => ratio(col.rgb, b))),
          };
        }
        // подпись на заливке акцентом: та же доля, что у c2, но не ниже 4,5:1 — на насыщенном цвете её приходится уплотнять
        function onAlpha(on, bg, base) {
          for (let a = base; a < 1; a += 0.02)
            if (ratio(over(on, a, bg), bg) >= 4.5 + PAD) return +a.toFixed(2);
          return 1;
        }
        // Красный для опасных действий: как у Apple, на красной заливке всегда белый текст
        const DANGER = {
          h: 27,
          c: 0.2,
          L: 0.6,
          on: "white",
          target: "text",
          boundary: false,
        };
        function tokens(m) {
          const light = m.theme === "light",
            hc = m.contrast === "high",
            rt = m.transparency === "reduced";
          const [nc, nh] = NEUTRALS[m.neutral];
          const n = [];
          for (let i = 0; i <= 10; i++)
            n.push(lch(ladderL(light, hc, i), i === 0 ? 0 : nc, nh).rgb);
          const ink = lch(
            light ? (hc ? 0.08 : 0.145) : hc ? 1 : 0.985,
            nc * 0.6,
            nh,
          ).rgb;
          const e = light ? n.slice(0, 7) : n.slice(2, 9);
          const al = {
            c2: hc ? 0.78 : 0.62,
            c3: hc ? 0.58 : 0.4,
            c4: hc ? 0.4 : 0.24,
            sep: hc ? (light ? 0.24 : 0.3) : light ? 0.1 : 0.16,
            s1: hc ? 0.3 : light ? 0.12 : 0.16,
            s2: hc ? 0.5 : light ? 0.24 : 0.28,
            s3: hc ? 0.8 : light ? 0.5 : 0.55,
          };
          const A = { h: m.accH, c: m.accC, L: m.accL, on: m.accOn };
          const acc = solveFill(m, A, n[0]),
            dan = solveFill(m, DANGER, n[0]);
          return {
            m,
            light,
            hc,
            rt,
            n,
            e,
            ink,
            onInk: n[0],
            al,
            acc,
            accC2: onAlpha(acc.onRgb, acc.rgb, al.c2),
            accText: solveText(m, A, n),
            dan,
            danText: solveText(m, DANGER, n),
          };
        }
        function cssVars(T) {
          const {
              m,
              light,
              hc,
              rt,
              n,
              e,
              ink,
              al,
              acc,
              accText,
              dan,
              danText,
            } = T,
            ik = rgbStr(ink),
            v = {},
            cap = m.shape === "capsule",
            sq = m.shape === "square";
          n.forEach((c, i) => {
            v["--n" + i] = hexOf(c);
          });
          e.forEach((c, i) => {
            v["--e" + i] = hexOf(c);
          });
          for (let L = 0; L <= 4; L++)
            v["--th" + L] = hexOf(light ? n[0] : n[Math.min(10, L + 3)]);
          v["--thE"] = hexOf(light ? n[0] : e[3]);
          Object.assign(v, {
            "--k-ink": hexOf(ink),
            "--k-on-ink": hexOf(n[0]),
            "--knob": light ? "#FFFFFF" : hexOf(ink),
            "--c1": "rgb(" + ik + ")",
            "--c2": "rgba(" + ik + "," + al.c2 + ")",
            "--c3": "rgba(" + ik + "," + al.c3 + ")",
            "--c4": "rgba(" + ik + "," + al.c4 + ")",
            "--c2-a": String(al.c2),
            "--sep": "rgba(" + ik + "," + al.sep + ")",
            "--s1": "rgba(" + ik + "," + al.s1 + ")",
            "--s2": "rgba(" + ik + "," + al.s2 + ")",
            "--s3": "rgba(" + ik + "," + al.s3 + ")",
            "--line-w": hc ? "1.5px" : "1px",
            "--dot": "rgba(" + ik + "," + (light ? 0.11 : 0.15) + ")",
            "--accent": acc.hex,
            "--on-accent": acc.on === "white" ? "#FFFFFF" : "#000000",
            "--accent-text": accText.hex,
            "--danger": dan.hex,
            "--on-danger": dan.on === "white" ? "#FFFFFF" : "#000000",
            "--danger-text": danText.hex,
            "--sh1": light
              ? "0 1px 2px rgba(0,0,0,.05), 0 4px 16px rgba(0,0,0,.06)"
              : "0 0 0 1px rgba(255,255,255,.07)",
            "--sh2": light
              ? "0 14px 40px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.06)"
              : "0 18px 44px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.09)",
            "--r-sm": cap ? "999px" : sq ? "0px" : "8px",
            "--r-md": cap ? "999px" : sq ? "0px" : "10px",
            "--r-lg": cap ? "999px" : sq ? "0px" : "12px",
            "--r-card": cap ? "22px" : sq ? "0px" : "16px",
            // круглое (значки, чипы, переключатель): капсула или квадрат, а при скруглении — радиус своего размера, поэтому переменная снимается
            "--r-round": cap ? "999px" : sq ? "0px" : null,
            "--acc-c2-a": String(T.accC2),
            "--dur-fast": "120ms",
            "--dur": "240ms",
            "--dur-slow": "400ms",
            "--edge-blur": rt ? "0px" : "6px",
          });
          let ga = light ? 0.32 : 0.36;
          if (hc) ga += 0.18;
          v["--glass-bg"] = rt
            ? hexOf(light ? n[0] : e[1])
            : "rgba(" + (light ? "255,255,255" : "38,38,42") + "," + ga + ")";
          v["--glass-blur"] = rt ? "0px" : "12px";
          v["--glass-hi"] = rt
            ? "transparent"
            : light
              ? "rgba(255,255,255,.8)"
              : "rgba(255,255,255,.18)";
          v["--glass-edge"] = hc
            ? "rgba(" + ik + ",.45)"
            : light
              ? "rgba(0,0,0,.08)"
              : "rgba(255,255,255,.10)";
          return v;
        }
module.exports = { tokens, cssVars, solveFill, solveText, lch, hexOf, ratio, lchOf: (rgb)=>{const [L,a,b]=linToLab(rgb.map(toLin));return [L,Math.hypot(a,b),((Math.atan2(b,a)*180)/Math.PI+360)%360];}, mixLab, over, rgbStr, ladderL, NEUTRALS, DARK_STEPS };
