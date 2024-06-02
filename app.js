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
    const resetButton = document.getElementById('reset-button');

    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = `${category.name} (${category.points} poäng)`;
        li.addEventListener('click', () => {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `${category.name} - ${category.points} poäng`;
            scoreList.appendChild(scoreItem);
        });
        categoryList.appendChild(li);
    });

    resetButton.addEventListener('click', () => {
        scoreList.innerHTML = '';
    });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }, (err) => {
      console.log('Service Worker registration failed:', err);
    });
  });
}