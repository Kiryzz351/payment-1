document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingContainer = document.querySelector('.loading-container');
    const paymentContainer = document.querySelector('.payment-container');
    const progressBar = document.querySelector('.progress');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const methodInfos = document.querySelectorAll('.method-info');
    const whatsappButton = document.getElementById('whatsapp-button');
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    // Replace these with your actual details
    const storeData = {
        whatsapp: "6281234567890",
        danaNumber: "081234567890",
        ovoNumber: "081234567890",
        gopayNumber: "081234567890",
        logoUrl: "https://via.placeholder.com/150",
        backgroundUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    };
    
    // Set dynamic content
    document.getElementById('store-logo').src = storeData.logoUrl;
    document.getElementById('payment-logo').src = storeData.logoUrl;
    document.querySelector('.background').style.backgroundImage = `url('${storeData.backgroundUrl}')`;
    bgMusic.src = storeData.musicUrl;
    
    document.querySelectorAll('.payment-number')[0].textContent = storeData.danaNumber;
    document.querySelectorAll('.payment-number')[1].textContent = storeData.ovoNumber;
    document.querySelectorAll('.payment-number')[2].textContent = storeData.gopayNumber;
    
    // Simulate loading
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingContainer.style.opacity = '0';
                setTimeout(() => {
                    loadingContainer.style.display = 'none';
                    paymentContainer.style.display = 'block';
                }, 500);
            }, 300);
        }
    }, 300);
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked method
            this.classList.add('active');
            
            // Hide all method info
            methodInfos.forEach(info => info.style.display = 'none');
            
            // Show selected method info
            const methodName = this.getAttribute('data-method');
            document.getElementById(`${methodName}-info`).style.display = 'block';
        });
    });
    
    // WhatsApp button
    whatsappButton.addEventListener('click', function() {
        const activeMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
        let message = `Halo Kiryzz Store, saya sudah melakukan pembayaran via ${activeMethod.toUpperCase()}`;
        
        if (activeMethod !== 'qris') {
            const number = document.querySelector(`#${activeMethod}-info .payment-number`).textContent;
            message += ` ke nomor ${number}`;
        }
        
        const whatsappUrl = `https://wa.me/${storeData.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    // Music control
    let isMusicPlaying = false;
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Play Music</span>';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> <span>Pause Music</span>';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Allow music to play on user interaction
    document.body.addEventListener('click', function() {
        if (bgMusic.paused && !isMusicPlaying) {
            bgMusic.play().then(() => {
                bgMusic.pause();
                bgMusic.currentTime = 0;
            }).catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, { once: true });
});