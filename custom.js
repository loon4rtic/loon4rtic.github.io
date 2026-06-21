// "View Details" toggle for each project card in the grid — each card's
// button independently expands/collapses its own .project-details panel.
// We search within the card for ".project-details" rather than assuming
// it's the button's immediate next sibling, so this keeps working even
// if other elements (like the "Watch Video" link) sit between them.
document.querySelectorAll(".project-toggle").forEach(function(btn){
    var card = btn.closest(".card-content") || btn.closest(".card");
    var details = card ? card.querySelector(".project-details") : null;
    if(!details) return;

    btn.addEventListener("click", function(){
        var isOpen = details.classList.toggle("open");
        btn.classList.toggle("open", isOpen);
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        btn.querySelector("span").textContent = isOpen ? "Hide Details" : "View Details";
    });
});

// animates the bar-style skill meters (Tools & Software) when they
// scroll into view, filling each .bar-fill to its data-pct width
var barSkills = document.querySelectorAll('.bar-skill');

function fillBar(el){
    var pct = el.getAttribute('data-pct');
    var fill = el.querySelector('.bar-fill');
    requestAnimationFrame(function(){ fill.style.width = pct + '%'; });
}

if('IntersectionObserver' in window){
    var barObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                fillBar(entry.target);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    barSkills.forEach(function(s){ barObserver.observe(s); });
} else {
    barSkills.forEach(fillBar);
}