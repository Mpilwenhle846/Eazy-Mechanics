// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar background on scroll
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scrolling for footer links
    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Add scroll animation to elements
    addScrollAnimations();
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        vehicle: formData.get('vehicle'),
        message: formData.get('message')
    };
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission (in a real scenario, you would send this to a server)
    showToast('Message sent successfully! We will get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .feature-card,
        .project-item,
        .contact-item,
        .about-content,
        .about-image
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Project item hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const image = item.querySelector('.project-image');
        const overlay = item.querySelector('.project-overlay');
        
        item.addEventListener('mouseenter', function() {
            if (image) image.style.transform = 'scale(1.1)';
            if (overlay) overlay.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            if (image) image.style.transform = 'scale(1)';
            if (overlay) overlay.style.opacity = '0';
        });
    });
});

// Handle browser back/forward button navigation
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.section) {
        scrollToSection(e.state.section);
    }
});

// Update URL when scrolling to sections (optional enhancement)
function updateURLOnScroll() {
    const sections = ['hero', 'about', 'services', 'contact'];
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    if (currentSection && window.location.hash !== `#${currentSection}`) {
        history.replaceState({section: currentSection}, '', `#${currentSection}`);
    }
}

// Uncomment the line below if you want URL updates on scroll
// window.addEventListener('scroll', debounce(updateURLOnScroll, 100));

// Debounce function for performance
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

// Loading animation (optional)
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Add initial loading state
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
});

// Keyboard accessibility for custom buttons
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement.onclick && activeElement.tagName === 'BUTTON') {
            e.preventDefault();
            activeElement.click();
        }
    }
});

// Performance: Lazy load images (optional enhancement)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if data-src attributes are used
document.addEventListener('DOMContentLoaded', lazyLoadImages);