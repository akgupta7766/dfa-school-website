// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Particle Background
function createParticles() {
    const container = document.querySelector('.hero');
    if (!container) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    container.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// Counter Animation
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Map Direction Functions
function openGoogleMaps() {
    window.open('https://www.google.com/maps?q=24.171120,84.345953', '_blank');
}

function openGoogleMapsDirections() {
    window.open('https://www.google.com/maps/dir//24.171120,84.345953', '_blank');
}

// Admission Form Validation
function validateAdmissionForm() {
    const studentName = document.getElementById('student-name').value;
    const dob = document.getElementById('dob').value;
    const classSeeking = document.getElementById('class-seeking').value;
    const parentName = document.getElementById('parent-name').value;
    const parentPhone = document.getElementById('parent-phone').value;
    const address = document.getElementById('address').value;
    
    // Basic validation
    if (studentName === '' || dob === '' || classSeeking === '' || 
        parentName === '' || parentPhone === '' || address === '') {
        alert('Please fill in all required fields');
        return false;
    }
    
    // Phone number validation (Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(parentPhone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit Indian phone number');
        return false;
    }
    
    // If everything is valid, show success message
    alert('Thank you for your admission inquiry! We will contact you soon.');
    return true;
}

// Contact Form Validation
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields');
        return false;
    }
    
    alert('Thank you for your message! We will get back to you soon.');
    return true;
}

// Call all functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initScrollAnimations();
    
    // Start counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
            }
        });
    });
    
    const countersSection = document.querySelector('.achievements');
    if (countersSection) {
        counterObserver.observe(countersSection);
    }
});

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particles-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    
    .particle {
        position: absolute;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }
`;
document.head.appendChild(style);