/**
 * ================================================
 * УПРАВЛЕНИЕ КОЛИЧЕСТВОМ ТОВАРА
 * Кнопки + и - для input type="number"
 * ================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = document.querySelectorAll('.quantity__input');
    
    quantityInputs.forEach(input => {
        const minusBtn = input.parentElement.querySelector('.quantity__btn--minus');
        const plusBtn = input.parentElement.querySelector('.quantity__btn--plus');
        
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 1;
                const minValue = parseInt(input.min) || 1;
                
                if (currentValue > minValue) {
                    input.value = currentValue - 1;
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value) || 1;
                const maxValue = parseInt(input.max) || 999;
                
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                }
            });
        }
        
        // Валидация при ручном вводе
        input.addEventListener('change', () => {
            let value = parseInt(input.value) || 1;
            const minValue = parseInt(input.min) || 1;
            const maxValue = parseInt(input.max) || 999;
            
            if (value < minValue) value = minValue;
            if (value > maxValue) value = maxValue;
            
            input.value = value;
        });
    });
});