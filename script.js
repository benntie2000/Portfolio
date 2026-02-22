// ========================================
// CONFIGURATION & VARIABLES
// ========================================
const config = {
    typingSpeed: 100,
    typingDelay: 2000,
    particleCount: 80,
    matrixSpeed: 50
};

// ========================================
// LOADER & INITIALIZATION
// ========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
        initAnimations();
    }, 1500); // Réduit à 1.5 secondes pour une meilleure UX
});

// ========================================
// CUSTOM CURSOR
// ========================================
const initCursor = () => {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateCursor = () => {
        // Dot suit la souris instantanément
        dotX = mouseX;
        dotY = mouseY;
        
        // Outline suit avec un léger délai (effet smooth)
        const delay = 0.15;
        outlineX += (mouseX - outlineX) * delay;
        outlineY += (mouseY - outlineY) * delay;
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();
    
    // Effet hover sur les éléments cliquables
    const clickables = document.querySelectorAll('a, button, .project-card, .tool-item, .skill-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '48px';
            cursorOutline.style.height = '48px';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '32px';
            cursorOutline.style.height = '32px';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
    });
};

// ========================================
// NAVBAR
// ========================================
const initNavbar = () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Effet scroll sur navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Menu mobile toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    const activateNavLink = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', activateNavLink);
};

// ========================================
// SMOOTH SCROLL
// ========================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ========================================
// SCROLL PROGRESS BAR
// ========================================
const initScrollProgress = () => {
    const progressBar = document.getElementById('progress-bar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// ========================================
// THEME TOGGLE
// ========================================
const initThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-mode', savedTheme === 'light');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
};

// ========================================
// TYPING EFFECT
// ========================================
const initTypingEffect = () => {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const texts = [
        'Étudiant en Cybersécurité',
        'Spécialiste Réseaux & Télécoms',
        'Pentester Junior',
        'Développeur Python',
        'Passionné de Sécurité'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = config.typingSpeed;
    
    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = config.typingSpeed;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            // Pause à la fin du texte
            typingSpeed = config.typingDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    };
    
    type();
};

// ========================================
// PARTICLES BACKGROUND
// ========================================
const initParticles = () => {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'var(--primary-color)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(particle);
    };
    
    for (let i = 0; i < config.particleCount; i++) {
        createParticle();
    }
};

// ========================================
// MATRIX RAIN EFFECT
// ========================================
const initMatrixEffect = () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const columns = canvas.width / 20;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    const draw = () => {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f3ff';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    
    setInterval(draw, config.matrixSpeed);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

// ========================================
// SKILLS ANIMATION
// ========================================
const initSkillsAnimation = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
};

// ========================================
// PROJECTS FILTER
// ========================================
const initProjectsFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
};

// ========================================
// CONTACT FORM
// ========================================
const initContactForm = () => {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi
        console.log('Form data:', data);
        
        // Créer le mailto link
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(
            `Nom: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        );
        const mailtoLink = `mailto:h.errabiao@outlook.fr?subject=${subject}&body=${body}`;
        
        // Ouvrir le client mail
        window.location.href = mailtoLink;
        
        // Afficher un message de confirmation
        alert('Votre client mail va s\'ouvrir pour envoyer le message.');
        
        // Reset form
        form.reset();
    });
};

// ========================================
// BACK TO TOP BUTTON
// ========================================
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const initScrollAnimations = () => {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Éléments à animer
    const elements = document.querySelectorAll(
        '.skill-category, .project-card, .tool-item, .timeline-item'
    );
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// ========================================
// PARALLAX EFFECT
// ========================================
const initParallax = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax sur les icônes flottantes
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = (index + 1) * 0.05;
            icon.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Parallax sur le hexagone
        const hexagon = document.querySelector('.cyber-hexagon');
        if (hexagon) {
            hexagon.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
};

// ========================================
// GLITCH EFFECT ON HOVER
// ========================================
const initGlitchEffect = () => {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    });
};

// ========================================
// CANVAS DRAWING EFFECTS
// ========================================
const initCanvasEffects = () => {
    // Effet de connexion entre particules au survol
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Dessiner des lignes entre particules proches
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    };
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

// ========================================
// INITIALIZE ALL
// ========================================
const initAnimations = () => {
    initCursor();
    initNavbar();
    initSmoothScroll();
    initScrollProgress();
    initThemeToggle();
    initTypingEffect();
    initParticles();
    initMatrixEffect();
    initSkillsAnimation();
    initProjectsFilter();
    initContactForm();
    initBackToTop();
    initScrollAnimations();
    initParallax();
    initGlitchEffect();
    initCanvasEffects();
};

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================
const initEasterEgg = () => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Activer un effet spécial
                document.body.style.animation = 'rainbow 5s linear';
                alert('🎮 Konami Code activé! Tu es un vrai hacker! 🎮');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
};

// Initialiser l'easter egg
initEasterEgg();

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c🔒 Portfolio Cybersécurité 🔒', 'color: #00f3ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
console.log('%cDéveloppé par Hamza ERRABIA', 'color: #7b2ff7; font-size: 16px;');
console.log('%c⚠️ Attention: Ce site est sécurisé. Toute tentative d\'intrusion sera détectée! 😉', 'color: #ff0080; font-size: 14px;');
console.log('%cMais si tu es curieux du code, tu peux toujours jeter un œil sur GitHub! 🚀', 'color: #00ff88; font-size: 12px;');
