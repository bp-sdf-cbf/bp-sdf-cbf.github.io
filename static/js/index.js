// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');
    if (!bibtexElement) return;

    function showCopied() {
        button.classList.add('copied');
        copyText.textContent = 'Cop';
        setTimeout(function() {
            button.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    }

    navigator.clipboard.writeText(bibtexElement.textContent).then(showCopied).catch(function() {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = bibtexElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopied();
    });
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Play result videos while they are on screen, pause them otherwise
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.result-video');
    if (!('IntersectionObserver' in window) || videos.length === 0) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(function() { /* autoplay blocked; controls remain */ });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(function(video) { observer.observe(video); });
});
