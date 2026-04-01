let currentLang = 'zh';

function toggleLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  document.documentElement.lang = currentLang;

  const btn = document.querySelector('.lang-toggle');
  btn.textContent = currentLang === 'zh' ? 'EN' : '中文';

  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  document.title = currentLang === 'zh'
    ? "Rins' Blog"
    : "Rins' Blog";
}
