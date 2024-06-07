const game = (() => {
    const players = [];
    const categories = [
        { name: 'Skater', points: 1 },
        { name: '> 1 ansiktspiercing', points: 1 },
        { name: 'Snubbel', points: 1 },
        { name: 'Faceplant', points: 1 },
        { name: 'Visslare', points: 1 },
        { name: 'Hångel', points: 1 },
        { name: 'Bög', points: 1 },
        { name: 'Hobo', points: 1 },
        { name: 'Kuf', points: 1 },
        { name: 'High Five', points: 1 },
        { name: 'Aktuell debatt', points: 1 },
        { name: 'Ensam väntare', points: 1 },
        { name: 'Snickarbyxor', points: 1 },
        { name: 'Rött plagg', points: 1 },
        { name: 'Dunderskratt i grupp', points: 1 },
        { name: 'Skönkaxare', points: 5 },
        { name: 'PK-hora', points: 5 },
        { name: 'Kulturtant', points: 2 },
        { name: 'Trollkarl', points: 10 },
        { name: 'Bråk', points: 5 },
        { name: 'Innuendo', points: 4 },
        { name: 'Hatt', points: 5 },
        { name: 'Fiske', points: 2 },
        { name: 'Katt', points: 15 },
        { name: 'Råtta', points: 16 },
        { name: 'Polisbil', points: 1 },
        { name: 'Polishäst', points: 5 },
        { name: 'Instrument', points: 2 },
        { name: 'Instrument + ljud', points: 5 },
        { name: 'Tegelätare', points: 1 }
    ];

    const categoryList = document.getElementById('category-list');
    const scoresContainer = document.getElementById('scores-container');
    const playerInputs = document.getElementById('player-inputs');
    const setupTitle = document.getElementById('setup-title');

    const init = () => {
        document.addEventListener('DOMContentLoaded', setupEventListeners);
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                }, (err) => {
                    console.log('Service Worker registration failed:', err);
                });
            });
        }
    };

    const setupEventListeners = () => {
        categories.forEach(category => {
            const li = document.createElement('li');
            li.textContent = `${category.name} (${category.points} poäng)`;
            li.addEventListener('click', () => {
                players.forEach((player, index) => {
                    const scoreItem = document.createElement('li');
                    scoreItem.textContent = `${player.name}: ${category.name} - ${category.points} poäng`;
                    document.getElementById(`score-list-${index}`).appendChild(scoreItem);
                    player.score += category.points;
                    document.getElementById(`score-${index}`).textContent = `Poäng: ${player.score}`;
                });
            });
            categoryList.appendChild(li);
        });
    };

    const showPlayerSetup = (mode) => {
        document.getElementById('home-screen').style.display = 'none';
        document.getElementById('player-setup-screen').style.display = 'block';
        playerInputs.innerHTML = '';
        players.length = 0;
        setupTitle.textContent = mode === 'single' ? 'Ange Spelarnamn' : 'Ange Spelarnamn för varje spelare';

        const numPlayers = mode === 'single' ? 1 : 2;
        for (let i = 0; i < numPlayers; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Spelare ${i + 1} Namn`;
            input.id = `player-${i}`;
            playerInputs.appendChild(input);
        }
    };

    const startGame = () => {
        const playerInputsElements = document.querySelectorAll('#player-inputs input');
        playerInputsElements.forEach(input => {
            const playerName = input.value.trim();
            if (playerName) {
                players.push({ name: playerName, score: 0 });
            }
        });
        if (players.length === 0) {
            alert('Ange minst ett spelarnamn!');
            return;
        }

        document.getElementById('player-setup-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        scoresContainer.innerHTML = '';
        players.forEach((player, index) => {
            const scoreContainer = document.createElement('div');
            scoreContainer.classList.add('score-container');
            scoreContainer.innerHTML = `
                <h3>${player.name}</h3>
                <ul id="score-list-${index}"></ul>
                <div id="score-${index}">Poäng: ${player.score}</div>
            `;
            scoresContainer.appendChild(scoreContainer);
        });
    };

    const resetScores = () => {
        players.forEach((player, index) => {
            player.score = 0;
            document.getElementById(`score-list-${index}`).innerHTML = '';
            document.getElementById(`score-${index}`).textContent = `Poäng: ${player.score}`;
        });
    };

    const goHome = () => {
        document.getElementById('home-screen').style.display = 'block';
        document.getElementById('player-setup-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'none';
    };

    return {
        init,
        showPlayerSetup,
        startGame,
        resetScores,
        goHome,
    };
})();

game.init();
