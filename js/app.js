/* ===== Blush y Bloom · lógica v2 ===== */
const $ = id => document.getElementById(id);
const fmt = n => '$' + n.toLocaleString('es-CO');
const wa = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Pone una imagen de fondo solo si el archivo existe (si no, se queda el degradado rosado)
const bgImg = (el, url) => { const i = new Image(); i.onload = () => { el.style.backgroundImage = `url("${url}")`; el.classList.add('has'); }; i.src = url; };

/* ---------- Contacto ---------- */
$('wab').href = $('cwa').href = wa('Hola, quiero más información de Blush y Bloom');
$('cig').href = 'https://instagram.com/' + INSTAGRAM; $('cigt').textContent = '@' + INSTAGRAM; $('cnq').textContent = NEQUI;

/* ---------- INICIO: textos + producto 3D que gira en horizontal ---------- */
$('hword').textContent = HERO.word;
$('hln').textContent = HERO.left.n;  $('hlt').innerHTML = HERO.left.t;
$('hrn').textContent = HERO.right.n; $('hrt').innerHTML = HERO.right.t;
$('hspecs').innerHTML = HERO.specs.map(s => `<li>${s}</li>`).join('');
$('hfall').src = HERO.fallback; $('hfall').alt = 'Producto principal';

if (window.THREE && THREE.GLTFLoader && HERO.model) {
  const c = $('hero3d'), r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.25;
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, .1, 100), holder = new THREE.Group();
  cam.position.set(0, 0, 9); scene.add(holder);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xffb0b8, .55));
  const key = new THREE.DirectionalLight(0xffffff, .85); key.position.set(2, 4, 6); scene.add(key);
  const rim = new THREE.PointLight(0xffc0c8, .9, 30); rim.position.set(-4, 2, -3); scene.add(rim);
  let fit = 1;
  const size = () => {
    const w = c.clientWidth, h = c.clientHeight; r.setSize(w, h, false);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    holder.scale.setScalar(fit * Math.min(1, Math.max(.55, cam.aspect / .8)));
  };
  const loader = new THREE.GLTFLoader();                       // acepta .glb/.gltf, también comprimidos (Draco / Meshopt)
  if (THREE.DRACOLoader) loader.setDRACOLoader(new THREE.DRACOLoader().setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/draco/gltf/'));
  if (window.MeshoptDecoder) loader.setMeshoptDecoder(MeshoptDecoder);
  loader.load(HERO.model, g => {
    const m = g.scene, b = new THREE.Box3().setFromObject(m);
    m.position.sub(b.getCenter(new THREE.Vector3()));      // lo centra
    fit = 2.9 / b.getSize(new THREE.Vector3()).y;           // lo ajusta a la altura de la pantalla
    holder.add(m); holder.position.y = -.1; size();
    $('hfall').style.display = 'none';
    const t0 = performance.now();
    (function loop() {
      requestAnimationFrame(loop);
      holder.rotation.y = calm ? .4 : (performance.now() - t0) / 1000 * .5;   // 360° horizontal, quieto en vertical
      r.render(scene, cam);
    })();
  }, undefined, err => {                                      // si no hay modelo, queda la imagen
    r.dispose(); console.error('[3D] No se pudo cargar ' + HERO.model, err);
    const dev = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    if (dev) { const m = $('h3dmsg'); m.hidden = false;       // aviso solo para ti mientras desarrollas
      m.textContent = location.protocol === 'file:' ? 'El modelo 3D no carga abriendo el archivo con doble clic. Ábrelo con Live Server (VS Code) o súbelo a un hosting.' : 'No cargó ' + HERO.model + '. Revisa que el archivo exista con ese nombre exacto (.glb) en la carpeta models y mira la consola (F12).'; }
  });
  addEventListener('resize', size);
}

/* ---------- MARCAS + PRODUCTOS DE LADO A LADO ---------- */
let brand = 'Todas', query = '', unit = 0, pos = 0, paused = false;
const mq = $('mq'), brands = ['Todas', ...new Set(PRODUCTS.map(p => p.brand))];
const itemHTML = p => `<a class="item" href="${wa('Hola, quiero ' + p.name + ' ' + p.brand)}"><span class="tag">NUEVO</span><span class="im"><img src="${p.img}" alt="${p.name}"></span><h3>${p.name}</h3><span class="pr">${fmt(p.price)}</span></a>`;
function build() {
  $('chips').innerHTML = brands.map(b => `<button class="chip${b === brand ? ' on' : ''}" data-b="${b}">${b}</button>`).join('');
  $('ptitle').textContent = brand === 'Todas' ? 'Nuevos' : brand;
  const list = PRODUCTS.filter(p => (brand === 'Todas' || p.brand === brand) && (p.name + ' ' + p.brand).toLowerCase().includes(query));
  if (!list.length) { mq.innerHTML = '<p class="empty">No encontramos ese producto.</p>'; unit = 0; return; }
  const one = list.map(itemHTML).join('');
  mq.innerHTML = one; unit = mq.firstElementChild.offsetWidth * list.length;
  mq.innerHTML = one.repeat(Math.ceil(mq.clientWidth / unit) + 2);
  pos = unit; mq.scrollLeft = pos;
}
(function tick() {
  if (unit && !paused && !calm) { pos += .55; if (pos >= 2 * unit) pos -= unit; mq.scrollLeft = pos; }
  requestAnimationFrame(tick);
})();
mq.addEventListener('scroll', () => {           // si la usuaria desliza a mano, seguimos desde ahí
  if (!paused || !unit) return; pos = mq.scrollLeft;
  if (pos >= 2 * unit) { pos -= unit; mq.scrollLeft = pos; } else if (pos < 2) { pos += unit; mq.scrollLeft = pos; }
});
const sync = () => { pos = mq.scrollLeft; paused = false; };
mq.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') paused = true; });
mq.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') sync(); });
mq.addEventListener('touchstart', () => paused = true, { passive: true });
mq.addEventListener('touchend', () => setTimeout(sync, 1800), { passive: true });
$('chips').addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; brand = c.dataset.b; build(); $('productos').scrollIntoView({ behavior: 'smooth' }); });
$('vt').onclick = () => { brand = 'Todas'; query = ''; $('q').value = ''; build(); };
$('q').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); build(); });
$('q').addEventListener('keydown', e => { if (e.key === 'Enter') $('productos').scrollIntoView({ behavior: 'smooth' }); });
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(build, 250); });
build();

/* ---------- IMAGEN GRANDE ---------- */
$('bnl').textContent = BANNER.left; $('bnr').textContent = BANNER.right; bgImg($('banner'), BANNER.img);

/* ---------- UN PRODUCTO, VARIOS TONOS ---------- */
$('ttitle').textContent = TONOS_TITULO;
$('tcols').innerHTML = TONOS.map(t => `<div class="tc rv"><div class="lb"><span>${t.n}</span><span>${t.name}</span></div><img src="${t.img}" alt="${t.name}" loading="lazy"></div>`).join('');

/* ---------- VIDEO A PANTALLA COMPLETA ---------- */
const v = $('vid');
if (VIDEO_SRC) {
  v.src = VIDEO_SRC;
  v.addEventListener('loadeddata', () => $('vslot').remove());
  v.addEventListener('error', () => v.remove());
  const p = v.play(); if (p) p.catch(() => {});
}

/* ---------- IMÁGENES CON MENSAJES ---------- */
$('moti').innerHTML = MOTI.map(m => `<article class="pn"><span class="slot">Tu imagen aquí · ${m.img}</span><div class="tx"><small>${m.n}</small><h3>${m.t}</h3></div></article>`).join('');
document.querySelectorAll('.pn').forEach((el, i) => bgImg(el, MOTI[i].img));

/* ---------- Menú y aparición suave ---------- */
$('burger').onclick = () => $('nav').classList.toggle('open');
document.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => $('nav').classList.remove('open')));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));