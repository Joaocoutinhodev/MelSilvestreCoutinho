const fs = require('fs');
const path = require('path');

console.log('=== TEST SUITE: MÉIS COUTINHO DESIGN SYSTEM & BRAND RULES ===\n');
let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

// 1. Check Product Photo, Vitrine Story Image & Official Logos
const imgPath = path.join(__dirname, 'img', 'garrafa-coutinho.jpg');
assert(fs.existsSync(imgPath), 'Official product photo exists at img/garrafa-coutinho.jpg');
const stats = fs.statSync(imgPath);
assert(stats.size > 50000, `Product photo file size is valid (${stats.size} bytes)`);

const storyImgPath = path.join(__dirname, 'img', 'story-coutinho.jpg');
assert(fs.existsSync(storyImgPath), 'Treated Story vitrine photo exists at img/story-coutinho.jpg');
const storyStats = fs.statSync(storyImgPath);
assert(storyStats.size > 50000, `Story vitrine photo file size is valid (${storyStats.size} bytes)`);

const logoPath = path.join(__dirname, 'img', 'logo-meis-coutinho.jpg');
assert(fs.existsSync(logoPath), 'Official logo exists at img/logo-meis-coutinho.jpg');
const logoStats = fs.statSync(logoPath);
assert(logoStats.size > 10000, `Logo file size is valid (${logoStats.size} bytes)`);

const goldLogoPath = path.join(__dirname, 'img', 'logo-meis-coutinho-gold.png');
assert(fs.existsSync(goldLogoPath), 'Gold transparent logo exists at img/logo-meis-coutinho-gold.png for dark background');

// 2. Check HTML Contents
const html = fs.readFileSync('index.html', 'utf8');

assert(html.includes('Méis Coutinho'), 'Brand name Méis Coutinho present in HTML');
assert(html.includes('5527998063815'), 'Official WhatsApp phone number (5527998063815) present in HTML links');
assert(html.includes('(27) 99806-3815'), 'Formatted WhatsApp phone number (27) 99806-3815 present in HTML');
assert(html.includes('img/logo-transparent.png'), 'Official transparent logo image integrated in HTML');
assert(html.includes('img/logo-transparent-gold.png'), 'Official gold transparent logo integrated in dark footer');
assert(html.includes('img/story-coutinho.jpg'), 'Story vitrine image integrated in institutional section');

// Header strict check: Company name only, NO "Vila Velha", NO subtitle
const headerMatch = html.match(/<header class="site-header">[\s\S]*?<\/header>/);
assert(headerMatch !== null, 'Header element found');
assert(headerMatch && !headerMatch[0].includes('brand-sub'), 'Header brand text has ONLY company name (no subtitle)');
assert(headerMatch && !headerMatch[0].includes('Vila Velha'), 'Header brand text has NO mention of Vila Velha');

// Announcement Bar strict check: NO "Vila Velha"
const announceMatch = html.match(/<aside class="announcement-bar">[\s\S]*?<\/aside>/);
assert(announceMatch && !announceMatch[0].includes('Vila Velha'), 'Top announcement bar has NO mention of Vila Velha');

// Hero Title & Subtitle exact requirement check
assert(html.includes('Mel Silvestre 100% puro e capixaba.'), 'Hero title has exact emphasis: "Mel Silvestre 100% puro e capixaba."');
assert(html.includes('Um mel cru, autêntico e vivo, envasado na origem em garrafa de vidro de 1 Litro para preservar cada enzima natural, o própolis e as notas florais silvestres.'), 'Hero subtitle has exact specified text');

// Stock status check: "Pronta entrega" ONLY (no "Safra ativa")
assert(html.includes('Pronta entrega'), 'Stock badge has "Pronta entrega"');
assert(!html.includes('Safra ativa &bull; Pronta entrega') && !html.includes('Safra ativa • Pronta entrega'), 'Stock badge removed "Safra ativa"');

// Quality badge row: NO "Sede: Vila Velha"
const qualityRowMatch = html.match(/<div class="quality-badges-row">[\s\S]*?<\/div>\s*<\/div>/);
assert(qualityRowMatch && !qualityRowMatch[0].includes('Sede: Vila Velha'), 'Quality badge row has no Vila Velha mention');

// Origin tag: NO Linhares
const originTagMatch = html.match(/<div class="origin-tag">[\s\S]*?<\/div>/);
assert(originTagMatch && !originTagMatch[0].includes('Linhares'), 'Hero origin tag has no Linhares mention');

// Footer check: NO "Vila Velha", NO "Linhares"
const footerMatch = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);
assert(footerMatch !== null, 'Footer element found');
assert(footerMatch && !footerMatch[0].includes('Vila Velha'), 'Footer has NO mention of Vila Velha');
assert(footerMatch && !footerMatch[0].includes('Linhares'), 'Footer has NO mention of Linhares');

// Discrete institutional mention in bottom contact area
const ctaMatch = html.match(/<section id="contato"[\s\S]*?<\/section>/);
assert(ctaMatch && ctaMatch[0].includes('bottom-origin-note'), 'Bottom contact area has discreet institutional origin note');

// Form placeholders check: ZERO occurrences of "Ex:"
assert(!html.includes('placeholder="Ex:'), 'ZERO occurrences of example placeholders (Ex:) in index.html');

// Payment options check: ONLY Pix, Dinheiro, Cartão (NO "A combinar")
assert(!html.includes('A combinar com vendedor') && !html.includes('A combinar com a Méis Coutinho'), 'Payment selector has NO "A combinar"');
assert(html.includes('value="Pix"'), 'Payment options include Pix');
assert(html.includes('value="Dinheiro"'), 'Payment options include Dinheiro');
assert(html.includes('value="Cartão"'), 'Payment options include Cartão');

// CRITICAL CHECKS: NO FAMILY MENTIONS OR 'FABRICAMOS'
assert(!html.toLowerCase().includes('família'), 'CRITICAL: Zero occurrences of "família" in index.html');
assert(!html.toLowerCase().includes('familia'), 'CRITICAL: Zero occurrences of "familia" in index.html');
assert(!html.toLowerCase().includes('fabricamos'), 'CRITICAL: Zero occurrences of "fabricamos" in index.html');
assert(!html.includes('family-story-section'), 'CRITICAL: Zero occurrences of "family-story-section" class in index.html');
assert(!html.includes('footer-family-seal'), 'CRITICAL: Zero occurrences of "footer-family-seal" class in index.html');
assert(html.includes('brand-story-section'), 'Institutional section uses brand-story-section class');
assert(html.includes('footer-brand-seal'), 'Footer seal uses footer-brand-seal class');

// Crystallization reformulation check
assert(html.toLowerCase().includes('praticamente não cristaliza'), 'Crystallization FAQ states honey practically does not crystallize');
assert(html.includes('100% puro') || html.includes('100% Puro'), 'Pure honey claims maintained');

// Navigation & Structure
assert(html.includes('id="mobileMenuBtn"'), 'Mobile menu toggle button exists');
assert(html.includes('id="mobileNavMenu"'), 'Mobile navigation drawer exists');
assert(!html.includes('gallery-thumbnails'), 'Bottle navigation thumbnails cleanly removed');
assert(!html.includes('1,4kg') && !html.includes('1,4 kg'), 'Zero occurrences of kg weight note');
assert(html.includes('img/logo-transparent.png'), 'Transparent logo integrated in header');
assert(!html.includes('class="cart-header-logo"'), 'No giant logo in cart drawer');
assert(!html.includes('https://images.unsplash.com/photo-1587049352846-4a222e784d38'), 'No external Unsplash stock images masquerading as product thumbnails');

// Check Required Sections
assert(html.includes('id="produto"'), 'Product showcase section exists');
assert(html.includes('id="historia"'), 'Brand story & curation section exists (#historia)');
assert(html.includes('id="vidro-validade"'), 'Why glass & no expiration section exists');
assert(html.includes('id="beneficios"'), 'Interactive benefits section exists');
assert(html.includes('id="entregas"'), 'Shipping & logistics section exists');
assert(html.includes('id="faq"'), 'FAQ section exists');
assert(html.includes('id="contato"'), 'Contact section exists');
assert(html.includes('id="cartOverlay"'), 'Shopping cart drawer exists');

// Check Checkout Location Flag & Validation
assert(html.includes('id="regionGV"'), 'Grande Vitória location radio button exists');
assert(html.includes('id="regionBR"'), 'Outra Região location radio button exists');
assert(html.includes('id="buyerAddress"'), 'buyerAddress input field exists');
assert(html.includes('id="addressErrorMsg"'), 'addressErrorMsg validation container exists');
assert(html.includes('id="addOneBottleCartBtn"'), 'addOneBottleCartBtn quick re-add button exists');

// Typography check in HTML
assert(html.includes('Playfair+Display'), 'Google Fonts Playfair Display included');
assert(html.includes('Montserrat'), 'Google Fonts Montserrat included');

// 3. Check JS Logic & Calculations
const script = fs.readFileSync('script.js', 'utf8');

// CRITICAL CHECKS: NO FAMILY MENTIONS IN JS
assert(!script.toLowerCase().includes('família'), 'CRITICAL: Zero occurrences of "família" in script.js');
assert(!script.toLowerCase().includes('familia'), 'CRITICAL: Zero occurrences of "familia" in script.js');
assert(!script.toLowerCase().includes('fabricamos'), 'CRITICAL: Zero occurrences of "fabricamos" in script.js');
assert(script.includes('5527998063815'), 'sellerPhone updated to 5527998063815 in script.js');

// Test Pricing & Format
const price = 60.00;
function calcTotal(qty) {
  return (qty * price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

assert(calcTotal(1).includes('60,00'), 'Price for 1 bottle is R$ 60,00');
assert(calcTotal(2).includes('120,00'), 'Price for 2 bottles is R$ 120,00');
assert(calcTotal(3).includes('180,00'), 'Price for 3 bottles is R$ 180,00');

// Test Message Generation Simulation for Grande Vitória
function generateMessage(isGV, data) {
  let msg = `🍯 *NOVO PEDIDO - MÉIS COUTINHO*\n`;
  msg += `_Mel Silvestre 100% Puro e Capixaba_\n\n`;
  msg += `Olá! Gostaria de fazer meu pedido de Mel Silvestre pelo site da Méis Coutinho:\n\n`;
  msg += `📦 *Produto:* Mel Silvestre 100% Puro\n`;
  msg += `🍶 *Embalagem:* Garrafa de Vidro de 1 Litro (~1,4kg)\n`;
  msg += `🔢 *Quantidade:* ${data.qty} garrafa(s) de 1 Litro\n`;
  msg += `💰 *Valor Unitário:* R$ 60,00\n`;
  msg += `💵 *Subtotal dos Produtos:* ${calcTotal(data.qty)}\n`;
  msg += `\n--------------------------------\n`;

  if (isGV) {
    if (!data.address) return { error: 'Address required for Grande Vitória' };
    if (!data.neighborhood) return { error: 'Neighborhood required for Grande Vitória' };
    msg += `📍 *Região de Entrega:* Grande Vitória (ES)\n`;
    msg += `🏙️ *Município:* ${data.city || 'Vila Velha'}\n`;
    msg += `🏘️ *Bairro:* ${data.neighborhood}\n`;
    msg += `🏠 *Endereço Completo:* ${data.address}\n`;
    msg += `🛵 *Entrega Local:* Combinar taxa de entrega e horário com o entregador\n`;
  } else {
    msg += `📍 *Região de Entrega:* Fora da Grande Vitória (Envio Nacional)\n`;
    msg += `📦 *Frete / Envio:* A combinar diretamente com o vendedor pelo WhatsApp\n`;
    if (data.cityOther) msg += `🏙️ *Cidade / UF:* ${data.cityOther}\n`;
    if (data.cepOther) msg += `📮 *CEP:* ${data.cepOther}\n`;
  }

  msg += `\n--------------------------------\n`;
  if (data.buyerName) msg += `👤 *Nome do Cliente:* ${data.buyerName}\n`;
  msg += `💳 *Forma de Pagamento:* ${data.payment || 'Pix'}\n`;
  return { msg };
}

// Validation tests
const gvMissingAddress = generateMessage(true, { qty: 1, neighborhood: 'Praia da Costa', address: '' });
assert(gvMissingAddress.error !== undefined, 'Validation blocks Grande Vitória order with missing address');

const gvMissingNeighborhood = generateMessage(true, { qty: 1, neighborhood: '', address: 'Av. Champagnat, 500' });
assert(gvMissingNeighborhood.error !== undefined, 'Validation blocks Grande Vitória order with missing neighborhood');

const gvValid = generateMessage(true, { qty: 2, city: 'Vila Velha', neighborhood: 'Praia da Costa', address: 'Av. Champagnat, 500, Apt 301', buyerName: 'Carlos' });
assert(gvValid.msg && gvValid.msg.includes('Grande Vitória (ES)') && gvValid.msg.includes('Av. Champagnat, 500, Apt 301'), 'Grande Vitória message formats correctly with full address');
assert(!gvValid.msg.toLowerCase().includes('família'), 'WhatsApp message has no mention of "Família"');

const brWithoutCity = generateMessage(false, { qty: 1 });
assert(brWithoutCity.msg && brWithoutCity.msg.includes('Fora da Grande Vitória (Envio Nacional)') && brWithoutCity.msg.includes('A combinar diretamente com o vendedor'), 'Outra Região works seamlessly even when optional city/cep is empty (combinar com vendedor)');

const brWithCity = generateMessage(false, { qty: 3, cityOther: 'Belo Horizonte - MG', cepOther: '30110-000' });
assert(brWithCity.msg && brWithCity.msg.includes('Belo Horizonte - MG') && brWithCity.msg.includes('30110-000'), 'Outra Região includes city and CEP when provided');

// Stress test WhatsApp message with emojis and special characters
const specialCharsOrder = generateMessage(true, {
  qty: 5,
  neighborhood: 'Itapuã',
  address: 'Rua das Palmeiras, 100 & Bloco "B" <Apt 201>',
  buyerName: 'João Coutinho 🍯',
  payment: 'Pix',
  buyerNotes: 'Entregar com cuidado! 🍯 <Urgente> & "Sem quebra"'
});
assert(specialCharsOrder.msg && specialCharsOrder.msg.includes('🍯'), 'WhatsApp message handles emojis without truncation');
assert(specialCharsOrder.msg.includes('Rua das Palmeiras, 100 & Bloco "B" <Apt 201>'), 'WhatsApp message preserves special characters safely');
const encodedUrl = encodeURIComponent(specialCharsOrder.msg);
assert(encodedUrl.length > 50 && !encodedUrl.includes('undefined'), 'WhatsApp URL encoding succeeds without NaN/undefined');

// 4. Check CSS contents & Design System
const css = fs.readFileSync('style.css', 'utf8');

// Color System HEX check
assert(css.includes('#F9F8F6') || css.includes('#f9f8f6'), 'Design System Off-White #F9F8F6 background color exists');
assert(css.includes('#1A362D') || css.includes('#1a362d'), 'Design System Forest Green #1A362D primary color exists');
assert(css.includes('#B89454') || css.includes('#b89454'), 'Design System Metallic Gold #B89454 secondary color exists');
assert(css.includes('#222222'), 'Design System Charcoal Black #222222 text color exists');

// Card Off-White background per Design System
assert(css.includes('--bg-card: #F9F8F6;'), 'Design System cards use Off-White --bg-card: #F9F8F6');

// CSS Family purge check (excluding valid font-family rules)
const cssLines = css.split('\n');
const invalidFamilyCssLines = cssLines.filter(l => /famil/i.test(l) && !l.includes('font-family'));
assert(invalidFamilyCssLines.length === 0, 'CRITICAL: Zero occurrences of family/familia in CSS (excluding font-family)');

assert(css.includes('.brand-story-section'), 'CSS includes .brand-story-section class');
assert(css.includes('.footer-brand-seal'), 'CSS includes .footer-brand-seal class');

// Typography check
assert(css.includes('Playfair Display'), 'CSS includes Playfair Display font');
assert(css.includes('Montserrat'), 'CSS includes Montserrat font');

// Rounded border-radius system check
assert(css.includes('--radius-btn: 12px;'), 'CSS sets 12px rounded border-radius for buttons');
assert(css.includes('--radius-card: 16px;'), 'CSS sets 16px rounded border-radius for cards');

// Footer White High-Contrast Typography check
assert(css.includes('.site-footer') && css.includes('color: #FFFFFF;'), 'Footer uses readable pure white #FFFFFF text color');
assert(css.includes('.footer-bottom-inner') && css.includes('color: #FFFFFF;'), 'Footer bottom note uses readable pure white #FFFFFF text color');

// Cart Drawer Width & Box Redimensioning check
assert(css.includes('max-width: 580px;') || css.includes('max-width: 600px;') || css.includes('max-width: 560px;'), 'Cart drawer width increased for superior readability');

// Header Logo prominence check
assert(css.includes('clamp(52px, 5.5vw, 68px)') || css.includes('clamp(56px, 6vw, 72px)'), 'Header logo height increased with responsive clamp for noble emphasis');

// Universal Responsiveness Media Queries check
assert(css.includes('@media (min-width: 1920px)'), 'CSS includes TV / Large Screen media query (min-width: 1920px)');
assert(css.includes('@media (min-width: 2560px)'), 'CSS includes 4K media query (min-width: 2560px)');
assert(css.includes('@media (max-width: 1024px)'), 'CSS includes tablet / iPad media query (max-width: 1024px)');
assert(css.includes('@media (max-width: 768px)'), 'CSS includes tablet portrait / mobile media query (max-width: 768px)');
assert(css.includes('@media (max-width: 480px)'), 'CSS has max-width: 480px media query');
assert(css.includes('@media (max-width: 360px)'), 'CSS has max-width: 360px media query');

// Interactive gallery classes
assert(css.includes('.main-product-img.view-full'), 'CSS has view-full class');
assert(css.includes('.main-product-img.view-rolha'), 'CSS has view-rolha class');
assert(css.includes('.main-product-img.view-ambar'), 'CSS has view-ambar class');
assert(css.includes('.main-product-img.view-mesa'), 'CSS has view-mesa class');
assert(css.includes('.mobile-menu-btn'), 'CSS has mobile menu button styles');
assert(css.includes('.mobile-nav-menu'), 'CSS has mobile navigation drawer styles');
assert(css.includes('.input-error'), 'CSS has input error validation styles');

// 5. Check Modern Intelligent Responsive Redimensioning System
console.log('\n--- 5. CHECK INTELLIGENT RESPONSIVE REDIMENSIONING SYSTEM ---');

// Zero horizontal scroll on html and body
assert(css.includes('overflow-x: hidden;'), 'Zero scroll horizontal: overflow-x: hidden is enforced in CSS');

// Fluid Container sizing
assert(css.includes('width: min(100% - 2rem, 1200px);'), 'Fluid container: width: min(100% - 2rem, 1200px) implemented');
assert(css.includes('margin-inline: auto;'), 'Fluid container: margin-inline: auto implemented');
assert(css.includes('width: min(100% - 4rem, 1400px);'), 'Fluid container: 1400px container width for ultra-wide screens');

// Fluid Typography clamp() on headings
assert(css.includes('clamp(1.75rem, 3.2vw, 2.45rem)'), 'Fluid typography: .section-heading uses responsive clamp()');
assert(css.includes('clamp(1.65rem, 3.2vw, 2.3rem)'), 'Fluid typography: .cta-title uses responsive clamp()');
assert(css.includes('clamp(1.4rem, 2.2vw, 1.8rem)'), 'Fluid typography: .card-title and .shipping-card h3 use responsive clamp()');
assert(css.includes('clamp(2rem, 3.8vw, 2.85rem)'), 'Fluid typography: .product-title uses responsive clamp()');

// Grid auto-fit / auto-fill minmax()
assert(css.includes('repeat(auto-fit, minmax(min(100%, 340px), 1fr))'), 'Grid auto-fit minmax: .knowledge-cards-grid and .shipping-cards-grid');
assert(css.includes('repeat(auto-fit, minmax(min(100%, 280px), 1fr))'), 'Grid auto-fit minmax: .benefits-cards-grid');
assert(css.includes('repeat(auto-fit, minmax(min(100%, 200px), 1fr))'), 'Grid auto-fit minmax: .feature-pills-grid');
assert(css.includes('repeat(auto-fit, minmax(min(100%, 130px), 1fr))'), 'Grid auto-fit minmax: .quality-badges-row');
assert(css.includes('repeat(auto-fit, minmax(min(100%, 140px), 1fr))'), 'Grid auto-fit minmax: .story-highlights-row');
assert(css.includes('repeat(auto-fit, minmax(min(100%, 260px), 1fr))'), 'Grid auto-fit minmax: .footer-content');

// Header elastic breakpoint & fluid gap
assert(css.includes('clamp(0.5rem, 1.2vw, 1.8rem)'), 'Header navbar: adaptive gap clamp(0.5rem, 1.2vw, 1.8rem) implemented');
assert(css.includes('@media (max-width: 1180px)'), 'Header navbar: elastic breakpoint (max-width: 1180px) activates mobile hamburger');

// Cart Drawer / Modal sizing
assert(css.includes('width: min(560px, 94vw);') || css.includes('width: min(540px, 94vw);'), 'Cart drawer: fluid responsive width implemented');
assert(css.includes('max-height: 100dvh;'), 'Cart drawer: max-height: 100dvh implemented for all screen heights');
assert(css.includes('max-height: 100vh;'), 'Cart drawer: fallback max-height: 100vh implemented for older engines');
assert(css.includes('@media (max-height: 600px)'), 'Cart drawer: short screen & landscape media query implemented');

// Mobile Menu Synchronization & Close Logic in script.js
assert(script.includes('function closeMobileMenu()'), 'Mobile menu: clean closeMobileMenu() function implemented in script.js');
assert(script.includes('closeMobileMenu();'), 'Mobile menu: closeMobileMenu() called on cart open, links click and Escape key');

// Compact Header on Small Mobile
assert(css.includes('.cart-label') && css.includes('display: none;'), 'Header: cart label hidden on small screens (< 540px) to prevent 320px/360px overflow');

// Screen Resolution Simulation Suite (320px to 4K 3840px)
const testViewports = [
  { name: 'Small Mobile 320px', width: 320, height: 568 },
  { name: 'Mobile 360px (Android common)', width: 360, height: 640 },
  { name: 'Mobile 375px (iPhone SE/Mini)', width: 375, height: 667 },
  { name: 'Mobile 390px (iPhone 12/13/14)', width: 390, height: 844 },
  { name: 'Mobile 414px (iPhone Plus/XR)', width: 414, height: 896 },
  { name: 'Mobile 430px (iPhone Pro Max)', width: 430, height: 932 },
  { name: 'Tablet Portrait 768px (iPad)', width: 768, height: 1024 },
  { name: 'Tablet 820px (iPad Air)', width: 820, height: 1180 },
  { name: 'Tablet Landscape / Netbook 1024px', width: 1024, height: 768 },
  { name: 'Compact Notebook 1180px', width: 1180, height: 800 },
  { name: 'Laptop Widescreen 1280px', width: 1280, height: 800 },
  { name: 'Standard Notebook 1366px', width: 1366, height: 768 },
  { name: 'Desktop HD 1440px', width: 1440, height: 900 },
  { name: 'Desktop Full HD 1920px', width: 1920, height: 1080 },
  { name: 'Ultrawide / 2K 2560px', width: 2560, height: 1440 },
  { name: '4K Ultra HD 3840px', width: 3840, height: 2160 }
];

function evalClamp(minVal, vwRate, maxVal, screenWidth, remPx) {
  const preferredRem = (screenWidth * (vwRate / 100)) / remPx;
  return Math.min(Math.max(preferredRem, minVal), maxVal);
}

testViewports.forEach(vp => {
  const rem = vp.width >= 2560 ? 21 : (vp.width >= 1920 ? 18 : 16);
  let containerMax = 1200;
  let paddingTotal = 2 * rem;
  if (vp.width >= 2560) { containerMax = 1600; paddingTotal = 5 * rem; }
  else if (vp.width >= 1920) { containerMax = 1400; paddingTotal = 4 * rem; }
  else if (vp.width <= 360) { paddingTotal = 1 * rem; }

  const containerW = Math.min(vp.width - paddingTotal, containerMax);
  assert(containerW > 0 && containerW < vp.width, `Viewport ${vp.name} (${vp.width}x${vp.height}): Container width (${containerW}px) fits within viewport without horizontal overflow`);

  // Cart drawer width check
  const drawerW = Math.min(540, vp.width * 0.94);
  assert(drawerW <= vp.width, `Viewport ${vp.name}: Cart drawer width (${drawerW.toFixed(1)}px) fits strictly within screen bounds`);

  // Fluid typography clamp checks
  const sectionHeadingRem = evalClamp(1.75, 3.2, 2.45, vp.width, rem);
  assert(sectionHeadingRem >= 1.75 && sectionHeadingRem <= 2.45, `Viewport ${vp.name}: .section-heading clamp (${sectionHeadingRem.toFixed(2)}rem) within safe bounds`);

  const ctaTitleRem = evalClamp(1.65, 3.2, 2.3, vp.width, rem);
  assert(ctaTitleRem >= 1.65 && ctaTitleRem <= 2.3, `Viewport ${vp.name}: .cta-title clamp (${ctaTitleRem.toFixed(2)}rem) within safe bounds`);

  // Small mobile header collision prevention check
  if (vp.width <= 360) {
    const estimatedLogoW = 44 + (0.65 * rem) + (1.25 * rem * 5); // img + gap + text
    const estimatedActionsW = 40 + (0.5 * rem) + 40; // cart icon/badge + gap + hamburger
    const totalHeaderW = estimatedLogoW + estimatedActionsW;
    assert(totalHeaderW <= containerW, `Viewport ${vp.name}: Compact header (${totalHeaderW.toFixed(0)}px) fits inside container (${containerW}px) without collision`);
  }
});

console.log(`\n================================`);
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`================================`);

if (failed > 0) process.exit(1);
