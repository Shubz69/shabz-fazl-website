// Modern functionality with animations and interactions
console.log('Script.js loaded successfully');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - script is running');
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
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
    
    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    console.log('Contact form found:', contactForm);
    
    // Test button click
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        console.log('Submit button found:', submitBtn);
        submitBtn.addEventListener('click', function() {
            console.log('Submit button clicked!');
        });
    } else {
        console.log('Submit button not found');
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Get form data directly from input values
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            console.log('Input elements:', { nameInput, emailInput, messageInput });
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';
            
            // Debug logging
            console.log('Form data:', { name, email, message });
            console.log('Field lengths:', { 
                nameLength: name.length, 
                emailLength: email.length, 
                messageLength: message.length 
            });
            
            // Simple validation
            if (!name || !email || !message) {
                alert(`Please fill in all required fields.\nName: "${name}"\nEmail: "${email}"\nMessage: "${message}"`);
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create email content
            const subject = `Mindset Coaching Inquiry from ${name}`;
            const emailBody = `Hi Shabz,

I'm interested in your mindset coaching services.

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`;
            
            // Encode the email content for mailto link
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(emailBody);
            
            // Create mailto link
            const mailtoLink = `mailto:contact@shabzfazl.com?subject=${encodedSubject}&body=${encodedBody}`;
            
            console.log('Opening email client with link:', mailtoLink);
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show confirmation
            alert('Your email client should open with your message ready to send. If it doesn\'t open, please email contact@shabzfazl.com directly.');
        });
    } else {
        console.error('Contact form not found!');
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
