
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.padding = '15px 0';
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Form submission
    // Formspree Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Form will submit to Formspree automatically
        // We'll handle the response with fetch for better UX
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    showFormSuccess();
                    this.reset();
                } else {
                    // Error
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert("Error: " + data.errors.map(error => error.message).join(", "));
                        } else {
                            alert("Oops! There was a problem submitting your form");
                        }
                    });
                }
            })
            .catch(error => {
                alert("Oops! There was a problem submitting your form");
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Success message function
function showFormSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--success);
        color: var(--primary);
        padding: 30px 40px;
        border-radius: 15px;
        text-align: center;
        z-index: 3000;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        animation: formSuccess 0.5s ease-out;
    `;
    
    successMessage.innerHTML = `
        <h4>Message Sent Successfully! 🎉</h4>
        <p>Thank you for your message. I'll get back to you within 24 hours.</p>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translate(-50%, -60%)';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 4000);
}

// Add this CSS for the spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes formSuccess {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    .fa-spin {
        animation: fa-spin 1s infinite linear;
    }
    
    @keyframes fa-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
    // Add floating animation to project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
    
    
