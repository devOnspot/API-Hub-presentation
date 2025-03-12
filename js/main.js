/**
 * Script principal para controlar a navegação, carregamento dos slides e CSS específico
 */

// Configuração dos slides
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
    // Adicione mais slides conforme necessário
];

// Elementos do DOM
const slidesWrapper = document.getElementById('slidesWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideIndicator = document.getElementById('slideIndicator');

// Estado da apresentação
let currentSlide = 0;
let loadedSlides = [];
const totalSlides = slidesConfig.length;

// Scripts específicos por slide
const slideSpecificScripts = {
    'slide11': function() {
        // Verifica se a função initializeTimeline existe no escopo global após carregamento do script externo
        if (typeof window.initializeTimeline === 'function') {
            setTimeout(window.initializeTimeline, 100);
        } else {
            console.warn('Função initializeTimeline não encontrada. Verifique se timeline.js foi carregado.');
        }
    }
    // Adicione mais funções específicas para outros slides conforme necessário
};

// Inicialização
document.addEventListener('DOMContentLoaded', async function() {
    // Carregar todos os slides
    await loadAllSlides();
    
    // Configurar estado inicial
    updateSlidePosition();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Carregar CSS inicial
    loadSlideCSSById(slidesConfig[currentSlide].id);
});

/**
 * Carrega todos os slides
 */
async function loadAllSlides() {
    try {
        // Limpar o container de slides
        slidesWrapper.innerHTML = '';
        
        // Carregar cada slide
        for (let i = 0; i < slidesConfig.length; i++) {
            await loadSlide(i);
        }
    } catch (error) {
        console.error('Erro ao carregar slides:', error);
        slidesWrapper.innerHTML = `<div class="error-slide">Erro ao carregar slides: ${error.message}</div>`;
    }
}

/**
 * Carrega um slide específico
 */
async function loadSlide(index) {
    if (loadedSlides[index]) return; // Slide já carregado
    
    const slideConfig = slidesConfig[index];
    
    try {
        // Carregar o conteúdo do slide
        const response = await fetch(slideConfig.path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        // Criar o elemento do slide
        const slideElement = document.createElement('section');
        slideElement.className = 'slide';
        slideElement.id = slideConfig.id;
        slideElement.innerHTML = html;
        
        // Adicionar ao wrapper
        slidesWrapper.appendChild(slideElement);
        
        // Marcar como carregado
        loadedSlides[index] = true;
    } catch (error) {
        console.error(`Erro ao carregar slide ${index}:`, error);
        
        // Criar um slide de erro como fallback
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

/**
 * Configura os event listeners
 */
function setupEventListeners() {
    // Botões de navegação
    prevBtn.addEventListener('click', goToPreviousSlide);
    nextBtn.addEventListener('click', goToNextSlide);
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPreviousSlide();
        }
    });
}

/**
 * Navega para o slide anterior
 */
function goToPreviousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlidePosition();
    }
}

/**
 * Navega para o próximo slide
 */
function goToNextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlidePosition();
    }
}

/**
 * Atualiza a posição visual dos slides
 */
function updateSlidePosition() {
    // Atualiza a posição dos slides
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualiza o indicador de slide
    slideIndicator.textContent = `Slide ${currentSlide + 1}/${totalSlides}`;
    
    // Atualiza os estados dos botões
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
    
    // Carrega o CSS específico do slide atual
    loadSlideCSSById(slidesConfig[currentSlide].id);
    
    // Adiciona classe ativa ao slide atual
    updateActiveSlide();
    
    // Ativa scripts específicos do slide atual se necessário
    activateCurrentSlideScripts();
}

/**
 * Ativa scripts específicos para o slide atual
 */
function activateCurrentSlideScripts() {
    const slideConfig = slidesConfig[currentSlide];
    const slideId = slideConfig.id;
    
    // Executa o script específico para o slide atual se existir
    if (slideSpecificScripts[slideId]) {
        slideSpecificScripts[slideId]();
    }
}

/**
 * Atualiza qual slide está marcado como ativo
 */
function updateActiveSlide() {
    // Remove a classe ativa de todos os slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Adiciona a classe ativa ao slide atual
    const currentSlideElement = slidesWrapper.children[currentSlide];
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }
}

/**
 * Carrega o CSS específico de um slide por seu ID
 */
function loadSlideCSSById(slideId) {
    // Encontra o número do slide pelo ID
    const slideConfig = slidesConfig.find(slide => slide.id === slideId);
    if (!slideConfig) return;
    
    // Remove quaisquer CSS específicos de slides anteriores
    document.querySelectorAll('link[data-slide-css]').forEach(link => {
        link.remove();
    });
    
    // Cria e adiciona o link para o CSS do slide atual
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = slideConfig.cssPath;
    link.setAttribute('data-slide-css', slideId);
    document.head.appendChild(link);
}