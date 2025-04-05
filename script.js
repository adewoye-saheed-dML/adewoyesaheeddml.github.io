document.addEventListener('DOMContentLoaded', () => {
  // Progress Bars
  const createProgressBar = (selector, valueSelector, endValue, color) => {
    const progress = document.querySelector(selector);
    const valueElement = document.querySelector(valueSelector);
    let startValue = 0;

    const animate = () => {
      if (startValue < endValue) {
        startValue++;
        valueElement.textContent = `${startValue}%`;
        progress.style.background = `conic-gradient(${color} ${startValue * 3.6}deg, #ededed 0deg)`;
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  createProgressBar('.html-css', '.html-progress', 90, '#fca61f');
  createProgressBar('.javascript', '.javascript-progress', 75, '#7d2ae8');
  createProgressBar('.php', '.php-progress', 80, '#20c997');
  createProgressBar('.reactjs', '.reactjs-progress', 70, '#3f396d');

  // Sticky Navbar
  const navbar = document.getElementById('navbar-top');
  window.addEventListener('scroll', () => {
    const shouldSticky = window.scrollY > 50;
    navbar.classList.toggle('fixed-top', shouldSticky);
    document.body.style.paddingTop = shouldSticky ? `${navbar.offsetHeight}px` : '0';
  });

  // Back to Top Button
  const backButton = document.getElementById('btn-back-to-top');
  window.addEventListener('scroll', () => {
    backButton.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
  
  backButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Portfolio Filter
  document.querySelectorAll('.filter-item').forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.dataset.filter;
      document.querySelectorAll('.post').forEach(item => {
        item.style.display = (filterValue === 'all' || item.classList.contains(filterValue))
          ? 'block'
          : 'none';
      });
    });
  });
});
