class AudioManager {
    constructor() {
        // Background music
        this.backgroundMusic = new Audio('assets/audio/backgroundMusic.mp3');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;

        // Sound effects
        this.playerLaser = new Audio('assets/audio/playerLaser.wav');
        this.enemyLaser = new Audio('assets/audio/enemyLaser.wav');
        this.explosion = new Audio('assets/audio/explosion.wav');
        this.gameOver = new Audio('assets/audio/gameOver.wav');
        
        // Set volume for sound effects
        this.playerLaser.volume = 0.5;
        this.enemyLaser.volume = 0.5;
        this.explosion.volume = 0.6;
        this.gameOver.volume = 0.7;
        
        // Sound button state
        this.isMuted = false;
        this.soundButton = document.getElementById('soundButton');
        this.soundIcon = document.getElementById('soundIcon');
        
        // Add click handler for sound button
        this.soundButton.addEventListener('click', () => this.toggleMute());
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.soundIcon.classList.toggle('muted');
        
        if (this.isMuted) {
            this.backgroundMusic.pause();
        } else {
            this.backgroundMusic.play().catch(error => {
                console.log('Error playing background music:', error);
            });
        }
    }

    playBackgroundMusic() {
        if (!this.isMuted) {
            this.backgroundMusic.play().catch(error => {
                console.log('Error playing background music:', error);
            });
        }
    }

    pauseBackgroundMusic() {
        this.backgroundMusic.pause();
    }

    resumeBackgroundMusic() {
        if (!this.isMuted) {
            this.backgroundMusic.play().catch(error => {
                console.log('Error resuming background music:', error);
            });
        }
    }

    playPlayerLaser() {
        if (!this.isMuted) {
            this.playerLaser.currentTime = 0;
            this.playerLaser.play().catch(error => {
                console.log('Error playing laser sound:', error);
            });
        }
    }

    playEnemyLaser() {
        if (!this.isMuted) {
            this.enemyLaser.currentTime = 0;
            this.enemyLaser.play().catch(error => {
                console.log('Error playing enemy laser sound:', error);
            });
        }
    }

    playExplosion() {
        if (!this.isMuted) {
            this.explosion.currentTime = 0;
            this.explosion.play().catch(error => {
                console.log('Error playing explosion sound:', error);
            });
        }
    }

    playGameOver() {
        if (!this.isMuted) {
            this.backgroundMusic.pause();
            this.gameOver.currentTime = 0;
            this.gameOver.play().catch(error => {
                console.log('Error playing game over sound:', error);
            });
        }
    }
}

// Initialize audio manager
const audioManager = new AudioManager(); 