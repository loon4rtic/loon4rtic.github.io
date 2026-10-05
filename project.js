// Highlights the table-of-contents link for whichever case-study
// section is currently in view.
(function(){
    var links = document.querySelectorAll('.cs-toc a');
    if(!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    links.forEach(function(link){
        byId[link.getAttribute('href').slice(1)] = link;
    });

    var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(!entry.isIntersecting) return;
            links.forEach(function(l){ l.classList.remove('active'); });
            var link = byId[entry.target.id];
            if(link) link.classList.add('active');
        });
    }, { rootMargin: '-30% 0px -60% 0px' });

    document.querySelectorAll('.cs-section[id]').forEach(function(section){
        observer.observe(section);
    });
})();
