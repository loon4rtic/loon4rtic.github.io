/* audio js*/
window.addEventListener("click", function() {
  document.getElementById("song").play();
});

var btn1=document.querySelector("#homeBtn");
var btn2=document.querySelector("#cultureBtn");
var btn3=document.querySelector("#typesBtn");
var btn4=document.querySelector("#reviewsBtn");
var allpages=document.querySelectorAll(".page");

var menu = document.getElementById('menu');
var menuBtn = document.querySelector('.menuBtn');
var closeBtn = document.querySelector('.closeBtn');

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
//reset when resizing window
window.addEventListener("resize", function(){
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

function hideall() {
  var allpages = document.querySelectorAll(".page"); // select all pages
  for (var i = 0; i < allpages.length; i++) {
    var onepage = allpages[i];
    onepage.style.display = "none"; // hide it
  }
}

function show(pgno) {
  hideall();
  var onepage = document.querySelector("#page" + pgno);
  onepage.style.display = "block"; // show selected page
}

// Attach event listeners to buttons
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

var cultureItems = document.querySelector(".culture-items");
var popup = document.querySelector(".popup-box");
var popupCloseBtn = popup.querySelector(".popup-close-btn");
var popupCloseIcon = popup.querySelector(".popup-close-icon");
cultureItems.addEventListener("click",function(event){
    if(event.target.tagName.toLowerCase() == "button"){
        var item = event.target.parentElement;
        var h3 = item.querySelector("h3").innerHTML;
        var readMoreCont = item.querySelector(".culture_read-more-content").innerHTML;

        popup.querySelector("h3").innerHTML = h3;
        popup.querySelector(".popup-body").innerHTML = readMoreCont;
        popupBox();
    }
});
popupCloseBtn.addEventListener("click", popupBox);
popupCloseIcon.addEventListener("click", popupBox);


function popupBox(){
    popup.classList.toggle("open");
}
document.addEventListener('DOMContentLoaded', function () {
  var sliderImages = document.querySelectorAll('.review_slider_img');
  var reviewGroups = document.querySelectorAll('.review');

  sliderImages.forEach(function (img, index) {
    img.addEventListener('click', function () {
      // Remove 'active' from all images
      sliderImages.forEach(function (el) {
        el.classList.remove('active');
      });
      this.classList.add('active');

      // Hide all review groups
      reviewGroups.forEach(function (group) {
        group.classList.remove('active');
      });

      // Show the corresponding review group
      if (reviewGroups[index]) {
        reviewGroups[index].classList.add('active');
      }
    });
  });
});

var headers = document.querySelectorAll('.reviewHeader');
headers.forEach(function (header) {
  header.addEventListener('click', function () {
    header.classList.toggle('active');
  });
});



  /*game js*/ 
  var startordering=document.querySelector("#placeOrderBtn");
  var gameopening=document.querySelector(".ordering");
  
  startordering.addEventListener("click", function(){
    
    gameopening.style.display = "flex";
  });

document.addEventListener("DOMContentLoaded", function() {
  var sprite = document.getElementById("sprite");
  var bubblesprite = document.getElementById("bubble");

  var isAnimating = false;

  sprite.addEventListener("mousedown", function() {
    sprite.classList.add("playing");
    bubblesprite.classList.add("playing");
    sprite.classList.remove("released");
    bubblesprite.classList.remove("released");
    isAnimating = true;
  });

  document.addEventListener("mouseup", function() {
    if (isAnimating) {
      sprite.classList.remove("playing");
      bubblesprite.classList.remove("playing");
      isAnimating = false;

      //delay before fade 
      setTimeout(function() {
        sprite.classList.add("released");
        bubblesprite.classList.add("released");
      }, 500); //change delay time
    }
  });


//to listen for when the fade transition ends
  sprite.addEventListener("transitionend", function(event) {
    if (event.propertyName === "opacity") {
      //when fading finished, switch to next phase
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
document.addEventListener("DOMContentLoaded", function() {
  var teapotsprite = document.getElementById("teapot");
  var drinks = document.getElementById("drink");
  var isAnimating = false;

  //listen when mouse is down to trigger spritw
  teapotsprite.addEventListener("mousedown", function(){
    teapotsprite.classList.add("playing");
    drinks.classList.add("playing");
    teapotsprite.classList.remove("released");
    drinks.classList.remove("released");
    isAnimating = true;
  });
//listen when mouse is not down to stop sprite 
  document.addEventListener("mouseup", function(){
    if (isAnimating) {
      teapotsprite.classList.remove("playing");
      drinks.classList.remove("playing");
      isAnimating = false;

      //delay before fade happens 
      setTimeout(function(){
        teapotsprite.classList.add("released");
        drinks.classList.add("released");
      }, 500); //change delay time
    }
  });


//to listen for when the fade transition ends
  teapotsprite.addEventListener("transitionend", function(event){
    if (event.propertyName === "opacity") {
      //when fading finished, switch to next phase
      console.log("Transition complete. Move to next phase.");
      switchToNextPhase();
    }
  });

  function switchToNextPhase() {
    document.querySelector(".phase2").style.display = "none";
    document.querySelector(".phase3").style.display = "flex";
  }
});

document.addEventListener("DOMContentLoaded", function(){
 var syrupbottlesprite = document.getElementById("syrupbottle");
 var syrup = document.getElementById("syrup");
 var isAnimating = false;

  syrupbottlesprite.addEventListener("mousedown", function(){
    syrupbottlesprite.classList.add("playing");
    syrup.classList.add("playing");
    syrupbottlesprite.classList.remove("released");
     syrup.classList.remove("released");
    isAnimating = true;
  });

  document.addEventListener("mouseup", function(){
    if (isAnimating) {
      syrupbottlesprite.classList.remove("playing");
     syrup.classList.remove("playing");

      isAnimating = false;

      //delay before fade happens 
      setTimeout(function(){
        syrupbottlesprite.classList.add("released");
         syrup.classList.add("released");
      }, 500); // change delay time
    }
  });


//listen for when the fade transition ends
  syrupbottlesprite.addEventListener("transitionend", function(event){
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
  var next = document.querySelector('.next');
  var prev = document.querySelector('.prev');
  var slider = document.querySelector('.types_slider');
  
  next.addEventListener('click', function(){
    var slides = document.querySelectorAll('.type_slides');
    slider.appendChild(slides[0]);
  });
  prev.addEventListener('click', function(){
    var slides = document.querySelectorAll('.type_slides');
    slider.prepend(slides[slides.length - 1]);
  });





  /*full screen js*/ 
  var fullscreenDocument = document.documentElement;
  var fullscreenbtn = document.getElementById("fullscreenbtn");

  fullscreenbtn.addEventListener("click", function(e){
  e.preventDefault(); //prevent anchor from jumping

  if (!document.fullscreenElement) {
    if (fullscreenDocument.requestFullscreen) {
      fullscreenDocument.requestFullscreen();
    } else if (fullscreenDocument.msRequestFullscreen) {
      fullscreenDocument.msRequestFullscreen();
    } else if (fullscreenDocument.mozRequestFullScreen) {
      fullscreenDocument.mozRequestFullScreen();
    } else if (fullscreenDocument.webkitRequestFullscreen) {
      fullscreenDocument.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

  /*reload website js */
  function reload() {
    var button = document.getElementById("refreshBtn");
    button.addEventListener("click", function(e){
      e.preventDefault();
      window.location.reload();
    });
  }
  //call it so the event listener is attached
  reload(); 
/*qr code btn js*/
function qrcode() {
    var qrbutton = document.getElementById("qrcodeBtn");
    qrbutton.addEventListener("click", function(e){
      e.preventDefault();
      document.querySelector(".qrcode_popupbox").style.display = "block";
    });
  }
qrcode();
  document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#QrCodeclose").addEventListener("click", function () {
    document.querySelector(".qrcode_popupbox").style.display = "none";
  });
});
//form js
function form() {
    var formbutton = document.getElementById("formBtn");
    formbutton.addEventListener("click", function(e){
      e.preventDefault();
      document.querySelector(".form_popupbox").style.display = "block";
    });
  }
form();
  document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#Formclose").addEventListener("click", function () {
    document.querySelector(".form_popupbox").style.display = "none";
  });
});


var nameInput = document.getElementById('name');
var password = document.getElementById('password');
var forms = document.getElementById('form');
var errorElement = document.getElementById('error');

forms.addEventListener('submit', function(e){
  e.preventDefault();  // prevent submission so user can fix errors

  var messages = [];

  if (nameInput.value === '' || nameInput.value == null) {
    messages.push('Name is required');
  }

  if (password.value.length <= 6) {
    messages.push('Password must be longer than 6 characters');
  }

  if (password.value.length >= 20) {
    messages.push('Password must be shorter than 20 characters');
  }

  if (password.value.toLowerCase() === 'password') {
    messages.push('Password cannot be "password"');
  }

  if (messages.length > 0) {
    errorElement.innerText = messages.join(', ');
  } else {
    errorElement.innerText = ''; //clear errors
    
  }
});

//open sidebar

document.addEventListener('DOMContentLoaded', function () {
      var toggleBtn = document.querySelector('.sidebar_open');
      var sidebarContent = document.getElementById('side_navbar');

      toggleBtn.addEventListener('click', function(){
        //toggles between none and block
        if (sidebarContent.style.display === 'none' || sidebarContent.style.display === '') {
          sidebarContent.style.display = 'block';
        } else {
          sidebarContent.style.display = 'none';
        }
      });
    });