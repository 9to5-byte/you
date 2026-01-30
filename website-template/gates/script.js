/**
 * Website Template - JavaScript
 * ============================================
 *
 * This file contains all interactive functionality.
 * Customize as needed for your specific requirements.
 *
 */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a nav link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            // Add scrolled class when scrolled
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const phone = this.querySelector('#phone').value.trim();
            const message = this.querySelector('#message').value.trim();
            const consent = this.querySelector('#consent').checked;

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Phone validation regex (basic)
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

            // Validation checks
            if (!name) {
                showFormError('Please enter your name.');
                return;
            }

            if (!email || !emailRegex.test(email)) {
                showFormError('Please enter a valid email address.');
                return;
            }

            if (!phone || !phoneRegex.test(phone)) {
                showFormError('Please enter a valid phone number.');
                return;
            }

            if (!message) {
                showFormError('Please enter a message.');
                return;
            }

            if (!consent) {
                showFormError('Please agree to the privacy policy.');
                return;
            }

            // If validation passes, submit the form
            // Replace this with your actual form submission logic
            // Options: FormSpree, Netlify Forms, custom backend, etc.

            // Example: Show success message
            showFormSuccess('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();

            // Example: Send to FormSpree (uncomment and add your FormSpree URL)
            // submitToFormSpree(this);
        });
    }

    function showFormError(message) {
        // Remove existing error
        const existingError = document.querySelector('.form-error');
        if (existingError) existingError.remove();

        // Create and show error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.style.cssText = 'background: #fee2e2; color: #dc2626; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;';
        errorDiv.textContent = message;

        contactForm.insertBefore(errorDiv, contactForm.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => errorDiv.remove(), 5000);
    }

    function showFormSuccess(message) {
        // Remove existing messages
        const existingMsg = document.querySelector('.form-success, .form-error');
        if (existingMsg) existingMsg.remove();

        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.cssText = 'background: #d1fae5; color: #059669; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;';
        successDiv.textContent = message;

        contactForm.insertBefore(successDiv, contactForm.firstChild);
    }

    // ============================================
    // COOKIE CONSENT
    // ============================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    // Check if user has already made a choice
    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.add('show');
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            // Enable analytics, tracking, etc.
            enableCookies();
        });
    }

    if (declineCookies) {
        declineCookies.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
            // Disable non-essential cookies
            disableCookies();
        });
    }

    function enableCookies() {
        // Add your analytics code here
        // Example: Google Analytics
        // gtag('consent', 'update', { analytics_storage: 'granted' });
        console.log('Cookies accepted');
    }

    function disableCookies() {
        // Disable tracking
        // Example: Google Analytics
        // gtag('consent', 'update', { analytics_storage: 'denied' });
        console.log('Cookies declined');
    }

    // ============================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ============================================
    // SCROLL ANIMATIONS (Optional)
    // ============================================
    // Simple fade-in animation for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animate class
    document.querySelectorAll('.product-card, .service-card, .testimonial-card, .why-us-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // ============================================
    // LAZY LOADING IMAGES (Native + Fallback)
    // ============================================
    // Native lazy loading is handled by loading="lazy" attribute
    // This is a fallback for older browsers
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        console.log('Native lazy loading supported');
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => lazyObserver.observe(img));
    }

});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function for performance optimization
 */
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

/**
 * Format phone number as user types
 */
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    input.value = value;
}
