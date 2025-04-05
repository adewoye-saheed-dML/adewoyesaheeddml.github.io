// Consolidated progress bar function
function createProgressBar(selector, valueSelector, endValue, color, speed) {
  const progress = document.querySelector(selector);
  const valueElement = document.querySelector(valueSelector);
  let startValue = 0;

  function updateProgress() {
    if (startValue < endValue) {
      startValue++;
      valueElement.textContent = `${startValue}%`;
      progress.style.background = `conic-gradient(${color} ${startValue * 3.6}deg, #ededed 0deg)`;
      requestAnimationFrame(updateProgress);
    }
  }
  setTimeout(() => requestAnimationFrame(updateProgress), speed);
}

// Initialize progress bars
document.addEventListener('DOMContentLoaded', () => {
  createProgressBar('.html-css', '.html-progress', 90, '#fca61f', 30);
  createProgressBar('.javascript', '.javascript-progress', 75, '#7d2ae8', 30);
  createProgressBar('.php', '.php-progress', 80, '#20c997', 30);
  createProgressBar('.reactjs', '.reactjs-progress', 70, '#3f396d', 30);

  // Sticky navbar
  const navbar = document.getElementById('navbar-top');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('fixed-top', window.scrollY > 50);
    document.body.style.paddingTop = window.scrollY > 50 ? 
      `${navbar.offsetHeight}px` : '0';
  });

  // Back to top button
  const backButton = document.getElementById('btn-back-to-top');
  window.addEventListener('scroll', () => {
    backButton.style.display = (window.scrollY > 200) ? 'block' : 'none';
  });
  backButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Filter functionality
  document.querySelectorAll('.filter-item').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('.post').forEach(post => {
        post.style.display = (filter === 'all' || post.classList.contains(filter)) ? 
          'block' : 'none';
      });
    });
  });
});
