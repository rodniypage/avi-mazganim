// ===== הגדרות =====
const WA_NUMBER = '972505853249';

// ===== מעקב המרות (עובד אוטומטית כשמוסיפים GTM / פיקסל) =====
window.dataLayer = window.dataLayer || [];
function track(event, extra) {
  window.dataLayer.push(Object.assign({ event: event }, extra || {}));
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', { method: event });
  }
}
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-track]');
  if (el) track(el.dataset.track, { location: el.closest('section, header, footer, .mbar')?.className || '' });
});

function openWhatsApp(text, source) {
  track('whatsapp_lead', { source: source });
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
}

// ===== בחירת תקלה =====
document.querySelectorAll('.chip[data-problem]').forEach((chip) => {
  chip.addEventListener('click', () => {
    openWhatsApp('שלום אבי, הגעתי מהאתר. ' + chip.dataset.problem + '. מתי תוכל להגיע?', 'problem_picker');
  });
});

// ===== טופס =====
const form = document.getElementById('lead-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const city = form.city.value.trim();
    const msg = form.msg.value.trim();
    const err = document.getElementById('form-err');
    if (!name) { err.hidden = false; form.name.focus(); return; }
    err.hidden = true;
    let text = 'שלום אבי, הגעתי מהאתר. שמי ' + name + '.';
    if (city) text += ' אני מ' + city + '.';
    text += msg ? ' ' + msg : ' אשמח שתחזור אליי.';
    openWhatsApp(text, 'form');
  });
}

// ===== אנימציית הופעה =====
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// ===== שנה בפוטר =====
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
