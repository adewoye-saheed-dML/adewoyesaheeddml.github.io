/* =========================================
   1. PRELOADER & INITIALIZATION
   ========================================= */
   document.addEventListener("DOMContentLoaded", () => {
  
    // Initialize 3D Tilt for Glass Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card, .project-card, .service-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
    }

    // Initialize Typewriter Effect
    if (document.querySelector('.auto-type')) {
        new Typed('.auto-type', {
            strings: [
                "ESG Data Specialist", 
                "Sustainability Analyst", 
                "Carbon Accounting Lead",
                "Data Engineer"
            ],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true
        });
    }

    initNeuralNetwork();
    initCounters();
    initSkillBars();
});

/* =========================================
   2. NEURAL NETWORK BACKGROUND (CANVAS)
   ========================================= */
function initNeuralNetwork() {
    const canvas = document.getElementById("neural-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    // Handle Window Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // Mouse Interaction
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Particle Class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Update particle position
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            // Mouse repulsion (optional, currently just movement)
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Create Particle Cluster
    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1; // Speed
            let directionY = (Math.random() * 2) - 1;
            
            // ESG Colors: Mix of Green and Teal
            let color = Math.random() > 0.5 ? '#2E8B57' : '#17a2b8'; 
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Draw Lines between particles
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(46, 139, 87,' + opacityValue + ')'; // Green connections
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    initParticles();
    animate();
}

/* =========================================
   3. SMART COUNTERS (IntersectionObserver)
   ========================================= */
function initCounters() {
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; // The lower the slower

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                
                const updateCount = () => {
                    const count = +counter.innerText.replace(/,/g, '') || 0; // Handle existing commas
                    const inc = target / speed;

                    if (count < target) {
                        // Format numbers with commas (e.g. 1,000,000)
                        counter.innerText = Math.ceil(count + inc).toLocaleString();
                        setTimeout(updateCount, 20);
                    } else {
                        // Add + sign if strictly required, or just target
                        counter.innerText = target.toLocaleString() + (target < 1000 ? "+" : "+");
                    }
                };
                updateCount();
                observer.unobserve(counter); // Run only once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* =========================================
   4. SKILL BARS (Trigger on Scroll)
   ========================================= */
function initSkillBars() {
    const skillsSection = document.querySelector('#about');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runSkillAnimation('.esg-processing', '.esg-processing-val', 95, '#28a745'); // Green
                runSkillAnimation('.esg-viz', '.esg-viz-val', 90, '#17a2b8');        // Teal
                runSkillAnimation('.esg-frameworks', '.esg-frameworks-val', 80, '#fd7e14'); // Orange
                runSkillAnimation('.esg-eng', '.esg-eng-val', 85, '#343a40');        // Dark
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

function runSkillAnimation(circleSelector, textSelector, endValue, color) {
    const circle = document.querySelector(circleSelector);
    const text = document.querySelector(textSelector);
    
    if (!circle || !text) return;

    let startValue = 0;
    let speed = 20;

    let progress = setInterval(() => {
        startValue++;
        text.textContent = `${startValue}%`;
        circle.style.background = `conic-gradient(${color} ${startValue * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;

        if (startValue === endValue) {
            clearInterval(progress);
        }
    }, speed);
}

/* =========================================
   5. NAVIGATION & UTILITIES
   ========================================= */
// Sticky Navbar
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar-top');
    if (window.scrollY > 50) {
        nav.classList.add('fixed-top');
        document.body.style.paddingTop = nav.offsetHeight + 'px';
    } else {
        nav.classList.remove('fixed-top');
        document.body.style.paddingTop = '0';
    } 
});

// Back to Top Button
let mybutton = document.getElementById("btn-back-to-top");
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

if(mybutton){
    mybutton.addEventListener("click", function(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

// Portfolio Filtering (Using jQuery for compatibility with existing logic)
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        
        $(".filter-item").removeClass("active");
        $(this).addClass("active");

        if (value == "all") {
            $(".post").show(1000);
        } else {
            $(".post").not("." + value).hide(1000);
            $(".post").filter("." + value).show(1000);
        }
    });
});