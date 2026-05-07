/**
 * ================================================
 * ГАЛЕРЕЯ ТОВАРА
 * Переключение главного изображения + зум
 * ================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.gallery__thumb');
    const mainWrapper = document.querySelector('.gallery__main-wrapper');
    
    // Функция смены изображения
    function changeImage(newSrc, activeThumb) {
        if (!mainImage) return;
        
        // Плавная смена
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
        }, 150);
        
        // Обновляем активный класс
        thumbs.forEach(thumb => {
            thumb.classList.remove('gallery__thumb--active');
            thumb.setAttribute('aria-pressed', 'false');
        });
        
        if (activeThumb) {
            activeThumb.classList.add('gallery__thumb--active');
            activeThumb.setAttribute('aria-pressed', 'true');
        }
    }
    
    // Обработчик клика на превью
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const newSrc = thumb.getAttribute('data-image');
            changeImage(newSrc, thumb);
        });
    });
    
    // Клик на главное изображение - открываем первое превью (или зум)
    if (mainWrapper && mainImage) {
        mainWrapper.addEventListener('click', () => {
            // Открываем полноразмерное изображение в модальном окне
            openImageModal(mainImage.src);
        });
    }
    
    // Функция открытия модального окна с изображением
    function openImageModal(src) {
        // Создаем модальное окно
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="image-modal__overlay"></div>
            <div class="image-modal__content">
                <button class="image-modal__close" aria-label="Закрыть">×</button>
                <img src="${src}" alt="Увеличенное изображение" class="image-modal__img">
            </div>
        `;
        
        // Добавляем стили
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .image-modal__overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.9);
            }
            
            .image-modal__content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                z-index: 1;
            }
            
            .image-modal__img {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 8px;
            }
            
            .image-modal__close {
                position: absolute;
                top: -40px;
                right: 0;
                width: 32px;
                height: 32px;
                font-size: 32px;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                line-height: 1;
            }
            
            .image-modal__close:hover {
                color: var(--color-accent, #f9a825);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Закрытие по клику на overlay или кнопку
        const closeModal = () => {
            modal.remove();
            document.getElementById('modal-styles')?.remove();
        };
        
        modal.querySelector('.image-modal__overlay').addEventListener('click', closeModal);
        modal.querySelector('.image-modal__close').addEventListener('click', closeModal);
        
        // Закрытие по Escape
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
});