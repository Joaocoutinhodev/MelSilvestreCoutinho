/**
 * Méis Coutinho - Mel Natural & Artesanal
 * Lógica & Interatividade para Mel Silvestre 100% Puro em Garrafa de Vidro de 1L
 * Mel Silvestre 100% Puro em Garrafa de Vidro de 1L
 */

const CONFIG = {
  // WhatsApp oficial da Méis Coutinho (DDI 55 + DDD 27 + Número)
  sellerPhone: "5527998063815",

  // Nome Oficial da Marca
  brandName: "Méis Coutinho",
  origin: "Espírito Santo",

  // Dados do Produto Principal
  product: {
    id: "mel-silvestre-1l",
    name: "Mel Silvestre 100% Puro",
    package: "Garrafa de Vidro de 1 Litro",
    price: 60.00,
    image: "img/garrafa-coutinho.jpg"
  }
};

// Estado da Aplicação
let cart = {
  quantity: 1 // Inicia com 1 garrafa selecionada por conveniência do cliente
};

let currentDeliveryRegion = "grande-vitoria"; // 'grande-vitoria' ou 'outra-regiao'

// Formatação Monetária BRL
function formatCurrency(val) {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Carregar carrinho do localStorage
function loadCart() {
  const saved = localStorage.getItem("meis_coutinho_cart");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (typeof parsed.quantity === "number" && parsed.quantity >= 0) {
        cart.quantity = parsed.quantity;
      }
    } catch (e) {
      console.warn("Aviso ao carregar carrinho:", e);
    }
  }
  updateCartUI();
}

// Salvar carrinho no localStorage
function saveCart() {
  localStorage.setItem("meis_coutinho_cart", JSON.stringify(cart));
}

// Atualizar Interface do Carrinho
function updateCartUI() {
  const cartBadge = document.getElementById("cartCountBadge");
  const cartEmptyState = document.getElementById("cartEmptyState");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartBuyerForm = document.getElementById("cartBuyerForm");
  const cartDrawerFooter = document.getElementById("cartDrawerFooter");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartTotal = document.getElementById("cartTotal");
  const cartTotalItemsCount = document.getElementById("cartTotalItemsCount");

  if (cartBadge) {
    cartBadge.textContent = cart.quantity;
    cartBadge.style.transform = "scale(1.2)";
    setTimeout(() => {
      cartBadge.style.transform = "scale(1)";
    }, 200);
  }

  const subtotal = cart.quantity * CONFIG.product.price;
  const formattedSubtotal = formatCurrency(subtotal);

  if (cartSubtotal) cartSubtotal.textContent = formattedSubtotal;
  if (cartTotal) cartTotal.textContent = formattedSubtotal;
  if (cartTotalItemsCount) {
    cartTotalItemsCount.textContent = cart.quantity;
  }

  if (cart.quantity <= 0) {
    if (cartEmptyState) cartEmptyState.style.display = "flex";
    if (cartItemsList) cartItemsList.innerHTML = "";
    if (cartBuyerForm) cartBuyerForm.style.display = "none";
    if (cartDrawerFooter) cartDrawerFooter.style.display = "none";
  } else {
    if (cartEmptyState) cartEmptyState.style.display = "none";
    if (cartBuyerForm) cartBuyerForm.style.display = "block";
    if (cartDrawerFooter) cartDrawerFooter.style.display = "block";

    if (cartItemsList) {
      cartItemsList.innerHTML = `
        <div class="cart-item-card">
          <img src="${CONFIG.product.image}" alt="${CONFIG.product.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4>${CONFIG.product.name}</h4>
            <div class="cart-item-price">${CONFIG.product.package} &bull; ${formatCurrency(CONFIG.product.price)}</div>
            <div class="cart-item-qty">
              <button class="mini-btn" onclick="decrementCartItem()" aria-label="Diminuir">-</button>
              <span style="font-weight:700; padding: 0 6px;">${cart.quantity}</span>
              <button class="mini-btn" onclick="incrementCartItem()" aria-label="Aumentar">+</button>
            </div>
          </div>
          <div class="cart-item-subtotal">
            ${formattedSubtotal}
          </div>
        </div>
      `;
    }
  }

  // Atualiza ícones do Lucide se houver novos elementos
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Manipulação do Carrinho
function addToCart(qty) {
  const quantityToAdd = qty > 0 ? qty : 1;
  cart.quantity += quantityToAdd;
  saveCart();
  updateCartUI();
  showToast(`Adicionado ${quantityToAdd}x garrafa(s) de 1L ao carrinho!`);
}

function incrementCartItem() {
  cart.quantity += 1;
  saveCart();
  updateCartUI();
}

function decrementCartItem() {
  if (cart.quantity > 1) {
    cart.quantity -= 1;
  } else {
    cart.quantity = 0;
  }
  saveCart();
  updateCartUI();
}

// Fechar Menu de Navegação Mobile de forma limpa e sincronizada
function closeMobileMenu() {
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const menuIconOpen = document.getElementById("menuIconOpen");
  const menuIconClose = document.getElementById("menuIconClose");

  if (mobileNavMenu) {
    mobileNavMenu.classList.remove("open");
    mobileNavMenu.setAttribute("aria-hidden", "true");
  }
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuIconOpen) menuIconOpen.style.display = "block";
  if (menuIconClose) menuIconClose.style.display = "none";
}

// Abrir e Fechar Modal do Carrinho
function openCart() {
  closeMobileMenu();
  const overlay = document.getElementById("cartOverlay");
  if (overlay) {
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function closeCart() {
  const overlay = document.getElementById("cartOverlay");
  if (overlay) {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// Atalho para abrir carrinho selecionando região específica
function openCartWithRegion(region) {
  if (cart.quantity === 0) {
    cart.quantity = 1;
    saveCart();
    updateCartUI();
  }
  setDeliveryRegion(region);
  openCart();
}

// Alternador de Região de Entrega (Flag Grande Vitória vs Outro Estado)
function setDeliveryRegion(region) {
  currentDeliveryRegion = region;
  const isGV = region === "grande-vitoria";

  const fieldsGV = document.getElementById("fieldsGrandeVitoria");
  const fieldsOther = document.getElementById("fieldsOutraRegiao");
  const radioGV = document.getElementById("regionGV");
  const radioBR = document.getElementById("regionBR");
  const labelGV = document.getElementById("labelRegionGV");
  const labelBR = document.getElementById("labelRegionBR");
  const cartShippingText = document.getElementById("cartShippingText");

  if (isGV) {
    if (radioGV) radioGV.checked = true;
    if (labelGV) labelGV.classList.add("active");
    if (labelBR) labelBR.classList.remove("active");
    if (fieldsGV) fieldsGV.style.display = "block";
    if (fieldsOther) fieldsOther.style.display = "none";
    if (cartShippingText) cartShippingText.textContent = "Taxa local a combinar via WhatsApp";
  } else {
    if (radioBR) radioBR.checked = true;
    if (labelBR) labelBR.classList.add("active");
    if (labelGV) labelGV.classList.remove("active");
    if (fieldsGV) fieldsGV.style.display = "none";
    if (fieldsOther) fieldsOther.style.display = "block";
    if (cartShippingText) cartShippingText.textContent = "Frete nacional a cotar via WhatsApp";
  }
}

// Notificação Toast
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMessage");
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
}

// Filtro Interativo de Benefícios
function initBenefitsFilter() {
  const filterBtns = document.querySelectorAll(".filter-tab-btn");
  const cards = document.querySelectorAll(".benefit-interactive-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filterValue = btn.getAttribute("data-filter");

      cards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "todos" || category === filterValue) {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 30);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Finalização do Pedido e Envio Formatado para o WhatsApp
function checkoutToWhatsApp(customQty = null) {
  const quantityToBuy = customQty !== null ? customQty : cart.quantity;

  if (quantityToBuy <= 0) {
    showToast("Por favor, selecione ao menos 1 garrafa para realizar o pedido.");
    return;
  }

  const isGV = currentDeliveryRegion === "grande-vitoria";
  const buyerName = document.getElementById("buyerName")?.value.trim() || "";
  const buyerPayment = document.getElementById("buyerPayment")?.value || "Pix";
  const buyerNotes = document.getElementById("buyerNotes")?.value.trim() || "";

  // Campos condicionais
  const cityGV = document.getElementById("buyerCityGV")?.value || "Vila Velha";
  const neighborhoodInput = document.getElementById("buyerNeighborhood");
  const addressInput = document.getElementById("buyerAddress");
  const addressErrorMsg = document.getElementById("addressErrorMsg");

  const neighborhoodGV = neighborhoodInput?.value.trim() || "";
  const addressGV = addressInput?.value.trim() || "";

  const cityOther = document.getElementById("buyerCityOther")?.value.trim() || "";
  const cepOther = document.getElementById("buyerCep")?.value.trim() || "";

  // Validação obrigatória do endereço para entregas na Grande Vitória
  if (isGV) {
    if (!addressGV) {
      if (addressInput) {
        addressInput.classList.add("input-error");
        addressInput.focus();
      }
      if (addressErrorMsg) {
        addressErrorMsg.style.display = "flex";
      }
      showToast("Por favor, digite seu endereço completo para entrega na Grande Vitória.");
      return;
    } else {
      if (addressInput) addressInput.classList.remove("input-error");
      if (addressErrorMsg) addressErrorMsg.style.display = "none";
    }

    if (!neighborhoodGV) {
      if (neighborhoodInput) {
        neighborhoodInput.classList.add("input-error");
        neighborhoodInput.focus();
      }
      showToast("Por favor, informe seu bairro na Grande Vitória.");
      return;
    } else {
      if (neighborhoodInput) neighborhoodInput.classList.remove("input-error");
    }
  }

  const total = quantityToBuy * CONFIG.product.price;

  // Montagem Elegante da Mensagem do WhatsApp
  let msg = `🍯 *NOVO PEDIDO - MÉIS COUTINHO*\n`;
  msg += `_Mel Silvestre 100% Puro e Capixaba_\n\n`;
  msg += `Olá! Gostaria de fazer meu pedido de Mel Silvestre pelo site da Méis Coutinho:\n\n`;
  msg += `📦 *Produto:* ${CONFIG.product.name}\n`;
  msg += `🍶 *Embalagem:* ${CONFIG.product.package}\n`;
  msg += `🔢 *Quantidade:* ${quantityToBuy} garrafa(s) de 1 Litro\n`;
  msg += `💰 *Valor Unitário:* ${formatCurrency(CONFIG.product.price)}\n`;
  msg += `💵 *Subtotal dos Produtos:* ${formatCurrency(total)}\n`;
  msg += `\n--------------------------------\n`;

  // Informações de Localização & Frete
  if (isGV) {
    msg += `📍 *Região de Entrega:* Grande Vitória (ES)\n`;
    msg += `🏙️ *Município:* ${cityGV}\n`;
    msg += `🏘️ *Bairro:* ${neighborhoodGV}\n`;
    msg += `🏠 *Endereço Completo:* ${addressGV}\n`;
    msg += `🛵 *Entrega Local:* Combinar taxa de entrega e horário com o entregador\n`;
  } else {
    msg += `📍 *Região de Entrega:* Fora da Grande Vitória (Envio Nacional)\n`;
    msg += `📦 *Frete / Envio:* A combinar diretamente com o vendedor pelo WhatsApp\n`;
    if (cityOther) {
      msg += `🏙️ *Cidade / UF:* ${cityOther}\n`;
    }
    if (cepOther) {
      msg += `📮 *CEP:* ${cepOther}\n`;
    }
  }

  msg += `\n--------------------------------\n`;

  // Dados do Cliente
  if (buyerName) {
    msg += `👤 *Nome do Cliente:* ${buyerName}\n`;
  }
  msg += `💳 *Forma de Pagamento:* ${buyerPayment}\n`;

  if (buyerNotes) {
    msg += `📝 *Observações:* ${buyerNotes}\n`;
  }

  msg += `\nFico no aguardo para confirmarmos o pedido e o envio. Muito obrigado!`;

  const encodedMsg = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${CONFIG.sellerPhone}?text=${encodedMsg}`;

  // Abertura segura com fallback para mobile
  const newWin = window.open(waUrl, "_blank");
  if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
    window.location.href = waUrl;
  }
}

// Inicialização Geral do DOM
document.addEventListener("DOMContentLoaded", () => {
  // Ano Atual no Rodapé
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Atualização Visual do Telefone
  const footerPhoneDisplay = document.getElementById("footerPhoneDisplay");
  if (footerPhoneDisplay && CONFIG.sellerPhone) {
    const p = CONFIG.sellerPhone.replace(/\D/g, "");
    if (p.length === 13) {
      footerPhoneDisplay.textContent = `(${p.slice(2, 4)}) ${p.slice(4, 9)}-${p.slice(9)}`;
    }
  }

  // Links Rápidos para WhatsApp
  const directLink = `https://wa.me/${CONFIG.sellerPhone}?text=${encodeURIComponent("Olá! Vim pelo site da Méis Coutinho e gostaria de saber mais sobre o Mel Silvestre de 1 Litro.")}`;
  const directWhatsAppLink = document.getElementById("directWhatsAppLink");
  const floatingWhatsAppBtn = document.getElementById("floatingWhatsAppBtn");
  const mobileWhatsAppBtn = document.getElementById("mobileWhatsAppBtn");

  if (directWhatsAppLink) directWhatsAppLink.href = directLink;
  if (floatingWhatsAppBtn) floatingWhatsAppBtn.href = directLink;
  if (mobileWhatsAppBtn) mobileWhatsAppBtn.href = directLink;

  // Galeria de Fotos - Troca Interativa de Vistas Focais da Garrafa Real
  const mainImg = document.getElementById("mainProductImg");
  const thumbs = document.querySelectorAll(".thumb-btn");

  thumbs.forEach(btn => {
    btn.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      const viewMode = btn.getAttribute("data-view") || "full";
      if (mainImg) {
        mainImg.className = `main-product-img view-${viewMode}`;
      }
    });
  });

  // Limpar erro visual de inputs ao digitar
  ["buyerAddress", "buyerNeighborhood"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        el.classList.remove("input-error");
        const err = document.getElementById("addressErrorMsg");
        if (err && id === "buyerAddress") err.style.display = "none";
      });
    }
  });

  // Menu Mobile
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  const menuIconOpen = document.getElementById("menuIconOpen");
  const menuIconClose = document.getElementById("menuIconClose");

  function openMobileMenu() {
    if (!mobileNavMenu) return;
    mobileNavMenu.classList.add("open");
    mobileNavMenu.setAttribute("aria-hidden", "false");
    if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "true");
    if (menuIconOpen) menuIconOpen.style.display = "none";
    if (menuIconClose) menuIconClose.style.display = "block";
  }

  function toggleMobileMenu() {
    if (!mobileNavMenu) return;
    if (mobileNavMenu.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Fechar ao clicar fora do menu de navegação
    document.addEventListener("click", (e) => {
      if (mobileNavMenu.classList.contains("open")) {
        if (!mobileNavMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
  }

  // Seletor de Quantidade do Produto na Vitrine
  const qtyInput = document.getElementById("productQtyInput");
  const decreaseBtn = document.getElementById("decreaseQty");
  const increaseBtn = document.getElementById("increaseQty");

  if (decreaseBtn && qtyInput) {
    decreaseBtn.addEventListener("click", () => {
      let currentVal = parseInt(qtyInput.value) || 1;
      if (currentVal > 1) {
        qtyInput.value = currentVal - 1;
      }
    });
  }

  if (increaseBtn && qtyInput) {
    increaseBtn.addEventListener("click", () => {
      let currentVal = parseInt(qtyInput.value) || 1;
      qtyInput.value = currentVal + 1;
    });
  }

  // Botão "Adicionar ao Carrinho"
  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn && qtyInput) {
    addToCartBtn.addEventListener("click", () => {
      const qtyToAdd = parseInt(qtyInput.value) || 1;
      addToCart(qtyToAdd);
    });
  }

  // Botão "Pedir Direto no WhatsApp" (Vitrine)
  const buyNowBtn = document.getElementById("buyNowBtn");
  if (buyNowBtn && qtyInput) {
    buyNowBtn.addEventListener("click", () => {
      const qty = parseInt(qtyInput.value) || 1;
      cart.quantity = qty;
      saveCart();
      updateCartUI();
      openCart();
    });
  }

  // Botão de Adicionar 1 Garrafa no Estado Vazio do Carrinho
  const addOneBottleCartBtn = document.getElementById("addOneBottleCartBtn");
  if (addOneBottleCartBtn) {
    addOneBottleCartBtn.addEventListener("click", () => {
      addToCart(1);
    });
  }

  // Controles do Drawer do Carrinho
  const cartBtn = document.getElementById("cartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const continueShoppingBtn = document.getElementById("continueShoppingBtn");

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (continueShoppingBtn) continueShoppingBtn.addEventListener("click", closeCart);

  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) {
        closeCart();
      }
    });
  }

  // Fechar carrinho e menu mobile com tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeMobileMenu();
    }
  });

  // Botões de Rádio para Região de Entrega
  const radioGV = document.getElementById("regionGV");
  const radioBR = document.getElementById("regionBR");

  if (radioGV) {
    radioGV.addEventListener("change", () => {
      if (radioGV.checked) setDeliveryRegion("grande-vitoria");
    });
  }

  if (radioBR) {
    radioBR.addEventListener("change", () => {
      if (radioBR.checked) setDeliveryRegion("outra-regiao");
    });
  }

  // Botão de Finalizar Pedido dentro do Carrinho
  const sendWhatsAppOrderBtn = document.getElementById("sendWhatsAppOrderBtn");
  if (sendWhatsAppOrderBtn) {
    sendWhatsAppOrderBtn.addEventListener("click", () => {
      checkoutToWhatsApp();
    });
  }

  // Detecção inteligente de Scroll para valorizar o cabeçalho e logo Méis Coutinho
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Inicializa Filtro de Benefícios
  initBenefitsFilter();

  // Inicializa Carrinho e Região padrão
  loadCart();
  setDeliveryRegion("grande-vitoria");

  // Garante inicialização de ícones do Lucide
  if (window.lucide) {
    lucide.createIcons();
  }
});
