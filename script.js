// --- ESG SKILL BARS ANIMATION ---

// 1. ESG Processing (Python & SQL) - Green
let procProgress = document.querySelector(".esg-processing"),
  procValue = document.querySelector(".esg-processing-val");

let procStartValue = 0,
  procEndValue = 95,
  procspeed = 30;

let progressProc = setInterval(() => {
  if(procValue){ // Check if element exists to prevent errors
      procStartValue++;
      procValue.textContent = `${procStartValue}%`;
      procProgress.style.background = `conic-gradient(#28a745 ${
        procStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (procStartValue == procEndValue) {
        clearInterval(progressProc);
      }
  }
}, procspeed);

// 2. ESG Visualization - Teal
let vizProgress = document.querySelector(".esg-viz"),
  vizValue = document.querySelector(".esg-viz-val");

let vizStartValue = 0,
  vizEndValue = 90,
  vizspeed = 30;

let progressViz = setInterval(() => {
  if(vizValue){
      vizStartValue++;
      vizValue.textContent = `${vizStartValue}%`;
      vizProgress.style.background = `conic-gradient(#17a2b8 ${
        vizStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (vizStartValue == vizEndValue) {
        clearInterval(progressViz);
      }
  }
}, vizspeed);

// 3. ESG Frameworks - Orange
let frameProgress = document.querySelector(".esg-frameworks"),
  frameValue = document.querySelector(".esg-frameworks-val");

let frameStartValue = 0,
  frameEndValue = 80,
  framespeed = 30;

let progressFrame = setInterval(() => {
  if(frameValue){
      frameStartValue++;
      frameValue.textContent = `${frameStartValue}%`;
      frameProgress.style.background = `conic-gradient(#fd7e14 ${
        frameStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (frameStartValue == frameEndValue) {
        clearInterval(progressFrame);
      }
  }
}, framespeed);

// 4. Data Engineering - Dark Grey
let engProgress = document.querySelector(".esg-eng"),
  engValue = document.querySelector(".esg-eng-val");

let engStartValue = 0,
  engEndValue = 85,
  engspeed = 30;

let progressEng = setInterval(() => {
  if(engValue){
      engStartValue++;
      engValue.textContent = `${engStartValue}%`;
      engProgress.style.background = `conic-gradient(#343a40 ${
        engStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (engStartValue == engEndValue) {
        clearInterval(progressEng);
      }
  }
}, engspeed);


// --- PORTFOLIO FILTERING ---
$(document).ready(function () {
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");
    
    // Manage active class
    $(".filter-item").removeClass("active");
    $(this).addClass("active");

    if (value == "all") {
      $(".post").show("1000");
    } else {
      $(".post")
        .not("." + value)
        .hide("1000");
      $(".post")
        .filter("." + value)
        .show("1000");
    }
  });
});


// --- STICKY NAVBAR ---
document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        document.getElementById('navbar-top').classList.add('fixed-top');
        // add padding top to show content behind navbar
        navbar_height = document.querySelector('.navbar').offsetHeight;
        document.body.style.paddingTop = navbar_height + 'px';
      } else {
        document.getElementById('navbar-top').classList.remove('fixed-top');
         // remove padding top from body
        document.body.style.paddingTop = '0';
      } 
  });
}); 


// --- BACK TO TOP BUTTON ---
let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", function(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});


// --- 3D TILT EFFECT INIT ---
// This enables the futuristic hover effect on all cards
// Ensure vanilla-tilt.js is loaded in HTML header before this runs
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".card, .service-card, .progress-card"), {
        max: 10,           // Max rotation in degrees
        speed: 400,        // Speed of the enter/exit transition
        glare: true,       // Add a light glare effect
        "max-glare": 0.3,  // Opacity of the glare
        scale: 1.02        // Slight zoom on hover
    });
}