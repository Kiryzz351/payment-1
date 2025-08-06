document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading delay
    setTimeout(function() {
        // Hide loading animation
        document.getElementById('loading').style.display = 'none';
        
        // Show main content with fade-in effect
        const mainContent = document.getElementById('mainContent');
        mainContent.style.display = 'block';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);
        
        // Play background music
        const music = document.getElementById('backgroundMusic');
        music.volume = 0.3; // Set volume to 30%
        music.play().catch(e => {
            console.log("Autoplay was prevented. Please interact with the page to play music.");
        });
        
        // Enable music play on user interaction
        document.body.addEventListener('click', function() {
            music.play().catch(e => console.log("Music play failed:", e));
        }, { once: true });
        
        // Set default payment method to DANA
        selectPayment('dana');
    }, 3000); // 3 seconds loading time
});

// Payment method selection
function selectPayment(method) {
    // Hide all payment details
    document.querySelectorAll('.method-details').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show selected payment details
    document.getElementById(method + 'Details').style.display = 'block';
    
    // Update active state on buttons
    document.querySelectorAll('.method').forEach(el => {
        el.style.borderColor = '#00f7ff';
        el.style.boxShadow = 'none';
    });
    
    // Highlight selected method
    const selectedMethod = document.querySelector(`.method[onclick="selectPayment('${method}')"]`);
    if (selectedMethod) {
        selectedMethod.style.borderColor = '#ff00ff';
        selectedMethod.style.boxShadow = '0 0 15px rgba(255, 0, 255, 0.7)';
    }
}

// Music toggle functionality (can be added to a button if needed)
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}