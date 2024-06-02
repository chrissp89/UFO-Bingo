document.addEventListener('DOMContentLoaded', () => {
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

    const scoreList = document.getElementById('score-list');
    const categoryList = document.getElementById('category-list');
    const leaderboardList = document.getElementById('leaderboard-list');
    const resetButton = document.getElementById('reset-button');

    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = `${category.name} (${category.points} poäng)`;
        li.addEventListener('click', () => {
            const scoreItem = document.createElement('li');
            scoreItem.classList.add('score-update');
            scoreItem.textContent = `${category.name} - ${category.points} poäng`;
            scoreList.appendChild(scoreItem);
            // Add sound effect for score update
            playSound('score');
            // Animate score update
            gsap.fromTo(scoreItem, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
            // Update leaderboard
            updateLeaderboard('Player1', category.points);
        });
        categoryList.appendChild(li);
    });

    resetButton.addEventListener('click', () => {
        scoreList.innerHTML = '';
        // Add sound effect for reset button
        playSound('reset');
    });

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        databaseURL: "YOUR_DATABASE_URL",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    firebase.initializeApp(firebaseConfig);

    // Save score
    function saveScore(player, score) {
        firebase.database().ref('leaderboard/' + player).set({
            score: score
        });
    }

    // Retrieve scores
    function getScores() {
        firebase.database().ref('leaderboard').on('value', (snapshot) => {
            const scores = snapshot.val();
            updateLeaderboardUI(scores);
        });
    }

    // Update leaderboard UI
    function updateLeaderboardUI(scores) {
        leaderboardList.innerHTML = '';
        for (let player in scores) {
            const li = document.createElement('li');
            li.textContent = `${player}: ${scores[player].score}`;
            leaderboardList.appendChild(li);
        }
    }

    // Initial load of scores
    getScores();

    // Share score
    window.shareScore = function() {
        const url = 'https://chrissp89.github.io/UFO-Bingo';
        const text = `Check out my score on UFO-Bingo!`;
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
    };

    // Function to play sound effects
    function playSound(type) {
        const audio = new Audio();
        if (type === 'score') {
            audio.src = 'score-sound.mp3';
        } else if (type === 'reset') {
            audio.src = 'reset-sound.mp3';
        }
        audio.play();
    }
});