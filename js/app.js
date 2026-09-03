/**
 * Shri Balaji Enterprises - Application Logic & Interactive Calculators
 * Janpath Road, Fulsunga, Rudrapur, Uttarakhand 263153
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initCalculator();
  initFaqAccordion();
  initProductFilters();
  initWholesaleForm();
  initMobileNav();
  initScrollEffects();
});

/* ==========================================================================
   BILINGUAL DICTIONARY & LANGUAGE SWITCHER
   ========================================================================== */
const i18nData = {
  en: {
    topTag: "Rudrapur's #1 Japani Chaukhat & Steel Windows Manufacturer",
    wholesaleRetail: "Wholesale & Phutkar (थोक व फुटकर)",
    navHome: "Home",
    navCalculator: "Price Calculator",
    navProducts: "Products",
    navSpecs: "Specifications",
    navVsWood: "Why Japani?",
    navWholesale: "Wholesale",
    navAbout: "About Us",
    navFaq: "FAQs",
    navContact: "Contact",
    btnGetQuote: "Get Instant Quote",
    btnWhatsApp: "WhatsApp Us",
    btnCallNow: "Call: 98375 34677",
    heroBadge1: "Direct Factory Wholesale & Retail",
    heroBadge2: "Tata / Jindal Steel Sheets",
    heroBadge3: "100% Termite & Rust Protected",
    heroTitle: "Premium Japani Chaukhat & Windows at Factory Wholesale Rates",
    heroSubtitle: "Manufactured with heavy gauge Tata/Jindal steel sheet, precision mitred joints & anti-rust red oxide primer. Serving builders, contractors & homeowners in Rudrapur, Udham Singh Nagar & all Uttarakhand.",
    calcTitle: "Instant Japani Chaukhat & Window Price Estimator",
    calcSubtitle: "Calculate accurate running feet, total weight (kg) and estimated wholesale/retail cost in real-time.",
    footerAddress: "Janpath Road, Fulsunga, Rudrapur, Uttarakhand 263153",
    langSwitchLabel: "हिंदी में देखें"
  },
  hi: {
    topTag: "रुद्रपुर की नं. 1 जापानी चौखट एवं स्टील खिड़कियों के निर्माता",
    wholesaleRetail: "थोक एवं फुटकर विक्रेता (Wholesale & Retail)",
    navHome: "होम",
    navCalculator: "रेट कैलकुलेटर",
    navProducts: "हमारे उत्पाद",
    navSpecs: "स्पेसिफिकेशन",
    navVsWood: "जापानी चौखट क्यों?",
    navWholesale: "थोक व्यापार",
    navAbout: "हमारे बारे में",
    navFaq: "अक्सर पूछे जाने वाले सवाल",
    navContact: "संपर्क करें",
    btnGetQuote: "तुरंत रेट प्राप्त करें",
    btnWhatsApp: "व्हाट्सएप करें",
    btnCallNow: "कॉल करें: 98375 34677",
    heroBadge1: "सीधे फैक्ट्री रेट पर थोक व फुटकर",
    heroBadge2: "टाटा / जिंदल स्टील शीट्स",
    heroBadge3: "100% दीमक व जंग प्रतिरोधी",
    heroTitle: "रुद्रपुर में बेहतरीन जापानी चौखट और खिड़कियां - सीधे फैक्ट्री थोक रेट पर",
    heroSubtitle: "उच्च गुणवत्ता 14, 16 और 18 गेज स्टील, फिनिश्ड वेल्डिंग और रेड ऑक्साइड प्राइमर कोटिंग। रुद्रपुर, उधम सिंह नगर, हल्द्वानी व पूरे उत्तराखंड के लिए उपलब्ध।",
    calcTitle: "जापानी चौखट व खिड़की रेट एवं वजन कैलकुलेटर",
    calcSubtitle: "अपने दरवाजे या खिड़की के साइज, गेज और पल्ले के अनुसार रनिंग फीट, वजन और अनुमानित रेट तुरंत देखें।",
    footerAddress: "जनपथ रोड, फूलसुंगा, रुद्रपुर, उत्तराखंड 263153",
    langSwitchLabel: "View in English"
  }
};

let currentLang = 'en';

function initLanguageSwitcher() {
  const switchBtns = document.querySelectorAll('.lang-switch-btn');
  
  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'hi' : 'en';
      document.documentElement.setAttribute('data-lang', currentLang);
      updateLanguageUI();
    });
  });
}

function updateLanguageUI() {
  const data = i18nData[currentLang];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key]) {
      el.textContent = data[key];
    }
  });

  const switchBtns = document.querySelectorAll('.lang-switch-btn');
  switchBtns.forEach(btn => {
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
      <span>${data.langSwitchLabel}</span>
    `;
  });
}

/* ==========================================================================
   LIVE JAPANI CHAUKHAT & WINDOW CALCULATOR
   ========================================================================== */
function initCalculator() {
  const form = document.getElementById('chaukhatCalcForm');
  if (!form) return;

  const typeInputs = form.querySelectorAll('input[name="frameType"]');
  const sizeSelect = document.getElementById('standardSizeSelect');
  const customToggle = document.getElementById('customDimensionCheck');
  const customWrapper = document.getElementById('customDimensionsRow');
  const heightInput = document.getElementById('customHeight');
  const widthInput = document.getElementById('customWidth');
  const gaugeInputs = form.querySelectorAll('input[name="gaugeType"]');
  const coatingSelect = document.getElementById('coatingSelect');
  const quantityInput = document.getElementById('orderQuantity');
  
  // Output Elements
  const outRunningFeet = document.getElementById('outRunningFeet');
  const outUnitWeight = document.getElementById('outUnitWeight');
  const outTotalWeight = document.getElementById('outTotalWeight');
  const outUnitPrice = document.getElementById('outUnitPrice');
  const outTotalPrice = document.getElementById('outTotalPrice');
  const outDiscountBadge = document.getElementById('outDiscountBadge');
  const whatsappQuoteBtn = document.getElementById('whatsappQuoteBtn');

  // Gauge rates & weight constants (per running foot)
  // Weight approx: 18G single = 1.15 kg/ft, 18G double = 1.55 kg/ft
  // 16G single = 1.55 kg/ft, 16G double = 2.10 kg/ft
  // 14G single = 2.10 kg/ft, 14G double = 2.85 kg/ft
  // Window frame with grill approx factor
  const specs = {
    '18': {
      singleRate: 110, // ₹ per running foot (Retail benchmark)
      doubleRate: 145,
      singleWeightFt: 1.15, // kg per ft
      doubleWeightFt: 1.55
    },
    '16': {
      singleRate: 140,
      doubleRate: 185,
      singleWeightFt: 1.55,
      doubleWeightFt: 2.10
    },
    '14': {
      singleRate: 185,
      doubleRate: 240,
      singleWeightFt: 2.10,
      doubleWeightFt: 2.85
    }
  };

  function calculate() {
    // 1. Get Frame Type
    let selectedType = 'single';
    typeInputs.forEach(r => { if (r.checked) selectedType = r.value; });

    // 2. Get Dimensions (in feet)
    let height = 7;
    let width = 3;

    if (customToggle.checked) {
      height = parseFloat(heightInput.value) || 7;
      width = parseFloat(widthInput.value) || 3;
    } else {
      const parts = sizeSelect.value.split('x');
      height = parseFloat(parts[0]) || 7;
      width = parseFloat(parts[1]) || 3;
    }

    // Running Feet calculation:
    // Door Chaukhat (3 sides: 2 heights + 1 top width)
    // Window / Ventilator (4 sides full frame: 2 heights + 2 widths)
    let runningFeet = 0;
    if (selectedType === 'window' || selectedType === 'ventilator') {
      runningFeet = (height * 2) + (width * 2);
    } else {
      // Standard 3-sided door frame
      runningFeet = (height * 2) + width;
    }

    // 3. Get Gauge
    let selectedGauge = '16';
    gaugeInputs.forEach(g => { if (g.checked) selectedGauge = g.value; });

    const gaugeData = specs[selectedGauge] || specs['16'];

    // 4. Rate & Weight Calculation
    let ratePerFoot = 0;
    let weightPerFoot = 0;

    if (selectedType === 'single') {
      ratePerFoot = gaugeData.singleRate;
      weightPerFoot = gaugeData.singleWeightFt;
    } else if (selectedType === 'double') {
      ratePerFoot = gaugeData.doubleRate;
      weightPerFoot = gaugeData.doubleWeightFt;
    } else if (selectedType === 'window') {
      // Window frame + grill support
      ratePerFoot = gaugeData.singleRate * 1.35;
      weightPerFoot = gaugeData.singleWeightFt * 1.35;
    } else if (selectedType === 'ventilator') {
      ratePerFoot = gaugeData.singleRate * 1.2;
      weightPerFoot = gaugeData.singleWeightFt * 1.2;
    }

    // Coating extra
    const coating = coatingSelect.value;
    let coatingExtraPerFoot = 0;
    if (coating === 'epoxy') coatingExtraPerFoot = 15; // Grey epoxy primer

    const unitPriceBase = (ratePerFoot + coatingExtraPerFoot) * runningFeet;
    const unitWeight = weightPerFoot * runningFeet;

    // Quantity & Wholesale tiered discount
    const qty = parseInt(quantityInput.value) || 1;
    let discountPercent = 0;
    let discountLabel = "Retail Rate (फुटकर)";

    if (qty >= 20) {
      discountPercent = 12; // 12% Bulk Contractor / Wholesale Discount
      discountLabel = "Wholesale Bulk Tier: 12% OFF";
    } else if (qty >= 6) {
      discountPercent = 6; // 6% Builder Discount
      discountLabel = "Builder Tier: 6% OFF";
    }

    const discountedUnitPrice = unitPriceBase * (1 - (discountPercent / 100));
    const totalPrice = Math.round(discountedUnitPrice * qty);
    const totalWeight = Math.round(unitWeight * qty * 10) / 10;

    // Update UI
    outRunningFeet.textContent = `${runningFeet.toFixed(1)} Ft`;
    outUnitWeight.textContent = `~${unitWeight.toFixed(1)} kg / pc`;
    outTotalWeight.textContent = `~${totalWeight.toFixed(1)} kg`;
    outUnitPrice.textContent = `₹${Math.round(discountedUnitPrice).toLocaleString('en-IN')}`;
    outTotalPrice.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    
    if (outDiscountBadge) {
      outDiscountBadge.textContent = discountLabel;
      outDiscountBadge.style.display = discountPercent > 0 ? 'inline-block' : 'none';
    }

    // Prepare WhatsApp Quotation String
    const typeNames = {
      single: 'Single Rebate Door Chaukhat (सिंगल पल्ला चौखट)',
      double: 'Double Rebate Door Chaukhat with Jali (डबल पल्ला चौखट)',
      window: 'Japani Steel Window Frame (जापानी खिड़की)',
      ventilator: 'Ventilator Frame (रोशनदान चौखट)'
    };

    const typeTitle = typeNames[selectedType] || selectedType;
    const coatingTitle = coating === 'epoxy' ? 'Zinc Grey Epoxy Primer' : 'Standard Red Oxide Anti-Rust';

    const waMessage = `*New Order / Quote Request - Shri Balaji Enterprises*%0A%0A` +
      `*Product:* ${encodeURIComponent(typeTitle)}%0A` +
      `*Size:* ${height} x ${width} Feet (${runningFeet.toFixed(1)} Running Ft)%0A` +
      `*Sheet Gauge:* ${selectedGauge} Gauge (Tata/Jindal Steel)%0A` +
      `*Coating:* ${coatingTitle}%0A` +
      `*Quantity:* ${qty} units%0A` +
      `*Estimated Weight:* ~${totalWeight} KG%0A` +
      `*Estimated Total:* ₹${totalPrice.toLocaleString('en-IN')}%0A%0A` +
      `*Location:* Janpath Road, Fulsunga, Rudrapur.%0A` +
      `Please confirm price and delivery schedule.`;

    // WhatsApp business number for direct leads
    whatsappQuoteBtn.href = `https://wa.me/919837534677?text=${waMessage}`;
  }

  // Event Listeners
  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);

  if (customToggle) {
    customToggle.addEventListener('change', () => {
      if (customToggle.checked) {
        customWrapper.style.display = 'grid';
        sizeSelect.disabled = true;
      } else {
        customWrapper.style.display = 'none';
        sizeSelect.disabled = false;
      }
      calculate();
    });
  }

  // Initial calculation
  calculate();
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(other => other.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   PRODUCT CATALOG FILTER
   ========================================================================== */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   WHOLESALE & BULK INQUIRY FORM
   ========================================================================== */
function initWholesaleForm() {
  const form = document.getElementById('wholesaleInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#wsName').value.trim();
    const phone = form.querySelector('#wsPhone').value.trim();
    const city = form.querySelector('#wsCity').value.trim();
    const productType = form.querySelector('#wsProduct').value;
    const estQty = form.querySelector('#wsQty').value;
    const message = form.querySelector('#wsMessage').value.trim();

    if (!name || !phone) {
      showToast('Please fill in your Name and Contact Number');
      return;
    }

    const waText = `*Wholesale / Bulk Inquiry - Shri Balaji Enterprises*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Phone:* ${encodeURIComponent(phone)}%0A` +
      `*Location/City:* ${encodeURIComponent(city || 'Rudrapur / Uttarakhand')}%0A` +
      `*Requirement:* ${encodeURIComponent(productType)}%0A` +
      `*Estimated Quantity:* ${encodeURIComponent(estQty)} units%0A` +
      `*Notes:* ${encodeURIComponent(message || 'Wholesale pricing required')}`;

    // Open WhatsApp directly
    window.open(`https://wa.me/919837534677?text=${waText}`, '_blank');

    showToast('Inquiry generated! Redirecting to WhatsApp for instant confirmation...');
    form.reset();
  });
}

/* ==========================================================================
   MOBILE NAVIGATION & OFF-CANVAS DRAWER
   ========================================================================== */
function initMobileNav() {
  const triggerBtn = document.getElementById('mobileMenuTrigger');
  const drawerOverlay = document.getElementById('mobileDrawerOverlay');
  const drawerPanel = document.getElementById('mobileDrawerPanel');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function openDrawer() {
    if (drawerPanel) drawerPanel.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    if (triggerBtn) {
      triggerBtn.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawerPanel) drawerPanel.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    if (triggerBtn) {
      triggerBtn.classList.remove('active');
      triggerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      const isOpen = drawerPanel && drawerPanel.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawerLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      closeDrawer();
    });
  });

  desktopNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      desktopNavLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerPanel && drawerPanel.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   SCROLL EFFECTS & BACK TO TOP BUTTON
   ========================================================================== */
function initScrollEffects() {
  const topBtn = document.getElementById('backToTopBtn');
  const header = document.querySelector('.main-header');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (topBtn) {
      if (scrollPos > 400) {
        topBtn.classList.add('show');
      } else {
        topBtn.classList.remove('show');
      }
    }

    if (header) {
      if (scrollPos > 60) {
        header.style.boxShadow = '0 6px 24px rgba(11, 19, 43, 0.12)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(11, 19, 43, 0.06)';
      }
    }
  });

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
