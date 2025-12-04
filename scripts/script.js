/* 
Created by: Brooke Lyncrest
File Name: script.js
Date: 12/03/2025
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeDropdownNavigation();
    initializeFeatureCards();
    initializeFormValidation();
    initializeVideoToggles();
    
    console.log('Portfolio initialized successfully');
});

// Dropdown Navigation Menu
function initializeDropdownNavigation() {
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');

    if (!menuButton || !navMenu) {
        console.warn('Menu elements not found');
        return;
    }

    menuButton.addEventListener('click', function(e) {
        e.stopPropagation(); 
        menuButton.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuButton.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnButton = menuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && navMenu.classList.contains('active')) {
            menuButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuButton.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Video Toggle for projects.html - JS changes appearance/behavior
function initializeVideoToggles() {
    const toggleButtons = document.querySelectorAll('.video-toggle');
    
    if (toggleButtons.length === 0) {
        return;
    }

    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            toggleVideo(projectId, this);
        });
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Form Validation for contact.html - JS changes appearance/behavior

function initializeFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Form Values
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (!nameInput || !emailInput || !messageInput) {
            console.error('Form inputs not found');
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Verify required fields
        if (!name || !email || !message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Successful validation - success message
        showMessage('Thank you for your message! I will get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            const messageElement = document.getElementById('formMessage');
            if (messageElement) {
                messageElement.textContent = '';
                messageElement.className = '';
            }
        }, 5000);
    });
}

/**
 * Display form validation message
 * @param {string} text - Message text
 * @param {string} type - Message type: 'error' or 'success'
 */
function showMessage(text, type) {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.textContent = text;
        messageElement.className = `form-message ${type}`;
    }
}

// Feature Cards Interaction for index.html - JS changes appearance/behavior
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');

    if (featureCards.length === 0) {
        return; 
    }

    featureCards.forEach(card => {
        // Toggle details on click
        card.addEventListener('click', function() {
            this.classList.toggle('active');

            // Close other cards when one is opened
            featureCards.forEach(otherCard => {
                if (otherCard !== this && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
        });

        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}