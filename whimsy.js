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

// Mini Shayn on project pages: instead of the corner peek, Mini Shayn climbs up and
// hangs off the top edge of the hero screenshot with a line about that
// project, and a tiny head rides the "On this page" rail as you scroll.
(function(){
    var visual = document.querySelector('.cs-hero > .cs-screen, .cs-hero > .cs-phone, .cs-hero > .cs-poster');
    if(!visual) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // one greeting per project, keyed by file name
    var page = location.pathname.split('/').pop().replace('.html', '');
    var greetings = {
        'project-tds': 'psst… I wrote the level loader! 🗺️',
        'project-gos': 'my final year project ♡',
        'project-cr': 'watch out for bugs! 🐛',
        'project-bbt': 'all about bubble tea 🧋',
        'project-3dac': 'combat time! ⚔️',
        'project-onerun': 'you can play this one on itch.io!',
        'project-overcooked': 'orders up! 🍳',
        'project-pico8': 'so many iterations… ✎'
    };
    var clickLines = [
        'hehe, you found me!',
        'the gallery is my fave part ↓',
        'boing! ✦',
        'just hanging around~',
        "don't let go… oh wait, that's me",
        'thanks for reading ♡'
    ];

    // wrap the screenshot so Mini Shayn can hide behind it (the rotation moves to the wrapper)
    var kind = visual.classList.contains('cs-phone') ? 'phone'
        : visual.classList.contains('cs-poster') ? 'poster'
        : (visual.classList.contains('cs-screen--pixel') || visual.classList.contains('cs-screen--diagram')) ? 'narrow'
        : 'screen';
    var host = document.createElement('div');
    host.className = 'peek-host peek-host--' + kind;
    visual.parentNode.insertBefore(host, visual);
    host.appendChild(visual);

    var peeker = document.createElement('button');
    peeker.type = 'button';
    peeker.className = 'peeker';
    peeker.setAttribute('aria-label', 'Mini Shayn, hanging off the screenshot. Click to say hi.');
    var figure = document.createElement('span');
    figure.className = 'mascot-figure peeker-figure';
    ['armR', 'legR', 'legL', 'body', 'armL', 'head'].forEach(function(part){
        var img = document.createElement('img');
        img.src = 'Images/mascot/' + part + '.png';
        img.alt = '';
        img.className = 'mascot-' + part;
        figure.appendChild(img);
    });
    peeker.appendChild(figure);
    host.appendChild(peeker);

    // the bubble lives on the host so it can sit in front of the screenshot
    var bubble = document.createElement('span');
    bubble.className = 'mascot-bubble peeker-bubble';
    bubble.setAttribute('aria-live', 'polite');
    host.appendChild(bubble);

    var hideTimer;
    function say(text, ms){
        bubble.textContent = text;
        host.classList.add('is-talking');
        clearTimeout(hideTimer);
        hideTimer = setTimeout(function(){
            host.classList.remove('is-talking');
        }, ms || 3200);
    }

    // climb up shortly after load, then say the project line
    setTimeout(function(){
        host.classList.add('is-up');
        setTimeout(function(){
            say(greetings[page] || 'welcome to my project!', 3800);
        }, reduceMotion ? 0 : 650);
    }, reduceMotion ? 300 : 900);

    // click: pull all the way up for a second, then drop back down
    var last = -1;
    peeker.addEventListener('click', function(){
        var i;
        do { i = Math.floor(Math.random() * clickLines.length); } while(i === last);
        last = i;
        say(clickLines[i]);
        host.classList.remove('is-hopping');
        void host.offsetWidth; // restart the hop animation
        host.classList.add('is-hopping');
    });
    figure.addEventListener('animationend', function(e){
        if(e.animationName === 'peeker-hop') host.classList.remove('is-hopping');
    });

    // TOC rider: a little head that slides down the rail to the current section
    var toc = document.querySelector('.cs-toc');
    if(!toc) return;
    var rider = document.createElement('img');
    rider.src = 'Images/mascot/head.png';
    rider.alt = '';
    rider.className = 'toc-rider';
    toc.appendChild(rider);

    var lastTop = null, tiltTimer;
    document.addEventListener('toc:active', function(e){
        var link = e.detail;
        var top = link.offsetTop + link.offsetHeight / 2;
        if(top === lastTop) return;
        // lean the way the head is sliding, then settle
        rider.style.setProperty('--tilt', lastTop === null ? '0deg' : (top > lastTop ? '14deg' : '-14deg'));
        rider.style.setProperty('--y', top + 'px');
        rider.classList.add('is-visible', 'is-moving');
        clearTimeout(tiltTimer);
        tiltTimer = setTimeout(function(){ rider.classList.remove('is-moving'); }, 450);
        lastTop = top;
    });
})();
