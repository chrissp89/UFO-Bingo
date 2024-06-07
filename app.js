if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}

// Add any additional JavaScript functionality if needed

// Example of a simple functionality for button click
document.addEventListener('DOMContentLoaded', (event) => {
  const buttons = document.querySelectorAll('.primary-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`Button ${e.target.textContent.trim()} clicked!`);
    });
  });
});
