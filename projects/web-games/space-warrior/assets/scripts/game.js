class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Game state
        this.state = {
            score: 0,
            health: 100,
            isRunning: false,
            isPaused: false
        };

        // Game elements
        this.background = new Image();
        this.background.src = 'assets/images/SpaceBG.png';
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 100);
        this.projectiles = [];
        this.enemies = [];
        this.explosions = [];
        
        // UI elements
        this.scoreElement = document.getElementById('score');
        this.healthElement = document.getElementById('health');
        this.pausedIndicator = document.getElementById('pausedIndicator');
        this.menu = document.getElementById('menu');
        this.gameOverModal = document.getElementById('gameOverModal');
        
        // Controls
        this.mouseX = 0;
        this.setupEventListeners();
        
        // Start game loop
        this.lastFrameTime = Date.now();
        this.spawnTimer = 0;
        this.spawnInterval = 1000; // Spawn enemy every second
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        // Mouse/Touch movement
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.touches[0].clientX - rect.left;
        });

        // Menu click handling
        this.menu.addEventListener('click', (e) => {
            this.startGame();
        });

        // Shooting
        this.canvas.addEventListener('click', (e) => {
            if (this.state.isRunning && !this.state.isPaused) {
                this.handleShoot();
            }
        });

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (this.state.isRunning && !this.state.isPaused) {
                this.handleShoot();
            }
        });

        // Pause
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isRunning) {
                this.togglePause();
            }
        });

        document.getElementById('pauseButton').addEventListener('click', () => {
            if (this.state.isRunning) {
                this.togglePause();
            }
        });

        // Return to title
        document.getElementById('returnToTitle').addEventListener('click', () => {
            this.resetGame();
            this.menu.style.display = 'flex';
            this.pausedIndicator.style.display = 'none';
        });

        // Play again
        document.getElementById('playAgain').addEventListener('click', () => {
            this.gameOverModal.style.display = 'none';
            this.resetGame();
            this.startGame();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            // Update player position after resize
            if (this.player) {
                this.player.y = this.canvas.height - 100;
            }
        });
    }

    startGame() {
        if (!this.state.isRunning) {
            this.state.isRunning = true;
            this.menu.style.display = 'none';
            audioManager.playBackgroundMusic();
        }
    }

    togglePause() {
        this.state.isPaused = !this.state.isPaused;
        this.pausedIndicator.style.display = this.state.isPaused ? 'block' : 'none';
        
        if (this.state.isPaused) {
            audioManager.pauseBackgroundMusic();
        } else {
            audioManager.resumeBackgroundMusic();
        }
    }

    handleShoot() {
        if (this.state.isRunning && !this.state.isPaused) {
            const projectile = this.player.shoot();
            if (projectile) {
                this.projectiles.push(projectile);
            }
        }
    }

    spawnEnemy() {
        const x = Math.random() * (this.canvas.width - 40);
        const y = -50;
        
        // Randomly choose enemy type
        const typeRoll = Math.random();
        let type;
        if (typeRoll < 0.6) {
            type = 'green'; // 60% chance for green enemy
        } else if (typeRoll < 0.85) {
            type = 'blue'; // 25% chance for blue enemy
        } else {
            type = 'red'; // 15% chance for red enemy
        }
        
        this.enemies.push(new Enemy(x, y, type));
    }

    update() {
        if (!this.state.isRunning || this.state.isPaused) return;

        // Update player
        this.player.update(this.mouseX, this.canvas.width);

        // Update projectiles
        this.projectiles = this.projectiles.filter(projectile => {
            projectile.update();
            return !projectile.isOffScreen(this.canvas.height);
        });

        // Update enemies
        this.enemies = this.enemies.filter(enemy => {
            enemy.update(this.canvas.width, this.canvas.height);
            
            // Enemy shooting
            const enemyProjectile = enemy.shoot();
            if (enemyProjectile) {
                this.projectiles.push(enemyProjectile);
                audioManager.playEnemyLaser();
            }
            
            return !enemy.isOffScreen(this.canvas.height);
        });

        // Update explosions
        this.explosions = this.explosions.filter(explosion => {
            explosion.update();
            return !explosion.isComplete;
        });

        // Spawn enemies
        const currentTime = Date.now();
        if (currentTime - this.spawnTimer >= this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = currentTime;
        }

        // Check collisions
        this.checkCollisions();

        // Update UI
        this.scoreElement.textContent = `Score: ${this.state.score}`;
        this.healthElement.textContent = `Health: ${this.state.health}`;
    }

    checkCollisions() {
        // Player projectiles vs Enemies
        this.projectiles.forEach((projectile, projectileIndex) => {
            if (!projectile.isEnemy) {
                this.enemies.forEach((enemy, enemyIndex) => {
                    if (this.checkCollision(projectile, enemy)) {
                        enemy.health--;
                        this.projectiles.splice(projectileIndex, 1);
                        
                        if (enemy.health <= 0) {
                            this.state.score += enemy.points;
                            this.explosions.push(new Explosion(enemy.x, enemy.y));
                            this.enemies.splice(enemyIndex, 1);
                            audioManager.playExplosion();
                        }
                    }
                });
            }
        });

        // Enemy projectiles vs Player
        this.projectiles.forEach((projectile, index) => {
            if (projectile.isEnemy && this.checkCollision(projectile, this.player)) {
                this.state.health -= 5;
                this.projectiles.splice(index, 1);
                
                if (this.state.health <= 0) {
                    this.gameOver();
                }
            }
        });

        // Enemies vs Player
        this.enemies.forEach((enemy, index) => {
            if (this.checkCollision(enemy, this.player)) {
                this.state.health -= 10;
                this.explosions.push(new Explosion(enemy.x, enemy.y));
                this.enemies.splice(index, 1);
                audioManager.playExplosion();
                
                if (this.state.health <= 0) {
                    this.gameOver();
                }
            }
        });
    }

    checkCollision(obj1, obj2) {
        return Math.abs(obj1.x - obj2.x) < (obj1.width + obj2.width) / 2 &&
               Math.abs(obj1.y - obj2.y) < (obj1.height + obj2.height) / 2;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

        // Draw game elements
        this.player.draw(this.ctx);
        this.projectiles.forEach(projectile => projectile.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.explosions.forEach(explosion => explosion.draw(this.ctx));
    }

    gameLoop() {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastFrameTime;
        this.lastFrameTime = currentTime;

        this.update();
        this.draw();

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameOver() {
        this.state.isRunning = false;
        this.gameOverModal.style.display = 'flex';
        audioManager.playGameOver();
        
        // Update the final score display
        document.getElementById('finalScore').textContent = `Your Score: ${this.state.score}`;
        document.getElementById('playAgain').style.display = 'block';
    }

    resetGame() {
        this.state.score = 0;
        this.state.health = 100;
        this.state.isRunning = false;
        this.state.isPaused = false;
        this.projectiles = [];
        this.enemies = [];
        this.explosions = [];
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 100);
        this.pausedIndicator.style.display = 'none';
        
        // Update UI
        this.scoreElement.textContent = 'Score: 0';
        this.healthElement.textContent = 'Health: 100';
    }
}

// Initialize game when window loads
window.addEventListener('load', () => {
    new Game();
}); 