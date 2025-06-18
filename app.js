// Variáveis globais
let isMenuOpen = false;
let showScrollTop = false;
let isAccessibilityMenuOpen = false;
let accessibilitySettings = {
  audio: false,
  highContrast: false,
  largeFonts: false,
  screenReader: false
};

// Elementos do DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const accessibilityBtn = document.getElementById('accessibilityBtn');
const accessibilityMenu = document.getElementById('accessibilityMenu');

// Dados do formulário
let formData = {
  name: '',
  email: '',
  message: ''
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  initializeScrollHandler();
  initializeAccessibility();
});

// Configurar todos os event listeners
function initializeEventListeners() {
  // Menu mobile
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Links do menu mobile
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Botão voltar ao topo
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
  }

  // Formulário de contato
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Inputs do formulário
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    if (nameInput) nameInput.addEventListener('input', handleInputChange);
    if (emailInput) emailInput.addEventListener('input', handleInputChange);
    if (messageInput) messageInput.addEventListener('input', handleInputChange);
  }

  // Smooth scroll para links de navegação
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });
}

// Configurar handler de scroll
function initializeScrollHandler() {
  window.addEventListener('scroll', throttle(handleScroll, 16));
}

// Inicializar funcionalidades de acessibilidade
function initializeAccessibility() {
  if (accessibilityBtn) {
    accessibilityBtn.addEventListener('click', toggleAccessibilityMenu);
  }

  // Event listeners para opções de acessibilidade
  const audioBtn = document.getElementById('audioBtn');
  const contrastBtn = document.getElementById('contrastBtn');
  const fontBtn = document.getElementById('fontBtn');
  const readerBtn = document.getElementById('readerBtn');

  if (audioBtn) audioBtn.addEventListener('click', () => toggleAccessibilitySetting('audio'));
  if (contrastBtn) contrastBtn.addEventListener('click', () => toggleAccessibilitySetting('highContrast'));
  if (fontBtn) fontBtn.addEventListener('click', () => toggleAccessibilitySetting('largeFonts'));
  if (readerBtn) readerBtn.addEventListener('click', () => toggleAccessibilitySetting('screenReader'));
}

// Toggle do menu mobile
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  
  if (mobileMenu) {
    if (isMenuOpen) {
      mobileMenu.classList.add('active');
    } else {
      mobileMenu.classList.remove('active');
    }
  }
  
  if (mobileMenuBtn) {
    if (isMenuOpen) {
      mobileMenuBtn.classList.add('active');
    } else {
      mobileMenuBtn.classList.remove('active');
    }
  }
}

// Fechar menu mobile
function closeMobileMenu() {
  isMenuOpen = false;
  
  if (mobileMenu) {
    mobileMenu.classList.remove('active');
  }
  
  if (mobileMenuBtn) {
    mobileMenuBtn.classList.remove('active');
  }
}

// Toggle do menu de acessibilidade
function toggleAccessibilityMenu() {
  isAccessibilityMenuOpen = !isAccessibilityMenuOpen;
  
  if (accessibilityMenu) {
    if (isAccessibilityMenuOpen) {
      accessibilityMenu.classList.add('active');
    } else {
      accessibilityMenu.classList.remove('active');
    }
  }
}

// Toggle das configurações de acessibilidade
function toggleAccessibilitySetting(setting) {
  accessibilitySettings[setting] = !accessibilitySettings[setting];
  
  // Aplicar as configurações ao documento
  const body = document.body;
  const button = document.getElementById(getButtonId(setting));
  
  switch (setting) {
    case 'highContrast':
      if (accessibilitySettings.highContrast) {
        body.style.filter = 'contrast(150%) brightness(120%)';
        button?.classList.add('active');
      } else {
        body.style.filter = '';
        button?.classList.remove('active');
      }
      break;
      
    case 'largeFonts':
      if (accessibilitySettings.largeFonts) {
        body.style.fontSize = '120%';
        button?.classList.add('active');
      } else {
        body.style.fontSize = '';
        button?.classList.remove('active');
      }
      break;
      
    case 'audio':
      if (accessibilitySettings.audio) {
        console.log('Áudio descrição ativada');
        alert('Áudio descrição ativada! Esta funcionalidade estará disponível em breve.');
        button?.classList.add('active');
      } else {
        console.log('Áudio descrição desativada');
        button?.classList.remove('active');
      }
      break;
      
    case 'screenReader':
      if (accessibilitySettings.screenReader) {
        console.log('Leitor de tela ativado');
        alert('Compatibilidade com leitor de tela melhorada!');
        button?.classList.add('active');
      } else {
        button?.classList.remove('active');
      }
      break;
  }
}

// Obter ID do botão baseado na configuração
function getButtonId(setting) {
  const buttonMap = {
    audio: 'audioBtn',
    highContrast: 'contrastBtn',
    largeFonts: 'fontBtn',
    screenReader: 'readerBtn'
  };
  return buttonMap[setting];
}

// Handler de scroll
function handleScroll() {
  const currentShowScrollTop = window.scrollY > 300;
  
  if (currentShowScrollTop !== showScrollTop) {
    showScrollTop = currentShowScrollTop;
    
    if (scrollTopBtn) {
      if (showScrollTop) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }
}

// Voltar ao topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Smooth scroll para links internos
function handleSmoothScroll(e) {
  const href = e.target.getAttribute('href');
  
  if (href && href.startsWith('#')) {
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Altura do header fixo
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    
    // Fechar menu mobile se estiver aberto
    if (isMenuOpen) {
      closeMobileMenu();
    }
  }
}

// Handler de mudança nos inputs
function handleInputChange(e) {
  const { name, value } = e.target;
  formData[name] = value;
}

// Handler de envio do formulário
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Coletar dados do formulário
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  if (nameInput && emailInput && messageInput) {
    formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };
    
    // Validação básica
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Validação de email
    if (!isValidEmail(formData.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    // Simular envio (aqui você integraria com um serviço real)
    console.log('Formulário enviado:', formData);
    
    // Feedback para o usuário
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    resetForm();
  }
}

// Validação de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Resetar formulário
function resetForm() {
  formData = {
    name: '',
    email: '',
    message: ''
  };
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  if (nameInput) nameInput.value = '';
  if (emailInput) emailInput.value = '';
  if (messageInput) messageInput.value = '';
}

// Função para lidar com redimensionamento da janela
function handleResize() {
  // Fechar menu mobile se a tela ficar grande
  if (window.innerWidth > 768 && isMenuOpen) {
    closeMobileMenu();
  }
}

// Função para melhorar a performance do scroll
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Event listener para redimensionamento
window.addEventListener('resize', handleResize);

// Fechar menu de acessibilidade ao clicar fora
document.addEventListener('click', function(e) {
  if (isAccessibilityMenuOpen && 
      !accessibilityBtn?.contains(e.target) && 
      !accessibilityMenu?.contains(e.target)) {
    toggleAccessibilityMenu();
  }
});

// Função para animações de entrada (opcional)
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar elementos que devem animar
  const animateElements = document.querySelectorAll('.section');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Pequeno delay para garantir que tudo esteja carregado
  setTimeout(initializeAnimations, 100);
});
