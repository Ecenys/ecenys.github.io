/*
 * Banda animada del hero: trenes en Virtual Coupling (ETCS nivel 3).
 *  - Cada vía lleva un convoy cuyo líder marca la velocidad y los seguidores
 *    mantienen una separación dinámica (control tipo CACC).
 *  - Cada cierto tiempo el último tren se desacopla, se queda atrás y vuelve
 *    a acoplarse en marcha.
 *  - Una estación con andén central donde cada convoy para unos segundos.
 *    Las eurobalizas están donde tocan: anuncio antes del andén y parada.
 *  - Un RBC emite ondas de radio; al alcanzar un tren le renueva la
 *    autoridad de movimiento (MA).
 *  - De vez en cuando pasa un tren rápido por la vía de paso del fondo sin
 *    parar; el tren de la vía A espera en el andén hasta que ha pasado.
 *  - Día / noche según el tema de la web: de noche hay estrellas y se
 *    encienden las ventanas, los faros y las luces de la marquesina.
 * Escena en vista lateral, de atrás hacia delante: vía de paso, marquesina,
 * vía A, andén, vía B.
 * Uso: window.RailHero.mount(canvas) -> devuelve una función para destruirlo.
 */
(function () {
  const CAR_LEN = 58;              // px por coche
  const CAR_GAP = 3;               // px de enganche entre coches de un mismo tren
  const TRAIN_H = 13;
  const MARGIN = 220;              // tramo fuera de pantalla para el bucle
  const RBC_TOP = 16;              // altura de la antena del RBC
  const MA_RANGE = 300;            // px de alcance de la antena del RBC
  const WAVE_SPEED = 170;          // px/s de expansión de cada onda de radio
  const WAVE_EVERY = 1.8;          // s entre ondas
  const STOP_GAP = 14;             // px entre trenes acoplados parados en el andén
  const DWELL = 2.6;               // s de parada en la estación
  const BRAKE = 95;                // px/s² de frenado de servicio al llegar a la estación
  const METERS = 0.6;              // px -> m (solo para mostrar)
  const STATION_NAME = 'ATOCHA';
  const EXPRESS_CARS = 4;
  const EXPRESS_SPEED = 320;       // px/s del tren rápido
  const EXPRESS_FIRST = 15;        // s hasta el primer paso
  const EXPRESS_EVERY = [40, 60];  // s entre pasos (mín, máx)
  const WINDOW_NIGHT = '#ffd88a';  // ventanas encendidas de noche

  const mod = (a, n) => ((a % n) + n) % n;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // Una vía con un tren por cada elemento de `consist` (nº de coches de cada tren, del primero al último)
  function makeTrack(y, dir, phase, consist) {
    const trains = consist.map((cars) => ({
      cars, len: cars * CAR_LEN + (cars - 1) * CAR_GAP,
      s: 0, v: 100, coupled: true, prevX: null,
      maFlash: 0, dwellUntil: 0, leaving: false
    }));
    return { y, dir, phase, trains, balises: [], nextToggle: 6 + phase * 3 };
  }

  function mount(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, L = 1, dpr = 1, padL = 16, padR = 16, rbcX = 0;
    let colors = {};
    let frame = 0, t = 0, last = 0, raf = 0, visible = true, waveNext = 0.5;
    let night = true;
    let stars = [];
    // vía A: un tren de 3 coches · vía B: tren de 2 coches + tren de 1 coche en Virtual Coupling
    const tracks = [makeTrack(70, 1, 0, [3]), makeTrack(120, -1, 1, [2, 1])];
    const station = { x0: 0, x1: 0 };
    const waves = [];                // ondas del RBC: { start, hit: Set de trenes alcanzados }

    // Vía de paso del fondo, sin andén, por la que circula el tren rápido (de derecha a izquierda)
    const through = { y: 38, dir: -1 };
    const EXPRESS_LEN = EXPRESS_CARS * CAR_LEN + (EXPRESS_CARS - 1) * CAR_GAP;
    let express = null;              // { x: posición de la cabeza en pantalla }
    let expressNext = EXPRESS_FIRST;

    // Geometría vertical de la estación
    const ROOF_Y = 12;
    const PLAT_TOP = 87;
    const PLAT_BOTTOM = 108;

    function readColors() {
      const cs = getComputedStyle(canvas);
      const get = (n, f) => (cs.getPropertyValue(n) || '').trim() || f;
      colors = {
        accent: get('--accent', '#27d885'),
        accent2: get('--accent2', '#15bdb6'),
        line: get('--line', 'rgba(255,255,255,.09)'),
        muted: get('--muted', '#8b98a6'),
        text: get('--text', '#e8eff5'),
        bg: get('--bg', '#0a0e12')
      };
      const themed = canvas.closest('[data-theme]');
      night = !themed || themed.getAttribute('data-theme') !== 'light';
    }

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      L = W + MARGIN * 2;
      // alinear el RBC y la estación con la columna de contenido de la sección
      const pr = canvas.parentElement.getBoundingClientRect();
      padL = Math.max(16, pr.left - r.left);
      padR = Math.max(28, r.right - pr.right);
      rbcX = W - padR - 6;

      // andén central con sitio para lo que ocupe más de cada vía
      const platLen = Math.max(...tracks.map(convoyLen)) + 16;
      const mid = Math.max(padL + platLen / 2, W * 0.36);
      station.x0 = mid - platLen / 2;
      station.x1 = mid + platLen / 2;

      // eurobalizas: anuncio antes de entrar al andén y baliza de parada junto a la cabeza
      for (const tr of tracks) {
        const head = stopHeadX(tr);
        const xs = tr.dir > 0 ? [station.x0 - 90, head - 12] : [station.x1 + 90, head + 12];
        const old = tr.balises;
        tr.balises = xs.filter((x) => x > 8 && x < W - 8).map((x, j) => ({ x, flash: old[j] ? old[j].flash : 0 }));
      }

      // estrellas para la noche, en la franja de arriba
      stars = Array.from({ length: Math.round(W / 22) }, () => ({
        x: Math.random() * W, y: 3 + Math.random() * 30,
        r: 0.5 + Math.random() * 0.8, phase: Math.random() * Math.PI * 2
      }));

      if (reduce) draw();
    }

    // Coordenada de vía (s crece en el sentido de la marcha) <-> posición en pantalla
    const toX = (tr, s) => {
      const x = mod(s, L) - MARGIN;
      return tr.dir > 0 ? x : W - x;
    };
    const toS = (tr, x) => (tr.dir > 0 ? x : W - x) + MARGIN;

    // Longitud total de la vía parada en el andén (todos sus trenes con STOP_GAP entre ellos)
    function convoyLen(tr) {
      return tr.trains.reduce((sum, tn) => sum + tn.len, 0) + (tr.trains.length - 1) * STOP_GAP;
    }

    // Posición en pantalla donde para la cabeza del líder, con el convoy centrado en el andén
    function stopHeadX(tr) {
      const margin = Math.max(8, (station.x1 - station.x0 - convoyLen(tr)) / 2);
      return tr.dir > 0 ? station.x1 - margin : station.x0 + margin;
    }

    // Punto de parada de la cabeza del tren i: el líder delante y el resto detrás
    function stopPoint(tr, i) {
      let s = toS(tr, stopHeadX(tr));
      for (let k = 0; k < i; k++) s -= tr.trains[k].len + STOP_GAP;
      return s;
    }

    // Aceleración necesaria para parar en la estación (o null si aún no hace falta frenar)
    function stationBrake(tr, i, me) {
      if (me.leaving) return null;
      const dist = mod(stopPoint(tr, i) - me.s, L);
      if (dist > L / 2) return null;
      if (dist < Math.max(0.8, me.v * 0.03) && me.v < 25) {
        me.s += dist; me.v = 0;
        me.dwellUntil = t + DWELL + Math.random() * 0.6;
        return 0;
      }
      const need = (me.v * me.v) / (2 * Math.max(dist, 0.5));
      return need >= BRAKE ? -need : null;
    }

    // Tren rápido: sale cuando el tren de la vía A lleva un rato parado, para que se le vea esperar
    function stepExpress(dt) {
      const regional = tracks[0].trains[0];
      if (!express && t >= expressNext && regional.dwellUntil > t && regional.dwellUntil - t < DWELL - 1.2) {
        express = { x: W + 20 };
      }
      if (!express) return;
      express.x -= EXPRESS_SPEED * dt;
      if (express.x + EXPRESS_LEN < -20) {
        express = null;
        expressNext = t + EXPRESS_EVERY[0] + Math.random() * (EXPRESS_EVERY[1] - EXPRESS_EVERY[0]);
      }
    }

    // ¿El tren rápido aún no ha dejado atrás la estación?
    const expressPending = () => express && express.x + EXPRESS_LEN > station.x0 - 10;

    function step(dt) {
      t += dt;
      stepRadio(dt);
      stepExpress(dt);
      for (const tr of tracks) {
        const n = tr.trains.length;
        const cruise = 105 + 30 * Math.sin(t * 0.17 + tr.phase * 2.1);

        // Ciclo de desacople / reacople del último tren
        if (n > 1 && t > tr.nextToggle) {
          const tail = tr.trains[n - 1];
          tail.coupled = !tail.coupled;
          tr.nextToggle = t + (tail.coupled ? 9 + Math.random() * 4 : 3.2 + Math.random() * 1.5);
        }

        for (let i = 0; i < n; i++) {
          const me = tr.trains[i];
          const ahead = tr.trains[mod(i - 1, n)];
          const gap = mod(ahead.s - ahead.len - me.s, L);
          let a;

          // Parado en el andén; en la vía A se espera además a que pase el tren rápido
          const canHold = tr === tracks[0] && me.dwellUntil > 0 && expressPending();
          if (canHold && me.dwellUntil <= t) { me.dwellUntil = t + 0.05; me.holding = true; }
          if (!canHold) me.holding = false;
          if (me.dwellUntil > t) { me.v = 0; continue; }
          if (me.dwellUntil > 0) { me.dwellUntil = 0; me.leaving = true; }
          if (me.leaving) {
            const past = mod(me.s - stopPoint(tr, i), L);
            if (past > 30 && past < L / 2) me.leaving = false;
          }

          if (i === 0) {
            a = 1.4 * (cruise - me.v);
          } else if (me.coupled) {
            const desired = STOP_GAP + 0.12 * me.v;
            a = 2.0 * (gap - desired) + 2.6 * (ahead.v - me.v);
          } else {
            a = 1.2 * (cruise * 0.55 - me.v);
          }

          // El líder y los trenes desacoplados paran por su cuenta; los acoplados siguen al de delante
          if (i === 0 || !me.coupled) {
            const b = stationBrake(tr, i, me);
            if (b !== null) {
              if (me.dwellUntil > t) continue;
              a = Math.min(a, b);
            }
          }

          // Protección anticolisión para cualquier tren (incluido el líder tras dar la vuelta)
          const safe = 10 + (me.v * me.v) / (2 * 300);
          if (gap < safe) a = Math.min(a, -300);

          a = clamp(a, -320, 130);
          me.v = clamp(me.v + a * dt, 0, 190);
          me.s += me.v * dt;

          if (i > 0 || gap < 60) {
            const g2 = mod(ahead.s - ahead.len - me.s, L);
            if (g2 < 3 || g2 > L - 10) { me.s = ahead.s - ahead.len - 3; me.v = Math.min(me.v, ahead.v); }
          }
        }
      }
    }

    // RBC: ondas que se expanden hasta su alcance; al pasar por un tren le renuevan la MA
    function stepRadio(dt) {
      for (const tr of tracks) {
        for (const tn of tr.trains) tn.maFlash = Math.max(0, tn.maFlash - dt * 1.4);
        for (const b of tr.balises) b.flash = Math.max(0, b.flash - dt * 1.5);
      }
      if (t >= waveNext) {
        waveNext = t + WAVE_EVERY;
        waves.push({ start: t, hit: new Set() });
      }
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        const r = (t - w.start) * WAVE_SPEED;
        if (r > MA_RANGE) { waves.splice(i, 1); continue; }
        for (const tr of tracks) {
          for (const tn of tr.trains) {
            if (w.hit.has(tn)) continue;
            const d = Math.hypot(toX(tr, tn.s) - rbcX, tr.y - RBC_TOP);
            if (d <= r) { w.hit.add(tn); tn.maFlash = 1; }
          }
        }
      }
    }

    // Detecta el paso de la cabeza de cada tren sobre las balizas
    function checkBalises() {
      for (const tr of tracks) {
        for (const tn of tr.trains) {
          const x = toX(tr, tn.s);
          if (tn.prevX !== null && tn.prevX !== x && Math.abs(x - tn.prevX) < 50) {
            for (const b of tr.balises) {
              if ((tn.prevX - b.x) * (x - b.x) <= 0) b.flash = 1;
            }
          }
          tn.prevX = x;
        }
      }
    }

    function drawTrack(tr) {
      const y = tr.y;
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y + 8.5); ctx.lineTo(W, y + 8.5);
      ctx.moveTo(0, y + 12.5); ctx.lineTo(W, y + 12.5);
      ctx.stroke();
      // traviesas, desplazadas ligeramente para dar sensación de profundidad
      ctx.beginPath();
      for (let x = 0; x < W; x += 16) { ctx.moveTo(x, y + 6); ctx.lineTo(x + 3, y + 15); }
      ctx.stroke();

      // Eurobalizas (en pareja) entre los carriles
      for (const b of tr.balises) {
        ctx.fillStyle = withAlpha(colors.muted, 0.45);
        ctx.fillRect(b.x - 7, y + 9, 5, 3);
        ctx.fillRect(b.x + 2, y + 9, 5, 3);
        if (b.flash > 0) {
          ctx.save();
          ctx.globalAlpha = b.flash;
          ctx.shadowColor = colors.accent;
          ctx.shadowBlur = 10;
          ctx.fillStyle = colors.accent;
          ctx.fillRect(b.x - 7, y + 9, 5, 3);
          ctx.fillRect(b.x + 2, y + 9, 5, 3);
          ctx.restore();
        }
      }
    }

    function drawStars() {
      if (!night) return;
      for (const s of stars) {
        ctx.fillStyle = withAlpha(colors.text, 0.25 + 0.3 * Math.sin(t * 1.3 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Vía de paso del fondo (más tenue por estar lejos) y el tren rápido si está pasando
    function drawThrough() {
      const y = through.y;
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y + 8.5); ctx.lineTo(W, y + 8.5);
      ctx.moveTo(0, y + 12.5); ctx.lineTo(W, y + 12.5);
      for (let x = 0; x < W; x += 16) { ctx.moveTo(x, y + 6); ctx.lineTo(x + 3, y + 15); }
      ctx.stroke();
      ctx.restore();
      if (!express) return;

      // más apagado que los trenes de delante, como su vía: está lejos
      ctx.save();
      ctx.globalAlpha = 0.5;
      const top = y - TRAIN_H + 7;
      const body = colors.muted;
      for (let c = 0; c < EXPRESS_CARS; c++) {
        const cx = express.x + c * (CAR_LEN + CAR_GAP);
        if (cx > W + 10 || cx + CAR_LEN < -10) continue;
        // morro aerodinámico en cabeza (izquierda) y cola (derecha)
        const radii = c === 0 ? [10, 2, 2, 4] : c === EXPRESS_CARS - 1 ? [2, 10, 4, 2] : 2;
        ctx.fillStyle = body;
        roundRect(cx, top, CAR_LEN, TRAIN_H, radii);
        ctx.fill();
        // franja de ventanas corrida y línea de color
        const x0 = cx + (c === 0 ? 12 : 4), x1 = cx + CAR_LEN - (c === EXPRESS_CARS - 1 ? 12 : 4);
        drawWindows(() => ctx.fillRect(x0, top + 3, x1 - x0, 3.5));
        ctx.fillStyle = colors.accent2;
        ctx.fillRect(cx + (c === 0 ? 6 : 0), top + TRAIN_H - 4, CAR_LEN - (c === 0 || c === EXPRESS_CARS - 1 ? 6 : 0), 1.5);
      }
      drawLights(express.x + 1, express.x + EXPRESS_LEN - 3, top);
      ctx.restore();
    }

    // Ventanas: color de fondo de día, encendidas en cálido de noche
    function drawWindows(paint) {
      ctx.save();
      if (night) {
        ctx.fillStyle = WINDOW_NIGHT;
        ctx.shadowColor = WINDOW_NIGHT;
        ctx.shadowBlur = 4;
      } else {
        ctx.fillStyle = colors.bg;
      }
      paint();
      ctx.restore();
    }

    // Faro (blanco) y luz de cola (roja); de noche con halo
    function drawLights(headX, tailX, top) {
      ctx.save();
      ctx.globalAlpha *= 0.85;
      if (night) { ctx.shadowColor = '#fff'; ctx.shadowBlur = 8; }
      ctx.fillStyle = '#fff';
      ctx.fillRect(headX, top + TRAIN_H - 5, 2, 2);
      if (night) ctx.shadowColor = '#ff4f4f';
      ctx.fillStyle = '#ff4f4f';
      ctx.fillRect(tailX, top + TRAIN_H - 5, 2, 2);
      ctx.restore();
    }

    // Marquesina (detrás de la vía A): tejado, pilares, luces y cartel con reloj / cuenta atrás
    function drawCanopy() {
      const x0 = station.x0, x1 = station.x1, w = x1 - x0;

      // pilares hasta el andén
      ctx.fillStyle = withAlpha(colors.muted, 0.22);
      const cols = 4;
      for (let k = 0; k < cols; k++) {
        const x = x0 + 14 + k * (w - 28) / (cols - 1);
        ctx.fillRect(x - 1.5, ROOF_Y + 4, 3, PLAT_TOP - ROOF_Y - 4);
      }

      // tejado: losa con alero inclinado en los extremos
      ctx.fillStyle = withAlpha(colors.muted, 0.3);
      ctx.beginPath();
      ctx.moveTo(x0 - 12, ROOF_Y + 5);
      ctx.lineTo(x0 - 4, ROOF_Y);
      ctx.lineTo(x1 + 4, ROOF_Y);
      ctx.lineTo(x1 + 12, ROOF_Y + 5);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = withAlpha(colors.accent, 0.55);
      ctx.beginPath();
      ctx.moveTo(x0 - 4, ROOF_Y + 0.5); ctx.lineTo(x1 + 4, ROOF_Y + 0.5);
      ctx.stroke();

      // luces bajo el tejado: de noche encendidas, con un cono de luz hasta el andén
      for (let k = 0; k < cols - 1; k++) {
        const x = x0 + 14 + (k + 0.5) * (w - 28) / (cols - 1);
        if (night) {
          const g = ctx.createLinearGradient(0, ROOF_Y + 7, 0, PLAT_TOP);
          g.addColorStop(0, withAlpha(WINDOW_NIGHT, 0.16));
          g.addColorStop(1, withAlpha(WINDOW_NIGHT, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(x - 4, ROOF_Y + 7); ctx.lineTo(x + 4, ROOF_Y + 7);
          ctx.lineTo(x + 22, PLAT_TOP); ctx.lineTo(x - 22, PLAT_TOP);
          ctx.closePath();
          ctx.fill();
        }
        ctx.save();
        if (night) { ctx.shadowColor = WINDOW_NIGHT; ctx.shadowBlur = 8; }
        ctx.fillStyle = night ? WINDOW_NIGHT : withAlpha(colors.muted, 0.5);
        ctx.fillRect(x - 4, ROOF_Y + 6, 8, 1.5);
        ctx.restore();
      }

      // cartel colgante: nombre y, debajo, reloj o cuenta atrás de la parada
      const bw = 70, bh = 22, bx = x0 + w / 2 - bw / 2, by = ROOF_Y + 10;
      ctx.strokeStyle = withAlpha(colors.muted, 0.5);
      ctx.beginPath();
      ctx.moveTo(bx + 10, ROOF_Y + 5); ctx.lineTo(bx + 10, by);
      ctx.moveTo(bx + bw - 10, ROOF_Y + 5); ctx.lineTo(bx + bw - 10, by);
      ctx.stroke();
      ctx.fillStyle = colors.bg;
      roundRect(bx, by, bw, bh, 3);
      ctx.fill();
      ctx.strokeStyle = withAlpha(colors.accent, 0.6);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.font = '700 8.5px "JetBrains Mono", monospace';
      ctx.fillStyle = colors.accent;
      ctx.fillText(STATION_NAME, bx + bw / 2, by + 9);

      const dwell = tracks.map((tr) => Math.max(...tr.trains.map((tn) => tn.dwellUntil - t)));
      const holding = tracks.map((tr) => tr.trains.some((tn) => tn.holding));
      let info;
      if (dwell.some((d) => d > 0)) {
        info = dwell.map((d, k) => (k ? 'B ' : 'A ') + (holding[k] ? '···' : d > 0 ? d.toFixed(1) + 's' : '--')).join(' ');
      } else {
        const now = new Date();
        info = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      }
      ctx.font = '7.5px "JetBrains Mono", monospace';
      ctx.fillStyle = colors.muted;
      ctx.fillText(info, bx + bw / 2, by + 18);
    }

    // Andén central (entre la vía A y la B): superficie con franja de seguridad y frente
    function drawPlatform() {
      const x0 = station.x0, x1 = station.x1;
      ctx.fillStyle = withAlpha(colors.muted, 0.12);
      ctx.fillRect(x0, PLAT_TOP + 4, x1 - x0, PLAT_BOTTOM - PLAT_TOP - 4);
      ctx.fillStyle = withAlpha(colors.muted, 0.3);
      ctx.fillRect(x0 - 2, PLAT_TOP, x1 - x0 + 4, 4);
      // franja amarilla de seguridad
      ctx.strokeStyle = 'rgba(255,196,64,.55)';
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(x0, PLAT_TOP + 1.5); ctx.lineTo(x1, PLAT_TOP + 1.5);
      ctx.stroke();
      ctx.setLineDash([]);
      // juntas del frente del andén
      ctx.strokeStyle = withAlpha(colors.muted, 0.12);
      ctx.beginPath();
      for (let x = x0 + 20; x < x1; x += 20) { ctx.moveTo(x + 0.5, PLAT_TOP + 5); ctx.lineTo(x + 0.5, PLAT_BOTTOM); }
      ctx.stroke();
    }

    function drawTrain(tr, train, isLeader) {
      const xf = toX(tr, train.s);            // frente
      const d = tr.dir;
      const x0 = d > 0 ? xf - train.len : xf;
      if (x0 > W + 20 || x0 + train.len < -20) return;
      const y = tr.y - TRAIN_H + 7;

      // Autoridad de movimiento (moving block) delante del tren; se aviva al recibir una MA
      const auth = 16 + (train.v * train.v) / (2 * 120) + 14 * train.maFlash;
      const g = ctx.createLinearGradient(xf, 0, xf + d * auth, 0);
      g.addColorStop(0, withAlpha(colors.accent, 0.22 + 0.4 * train.maFlash));
      g.addColorStop(1, withAlpha(colors.accent, 0));
      ctx.fillStyle = g;
      ctx.fillRect(Math.min(xf, xf + d * auth), y + 2, auth, TRAIN_H - 4);

      // Coches: cabina redondeada delante y, si hay varios, también en el último
      const body = train.coupled || isLeader ? colors.accent : colors.accent2;
      const noseFront = d > 0 ? [2, 7, 2, 2] : [7, 2, 2, 2];
      const noseRear = d > 0 ? [7, 2, 2, 2] : [2, 7, 2, 2];
      for (let c = 0; c < train.cars; c++) {
        const off = c * (CAR_LEN + CAR_GAP);
        const cx = d > 0 ? xf - off - CAR_LEN : xf + off;
        const radii = c === 0 ? noseFront : c === train.cars - 1 ? noseRear : 2;
        ctx.fillStyle = body;
        roundRect(cx, y, CAR_LEN, TRAIN_H, radii);
        ctx.fill();

        // ventanas
        drawWindows(() => {
          for (let k = 0; k < 5; k++) {
            const wx = d > 0 ? cx + 6 + k * 9 : cx + CAR_LEN - 12 - k * 9;
            ctx.fillRect(wx, y + 3, 6, 4);
          }
        });

        // enganche con el coche siguiente
        if (c < train.cars - 1) {
          ctx.fillStyle = withAlpha(colors.muted, 0.6);
          ctx.fillRect(d > 0 ? cx - CAR_GAP : cx + CAR_LEN, y + TRAIN_H - 6, CAR_GAP, 2);
        }
      }

      // Faro delante y luz de cola detrás
      const xr = xf - d * train.len;
      drawLights(d > 0 ? xf - 3 : xf + 1, d > 0 ? xr + 1 : xr - 3, y);
    }

    function drawRbc() {
      const x = rbcX;
      const base = tracks[0].y + 6;
      // mástil de celosía que se estrecha hacia arriba
      const half = (y) => 1 + 3 * (y - RBC_TOP) / (base - RBC_TOP);
      ctx.strokeStyle = colors.muted;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - half(base), base); ctx.lineTo(x - 1, RBC_TOP + 6);
      ctx.moveTo(x + half(base), base); ctx.lineTo(x + 1, RBC_TOP + 6);
      let side = 1;
      for (let y = base; y - 8 > RBC_TOP + 6; y -= 8, side = -side) {
        ctx.moveTo(x - side * half(y), y); ctx.lineTo(x + side * half(y - 8), y - 8);
      }
      ctx.stroke();
      // antenas
      ctx.fillStyle = colors.muted;
      ctx.fillRect(x - 5, RBC_TOP + 2, 3, 7);
      ctx.fillRect(x + 2, RBC_TOP + 2, 3, 7);
      ctx.globalAlpha = 1;
      // luz intermitente en lo alto
      const blink = (Math.sin(t * 3) + 1) / 2;
      ctx.save();
      ctx.shadowColor = colors.accent2;
      ctx.shadowBlur = 8 * blink;
      ctx.fillStyle = withAlpha(colors.accent2, 0.4 + 0.6 * blink);
      ctx.beginPath();
      ctx.arc(x, RBC_TOP, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawWaves() {
      ctx.lineWidth = 1;
      for (const w of waves) {
        const r = (t - w.start) * WAVE_SPEED;
        const a = 0.28 * (1 - r / MA_RANGE);
        if (a <= 0 || r < 2) continue;
        ctx.strokeStyle = withAlpha(colors.accent2, a);
        ctx.beginPath();
        ctx.arc(rbcX, RBC_TOP, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Enlace "virtual" entre la cola de a y el frente de b (arriba en la vía A, abajo en la B)
    function drawLink(tr, a, b, below) {
      const xa = toX(tr, a.s - a.len);
      const xb = toX(tr, b.s);
      if (Math.abs(xa - xb) > W / 2) return; // cruzando el borde del bucle
      const y = below ? tr.y + 19 : tr.y - TRAIN_H - 2;
      const tick = below ? -5 : 6;
      ctx.strokeStyle = withAlpha(colors.accent, 0.7);
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(xb, y + tick); ctx.lineTo(xb, y); ctx.lineTo(xa, y); ctx.lineTo(xa, y + tick);
      ctx.stroke();
      ctx.setLineDash([]);
      const gapM = Math.round(Math.abs(xa - xb) * METERS);
      ctx.fillStyle = colors.muted;
      ctx.font = '9.5px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Δ' + gapM + 'm', (xa + xb) / 2, below ? y + 10 : y - 3);
    }

    function drawTrackWithTrains(tr, below) {
      drawTrack(tr);
      const n = tr.trains.length;
      for (let i = 1; i < n; i++) if (tr.trains[i].coupled) drawLink(tr, tr.trains[i - 1], tr.trains[i], below);
      for (let i = 0; i < n; i++) drawTrain(tr, tr.trains[i], i === 0);
    }

    function draw() {
      if (frame++ % 30 === 0) readColors();
      ctx.clearRect(0, 0, W, H);
      drawStars();
      drawWaves();
      drawThrough();
      drawRbc();
      drawCanopy();
      drawTrackWithTrains(tracks[0], false);
      drawPlatform();
      drawTrackWithTrains(tracks[1], true);
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (!visible) { last = now; return; }
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      // subpasos para que el control sea estable aunque baje el framerate
      const sub = 3;
      for (let k = 0; k < sub; k++) step(dt / sub);
      checkBalises();
      draw();
    }

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
      ctx.rect(x, y, w, h);
    }

    function withAlpha(color, a) {
      if (color[0] === '#' && color.length === 7) {
        const n = parseInt(color.slice(1), 16);
        return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
      }
      return color;
    }

    readColors();
    resize();
    // Colocar los convoyes escalonados en pantalla desde el principio
    tracks.forEach((tr, k) => {
      let s = MARGIN + W * (0.55 + 0.25 * k);
      for (const tn of tr.trains) { tn.s = s; s -= tn.len + 26; }
    });

    const ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas); else window.addEventListener('resize', resize);
    const io = window.IntersectionObserver ? new IntersectionObserver((es) => { visible = es[0].isIntersecting; }) : null;
    if (io) io.observe(canvas);

    if (reduce) { draw(); } else { raf = requestAnimationFrame(loop); }

    return function destroy() {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
      if (io) io.disconnect();
    };
  }

  window.RailHero = { mount };
})();
