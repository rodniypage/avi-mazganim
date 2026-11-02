// אנימציית הופעה לשירותים
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('active', entry.isIntersecting);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// הטופס שולח את הפרטים לוואטסאפ של אבי (אין שרת – כך שום פרט לא "נעלם")
const form = document.getElementById('lead-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('lead-name').value.trim();
    const phone = document.getElementById('lead-phone').value.trim();
    const text = `שלום אבי, הגעתי מהאתר. שמי ${name}, הטלפון שלי ${phone}. אשמח שתחזור אליי.`;
    window.open('https://wa.me/972505853249?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
}
