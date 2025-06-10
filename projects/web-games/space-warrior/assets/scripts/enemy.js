class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.type = type;
        this.speed = 2;
        this.shootCooldown = 2000;
        this.lastShot = 0;
        this.direction = 1;
        this.movementPattern = 0;
        this.movementTimer = 0;

        // Set properties based on enemy type
        switch(type) {
            case 'green':
                this.image = new Image();
                this.image.src = 'assets/images/greenSpikeEnemy.png';
                this.health = 1;
                this.points = 10;
                this.speed = 2;
                break;
            case 'blue':
                this.image = new Image();
                this.image.src = 'assets/images/blueSpikeEnemy.png';
                this.health = 2;
                this.points = 20;
                this.speed = 1.5;
                this.shootCooldown = 2500;
                break;
            case 'red':
                this.image = new Image();
                this.image.src = 'assets/images/redEnemy.png';
                this.health = 3;
                this.points = 30;
                this.speed = 1;
                this.shootCooldown = 3000;
                break;
        }
    }

    update(canvasWidth, canvasHeight) {
        // Update position based on movement pattern
        this.movementTimer++;
        
        if (this.movementPattern === 0) { // Straight down
            this.y += this.speed;
        } else if (this.movementPattern === 1) { // Zigzag
            this.x += this.speed * this.direction;
            this.y += this.speed * 0.5;
            if (this.x <= 0 || this.x >= canvasWidth) {
                this.direction *= -1;
            }
        } else if (this.movementPattern === 2) { // Circle
            const radius = 50;
            const centerX = canvasWidth / 2;
            const angle = this.movementTimer * 0.02;
            this.x = centerX + Math.cos(angle) * radius;
            this.y += this.speed * 0.3;
        }

        // Change movement pattern randomly
        if (Math.random() < 0.005) {
            this.movementPattern = Math.floor(Math.random() * 3);
        }
    }

    shoot() {
        const currentTime = Date.now();
        if (currentTime - this.lastShot >= this.shootCooldown) {
            this.lastShot = currentTime;
            return new Projectile(this.x, this.y + this.height / 2, true);
        }
        return null;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    isOffScreen(canvasHeight) {
        return this.y > canvasHeight + this.height;
    }
} 