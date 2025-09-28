// Modern functionality with animations and interactions
console.log('=== SCRIPT LOADED ===');
console.log('Script.js loaded successfully');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - script is running');
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1200,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        delay: 100,
        mirror: false
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll to section
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Enhanced button interactions
    const buttons = document.querySelectorAll('button, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Test if JavaScript is working
    console.log('JavaScript is working!');
    
        // Contact form - Netlify Forms handles submission automatically
    
        // Check for success parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            alert('Thank you for your message! Shabz will get back to you within 24 hours.');
            // Clean up the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        // Add backup email functionality
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Get form data for backup email
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Create backup email link (will open email client as fallback)
                const subject = `New Contact Form Submission from ${name}`;
                const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
                const mailtoLink = `mailto:contact@shabzfazl.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Store in localStorage for backup
                localStorage.setItem('lastFormSubmission', JSON.stringify({
                    name, email, message, timestamp: new Date().toISOString()
                }));
                
                console.log('Form data stored for backup:', { name, email, message });
            });
        }
    
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-circle, .orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Intersection Observer for animations
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
    
    // Observe elements for custom animations
    const animateElements = document.querySelectorAll('.credential-item, .contact-item, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mouse cursor effects
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Performance optimization
    if (window.innerWidth <= 768) {
        // Disable some animations on mobile for better performance
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
});
