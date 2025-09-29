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
    
// Contact form submission - Send via API
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Send to API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                // Clear form
                this.reset();
            } else {
                alert('Error: ' + result.message);
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
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
