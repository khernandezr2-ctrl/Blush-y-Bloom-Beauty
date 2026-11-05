/* =====================================================
   CONFIGURA AQUÍ: todo lo que cambias sin tocar el resto
   ===================================================== */
const WA = '573127776525';              // tu WhatsApp con el 57 delante
const INSTAGRAM = 'blushybloombeauty'; // tu usuario de Instagram (sin @)
const NEQUI = '312 777 6525';           // tu número de Nequi

/* ---------- INICIO (fondo rosado + producto 3D girando) ---------- */
const HERO = {
  model: 'img/producto1.glb',         // tu objeto 3D (formato .glb) — pon el archivo en la carpeta /models
  fallback: 'img/celestial-base.webp',  // imagen que se ve mientras carga o si no hay modelo 3D
  word: 'BLOOM',                        // palabra gigante detrás del producto
  left:  { n: '001.', t: 'Blush y Bloom<br>Beauty' },
  right: { n: '002.', t: 'Nueva colección<br>Diciembre' },
  specs: ['Cobertura alta · SPF 50+', 'Acabado natural 24 h', '30 ml']   // especificaciones del producto principal
};

/* ---------- IMAGEN GRANDE (después de los productos) ---------- */
const BANNER = { img: 'img/PolvocompactoSamy.png', left: 'Glow Season', right: 'New Drop' };

/* ---------- UN PRODUCTO CON VARIOS TONOS ---------- */
const TONOS_TITULO = 'Un producto, todos tus tonos.';
const TONOS = [
  { n: '', name: 'Tono 01', img: 'img/1CorrectorOG .png' },
  { n: '', name: 'Tono 02', img: 'img/2CorrectorOG.png' },
  { n: '', name: 'Tono 03', img: 'img/3Corrector.png' },
  { n: '', name: 'Tono 04', img: 'img/4Corrector.png' }
];

/* ---------- VIDEO A PANTALLA COMPLETA ---------- */
const VIDEO_SRC = 'video/promo.mp4';    // pon tu video en la carpeta /video

/* ---------- IMÁGENES CON MENSAJES (belleza de la mujer) ---------- */
const MOTI = [
  { img: 'img/descarga.jpg', n: '.', t: '' },
  { img: 'img/descarga (1).jpg', n: '.', t: '' },
  { img: 'img/SHINE BABY.jpg', n: '.', t: '' }
];

/* ---------- PRODUCTOS (price: pon tus precios reales; los de abajo son de ejemplo) ---------- */
const PRODUCTS = [
  { name:'Base Celestial 24H',        brand:'Mis Cosmetics', price:45900, img:'img/celestial-base.webp' },
  { name:'Correctores Ani-K',         brand:'Ani-K',         price:29900, img:'img/anik-correctores.webp' },
  { name:'Sombras brillantes',        brand:'Atenea',        price:32900, img:'img/atenea-sombras.webp' },
  { name:'Rubores cremosos',          brand:'Sagui',         price:24900, img:'img/sagui-rubores.webp' },
  { name:'Blush en polvo',            brand:'Samy',          price:19900, img:'img/samy-blush.webp' },
  { name:'Polvo suelto',              brand:'Girly',         price:27900, img:'img/girly-polvo-suelto.webp' },
  { name:'Spray fijador Dixy Fix',    brand:'Montoc',        price:34900, img:'img/dixyfix-espejo.webp' },
  { name:'Glued Styling Glue',        brand:'Got2b',         price:26900, img:'img/got2b-glued.webp' },
  { name:'Cherry Gloss',              brand:'Cherry Gloss',  price:15900, img:'img/cherry-gloss.webp' },
  { name:'Polvo compacto',            brand:'Samy',          price:22900, img:'img/samy-compactos.webp' },
  { name:'Crema compacta',            brand:'Atenea',        price:28900, img:'img/atenea-crema.webp' },
  { name:'Polvo suelto dúo',          brand:'Samy',          price:23900, img:'img/samy-sueltos.webp' },
  { name:'Dúo de rubor cremoso',      brand:'Dolce & Bella', price:21900, img:'img/dolcebella-duo.webp' },
  { name:'Paleta de rubores',         brand:'Atenea',        price:39900, img:'img/atenea-paleta.webp' },
  { name:'Paleta Glamblack',          brand:'Atenea',        price:42900, img:'img/atenea-glamblack.webp' },
  { name:'Corrector Get Picture Ready', brand:'Outdoor Girl', price:25900, img:'img/og-correctores.webp' },
  { name:'Soft Powder translúcido',   brand:'Montoc',        price:36900, img:'img/montoc-soft-powder.webp' },
  { name:'Dixy Fix',                  brand:'Montoc',        price:32900, img:'img/dixyfix.webp' },
  { name:'Blush líquido Cheek to Cheek', brand:'Ruby Rose',  price:23900, img:'img/rubyrose-blush.webp' }
];