document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Menu Mobile - Versão Forçada
  const menuToggle = document.getElementById('menu-mobile-toggle');
  const navMenu = document.getElementById('nav-menu-list');
  const overlay = document.getElementById('nav-overlay');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');

    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', navMenu.classList.contains('active') ? 'x' : 'menu');
      lucide.createIcons();
    }
  });

  overlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    if (icon) icon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- SEAMLESS INFINITE TRACK CLONING ---
  // Logos Track
  const logosTrack = document.querySelector('.logos-track');
  if (logosTrack) {
    const logos = Array.from(logosTrack.children);
    // Duplicate logos 2 times to ensure seamless infinite scroll
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      logosTrack.appendChild(clone);
    });
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      logosTrack.appendChild(clone);
    });
  }

  // Testimonials Track
  const testTrack = document.querySelector('.testimonials-track');
  if (testTrack) {
    const testimonials = Array.from(testTrack.children);
    // Clone testimonials to cover track movement
    testimonials.forEach(test => {
      const clone = test.cloneNode(true);
      testTrack.appendChild(clone);
    });
    testimonials.forEach(test => {
      const clone = test.cloneNode(true);
      testTrack.appendChild(clone);
    });
  }

  // --- SALARY GRAPH ANIMATION ---
  const marketSection = document.querySelector('.market-section');
  const barRows = document.querySelectorAll('.bar-row');

  const animateBars = () => {
    barRows.forEach(row => {
      const fill = row.querySelector('.bar-fill');
      const val = row.getAttribute('data-value');
      if (fill && val) {
        fill.style.width = val + '%';
      }
    });
  };

  if (marketSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(marketSection);
  }

  // --- CANVAS PARTICLE BACKGROUND ---
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 45;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.5 ? 'rgba(255, 122, 0, ' + (Math.random() * 0.3 + 0.1) + ')' : 'rgba(0, 229, 168, ' + (Math.random() * 0.3 + 0.1) + ')';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for canvas performance
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }
});

// ==================== GSAP + SCROLLTRIGGER ====================
gsap.registerPlugin(ScrollTrigger);

// 1. HERO SECTION
function animateHero() {
  const tl = gsap.timeline();

  tl.from(".hero-subtitle", { y: 60, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".hero-title", { y: 80, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.6")
    .from(".hero-desc", { y: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.7")
    .from(".hero-ctas", { y: 50, opacity: 0, duration: 1, stagger: 0.2 }, "-=0.6")
    .from(".hero-avatars", { y: 60, opacity: 0, duration: 1 }, "-=0.8");

  // Parallax no mockup
  gsap.to(".laptop-mockup", {
    y: -40,
    rotationX: 12,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    }
  });
}

// 2. CARDS (Benefícios, Projetos, Professores, Plataforma)
function animateCards() {
  gsap.utils.toArray(".glass-card, .benefit-card, .project-card, .prof-card, .platform-card").forEach((card, index) => {
    gsap.from(card, {
      y: 120,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
}

// 3. METODOLOGIA (Timeline)
function animateTimeline() {
  gsap.from(".timeline-step", {
    opacity: 0,
    x: -80,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".timeline",
      start: "top 70%"
    }
  });
}



// 5. ESTATÍSTICAS (contagem)
function animateStats() {
  gsap.utils.toArray(".stat-number").forEach(num => {
    const finalValue = num.textContent;
    gsap.fromTo(num,
      { innerText: 0 },
      {
        innerText: finalValue,
        duration: 2.2,
        ease: "power1.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: num,
          start: "top 80%"
        }
      }
    );
  });
}

// 6. SEÇÃO IA
function animateIA() {
  gsap.from(".ia-features li", {
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".ia-features",
      start: "top 80%"
    }
  });
}

// Inicializar todas as animações
function initAnimations() {
  animateHero();
  animateCards();
  animateTimeline();
  animateTestimonials();
  animateStats();
  animateIA();

  // Refresh ScrollTrigger após carregar tudo
  ScrollTrigger.refresh();
}

// Executar quando a página carregar
window.addEventListener("load", initAnimations);

// Re-inicializa ícones sempre que o DOM mudar
lucide.createIcons();

// Initialize Lucide Icons
lucide.createIcons();

// Forçar criação dos ícones sociais
setTimeout(() => {
  lucide.createIcons();
}, 800);

// Forçar ícones sociais
setTimeout(() => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}, 1000);
