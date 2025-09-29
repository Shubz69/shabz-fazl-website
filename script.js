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
                service: formData.get('service'),
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
                // Create beautiful confirmation modal
                showSuccessModal();
                // Clear form
                this.reset();
            } else {
                showErrorModal('Error: ' + result.message);
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

// Success Modal Function
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.4s ease;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 30px;
            ">✓</div>
            <h3 style="
                color: white;
                margin: 0 0 10px 0;
                font-size: 24px;
                font-weight: 600;
            ">Message Sent Successfully!</h3>
            <p style="
                color: rgba(255, 255, 255, 0.9);
                margin: 0 0 25px 0;
                font-size: 16px;
                line-height: 1.5;
            ">Thank you for reaching out! I'll get back to you within 24 hours.</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 12px 30px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                Close
            </button>
        </div>
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 5000);
}

// Error Modal Function
function showErrorModal(message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.4s ease;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 30px;
            ">✕</div>
            <h3 style="
                color: white;
                margin: 0 0 10px 0;
                font-size: 24px;
                font-weight: 600;
            ">Error Sending Message</h3>
            <p style="
                color: rgba(255, 255, 255, 0.9);
                margin: 0 0 25px 0;
                font-size: 16px;
                line-height: 1.5;
            ">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 12px 30px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}
