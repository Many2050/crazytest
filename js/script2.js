function toggleOverlay(button, effect) {
    const overlay = document.querySelector('.' + effect);
    if (overlay) {
        overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none';
    }
}