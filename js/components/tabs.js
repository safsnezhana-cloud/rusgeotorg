/**
 * ================================================
 * ПЕРЕКЛЮЧАТЕЛЬ ВКЛАДОК (TABS)
 * ================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tabs__tab');
    const tabPanes = document.querySelectorAll('.tabs__pane');
    
    // Функция переключения вкладок
    function switchTab(targetTabId) {
        // Деактивируем все кнопки
        tabButtons.forEach(btn => {
            btn.classList.remove('tabs__tab--active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        // Скрываем все панели
        tabPanes.forEach(pane => {
            pane.classList.remove('tabs__pane--active');
            pane.hidden = true;
        });
        
        // Активируем нужную кнопку
        const activeButton = document.querySelector(`[data-tab="${targetTabId}"]`);
        if (activeButton) {
            activeButton.classList.add('tabs__tab--active');
            activeButton.setAttribute('aria-selected', 'true');
        }
        
        // Показываем нужную панель
        const activePane = document.getElementById(targetTabId);
        if (activePane) {
            activePane.classList.add('tabs__pane--active');
            activePane.hidden = false;
        }
    }
    
    // Добавляем обработчики на кнопки
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');
            switchTab(targetTabId);
        });
        
        // Поддержка клавиатуры
        button.addEventListener('keydown', (e) => {
            const tabs = Array.from(tabButtons);
            const currentIndex = tabs.indexOf(button);
            let newIndex;
            
            if (e.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % tabs.length;
            } else if (e.key === 'ArrowLeft') {
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }
            
            if (newIndex !== undefined) {
                e.preventDefault();
                const newTab = tabs[newIndex];
                const targetTabId = newTab.getAttribute('data-tab');
                switchTab(targetTabId);
                newTab.focus();
            }
        });
    });
    
    // Инициализация: показываем первую активную вкладку
    const firstActiveTab = document.querySelector('.tabs__tab--active');
    if (firstActiveTab) {
        const targetTabId = firstActiveTab.getAttribute('data-tab');
        if (targetTabId) {
            switchTab(targetTabId);
        }
    }
});