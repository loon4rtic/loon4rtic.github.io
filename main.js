const btn1=document.querySelector("#homeBtn");
const btn2=document.querySelector("#cultureBtn");
const btn3=document.querySelector("#typesBtn");
const btn4=document.querySelector("#reviewsBtn");
var allpages=document.querySelectorAll(".page");

let menu = document.getElementById('menu');
let menuBtn = document.querySelector('.menuBtn');
let closeBtn = document.querySelector('.closeBtn');

function openMenu(){
    menu.style.display = 'block';
    menuBtn.style.display = 'none';
    closeBtn.style.display = 'block';
}
function closeMenu(){
    menu.style.display = 'none';
    menuBtn.style.display = 'block';
    closeBtn.style.display = 'none';
}
// Reset when resizing window
window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
        menu.style.display = "inline-block"; 
        menuBtn.style.display = "none";
        closeBtn.style.display = "none";
    } else {
        menu.style.display = "none";
        menuBtn.style.display = "inline-block";
        closeBtn.style.display = "none";
    }
});

function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}
}
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
btn1.addEventListener("click", function () {
    show(1);
});
btn2.addEventListener("click", function () {
    show(2);
});
btn3.addEventListener("click", function () {
    show(3);
});
btn4.addEventListener("click", function () {
    show(4);
});
hideall();
show(1);

const cultureItems = document.querySelector(".culture-items");
const popup = document.querySelector(".popup-box");
const popupCloseBtn = popup.querySelector(".popup-close-btn");
const popupCloseIcon = popup.querySelector(".popup-close-icon");
cultureItems.addEventListener("click",function(event){
    if(event.target.tagName.toLowerCase() == "button"){
        const item = event.target.parentElement;
        const h3 = item.querySelector("h3").innerHTML;
        const readMoreCont = item.querySelector(".culture_read-more-content").innerHTML;

        popup.querySelector("h3").innerHTML = h3;
        popup.querySelector(".popup-body").innerHTML = readMoreCont;
        popupBox();
    }
})
popupCloseBtn.addEventListener("click", popupBox);
popupCloseIcon.addEventListener("click", popupBox);


function popupBox(){
    popup.classList.toggle("open");
}
document.addEventListener('DOMContentLoaded', function () {
  const sliderImages = document.querySelectorAll('.review_slider_img');
  const reviewGroups = document.querySelectorAll('.review'); // each group of 3 headers

  sliderImages.forEach(function (img, index) {
    img.addEventListener('click', function () {
      // Remove 'active' from all images
      sliderImages.forEach(el => el.classList.remove('active'));
      this.classList.add('active');

      // Hide all review groups
      reviewGroups.forEach(group => group.classList.remove('active'));

      // Show only the corresponding review group
      if (reviewGroups[index]) {
        reviewGroups[index].classList.add('active');
      }
    });
    });
});
document.querySelectorAll('.reviewHeader').forEach(header => {
    header.addEventListener('click', () => {
      header.classList.toggle('active');
    });
  });



  /*game js*/ 
  const startordering=document.querySelector("#placeOrderBtn");
  const gameopening=document.querySelector(".ordering");
  
  startordering.addEventListener("click", function(){
    
    gameopening.style.display = "flex";
  })
  // const btn = document.getElementById("btn");
  // const btn5 = document.getElementById("btn5");

  // btn.addEventListener("mousedown", () => {
  //   btn5.className = "hold";
  // });

  // btn.addEventListener("mouseup", () => {
  //   btn5.className = "release";
  // });

document.addEventListener("DOMContentLoaded", () => {
  const sprite = document.getElementById("sprite");
  const bubblesprite = document.getElementById("bubble");

  let isAnimating = false;

  sprite.addEventListener("mousedown", () => {
    sprite.classList.add("playing");
    bubblesprite.classList.add("playing");
    sprite.classList.remove("released");
    bubblesprite.classList.remove("released");
    isAnimating = true;
  });

  document.addEventListener("mouseup", () => {
    if (isAnimating) {
      sprite.classList.remove("playing");
      bubblesprite.classList.remove("playing");
      isAnimating = false;

      // Delay before fade/slide happens (e.g. 500ms)
      setTimeout(() => {
        sprite.classList.add("released");
        bubblesprite.classList.add("released");
      }, 500); // You can change this to 1000 for 1s delay, etc.
    }
  });


// Listen for when the fade/slide transition ends
  sprite.addEventListener("transitionend", (event) => {
    if (event.propertyName === "opacity") {
      //Fading finished, switch to next phase
      console.log("Transition complete. Move to next phase.");
      switchToNextPhase();
    }
  });

  function switchToNextPhase() {
    document.querySelector(".phase1").style.display = "none";
    document.querySelector(".phase2").style.display = "flex";
  }
  
});


/*phase 2 js */
document.addEventListener("DOMContentLoaded", () => {
  const teapotsprite = document.getElementById("teapot");

  let isAnimating = false;

  teapotsprite.addEventListener("mousedown", () => {
    teapotsprite.classList.add("playing");
    teapotsprite.classList.remove("released");

    isAnimating = true;
  });

  document.addEventListener("mouseup", () => {
    if (isAnimating) {
      teapotsprite.classList.remove("playing");

      isAnimating = false;

      // Delay before fade/slide happens (e.g. 500ms)
      setTimeout(() => {
        teapotsprite.classList.add("released");
      }, 500); // You can change this to 1000 for 1s delay, etc.
    }
  });


// Listen for when the fade/slide transition ends
  teapotsprite.addEventListener("transitionend", (event) => {
    if (event.propertyName === "opacity") {
      //Fading finished, switch to next phase
      console.log("Transition complete. Move to next phase.");
      switchToNextPhase();
    }
  });

  function switchToNextPhase() {
    document.querySelector(".phase1").style.display = "none";
    document.querySelector(".phase2").style.display = "flex";
  }
  
});




/*types js*/
  let next = document.querySelector('.next');
  let prev = document.querySelector('.prev');
  let slider = document.querySelector('.types_slider');
  
  next.addEventListener('click', function(){
    let slides = document.querySelectorAll('.type_slides');
    slider.appendChild(slides[0]);
  })
  prev.addEventListener('click', function(){
    let slides = document.querySelectorAll('.type_slides');
    slider.prepend(slides[slides.length - 1]);
  })
