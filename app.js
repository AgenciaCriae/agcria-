// Variáveis globais
let isMenuOpen = false;
let showScrollTop = false;

// Elementos do DOM
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

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
      const headerHeight = 80;
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
    
    // Simular envio
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
