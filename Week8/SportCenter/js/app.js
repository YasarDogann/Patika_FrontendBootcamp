document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navbar with Smooth Transition
    const mainNav = document.getElementById('mainNav');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    }
    
    // Initial check on page load
    updateNavbar();
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        updateNavbar();
    });

    // Class Tabs Logic with Animation
    const classButtons = document.querySelectorAll('.class-btn');
    const classContents = document.querySelectorAll('.yoga-content, .group-content, .solo-content, .stretching-content');

    classButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Reset all buttons and content
            classButtons.forEach(b => {
                b.style.backgroundColor = '#0d365d';
                b.style.transform = 'translateY(0)';
                b.style.boxShadow = 'none';
            });
            
            classContents.forEach(content => {
                content.style.display = 'none';
            });

            // Set active button with enhanced styling
            this.style.backgroundColor = '#ff7e00';
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';

            // Show corresponding content with fade-in effect
            let contentClass = '';
            
            if (this.classList.contains('yoga-btn')) {
                contentClass = '.yoga-content';
            } else if (this.classList.contains('group-btn')) {
                contentClass = '.group-content';
            } else if (this.classList.contains('solo-btn')) {
                contentClass = '.solo-content';
            } else if (this.classList.contains('stretching-btn')) {
                contentClass = '.stretching-content';
            }
            
            const selectedContent = document.querySelector(contentClass);
            selectedContent.style.display = 'block';
            selectedContent.style.animation = 'fadeIn 0.5s ease-in-out';
        });
    });

    // Set first tab (yoga) as active by default
    document.querySelector('.yoga-btn').style.backgroundColor = '#ff7e00';
    document.querySelector('.yoga-btn').style.transform = 'translateY(-3px)';
    document.querySelector('.yoga-btn').style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    document.querySelector('.yoga-content').style.display = 'block';

    // Enhanced BMI Calculator Logic
    const calculateBMI = document.getElementById('calculate-bmi');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiResult = document.getElementById('bmi-result');

    // Input validation for numbers only
    function validateNumberInput(event) {
        if (!/[0-9]|\./.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            event.preventDefault();
        }
    }

    if (weightInput && heightInput) {
        weightInput.addEventListener('keydown', validateNumberInput);
        heightInput.addEventListener('keydown', validateNumberInput);
    }

    // Function to calculate BMI with improved UI feedback
    function performBMICalculation() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; // Convert cm to meters

        // Input validation
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            bmiResult.innerHTML = 'Lütfen geçerli bir kilo ve boy giriniz.';
            bmiResult.style.color = '#dc3545';
            bmiResult.style.borderLeft = '4px solid #dc3545';
            return;
        }

        const bmi = weight / (height * height);
        let category = '';
        let color = '';

        // Determine BMI category and color
        if (bmi < 18.5) {
            category = 'Zayıf';
            color = '#17a2b8';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
            color = '#28a745';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Fazla Kilolu';
            color = '#ffc107';
        } else {
            category = 'Obez';
            color = '#dc3545';
        }

        // Enhanced result display
        bmiResult.innerHTML = `
            <div class="bmi-value">BMI: <strong>${bmi.toFixed(1)}</strong></div>
            <div class="bmi-category" style="color:${color}"><strong>${category}</strong></div>
        `;
        bmiResult.style.color = '#333';
        bmiResult.style.borderLeft = `4px solid ${color}`;
    }

    // Add event listeners for BMI calculation
    if (calculateBMI) {
        calculateBMI.addEventListener('click', performBMICalculation);
        
        // Also calculate on Enter key in inputs
        weightInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performBMICalculation();
        });
        
        heightInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performBMICalculation();
        });
    }

    // Enhanced smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll with offset for fixed navbar
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }

            // Close the mobile menu if it's open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Enhanced trainer cards hover effect
    const trainerCards = document.querySelectorAll('.trainer-card');
    
    trainerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Apply hover styles with smooth transitions
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.1)';
            
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1.08)';
            
            // Create and add overlay if not present
            if (!this.querySelector('.trainer-overlay')) {
                const overlay = document.createElement('div');
                overlay.classList.add('trainer-overlay');
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.background = 'linear-gradient(to bottom, rgba(255, 126, 0, 0.1), rgba(255, 126, 0, 0.3))';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.4s ease';
                overlay.style.zIndex = '1';
                
                this.appendChild(overlay);
                
                // Fade in the overlay
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
            }
            
            // Update text colors
            const trainerInfo = this.querySelector('.trainer-info');
            if (trainerInfo) {
                const heading = trainerInfo.querySelector('h4');
                if (heading) heading.style.color = '#ff7e00';
                trainerInfo.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover styles with smooth transitions
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
            
            // Fade out and remove overlay
            const overlay = this.querySelector('.trainer-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    this.removeChild(overlay);
                }, 400); // Match the transition duration
            }
            
            // Reset text colors
            const trainerInfo = this.querySelector('.trainer-info');
            if (trainerInfo) {
                const heading = trainerInfo.querySelector('h4');
                if (heading) heading.style.color = '#0d365d';
                trainerInfo.style.backgroundColor = '';
            }
        });
    });

    // Form validation for contact form
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = '#dc3545';
                nameInput.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
                isValid = false;
                
                // Create error message if not exists
                if (!nameInput.nextElementSibling || !nameInput.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.style.color = '#dc3545';
                    errorMsg.style.fontSize = '14px';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.textContent = 'Lütfen adınızı giriniz';
                    nameInput.parentNode.insertBefore(errorMsg, nameInput.nextSibling);
                }
            } else {
                nameInput.style.borderColor = '#28a745';
                nameInput.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
                
                // Remove error message if exists
                if (nameInput.nextElementSibling && nameInput.nextElementSibling.classList.contains('error-message')) {
                    nameInput.parentNode.removeChild(nameInput.nextElementSibling);
                }
            }
            
            // Validate email
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = '#dc3545';
                emailInput.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
                isValid = false;
                
                // Create error message if not exists
                if (!emailInput.nextElementSibling || !emailInput.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.style.color = '#dc3545';
                    errorMsg.style.fontSize = '14px';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.textContent = 'Lütfen geçerli bir e-posta adresi giriniz';
                    emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);
                }
            } else {
                emailInput.style.borderColor = '#28a745';
                emailInput.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
                
                // Remove error message if exists
                if (emailInput.nextElementSibling && emailInput.nextElementSibling.classList.contains('error-message')) {
                    emailInput.parentNode.removeChild(emailInput.nextElementSibling);
                }
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                messageInput.style.borderColor = '#dc3545';
                messageInput.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
                isValid = false;
                
                // Create error message if not exists
                if (!messageInput.nextElementSibling || !messageInput.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.style.color = '#dc3545';
                    errorMsg.style.fontSize = '14px';
                    errorMsg.style.marginTop = '5px';
                    errorMsg.textContent = 'Lütfen mesajınızı giriniz';
                    messageInput.parentNode.insertBefore(errorMsg, messageInput.nextSibling);
                }
            } else {
                messageInput.style.borderColor = '#28a745';
                messageInput.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
                
                // Remove error message if exists
                if (messageInput.nextElementSibling && messageInput.nextElementSibling.classList.contains('error-message')) {
                    messageInput.parentNode.removeChild(messageInput.nextElementSibling);
                }
            }
            
            // If all inputs are valid, show success message and reset form
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.classList.add('success-message');
                successMsg.style.padding = '10px 15px';
                successMsg.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
                successMsg.style.color = '#28a745';
                successMsg.style.borderRadius = '4px';
                successMsg.style.marginTop = '15px';
                successMsg.style.textAlign = 'center';
                successMsg.textContent = 'Form başarıyla gönderildi!';
                
                // Add success message before the form
                appointmentForm.parentNode.insertBefore(successMsg, appointmentForm);
                
                // Reset form
                this.reset();
                
                // Reset validation styles
                nameInput.style.borderColor = '';
                nameInput.style.boxShadow = '';
                emailInput.style.borderColor = '';
                emailInput.style.boxShadow = '';
                messageInput.style.borderColor = '';
                messageInput.style.boxShadow = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.parentNode.removeChild(successMsg);
                    }
                }, 3000);
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 