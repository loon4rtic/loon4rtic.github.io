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

  sliderImages.forEach(function (img) {
    img.addEventListener('click', function () {
      // Remove 'active' class from all images
      sliderImages.forEach(function (el) {
        el.classList.remove('active');
      });

      // Add 'active' class to the clicked image
      this.classList.add('active');
    });
  });
});