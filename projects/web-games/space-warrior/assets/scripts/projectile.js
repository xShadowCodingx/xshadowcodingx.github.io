class Projectile {
    constructor(x, y, isEnemy = false) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 15;
        this.speed = isEnemy ? 5 : 7;
        this.isEnemy = isEnemy;
    }

    update() {
        this.y += this.isEnemy ? this.speed : -this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.isEnemy ? '#ff6600' : '#0066ff';
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    isOffScreen(canvasHeight) {
        return this.y < -this.height || this.y > canvasHeight + this.height;
    }
} 