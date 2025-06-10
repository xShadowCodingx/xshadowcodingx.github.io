class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.image = new Image();
        this.image.src = 'assets/images/greenPlayer.png';
        this.lastShot = 0;
        this.shootCooldown = 250; // 250ms between shots
    }

    update(mouseX, canvasWidth) {
        // Update position based on mouse/touch position
        this.x = Math.max(this.width / 2, Math.min(canvasWidth - this.width / 2, mouseX));
    }

    shoot() {
        const currentTime = Date.now();
        if (currentTime - this.lastShot >= this.shootCooldown) {
            this.lastShot = currentTime;
            audioManager.playPlayerLaser();
            return new Projectile(this.x, this.y - this.height / 2);
        }
        return null;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
} 