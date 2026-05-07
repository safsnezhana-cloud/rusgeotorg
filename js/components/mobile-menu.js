/**
 * УПРАВЛЕНИЕ МОБИЛЬНЫМ МЕНЮ
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.header__mobile-toggle');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            
            // Переключаем состояние
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('header__nav--open');
            
            // Блокируем скролл body при открытом меню (опционально)
            if (!isExpanded) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
                toggleBtn.setAttribute('aria-expanded', 'false');
                nav.classList.remove('header__nav--open');
                body.style.overflow = '';
            }
        });
    }
});