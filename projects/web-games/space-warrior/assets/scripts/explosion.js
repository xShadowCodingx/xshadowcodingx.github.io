class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 31;
        this.height = 31;
        this.frame = 0;
        this.totalFrames = 7;
        this.frameDelay = 50; // ms between frames
        this.lastFrameTime = Date.now();
        this.isComplete = false;

        // Load explosion spritesheet
        this.image = new Image();
        this.image.src = 'assets/images/M484ExplosionSet1.png';
    }

    update() {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameDelay) {
            this.frame++;
            this.lastFrameTime = currentTime;
            
            if (this.frame >= this.totalFrames) {
                this.isComplete = true;
            }
        }
    }

    draw(ctx) {
        if (this.isComplete) return;

        // Calculate source rectangle from spritesheet
        const sourceX = this.frame * this.width;
        const sourceY = 0;

        // Draw current frame
        ctx.drawImage(
            this.image,
            sourceX, sourceY,
            this.width, this.height,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width, this.height
        );
    }
} 