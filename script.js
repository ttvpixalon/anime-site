document.addEventListener('DOMContentLoaded', () => {
    // Modal Functionality for Video Playback (Optional Extension)
    const watchButtons = document.querySelectorAll('.watch-link');
    const modal = document.querySelector('.video-modal');
    const closeModal = document.querySelector('.close-modal');

    watchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
