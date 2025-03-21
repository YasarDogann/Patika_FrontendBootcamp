document.addEventListener('DOMContentLoaded', function() {
    // Sabit Navbar ve Yumuşak Geçiş Efekti
    const mainNav = document.getElementById('mainNav');
    
    // Navbar'ın scroll durumuna göre güncellenmesi
    function updateNavbar() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    }
    
    // Sayfa yüklendiğinde navbar kontrolü
    updateNavbar();
    
    // Scroll sırasında navbar kontrolü
    window.addEventListener('scroll', function() {
        updateNavbar();
    });

    // Spor Sınıfları Butonları ve İçerik Gösterimi
    const classButtons = document.querySelectorAll('.class-btn');
    const classContents = document.querySelectorAll('.yoga-content, .group-content, .solo-content, .stretching-content');

    classButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Tüm butonları ve içerikleri sıfırla
            classButtons.forEach(b => {
                b.style.backgroundColor = '#0d365d';
                b.style.transform = 'translateY(0)';
                b.style.boxShadow = 'none';
            });
            
            classContents.forEach(content => {
                content.style.display = 'none';
            });

            // Aktif butonu vurgula ve stil ver
            this.style.backgroundColor = '#ff7e00';
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';

            // İlgili içeriği fade-in efekti ile göster
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

    // Varsayılan olarak yoga sekmesini aktif yap
    document.querySelector('.yoga-btn').style.backgroundColor = '#ff7e00';
    document.querySelector('.yoga-btn').style.transform = 'translateY(-3px)';
    document.querySelector('.yoga-btn').style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    document.querySelector('.yoga-content').style.display = 'block';

    // BMI Hesaplayıcı Fonksiyonları
    const calculateBMI = document.getElementById('calculate-bmi');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiResult = document.getElementById('bmi-result');

    // Sadece sayı girişi için doğrulama
    function validateNumberInput(event) {
        if (!/[0-9]|\./.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
            event.preventDefault();
        }
    }

    // Input alanları için sayı doğrulama dinleyicileri
    if (weightInput && heightInput) {
        weightInput.addEventListener('keydown', validateNumberInput);
        heightInput.addEventListener('keydown', validateNumberInput);
    }

    // BMI hesaplama fonksiyonu ve UI güncellemesi
    function performBMICalculation() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; // cm'yi metreye çevir

        // Girdi doğrulama
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            bmiResult.innerHTML = 'Lütfen geçerli bir kilo ve boy giriniz.';
            bmiResult.style.color = '#dc3545';
            bmiResult.style.borderLeft = '4px solid #dc3545';
            return;
        }

        // BMI hesaplama formülü (kg/m²)
        const bmi = weight / (height * height);
        let category = '';
        let color = '';

        // BMI kategorisini ve rengini belirle
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

        // Sonucu görsel olarak göster
        bmiResult.innerHTML = `
            <div class="bmi-value">BMI: <strong>${bmi.toFixed(1)}</strong></div>
            <div class="bmi-category" style="color:${color}"><strong>${category}</strong></div>
        `;
        bmiResult.style.color = '#333';
        bmiResult.style.borderLeft = `4px solid ${color}`;
    }

    // BMI hesaplama için olay dinleyicileri
    if (calculateBMI) {
        calculateBMI.addEventListener('click', performBMICalculation);
        
        // Enter tuşu ile hesaplama
        weightInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performBMICalculation();
        });
        
        heightInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performBMICalculation();
        });
    }

    // Sayfa içi yumuşak kaydırma
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Sabit navbar için offset ile yumuşak kaydırma
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // URL hash'ini güncelle
                history.pushState(null, null, targetId);
            }

            // Mobil menüyü kapat (açıksa)
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Eğitmen kartları için gelişmiş hover efekti
    const trainerCards = document.querySelectorAll('.trainer-card');
    
    trainerCards.forEach(card => {
        // Fare üzerine geldiğinde efektler
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 25px rgba(0, 0, 0, 0.1)';
            
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1.08)';
            
            // Overlay efekti oluştur
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
                
                // Overlay'i yavaşça göster
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
            }
            
            // Metin renklerini güncelle
            const trainerInfo = this.querySelector('.trainer-info');
            if (trainerInfo) {
                const heading = trainerInfo.querySelector('h4');
                if (heading) heading.style.color = '#ff7e00';
                trainerInfo.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });
        
        // Fare üzerinden ayrıldığında efektleri kaldır
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
            
            // Overlay'i kaldır
            const overlay = this.querySelector('.trainer-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    this.removeChild(overlay);
                }, 400);
            }
            
            // Metin renklerini sıfırla
            const trainerInfo = this.querySelector('.trainer-info');
            if (trainerInfo) {
                const heading = trainerInfo.querySelector('h4');
                if (heading) heading.style.color = '#0d365d';
                trainerInfo.style.backgroundColor = '';
            }
        });
    });

    // İletişim formu doğrulama
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            let isValid = true;
            
            // İsim alanı doğrulama
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Lütfen adınızı giriniz');
                isValid = false;
            } else {
                showSuccess(nameInput);
            }
            
            // E-posta alanı doğrulama
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Lütfen geçerli bir e-posta adresi giriniz');
                isValid = false;
            } else {
                showSuccess(emailInput);
            }
            
            // Mesaj alanı doğrulama
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Lütfen mesajınızı giriniz');
                isValid = false;
            } else {
                showSuccess(messageInput);
            }
            
            // Form başarılı ise
            if (isValid) {
                showFormSuccess(this);
            }
        });
    }
    
    // Yardımcı fonksiyonlar
    function showError(input, message) {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
        
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('error-message');
            errorMsg.style.color = '#dc3545';
            errorMsg.style.fontSize = '14px';
            errorMsg.style.marginTop = '5px';
            errorMsg.textContent = message;
            input.parentNode.insertBefore(errorMsg, input.nextSibling);
        }
    }
    
    function showSuccess(input) {
        input.style.borderColor = '#28a745';
        input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
        
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
            input.parentNode.removeChild(input.nextElementSibling);
        }
    }
    
    function showFormSuccess(form) {
        const successMsg = document.createElement('div');
        successMsg.classList.add('success-message');
        successMsg.style.padding = '10px 15px';
        successMsg.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
        successMsg.style.color = '#28a745';
        successMsg.style.borderRadius = '4px';
        successMsg.style.marginTop = '15px';
        successMsg.style.textAlign = 'center';
        successMsg.textContent = 'Form başarıyla gönderildi!';
        
        form.parentNode.insertBefore(successMsg, form);
        form.reset();
        
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 3000);
    }
    
    // E-posta doğrulama fonksiyonu
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 