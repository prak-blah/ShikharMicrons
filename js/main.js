// Auto-scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for anchor links (skip bare # hrefs)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loading');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // Animate Notable Client cards on scroll
    const clientCards = document.querySelectorAll('.notable-client-card');
    const clientObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    clientCards.forEach(card => clientObserver.observe(card));

    // Modal interactivity for Notable Clients
    const clientModal = document.getElementById('clientModal');
    const clientModalContent = document.getElementById('clientModalContent');
    clientCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = card.querySelector('.card-title').textContent;
            const location = card.querySelector('.card-text').textContent;
            const extra = card.querySelector('.client-extra-info').textContent;
            const icon = card.querySelector('.client-logo-overlay').innerHTML;
            clientModalContent.innerHTML = `
                <div class="text-center mb-3">${icon}</div>
                <h4 class="fw-bold mb-2">${name}</h4>
                <p class="mb-1"><i class="fas fa-map-marker-alt me-2"></i>${location}</p>
                <p class="text-muted">${extra}</p>
            `;
            if (typeof bootstrap !== 'undefined') {
                const modal = new bootstrap.Modal(clientModal);
                modal.show();
            }
        });
        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
    });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Add animation class to elements
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-fade-in');
    });
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements in view on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.navbar-toggler');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('.navbar-collapse');
    if (mobileMenu && mobileMenuToggle) {
        const isOpen = mobileMenu.classList.contains('show');
        if (isOpen && !e.target.closest('.navbar')) {
            mobileMenuToggle.click();
        }
    }
});

// Product Search/Filter
const searchInput = document.getElementById('product-search');
const productsList = document.getElementById('products-list');
if (searchInput && productsList) {
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const cards = productsList.querySelectorAll('.product-card');
    cards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      card.parentElement.style.display = name.includes(query) ? '' : 'none';
    });
  });
} 