// Whimsy layer: floating bubbles/sparkles/hearts behind the hero, and a
// bouncy scroll-in reveal. Used on the home page and (lighter) on project
// pages. Styles live in css/whimsy.css.
(function(){
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var narrow = window.innerWidth < 700;

    // Floating bubbles, sparkles and pixel hearts drifting up behind the hero
    var homeHero = document.querySelector('.hero');
    var hero = homeHero || document.querySelector('.cs-hero');
    if(hero && !reduceMotion){
        var layer = document.createElement('div');
        layer.className = 'whimsy-floaters';
        layer.setAttribute('aria-hidden', 'true');

        var kinds = ['bubble', 'bubble', 'bubble', 'sparkle', 'sparkle', 'heart'];
        // project pages get fewer floaters than the home page
        var count = homeHero ? (narrow ? 9 : 16) : (narrow ? 5 : 8);

        for(var i = 0; i < count; i++){
            var kind = kinds[i % kinds.length];
            var f = document.createElement('div');
            f.className = 'floater floater--' + kind;
            var size = kind === 'bubble' ? 10 + Math.random() * 22 : 9 + Math.random() * 9;
            var dur = 14 + Math.random() * 14;
            f.style.left = (Math.random() * 96) + '%';
            f.style.setProperty('--size', size.toFixed(0) + 'px');
            f.style.setProperty('--dur', dur.toFixed(1) + 's');
            // negative delay so the hero isn't empty on first load
            f.style.setProperty('--delay', (-Math.random() * dur).toFixed(1) + 's');
            f.style.setProperty('--sway', (3 + Math.random() * 3).toFixed(1) + 's');
            f.style.setProperty('--alpha', (0.45 + Math.random() * 0.45).toFixed(2));
            f.style.setProperty('--rise', (hero.offsetHeight + 80) + 'px');
            f.appendChild(document.createElement('span'));
            layer.appendChild(f);
        }
        hero.appendChild(layer);
    }

    // Bouncy reveal as sections scroll into view
    if(reduceMotion || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
        '.section-heading, .showreel-frame, .aboutme_content, .bar-skills, .exp-cards, .featured, .cardcontainer .card, .contact-container, ' +
        '.cs-glance, .cs-section'
    );
    var cardIndex = 0;
    targets.forEach(function(el){
        el.classList.add('reveal');
        // stagger cards across each row of three
        if(el.classList.contains('card')){
            el.style.setProperty('--reveal-delay', ((cardIndex++ % 3) * 0.09) + 's');
        }
    });

    var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    // threshold 0 so very tall sections still reveal once their top edge appears
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    targets.forEach(function(el){ observer.observe(el); });
})();

// Click sparkles (home page and project pages)
(function(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var colours = ['', 'click-spark--green', 'click-spark--cream'];

    // A little burst of sparkles wherever you click
    document.addEventListener('pointerdown', function(e){
        for(var i = 0; i < 7; i++){
            var s = document.createElement('span');
            s.className = 'click-spark ' + colours[i % colours.length];
            var angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.5;
            var dist = 22 + Math.random() * 22;
            s.style.left = e.clientX + 'px';
            s.style.top = e.clientY + 'px';
            s.style.setProperty('--dx', (Math.cos(angle) * dist).toFixed(1) + 'px');
            s.style.setProperty('--dy', (Math.sin(angle) * dist).toFixed(1) + 'px');
            s.addEventListener('animationend', function(){ this.remove(); });
            document.body.appendChild(s);
        }
    });
})();

// Mini Shayn: a Minecraft-skin mascot peeking from the bottom corner of the
// home page. Says something when you reach a new section; click to jump.
(function(){
    if(!document.querySelector('.hero')) return;

    var mascot = document.createElement('button');
    mascot.type = 'button';
    mascot.className = 'mascot';
    mascot.setAttribute('aria-label', 'Mini Shayn, the site mascot. Click to say hi.');

    var bubble = document.createElement('span');
    bubble.className = 'mascot-bubble';
    bubble.setAttribute('aria-live', 'polite');
    mascot.appendChild(bubble);

    var figure = document.createElement('span');
    figure.className = 'mascot-figure';
    // draw order matters: back arm, legs and body first, head on top
    ['armR', 'legR', 'legL', 'body', 'armL', 'head'].forEach(function(part){
        var img = document.createElement('img');
        img.src = 'Images/mascot/' + part + '.png';
        img.alt = '';
        img.className = 'mascot-' + part;
        figure.appendChild(img);
    });
    mascot.appendChild(figure);
    document.body.appendChild(mascot);

    var hideTimer;
    function say(text, ms){
        bubble.textContent = text;
        mascot.classList.add('is-talking');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function(){
            mascot.classList.remove('is-talking');
        }, ms || 3200);
    }

    // a line for each section as you scroll to it
    var lines = {
        showreel: 'grab some popcorn 🍿',
        about: "that's the real me! ✿",
        projects: 'GO: Crossing is my fave ♡',
        contact: "say hi, I don't bite!"
    };
    if('IntersectionObserver' in window){
        var seen = {};
        var sectionObserver = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                var id = entry.target.id;
                if(entry.isIntersecting && !seen[id]){
                    seen[id] = true;
                    say(lines[id]);
                }
            });
        }, { rootMargin: '0px 0px -50% 0px' });
        Object.keys(lines).forEach(function(id){
            var el = document.getElementById(id);
            if(el) sectionObserver.observe(el);
        });
    }

    // greet shortly after the page loads
    setTimeout(function(){ say("hi! I'm mini Shayn 👋", 3600); }, 1200);

    // click: jump and say something random
    var clickLines = [
        'hehe, that tickles!',
        'have you seen the showreel?',
        'I like bubble tea 🧋',
        'game jam, anyone?',
        'boing! ✦',
        'thanks for visiting ♡'
    ];
    var last = -1;
    mascot.addEventListener('click', function(){
        var i;
        do { i = Math.floor(Math.random() * clickLines.length); } while(i === last);
        last = i;
        say(clickLines[i]);
        mascot.classList.remove('is-jumping');
        void mascot.offsetWidth; // restart the jump animation
        mascot.classList.add('is-jumping');
    });
    mascot.addEventListener('animationend', function(e){
        if(e.animationName === 'mascot-jump') mascot.classList.remove('is-jumping');
    });
})();
