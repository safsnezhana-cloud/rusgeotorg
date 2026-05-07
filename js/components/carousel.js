/**
 * КАРУСЕЛЬ ТОВАРОВ
 * Прокрутка влево/вправо
 */

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel__track');
    const prevBtn = document.querySelector('.carousel__btn--prev');
    const nextBtn = document.querySelector('.carousel__btn--next');

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 300; // Пикселей за один клик

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
});