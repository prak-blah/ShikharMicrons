// Hero Carousel Initialization

document.addEventListener('DOMContentLoaded', function() {
    var heroCarousel = document.querySelector('#heroCarousel');
    if (heroCarousel && typeof bootstrap !== 'undefined') {
        var carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 4000,
            ride: 'carousel',
            wrap: true
        });
    }
});

// Updated Independent Caption Carousel Logic for captions below dots

document.addEventListener('DOMContentLoaded', function() {
    var heroCarousel = document.querySelector('#heroCarousel');
    if (!heroCarousel) return;

    var captionWrapper = heroCarousel.querySelector('.carousel-captions-wrapper');
    var captionBlocks = captionWrapper ? captionWrapper.querySelectorAll('.carousel-caption') : [];
    var CAPTION_INTERVAL = 2000; // ms
    var currentCaptionInterval = null;
    var currentCaptionBlock = null;
    var currentCaptionIdx = 0;
    var currentItemIdx = 0;

    function showCaption(block, idx) {
        var captions = Array.from(block.querySelectorAll('.caption-content'));
        captions.forEach(function(c, i) {
            if (i === idx) {
                c.style.opacity = 0;
                c.style.display = '';
                setTimeout(function() {
                    c.style.transition = 'opacity 0.5s';
                    c.style.opacity = 1;
                }, 10);
            } else {
                c.style.transition = 'opacity 0.5s';
                c.style.opacity = 0;
                setTimeout(function() {
                    c.style.display = 'none';
                }, 500);
            }
        });
    }

    function showOnlyActiveCaptionBlock(idx) {
        captionBlocks.forEach(function(block, i) {
            if (i === idx) {
                block.classList.add('active-caption');
            } else {
                block.classList.remove('active-caption');
            }
        });
    }

    function startCaptionCarousel(idx) {
        if (currentCaptionInterval) clearInterval(currentCaptionInterval);
        currentItemIdx = idx;
        currentCaptionBlock = captionBlocks[idx];
        if (!currentCaptionBlock) return;
        var captions = Array.from(currentCaptionBlock.querySelectorAll('.caption-content'));
        currentCaptionIdx = 0;
        showCaption(currentCaptionBlock, currentCaptionIdx);
        if (captions.length < 2) return;
        currentCaptionInterval = setInterval(function() {
            var nextIdx = (currentCaptionIdx + 1) % captions.length;
            showCaption(currentCaptionBlock, nextIdx);
            currentCaptionIdx = nextIdx;
        }, CAPTION_INTERVAL);
    }

    function stopCaptionCarousel() {
        if (currentCaptionInterval) clearInterval(currentCaptionInterval);
        currentCaptionInterval = null;
    }

    // Listen for carousel slide events
    heroCarousel.addEventListener('slid.bs.carousel', function(e) {
        var activeIdx = Array.from(heroCarousel.querySelectorAll('.carousel-item')).findIndex(function(item) {
            return item.classList.contains('active');
        });
        showOnlyActiveCaptionBlock(activeIdx);
        startCaptionCarousel(activeIdx);
    });

    // Start for the first item
    showOnlyActiveCaptionBlock(0);
    startCaptionCarousel(0);

    // Stop on page unload
    window.addEventListener('beforeunload', stopCaptionCarousel);
}); 