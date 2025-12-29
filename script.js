// --- ESG SKILL BARS ANIMATION ---

// 1. ESG Processing (Python & SQL) - Green
let procProgress = document.querySelector(".esg-processing"),
  procValue = document.querySelector(".esg-processing-val");

let procStartValue = 0,
  procEndValue = 95, // High proficiency for core data skills
  procspeed = 30;

let progressProc = setInterval(() => {
  procStartValue++;

  procValue.textContent = `${procStartValue}%`;
  // Color: #28a745 (Green)
  procProgress.style.background = `conic-gradient(#28a745 ${
    procStartValue * 3.6
  }deg, #ededed 0deg)`;

  if (procStartValue == procEndValue) {
    clearInterval(progressProc);
  }
}, procspeed);

// 2. ESG Visualization (PowerBI & Tableau) - Teal/Blue
let vizProgress = document.querySelector(".esg-viz"),
  vizValue = document.querySelector(".esg-viz-val");

let vizStartValue = 0,
  vizEndValue = 90,
  vizspeed = 30;

let progressViz = setInterval(() => {
  vizStartValue++;

  vizValue.textContent = `${vizStartValue}%`;
  // Color: #17a2b8 (Teal/Info)
  vizProgress.style.background = `conic-gradient(#17a2b8 ${
    vizStartValue * 3.6
  }deg, #ededed 0deg)`;

  if (vizStartValue == vizEndValue) {
    clearInterval(progressViz);
  }
}, vizspeed);

// 3. ESG Frameworks (GRI, SASB, TCFD) - Orange
let frameProgress = document.querySelector(".esg-frameworks"),
  frameValue = document.querySelector(".esg-frameworks-val");

let frameStartValue = 0,
  frameEndValue = 80, 
  framespeed = 30;

let progressFrame = setInterval(() => {
  frameStartValue++;

  frameValue.textContent = `${frameStartValue}%`;
  // Color: #fd7e14 (Orange)
  frameProgress.style.background = `conic-gradient(#fd7e14 ${
    frameStartValue * 3.6
  }deg, #ededed 0deg)`;

  if (frameStartValue == frameEndValue) {
    clearInterval(progressFrame);
  }
}, framespeed);

// 4. Data Engineering (dbt, Pipelines) - Dark Grey
let engProgress = document.querySelector(".esg-eng"),
  engValue = document.querySelector(".esg-eng-val");

let engStartValue = 0,
  engEndValue = 85,
  engspeed = 30;

let progressEng = setInterval(() => {
  engStartValue++;

  engValue.textContent = `${engStartValue}%`;
  // Color: #343a40 (Dark Grey/Governance)
  engProgress.style.background = `conic-gradient(#343a40 ${
    engStartValue * 3.6
  }deg, #ededed 0deg)`;

  if (engStartValue == engEndValue) {
    clearInterval(progressEng);
  }
}, engspeed);


// --- PORTFOLIO FILTERING ---
// This works with the new data-filters: "env", "soc", "gov", "reporting"
$(document).ready(function () {
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");
    
    // Manage active class for buttons
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
// Keeps the navbar fixed at the top when scrolling
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
// Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
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

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", function(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});