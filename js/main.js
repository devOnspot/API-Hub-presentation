const slidesConfig = [
    {
        id: 'slide1',
        path: 'slides/slide1.html',
        title: 'Introdução',
        cssPath: 'css/slide1.css'
    },
    {
        id: 'slide2',
        path: 'slides/slide2.html',
        title: 'Desafios',
        cssPath: 'css/slide2.css'
    },
    {
        id: 'slide3',
        path: 'slides/slide3.html',
        title: 'Arquitetura da Solução',
        cssPath: 'css/slide3.css'
    },
    {
        id: 'slide4',
        path: 'slides/slide4.html',
        title: 'Modelo de Dados FareHarbor',
        cssPath: 'css/slide4.css'
    },
    {
        id: 'slide5',
        path: 'slides/slide5.html',
        title: 'Modelo de Dados Unificado',
        cssPath: 'css/slide5.css'
    },
    {
        id: 'slide6',
        path: 'slides/slide6.html',
        title: 'Implementação - Listagem e Disponibilidade',
        cssPath: 'css/slide6.css'
    },
    {
        id: 'slide7',
        path: 'slides/slide7.html',
        title: 'Implementação - Sistema de Reservas',
        cssPath: 'css/slide7.css'
    },
    {
        id: 'slide9',
        path: 'slides/slide9.html',
        title: 'Pipeline de Desenvolvimento',
        cssPath: 'css/slide9.css'
    },
    {
        id: 'slide10',
        path: 'slides/slide10.html',
        title: 'Resultados',
        cssPath: 'css/slide10.css'
    },
    {
        id: 'slide11',
        path: 'slides/slide11.html',
        title: 'Retrospectiva e Próximos Passos',
        cssPath: 'css/slide11.css'
    }
];

const slidesWrapper = document.getElementById('slidesWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slideIndicator');

let currentSlide = 0;
let loadedSlides = [];
const totalSlides = slidesConfig.length;

const slideSpecificScripts = {
    'slide11': function() {
        if (typeof window.initializeTimeline === 'function') {
            setTimeout(window.initializeTimeline, 100);
        } else {
            console.warn('Função initializeTimeline não encontrada. Verifique se timeline.js foi carregado.');
        }
    }
};

document.addEventListener('DOMContentLoaded', async function() {
    await loadAllSlides();
    updateSlidePosition();
    setupEventListeners();
    loadSlideCSSById(slidesConfig[currentSlide].id);
});

async function loadAllSlides() {
    try {
        slidesWrapper.innerHTML = '';
        for (let i = 0; i < slidesConfig.length; i++) {
            await loadSlide(i);
        }
    } catch (error) {
        console.error('Erro ao carregar slides:', error);
        slidesWrapper.innerHTML = `<div class="error-slide">Erro ao carregar slides: ${error.message}</div>`;
    }
}

async function loadSlide(index) {
    if (loadedSlides[index]) return; 
    
    const slideConfig = slidesConfig[index];
    
    try {
        const response = await fetch(slideConfig.path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        const slideElement = document.createElement('section');
        slideElement.className = 'slide';
        slideElement.id = slideConfig.id;
        slideElement.innerHTML = html;
        slidesWrapper.appendChild(slideElement);
        
        loadedSlides[index] = true;
    } catch (error) {
        console.error(`Erro ao carregar slide ${index}:`, error);
        
        const errorSlide = document.createElement('section');
        errorSlide.className = 'slide error-slide';
        errorSlide.innerHTML = `
            <div class="slide-content">
                <h2>Erro ao carregar slide</h2>
                <p>Não foi possível carregar o slide "${slideConfig.title}".</p>
                <p>Erro: ${error.message}</p>
            </div>
        `;
        slidesWrapper.appendChild(errorSlide);
        loadedSlides[index] = true;
    }
}

function setupEventListeners() {
    // Botões de navegação
    prevBtn.addEventListener('click', goToPreviousSlide);
    nextBtn.addEventListener('click', goToNextSlide);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPreviousSlide();
        }
    });
}

function goToPreviousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlidePosition();
    }
}

function goToNextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlidePosition();
    }
}

function updateSlidePosition() {
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    slideIndicator.textContent = `Slide ${currentSlide + 1}/${totalSlides}`;
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    
    loadSlideCSSById(slidesConfig[currentSlide].id);
    updateActiveSlide();
    activateCurrentSlideScripts();
}

function activateCurrentSlideScripts() {
    const slideConfig = slidesConfig[currentSlide];
    const slideId = slideConfig.id;
    
    if (slideSpecificScripts[slideId]) {
        slideSpecificScripts[slideId]();
    }
}
function updateActiveSlide() {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    const currentSlideElement = slidesWrapper.children[currentSlide];
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }
}

function loadSlideCSSById(slideId) {
    // Encontra o número do slide pelo ID
    const slideConfig = slidesConfig.find(slide => slide.id === slideId);
    if (!slideConfig) return;
    
    document.querySelectorAll('link[data-slide-css]').forEach(link => {
        link.remove();
    });
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = slideConfig.cssPath;
    link.setAttribute('data-slide-css', slideId);
    document.head.appendChild(link);
}