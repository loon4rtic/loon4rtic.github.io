// Click any project image to view it full size in an overlay.
// Close by clicking the backdrop, the × button, or pressing Escape.
(function(){
    var images = document.querySelectorAll('.proj-page img');
    if(!images.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
        '<button class="lightbox-close" aria-label="Close image">&times;</button>' +
        '<img class="lightbox-img" alt="">';
    document.body.appendChild(overlay);

    var bigImg = overlay.querySelector('.lightbox-img');
    var closeBtn = overlay.querySelector('.lightbox-close');

    function open(img){
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function close(){
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    images.forEach(function(img){
        img.classList.add('zoomable');
        img.setAttribute('tabindex', '0');
        img.addEventListener('click', function(){ open(img); });
        img.addEventListener('keydown', function(e){
            if(e.key === 'Enter' || e.key === ' '){
                e.preventDefault();
                open(img);
            }
        });
    });

    overlay.addEventListener('click', function(e){
        if(e.target !== bigImg) close();
    });

    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
})();
