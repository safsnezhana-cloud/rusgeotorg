/**
 * ================================================
 * ЗАГРУЗЧИК HTML ЧАСТЕЙ (PARTIALS LOADER)
 * Загружает HTML фрагменты и вставляет их в DOM
 * ================================================
 */

class PartialsLoader {
    constructor() {
        this.partials = {
            'header': {
                placeholder: 'header-placeholder',
                url: 'partials/header.html'
            },
            'breadcrumbs': {
                placeholder: 'breadcrumbs-placeholder',
                url: 'partials/breadcrumbs.html'
            },
            'productGallery': {
                placeholder: 'product-gallery-placeholder',
                url: 'partials/product-gallery.html'
            },
            'productInfo': {
                placeholder: 'product-info-placeholder',
                url: 'partials/product-info.html'
            },
            'tabs': {
                placeholder: 'tabs-placeholder',
                url: 'partials/tabs.html'
            },
            'relatedProducts': {
                placeholder: 'related-products-placeholder',
                url: 'partials/related-products.html'
            },
            'footer': {
                placeholder: 'footer-placeholder',
                url: 'partials/footer.html'
            }
        };
    }

    /**
     * Загружает HTML файл и вставляет его в указанный элемент
     * @param {string} url - путь к HTML файлу
     * @param {string} placeholderId - ID элемента для вставки
     * @returns {Promise<void>}
     */
    async loadPartial(url, placeholderId) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            
            if (placeholder) {
                placeholder.innerHTML = html;
                console.log(`✅ Загружен: ${url}`);
            } else {
                console.warn(`⚠️ Не найден placeholder: ${placeholderId}`);
            }
            
        } catch (error) {
            console.error(`❌ Ошибка загрузки ${url}:`, error);
        }
    }

    /**
     * Загружает все частички параллельно
     * @returns {Promise<void>}
     */
    async loadAll() {
        const promises = Object.values(this.partials).map(partial => 
            this.loadPartial(partial.url, partial.placeholder)
        );
        
        await Promise.all(promises);
        console.log('✅ Все части загружены');
        
        // Инициализируем компоненты после загрузки
        this.initComponents();
    }

    /**
     * Инициализация компонентов после загрузки HTML
     */
    initComponents() {
        // Ждем немного, чтобы DOM обновился
        setTimeout(() => {
            // Здесь можно добавить инициализацию компонентов,
            // которые зависят от загруженного HTML
            console.log('🚀 Инициализация компонентов...');
        }, 100);
    }
}

// Загружаем части когда DOM готов
document.addEventListener('DOMContentLoaded', () => {
    const loader = new PartialsLoader();
    loader.loadAll();
});