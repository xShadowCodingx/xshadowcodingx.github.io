class HighScoresManager {
    constructor() {
        this.scores = [];
        this.loadScores();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const highScoresBtn = document.getElementById('highScoresBtn');
        const closeHighScores = document.getElementById('closeHighScores');
        const highScoresModal = document.getElementById('highScoresModal');
        const saveScoreBtn = document.getElementById('saveScore');
        const playerNameInput = document.getElementById('playerName');
        const gameOverModal = document.getElementById('gameOverModal');

        highScoresBtn.addEventListener('click', () => {
            this.displayHighScores();
            highScoresModal.style.display = 'block';
        });

        closeHighScores.addEventListener('click', () => {
            highScoresModal.style.display = 'none';
        });

        saveScoreBtn.addEventListener('click', () => {
            const name = playerNameInput.value.trim();
            if (name) {
                this.saveScore(name, parseInt(document.getElementById('finalScore').textContent));
                gameOverModal.style.display = 'none';
                this.displayHighScores();
                highScoresModal.style.display = 'block';
            }
        });
    }

    loadScores() {
        try {
            const scores = localStorage.getItem('highScores');
            this.scores = scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Error loading high scores:', error);
            this.scores = [];
        }
    }

    saveScore(name, score) {
        this.scores.push({ name, score });
        this.scores.sort((a, b) => b.score - a.score);
        this.scores = this.scores.slice(0, 10); // Keep only top 10 scores
        
        try {
            localStorage.setItem('highScores', JSON.stringify(this.scores));
        } catch (error) {
            console.error('Error saving high scores:', error);
        }
    }

    displayHighScores() {
        const highScoresList = document.getElementById('highScoresList');
        highScoresList.innerHTML = '';

        this.scores.forEach((score, index) => {
            const scoreElement = document.createElement('div');
            scoreElement.className = 'high-score-item';
            scoreElement.innerHTML = `
                <span>${index + 1}.</span>
                <span>${score.name}</span>
                <span>${score.score}</span>
            `;
            highScoresList.appendChild(scoreElement);
        });
    }
}

// Initialize high scores manager
const highScoresManager = new HighScoresManager(); 