// script.js

/**
 * Inicializa o formulário de interesse em adoção.
 * Adiciona um event listener para o envio do formulário.
 */
function initFormAdocao() {
    const formAdocao = document.getElementById('form-interesse-adocao');
    if (!formAdocao) {
        // console.warn("Formulário 'form-interesse-adocao' não encontrado nesta página.");
        return;
    }

    formAdocao.addEventListener('submit', function(event) {
        event.preventDefault();
        const numeroWhatsAppOrganização = '553799377485'; // CONFIRME SE ESTE NÚMERO ESTÁ CORRETO
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const animalInteresse = document.getElementById('animal-interesse').value.trim() || 'Não especificado';
        const tipoMoradia = document.getElementById('tipo-moradia').value;
        const experiencia = document.getElementById('experiencia').value.trim();

        if (!nome || !email || !telefone || !endereco || !tipoMoradia || !experiencia) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (isNaN(telefone) || telefone.trim() === "" || telefone.length < 10) { // Verifica se é número e tem um tamanho mínimo
            alert("Por favor, digite um número de telefone válido (apenas números, incluindo DDD).");
            return;
        }

        let mensagem = `🐾 *Formulário de Interesse em Adoção* 🐾\n\n`;
        mensagem += `*Nome:* ${nome}\n`;
        mensagem += `*E-mail:* ${email}\n`;
        mensagem += `*Telefone:* ${telefone}\n`;
        mensagem += `*Endereço:* ${endereco}\n\n`;
        mensagem += `*Animal de Interesse:* ${animalInteresse}\n`;
        mensagem += `*Tipo de Moradia:* ${tipoMoradia}\n`;
        mensagem += `*Experiência Anterior:* ${experiencia}\n\n`;

        const mensagemCodificada = encodeURIComponent(mensagem);
        const linkWhatsApp = `https://wa.me/${numeroWhatsAppOrganização}?text=${mensagemCodificada}`;
        
        window.open(linkWhatsApp, '_blank'); // Abre WhatsApp em nova aba
        formAdocao.reset(); 
    });
}

/**
 * Inicializa o menu hambúrguer e seus comportamentos.
 */
function initHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMobile = document.querySelector('.nav-mobile'); 

    if (!hamburgerMenu || !navMobile) {
        // console.warn("Elementos essenciais do menu hambúrguer (.hamburger-menu ou .nav-mobile) não encontrados.");
        return;
    }

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('is-active');
        navMobile.classList.toggle('is-active'); 
        const isExpanded = hamburgerMenu.classList.contains('is-active');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded);
    });

    const navMobileLinks = navMobile.querySelectorAll('ul li a');
    navMobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMobile.classList.contains('is-active')) {
                hamburgerMenu.classList.remove('is-active');
                navMobile.classList.remove('is-active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (navMobile.classList.contains('is-active')) { // Só processa se o menu estiver aberto
            const isClickInsideNavMobile = navMobile.contains(event.target);
            const isClickOnHamburger = hamburgerMenu.contains(event.target);
            if (!isClickInsideNavMobile && !isClickOnHamburger) {
                hamburgerMenu.classList.remove('is-active');
                navMobile.classList.remove('is-active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

/**
 * Inicializa o efeito de encolher o header ao rolar a página.
 */
function initHeaderShrink() {
    const header = document.querySelector("header");
    if (!header) {
        // console.warn("Elemento header não encontrado para o efeito shrink.");
        return;
    }

    let isShrunk = false; // Controla o estado para evitar múltiplas adições/remoções de classe
    const shrinkThreshold = 50; // Distância de scroll para ativar o efeito

    window.addEventListener("scroll", function () {
        if (window.scrollY > shrinkThreshold && !isShrunk) {
            header.classList.add("shrink");
            isShrunk = true;
        } else if (window.scrollY <= shrinkThreshold && isShrunk) {
            header.classList.remove("shrink");
            isShrunk = false;
        }
    }, { passive: true }); // Opcional: { passive: true } pode melhorar a performance de scroll
}

/**
 * Inicializa as animações de "aparecer" ao rolar (Intersection Observer).
 */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-right, .importancia-doacao p, .doacao-item, .foto'); 
    if (elementsToAnimate.length === 0) {
        // console.warn("Nenhum elemento encontrado para animações de scroll via IntersectionObserver.");
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => { // Adicionado 'obs' para unobserve
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.1 }); // threshold: 0.1 significa que 10% do elemento precisa estar visível

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Inicializa o slider Swiper para a seção hero, se existir.
 */
function initHeroSwiper() {
    if (typeof Swiper !== 'undefined' && document.querySelector('.hero-background-slider')) {
        new Swiper('.hero-background-slider', { // 'const heroSwiper =' não é necessário se a instância não for usada depois
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 1000,
            allowTouchMove: false, // Desabilita arrastar se não for necessário
        });
    } else {
        // console.warn("Elemento .hero-background-slider não encontrado ou biblioteca Swiper não carregada.");
    }
}

/**
 * Reseta o estado do menu mobile para fechado.
 */
function resetMenuOnPageLoad() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMobile = document.querySelector('.nav-mobile');

    if (hamburgerMenu && navMobile) {
        // Remove a transição temporariamente para evitar "flash" da animação ao carregar/voltar
        const originalTransition = navMobile.style.transition;
        navMobile.style.transition = 'none';

        hamburgerMenu.classList.remove('is-active');
        navMobile.classList.remove('is-active'); 
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        
        setTimeout(() => {
            navMobile.style.transition = originalTransition;
        }, 0); // Um timeout de 0ms adia a execução para o próximo ciclo de eventos.
    }
}

// PONTO DE ENTRADA PRINCIPAL DO SCRIPT: Espera o DOM estar carregado
document.addEventListener('DOMContentLoaded', () => {
    // console.log("DOM carregado, inicializando scripts...");
    initFormAdocao();
    initHamburgerMenu();
    initHeaderShrink();
    initScrollAnimations();
    initHeroSwiper();
    
    // Reset inicial do menu para garantir estado limpo no carregamento
    resetMenuOnPageLoad();
});

// Listener para o evento 'pageshow', importante para o bfcache (navegação voltar/avançar)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) { // Página foi carregada do bfcache
        // console.log("Página restaurada do bfcache, resetando estado do menu.");
        resetMenuOnPageLoad();
        // Outras reinicializações podem ser necessárias aqui se outros estados visuais
        // persistirem incorretamente devido ao bfcache.
    }
});