// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const ctaButton = document.querySelector('.cta-button');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Page navigation
    function showPage(targetPage) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetElement = document.getElementById(targetPage);
        if (targetElement) {
            targetElement.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === targetPage) {
                link.classList.add('active');
            }
        });

        // Close mobile menu
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Nav link click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            showPage(targetPage);
        });
    });

    // CTA button click handler
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            showPage(targetPage);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .theory-card, .cultural-card, .source-item, .detail-card, .testimony-card, .medical-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animation styles
    function initializeAnimations() {
        const elements = document.querySelectorAll('.timeline-item, .theory-card, .cultural-card, .source-item, .detail-card, .testimony-card, .medical-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(40px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        });
    }

    // Floating elements animation
    function createFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.float-element');
        
        floatingElements.forEach((element, index) => {
            const delay = index * 1000; // 1 second delay between elements
            element.style.animationDelay = `${delay}ms`;
        });
    }

    // Parallax effect for hero background
    function parallaxEffect() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }

    // Navbar background on scroll
    function updateNavbarOnScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    }

    // Event listeners
    window.addEventListener('scroll', function() {
        animateOnScroll();
        parallaxEffect();
        updateNavbarOnScroll();
    });

    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Initialize
    initializeAnimations();
    createFloatingAnimation();
    animateOnScroll(); // Run once on load

    // Typewriter effect for hero subtitle (optional enhancement)
    function typewriterEffect(element, text, speed = 100) {
        if (!element) return;
        
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        // Start after a delay
        setTimeout(type, 1000);
    }

    // Apply typewriter effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typewriterEffect(heroSubtitle, originalText, 50);
    }

    // Image lazy loading
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading if supported
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Arrow keys for page navigation
        const currentPage = document.querySelector('.page.active');
        const currentPageId = currentPage ? currentPage.id : 'home';
        const pageOrder = ['home', 'what-happened', 'eyewitness', 'theories', 'legacy'];
        const currentIndex = pageOrder.indexOf(currentPageId);
        
        if (e.key === 'ArrowRight' && currentIndex < pageOrder.length - 1) {
            showPage(pageOrder[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showPage(pageOrder[currentIndex - 1]);
        }
    });

    // Add loading animation
    function showLoadingAnimation() {
        const body = document.body;
        body.style.opacity = '0';
        
        setTimeout(() => {
            body.style.transition = 'opacity 0.5s ease-in-out';
            body.style.opacity = '1';
        }, 100);
    }

    // Initialize loading animation
    showLoadingAnimation();

    // Add click sound effect (optional)
    function addClickSound() {
        const clickableElements = document.querySelectorAll('.nav-link, .cta-button, .source-link');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', function() {
                // You can add a subtle click sound here if desired
                // For now, we'll add a visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Initialize click effects
    addClickSound();

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
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

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        animateOnScroll();
        parallaxEffect();
        updateNavbarOnScroll();
    }, 10);

    window.removeEventListener('scroll', function() {
        animateOnScroll();
        parallaxEffect();
        updateNavbarOnScroll();
    });

    window.addEventListener('scroll', debouncedScrollHandler);
});