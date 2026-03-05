 // ===== FUNÇÕES FOCADAS =====

// 1. Obter ano atual
function getCurrentYear() {
    return new Date().getFullYear();
}

// 2. Atualizar elemento do DOM
function updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = content;
    }
}

// 3. Atualizar ano no footer
function updateFooterYear() {
    const year = getCurrentYear();
    updateElement('#year', year);
}

// 4. Toggle de tema
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 5. Carregar tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    updateFooterYear();
    loadSavedTheme();
    loadClockFormat();
    startClock();
    initVisitCounter();
    renderProjects(projects);
    setupFilterListeners();
    setupModalListeners();
    setupSearchListener();
    setupFormValidation();
    setupCharCounter();
    setupFormSubmit();
    setupAdminToggle();
    loadMessages(); 
    initGitHubStats();
    initWeatherWidget();
});

// ===== DARK MODE TOGGLE =====

// 1. Função para alternar tema
function toggleTheme() {
    // Adiciona/remove classe dark-mode do body
    document.body.classList.toggle('dark-mode');
    
    // Verifica se está em dark mode
    const isDark = document.body.classList.contains('dark-mode');
    
    // Guarda preferência no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log(`Tema alterado para: ${isDark ? 'escuro' : 'claro'}`);
}

// 2. Event listener no botão
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// 3. Carregar tema guardado ao iniciar
function loadSavedTheme() {
    // Buscar tema do localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Se tiver tema guardado como 'dark', ativa dark mode
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    console.log(`Tema carregado: ${savedTheme || 'padrão (light)'}`);
}

// ===== RELÓGIO DIGITAL =====

// Variável global para formato (true = 24h, false = 12h)
let is24Hour = true;

// 1. Função para atualizar o relógio
function updateClock() {
    // Obter hora atual
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Converter para 12h se necessário
    if (!is24Hour) {
        hours = hours % 12 || 12; // 0 vira 12
    }
    
    // Adicionar zero à esquerda se < 10
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    
    // Atualizar DOM
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}
// 2. Variável para guardar o intervalo
let clockInterval;

// 3. Função para iniciar o relógio
function startClock() {
    // Atualizar imediatamente
    updateClock();
    
    // Atualizar a cada 1000ms (1 segundo)
    clockInterval = setInterval(updateClock, 1000);
    
    console.log('⏰ Relógio iniciado!');
}

// 5. Função para alternar formato
function toggleFormat() {
    is24Hour = !is24Hour;
    
    // Guardar preferência
    localStorage.setItem('clockFormat', is24Hour ? '24' : '12');
    
    // Atualizar imediatamente
    updateClock();
    
    console.log(`Formato: ${is24Hour ? '24h' : '12h'}`);
}

// 6. Event listener no botão
const formatToggle = document.getElementById('format-toggle');
if (formatToggle) {
    formatToggle.addEventListener('click', toggleFormat);
}

// 7. Carregar formato guardado
function loadClockFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) {
        is24Hour = (saved === '24');
    }
}

// ===== CONTADOR DE VISITAS =====

// 1. Função para obter contagem atual
function getVisitCount() {
    // Buscar do localStorage (retorna string ou null)
    const count = localStorage.getItem('visitCount');
    
    // Converter para número (ou 0 se não existir)
    return count ? parseInt(count) : 0;
}

// 2. Função para incrementar visitas
function incrementVisitCount() {
    // Obter contagem atual
    let count = getVisitCount();
    
    // Incrementar
    count++;
    
    // Guardar nova contagem
    localStorage.setItem('visitCount', count);
    
    // Guardar timestamp da visita
    const now = new Date().toISOString();
    localStorage.setItem('lastVisit', now);
    
    return count;
}

// 3. Função para atualizar o display
function updateVisitDisplay() {
    const count = getVisitCount();
    
    // Atualizar número
    const countElement = document.getElementById('visit-count');
    if (countElement) {
        countElement.textContent = count;
    }
    
    console.log(`📊 Visitas: ${count}`);
}

// 4. Função para formatar data
function formatLastVisit() {
    const lastVisitISO = localStorage.getItem('lastVisit');
    
    if (!lastVisitISO) {
        return 'Primeira vez aqui! 🎉';
    }
    
    const lastVisit = new Date(lastVisitISO);
    const now = new Date();
    
    // Calcular diferença em milissegundos
    const diff = now - lastVisit;
    
    // Converter para minutos/horas/dias
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Há menos de 1 minuto';
    if (minutes < 60) return `Há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `Há ${hours} hora${hours > 1 ? 's' : ''}`;
    return `Há ${days} dia${days > 1 ? 's' : ''}`;
}

// 5. Atualizar display da última visita
function updateLastVisitDisplay() {
    const lastVisitText = formatLastVisit();
    
    const lastVisitElement = document.getElementById('last-visit');
    if (lastVisitElement) {
        lastVisitElement.textContent = lastVisitText;
    }
}

// 6. Função para inicializar o contador
function initVisitCounter() {
    // Incrementar visitas
    incrementVisitCount();
    
    // Atualizar displays
    updateVisitDisplay();
    updateLastVisitDisplay();
    
    console.log('📊 Contador de visitas inicializado!');
}

// 8. Função para resetar contador
function resetVisitCounter() {
    // Confirmar com utilizador
    const confirm = window.confirm('Tens a certeza que queres resetar o contador?');
    
    if (confirm) {
        // Limpar localStorage
        localStorage.removeItem('visitCount');
        localStorage.removeItem('lastVisit');
        
        // Atualizar displays
        updateVisitDisplay();
        updateLastVisitDisplay();
        
        console.log('🔄 Contador resetado!');
        
        // Feedback visual
        alert('Contador resetado com sucesso!');
    }
}

// 9. Event listener no botão
const resetBtn = document.getElementById('reset-counter');
if (resetBtn) {
    resetBtn.addEventListener('click', resetVisitCounter);
}

// ===== DADOS DOS PROJETOS =====

const projects = [
    {
        id: 1,
        title: 'Task Manager App',
        category: 'web',
        description: 'Aplicação de gestão de tarefas com funcionalidades avançadas',
        image: '',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'Projetos/Projeto_1/index.html',
        longDescription: 'Aplicação de gestão de tarefas com funcionalidades avançadas, incluindo criação de tarefas, edição, exclusão e marcação como concluída.',
        features: ['Criação de tarefas', 'Edição de tarefas', 'Exclusão de tarefas', 'Marcação como concluída'],
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage', 'Fetch API'],
        date: '2026-02'
    },
    {
        id: 2,
        title: 'NUTS de Portugal', 
        category: 'web',
        description: 'Site sobre os NUTS de Portugal',
        image: 'Projetos/HTML/Projeto%20HTML/500px-NUTS_PT_2024.png',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'Projetos/HTML/Projeto%20HTML/Página%201.html',
        longDescription: 'Este site apresenta informações detalhadas sobre os NUTS de Portugal, incluindo um mapas interativos, imagens das varias NUTS. O design é responsivo e otimizado para todos os dispositivos.',
        features: ['Mapa interativo', 'Imagens das NUTS', 'Design responsivo', 'Informações detalhadas'],
        technologies: ['HTML5', 'CSS3', 'JavaScript ES6+'],
        date: '2025-03'
    },
    {
        id: 3,
        title: 'Introdução a HTML',
        category: 'web',
        description: 'Site de introdução ao HTML',
        image: 'Projetos/HTML/Introdução%20HTML/cao.jpg',
        tags: ['HTML', 'CSS'],
        link: 'Projetos/HTML/Introdução%20HTML/Intrudução%20a%20HTML.html',
        longDescription: 'Site de introdução ao HTML e CSS.',
        features: ['Exemplos de HTML e CSS', 'Design simples e limpo', 'Conteúdo educativo', 'Fácil navegação'],
        technologies: ['HTML5', 'CSS3'],
        date: '2025-02'
    }
];

// Variável global para controlar filtro atual
let currentCategory = 'all';

// ===== RENDERIZAR PROJETOS =====

function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    
    // Limpar grid
    grid.innerHTML = '';
    
    // Se não há projetos, mostrar mensagem
    if (projectsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Criar card para cada projeto
    projectsToRender.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
    
    // Atualizar contadores
    updateCounters();
}

// Criar HTML de um card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;
    
    // Template string com HTML do card
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-card-body">
            <span class="project-category">${project.category}</span>
            <h3>${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Atualizar números nos botões de filtro
function updateCounters() {
    const allCount = projects.length;
    const webCount = projects.filter(p => p.category === 'web').length;
    const mobileCount = projects.filter(p => p.category === 'mobile').length;
    const designCount = projects.filter(p => p.category === 'design').length;
    
    document.querySelector('[data-category="all"] .count').textContent = allCount;
    document.querySelector('[data-category="web"] .count').textContent = webCount;
    document.querySelector('[data-category="mobile"] .count').textContent = mobileCount;
    document.querySelector('[data-category="design"] .count').textContent = designCount;
}

// ===== SISTEMA DE FILTROS =====

function filterProjects(category) {
    // Guardar categoria atual
    currentCategory = category;
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    // Re-renderizar com projetos filtrados
    renderProjects(filteredProjects);
    
    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}

// ===== EVENT LISTENERS PARA FILTROS =====

function setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active ao clicado
            button.classList.add('active');
            
            // Obter categoria do data attribute
            const category = button.dataset.category;
            
            // Filtrar projetos
            filterProjects(category);
        });
    });
}

// Versão com animação de saída
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    const noResults = document.getElementById('no-results');
    
    // Fade out dos cards existentes
    const existingCards = grid.querySelectorAll('.project-card');
    existingCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeOut 0.3s ease forwards';
        }, index * 50);
    });
    
    // Esperar animação terminar antes de limpar
    setTimeout(() => {
        grid.innerHTML = '';
        
        if (projectsToRender.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        projectsToRender.forEach(project => {
            const card = createProjectCard(project);
            grid.appendChild(card);
        });
        
        updateCounters();
    }, existingCards.length * 50 + 300);
}

// ===== SISTEMA DE MODAL =====

function openModal(projectId) {
    // Encontrar projeto pelo ID
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        console.error('Projeto não encontrado!');
        return;
    }
    
    // Preencher conteúdo do modal
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <span class="modal-category">${project.category}</span>
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        
        <div class="modal-section">
            <h3>Sobre o Projeto</h3>
            <p>${project.longDescription}</p>
        </div>
        
        <div class="modal-section">
            <h3>Funcionalidades</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Tecnologias Utilizadas</h3>
            <div class="modal-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        <a href="${project.link}" target="_blank" class="modal-link">
            Ver Projeto Completo →
        </a>
    `;
    
    // Mostrar modal
    const modal = document.getElementById('project-modal');
    modal.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    console.log(`Modal aberto: ${project.title}`);
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    
    // Restaurar scroll
    document.body.style.overflow = 'auto';
    
    console.log('Modal fechado');
}

// ===== EVENT LISTENERS DO MODAL =====

function setupModalListeners() {
    // Event Delegation nos cards
    const grid = document.getElementById('projects-grid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectId = parseInt(card.dataset.id);
            openModal(projectId);
        }
    });
    
    // Fechar modal ao clicar no X
    const closeBtn = document.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora (no overlay)
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ===== SISTEMA DE PESQUISA =====

function searchProjects(query) {
    // Converter query para lowercase
    const searchTerm = query.toLowerCase().trim();
    
    // Se pesquisa vazia, mostrar todos (respeitando filtro categoria)
    if (searchTerm === '') {
        filterProjects(currentCategory);
        return;
    }
    
    // Começar com projetos da categoria atual
    let baseProjects = currentCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === currentCategory);
    
    // Filtrar por termo de pesquisa
    const results = baseProjects.filter(project => {
        // Procurar em múltiplos campos
        const titleMatch = project.title.toLowerCase().includes(searchTerm);
        const descMatch = project.description.toLowerCase().includes(searchTerm);
        const tagsMatch = project.tags.some(tag => 
            tag.toLowerCase().includes(searchTerm)
        );
        
        return titleMatch || descMatch || tagsMatch;
    });
    
    // Renderizar resultados
    renderProjects(results);
    
    console.log(`Pesquisa: "${query}" - ${results.length} resultados`);
}

// ===== EVENT LISTENER PARA PESQUISA =====

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Event 'input' dispara a cada tecla pressionada
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        searchProjects(query);
    });
    
    // Limpar pesquisa com Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}

// ===== DEBOUNCE PARA PESQUISA =====

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Criar versão debounced da pesquisa
const debouncedSearch = debounce(searchProjects, 300);

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    
    // Usar versão debounced
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        debouncedSearch(query);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchProjects('');
            searchInput.blur();
        }
    });
}   

// Quando mudar filtro, limpar pesquisa
function filterProjects(category) {
    currentCategory = category;
    
    // Limpar input de pesquisa
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projects;
    } else {
        filteredProjects = projects.filter(project => project.category === category);
    }
    
    renderProjects(filteredProjects);
    console.log(`Filtro aplicado: ${category} (${filteredProjects.length} projetos)`);
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====

// Regras de validação
const validationRules = {
    name: {
        required: true,
        minLength: 3,
        pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
        errorMessages: {
            required: 'Por favor, introduz o teu nome',
            minLength: 'O nome deve ter pelo menos 3 caracteres',
            pattern: 'O nome só pode conter letras'
        }
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessages: {
            required: 'Por favor, introduz o teu email',
            pattern: 'Por favor, introduz um email válido'
        }
    },
    // Adicionar às regras
    phone: {
        required: false,
        pattern: /^(\+351)?[0-9]{9}$/,
        errorMessages: {
            pattern: 'Formato: +351 912345678 ou 912345678'
        }
    },
    subject: {
        required: true,
        errorMessages: {
            required: 'Por favor, seleciona um assunto'
        }
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 500,
        errorMessages: {
            required: 'Por favor, escreve uma mensagem',
            minLength: 'A mensagem deve ter pelo menos 10 caracteres',
            maxLength: 'A mensagem não pode ter mais de 500 caracteres'
        }
    }
};

// Validar campo individual
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    
    // Required
    if (rules.required && !value.trim()) {
        return {
            valid: false,
            message: rules.errorMessages.required
        };
    }
    
    // Min Length
    if (rules.minLength && value.trim().length < rules.minLength) {
        return {
            valid: false,
            message: rules.errorMessages.minLength
        };
    }
    
    // Max Length
    if (rules.maxLength && value.trim().length > rules.maxLength) {
        return {
            valid: false,
            message: rules.errorMessages.maxLength
        };
    }
    
    // Pattern (RegEx)
    if (rules.pattern && !rules.pattern.test(value)) {
        return {
            valid: false,
            message: rules.errorMessages.pattern
        };
    }
    
    // Válido!
    return {
        valid: true,
        message: ''
    };
}

// Mostrar feedback visual
function showFieldFeedback(fieldName, isValid, message = '') {
    const formGroup = document.getElementById(fieldName).closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    // Remover estados anteriores
    formGroup.classList.remove('valid', 'invalid');
    
    // Adicionar novo estado
    if (isValid) {
        formGroup.classList.add('valid');
        errorElement.textContent = '';
    } else {
        formGroup.classList.add('invalid');
        errorElement.textContent = message;
    }
}

// ===== EVENT LISTENERS =====

function setupFormValidation() {
    const form = document.getElementById('contact-form');
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    
    // Validar cada campo ao perder foco (blur)
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        
        field.addEventListener('blur', () => {
            const validation = validateField(fieldName, field.value);
            showFieldFeedback(fieldName, validation.valid, validation.message);
            updateSubmitButton();
        });
        
        // Validar enquanto escreve (para limpar erros)
        field.addEventListener('input', () => {
            // Só valida se já tinha erro
            const formGroup = field.closest('.form-group');
            if (formGroup.classList.contains('invalid')) {
                const validation = validateField(fieldName, field.value);
                showFieldFeedback(fieldName, validation.valid, validation.message);
                updateSubmitButton();
            }
        });
    });
}

// Validar form inteiro
function validateForm() {
    const fields = ['name', 'email', 'phone', 'subject', 'message'];
    let isFormValid = true;
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const validation = validateField(fieldName, field.value);
        
        showFieldFeedback(fieldName, validation.valid, validation.message);
        
        if (!validation.valid) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

// Atualizar estado do botão submit
function updateSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    const fields = ['name', 'email', 'subject', 'message', 'phone'];
    const valid = fields.every(fieldName => {         
    const field = document.getElementById(fieldName);         
    if (!field) return true;         
        return validateField(fieldName, field.value).valid;     });     
    submitBtn.disabled = !valid; 
}

// ===== CONTADOR DE CARACTERES =====

function setupCharCounter() {
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    const counter = document.querySelector('.char-counter');
    const maxLength = 500;
    
    messageField.addEventListener('input', () => {
        const length = messageField.value.length;
        charCount.textContent = length;
        
        // Remover classes anteriores
        counter.classList.remove('warning', 'error');
        
        // Adicionar warning quando >400 caracteres
        if (length > 400 && length <= maxLength) {
            counter.classList.add('warning');
        }
        
        // Adicionar error quando >maxLength
        if (length > maxLength) {
            counter.classList.add('error');
        }
    });
}

// ===== TOAST NOTIFICATIONS =====

function showToast(type, title, message, duration = 3000) {
    const container = document.getElementById('toast-container');
    
    // Ícones por tipo
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    // Criar toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <div class="toast-icon">${icons[type]}</div>
    <div class="toast-content">
        <strong>${title}</strong>
        <p>${message}</p>
    </div>
    <span class="toast-close">×</span>`;
    
    // Adicionar ao container
    container.appendChild(toast);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    });
    
    // Auto-remove após duration
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'fadeOut 0.4s ease forwards';
            setTimeout(() => toast.remove(), 400);
        }
    }, duration);
    
    console.log(`Toast ${type}: ${title}`);
}

// ===== PROCESSAR SUBMIT =====

function setupFormSubmit() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        showToast('error', 'Erro!', 'Por favor, corrige os erros');
        return;
    }
    
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // ADICIONAR: Guardar mensagem
        const formData = new FormData(form);
        saveMessage(formData);
        
        showToast(
            'success',
            'Mensagem Enviada!',
            'Obrigado pelo contacto. Respondo em breve!'
        );
        
        form.reset();
        // ... resto do código
        
    } catch (error) {
        showToast('error', 'Erro ao Enviar', 'Tenta novamente.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
});

}

// ===== GUARDAR MENSAGENS =====

function saveMessage(formData) {
    // Obter mensagens existentes
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
   
    // Criar nova mensagem
    const message = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        date: new Date().toISOString(),
        read: false
    };
   
    // Adicionar ao array
    messages.unshift(message); // unshift adiciona ao início
   
    // Guardar de volta
    localStorage.setItem('contactMessages', JSON.stringify(messages));
   
    console.log('💾 Mensagem guardada:', message);
    return message;
}


// ===== ADMIN VIEW =====

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    const messagesList = document.getElementById('messages-list');
    const noMessages = document.getElementById('no-messages');
    const totalMessages = document.getElementById('total-messages');
    const unreadBadge = document.getElementById('unread-badge');
    
    // Atualizar contador
    totalMessages.textContent = messages.length;
    
    // Contar não lidas
    const unreadCount = messages.filter(m => !m.read).length;
    if (unreadCount > 0) {
        unreadBadge.textContent = unreadCount;
        unreadBadge.style.display = 'flex';
    } else {
        unreadBadge.style.display = 'none';
    }
    
    // Mostrar/esconder mensagens
    if (messages.length === 0) {
        messagesList.style.display = 'none';
        noMessages.style.display = 'block';
        return;
    }
    
    messagesList.style.display = 'flex';
    noMessages.style.display = 'none';
    

    // Renderizar mensagens
    messagesList.innerHTML = messages.map(msg => `
    <div class="message-card">
        <div class="message-header">
        <div class="message-sender">
            <h4>${msg.name}</h4>
            <p>${msg.email}</p>
            <p class="message-phone">${msg.phone}</p>
        </div>
        </div>
        <div class="message-meta">
            <div>${new Date(msg.date).toLocaleDateString('pt-PT')}</div>
        </div>
            <span class="message-subject">${msg.subject}</span>
            <div class="message-body">${msg.message}</div>
            <div class="message-actions">
                <button class="btn-delete" data-id="${msg.id}">🗑️ Eliminar</button>
            </div>
    </div>`).join('');

    // Liga os botões de eliminar (após inserir o HTML)
    messagesList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteMessage(parseInt(btn.dataset.id)));
    });
}

function deleteMessage(id) {
    if (!confirm('Eliminar esta mensagem?')) return;
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages = messages.filter(m => m.id !== id); // Remove a mensagem com este id
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    loadMessages(); // Atualiza a lista visível
    showToast('success', 'Eliminada!', 'Mensagem removida com sucesso');
}

function clearAllMessages() {
    if (!confirm('Eliminar TODAS as mensagens? Esta ação é irreversível!')) return;
    
    localStorage.removeItem('contactMessages');
    loadMessages();
    showToast('success', 'Limpo!', 'Todas as mensagens foram removidas');
}

// Toggle admin view
function setupAdminToggle() {
    const toggleBtn = document.getElementById('toggle-admin');
    const adminSection = document.getElementById('admin-messages');
    let isVisible = false;
    
    toggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        adminSection.style.display = isVisible ? 'block' : 'none';
        
        if (isVisible) {
            loadMessages();
            // Scroll para admin
            adminSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Limpar todas
document.getElementById('clear-messages')?.addEventListener('click', clearAllMessages);

// ===== API SETUP =====

// Event listener
// Setup button event listeners
const fetchBtn = document.getElementById('fetch-btn');
if (fetchBtn) {
    fetchBtn.addEventListener('click', async () => {
        const resultDiv = document.getElementById('result');
        fetchBtn.disabled = true;
        fetchBtn.textContent = 'Carregando...';
        resultDiv.innerHTML = '<p>⏳ A buscar dados...</p>';
        
        try {
            const data = await fetchGitHubUserData();
            resultDiv.innerHTML = `
                <div class="user-card">
                    <h3>${data.name || 'N/A'}</h3>
                    <p><strong>Perfil:</strong> <a href="${data.html_url}" target="_blank">${data.login}</a></p>
                </div>
            `;
        } catch (error) {
            resultDiv.innerHTML = `<div class="error"><p>❌ Erro: ${error.message}</p></div>`;
        } finally {
            fetchBtn.disabled = false;
            fetchBtn.textContent = 'Buscar Dados';
        }
    });
}

// ===== CONFIGURAÇÃO =====

// Tentar carregar configurações locais (não versionadas)
let GITHUB_USERNAME = 'hajikigamer';
let GITHUB_TOKEN = null;

try {
    // Se config.js existir, carrega as configurações
    if (typeof CONFIG !== 'undefined') {
        GITHUB_USERNAME = CONFIG.github.username;
        GITHUB_TOKEN = CONFIG.github.token;
        console.log('✅ Configurações carregadas do config.js');
    }
} catch (error) {
    console.log('ℹ️ Usando configurações padrão (sem token)');
}

// Buscar dados do utilizador
async function fetchGitHubUserData() {
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        // Adicionar token se definido
        if (GITHUB_TOKEN && GITHUB_TOKEN !== 'ghp_your_token_here') {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('✅ GitHub user data:', data);
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar GitHub user:', error);
        throw error;
    }
}

// Atualizar stats no DOM
function updateGitHubStats(userData) {
    document.getElementById('repos-count').textContent = userData.public_repos;
    document.getElementById('followers-count').textContent = userData.followers;
    document.getElementById('following-count').textContent = userData.following;
    
    // Remover classe loading
    document.querySelectorAll('.stat-value').forEach(el => {
        el.classList.remove('loading');
    });
}

// Buscar repositórios do utilizador
async function fetchGitHubRepos() {
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        // Adicionar token se definido (aumenta rate limit)
        if (GITHUB_TOKEN && GITHUB_TOKEN !== 'ghp_your_token_here') {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`,
            { headers }
        );
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        console.log('✅ GitHub repos:', repos);
        return repos;
        
    } catch (error) {
        console.error('❌ Erro ao buscar repos:', error);
        throw error;
    }
}

// Calcular total de stars
async function calculateTotalStars() {
    try {
        const repos = await fetchGitHubRepos();
        const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        document.getElementById('stars-count').textContent = totalStars;
        
        return repos;
    } catch (error) {
        document.getElementById('stars-count').textContent = '0';
        throw error;
    }
}

// Renderizar repositórios
function renderRepos(repos) {
    const grid = document.getElementById('repos-grid');
    
    grid.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <div class="repo-header">
                <div class="repo-info">
                    <h4>📦 ${repo.name}</h4>
                    <p class="repo-url"><a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
                </div>
            </div>
            
            <div class="repo-meta">
                <div>${new Date(repo.created_at).toLocaleDateString('pt-PT')}</div>
            </div>
            
            <div class="repo-description">
                ${repo.description || 'Sem descrição disponível'}
            </div>
            
            <div class="repo-stats">
                <span class="stat">⭐ ${repo.stargazers_count}</span>
                <span class="stat">🔀 ${repo.forks_count}</span>
                ${repo.language ? `<span class="stat">💻 ${repo.language}</span>` : ''}
            </div>
            
            <div class="repo-actions">
                <a href="${repo.html_url}" target="_blank" class="btn-view">🔗 Ver Repositório</a>
            </div>
        </div>
    `).join('');
}

// ===== INICIALIZAR GITHUB STATS =====

async function initGitHubStats() {
    console.log('🐙 Carregando GitHub stats...');
    
    try {
        // Buscar dados em paralelo
        const [userData, repos] = await Promise.all([
            fetchGitHubUserData(),
            calculateTotalStars()
        ]);
        
        // Atualizar UI
        updateGitHubStats(userData);
        renderRepos(repos);
        
        console.log('✅ GitHub stats carregados!');
        
    } catch (error) {
        console.error('❌ Erro ao carregar GitHub stats:', error);
        // Mostrar erro na UI
        document.querySelectorAll('.stat-value').forEach(el => {
            el.textContent = '--';
            el.classList.remove('loading');
        });
    }
}

// ===== CACHE SIMPLES =====

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

function getCachedData(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // Verificar se cache ainda é válido
    if (now - timestamp < CACHE_DURATION) {
        console.log(`✅ Usando cache para ${key}`);
        return data;
    }
    
    // Cache expirado
    localStorage.removeItem(key);
    return null;
}

function setCachedData(key, data) {
    const cacheObj = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheObj));
}

// Atualizar fetchGitHubUserData para usar cache
async function fetchGitHubUserData() {
    const cacheKey = `github_user_${GITHUB_USERNAME}`;
    
    // Tentar obter do cache primeiro
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    // Se não tem cache, buscar da API
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        // Adicionar token se definido (aumenta rate limit de 60 para 5000 requests/hora)
        if (GITHUB_TOKEN && GITHUB_TOKEN !== 'ghp_your_token_here') {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Guardar no cache
        setCachedData(cacheKey, data);
        
        return data;
    } catch (error) {
        console.error('❌ Erro ao buscar GitHub user:', error);
        throw error;
    }
}

// ===== WEATHER WIDGET =====

const OPENWEATHER_API_KEY = '3ea4b4f09f500e772d1869db7777b574';
const DEFAULT_CITY = 'Lisbon'; // Cidade padrão se geolocalização falhar

// Mapeamento de códigos para emojis
const weatherIcons = {
    '01d': '☀️',  // clear sky day
    '01n': '🌙',  // clear sky night
    '02d': '⛅',  // few clouds day
    '02n': '☁️',  // few clouds night
    '03d': '☁️',  // scattered clouds
    '03n': '☁️',
    '04d': '☁️',  // broken clouds
    '04n': '☁️',
    '09d': '🌧️',  // shower rain
    '09n': '🌧️',
    '10d': '🌦️',  // rain day
    '10n': '🌧️',  // rain night
    '11d': '⛈️',  // thunderstorm
    '11n': '⛈️',
    '13d': '❄️',  // snow
    '13n': '❄️',
    '50d': '🌫️',  // mist
    '50n': '🌫️'
};

// Buscar meteorologia por cidade
async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Weather data:', data);
        
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar meteorologia:', error);
        throw error;
    }
}

// Buscar meteorologia por coordenadas
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt`
        );
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('❌ Erro ao buscar meteorologia:', error);
        throw error;
    }
}

// Atualizar UI do widget
function updateWeatherWidget(data) {
    const widget = document.getElementById('weather-widget');
    const loading = widget.querySelector('.weather-loading');
    const content = widget.querySelector('.weather-content');
    const error = widget.querySelector('.weather-error');
    
    // Esconder loading e error
    loading.style.display = 'none';
    error.style.display = 'none';
    
    // Atualizar dados
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('weather-location').textContent = data.name;
    
    // Atualizar ícone
    const iconCode = data.weather[0].icon;
    const icon = weatherIcons[iconCode] || '🌈';
    document.getElementById('weather-icon').textContent = icon;
    
    // Mostrar content
    content.style.display = 'flex';
}

// Mostrar erro
function showWeatherError() {
    const widget = document.getElementById('weather-widget');
    widget.querySelector('.weather-loading').style.display = 'none';
    widget.querySelector('.weather-content').style.display = 'none';
    widget.querySelector('.weather-error').style.display = 'block';
}

// ===== INICIALIZAR WEATHER WIDGET =====

async function initWeatherWidget() {
    console.log('🌤️ Carregando meteorologia...');
    
    try {
        // Tentar obter localização do utilizador
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Sucesso
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherByCoords(latitude, longitude);
                    updateWeatherWidget(data);
                },
                // Erro ou negado
                async (error) => {
                    console.log('Geolocalização negada, usando cidade padrão');
                    const data = await fetchWeatherByCity(DEFAULT_CITY);
                    updateWeatherWidget(data);
                }
            );
        } else {
            // Browser não suporta geolocalização
            const data = await fetchWeatherByCity(DEFAULT_CITY);
            updateWeatherWidget(data);
        }
        
    } catch (error) {
        console.error('❌ Erro ao carregar meteorologia');
        showWeatherError();
    }
}

// ===== ERROR HANDLING AVANÇADO =====

// Função para lidar com erros de API
function handleAPIError(error, apiName) {
    console.error(`❌ Erro na ${apiName} API:`, error);
    
    // Diferentes tipos de erro
    if (error.message.includes('Failed to fetch')) {
        showToast('error', 'Sem Conexão', `Verifica a tua ligação à internet`);
    } else if (error.message.includes('404')) {
        showToast('error', 'Não Encontrado', `${apiName}: Recurso não encontrado`);
    } else if (error.message.includes('429')) {
        showToast('error', 'Rate Limit', `${apiName}: Muitos pedidos. Tenta mais tarde.`);
    } else if (error.message.includes('403')) {
        showToast('error', 'Acesso Negado', `${apiName}: Verifica API key`);
    } else {
        showToast('error', 'Erro', `${apiName}: ${error.message}`);
    }
}

// Atualizar fetchs para usar handleAPIError
async function fetchGitHubUserData() {
    const cacheKey = `github_user_${GITHUB_USERNAME}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;
    
    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        // Adicionar token se definido
        if (GITHUB_TOKEN && GITHUB_TOKEN !== 'ghp_your_token_here') {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        setCachedData(cacheKey, data);
        return data;
        
    } catch (error) {
        handleAPIError(error, 'GitHub');
        throw error;
    }
}

// ===== RETRY LOGIC =====

async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return response;
            
        } catch (error) {
            // Última tentativa - lançar erro
            if (i === maxRetries - 1) {
                throw error;
            }
            
            // Esperar antes de retry (exponential backoff)
            const delay = Math.pow(2, i) * 1000;
            console.log(`Retry ${i + 1}/${maxRetries} após ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}



