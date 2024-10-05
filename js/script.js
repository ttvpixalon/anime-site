document.addEventListener('DOMContentLoaded', () => {
    console.log("Document fully loaded");

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        console.log("Scroll event triggered");
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tab Switching Logic
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            console.log(`Tab ${tab.getAttribute("data-tab")} clicked`);
            tabs.forEach(item => item.classList.remove("active"));
            contents.forEach(content => content.style.display = "none");

            tab.classList.add("active");
            const activeContent = document.getElementById(tab.getAttribute("data-tab"));
            if (activeContent) {
                activeContent.style.display = "block";
            }
        });
    });

    // Custom Video Player Controls
    const video = document.getElementById('anime-video');
    const playPauseButton = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const volumeSlider = document.getElementById('volume-slider');
    const fullscreenButton = document.getElementById('fullscreen');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');
    const videoControls = document.querySelector('.video-controls');

    if (video && playPauseButton && progressBar && volumeSlider && fullscreenButton && currentTimeDisplay && totalTimeDisplay) {
        console.log("Video player elements found, initializing event listeners");

        // Play/Pause Button Functionality
        playPauseButton.addEventListener('click', () => {
            console.log("Play/Pause button clicked");
            if (video.paused || video.ended) {
                video.play();
                playPauseButton.textContent = '⏸️'; // Change to Pause icon
            } else {
                video.pause();
                playPauseButton.textContent = '▶️'; // Change to Play icon
            }
        });

        // Update Progress Bar
        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const value = (100 / video.duration) * video.currentTime;
                progressBar.value = value;
                currentTimeDisplay.textContent = formatTime(video.currentTime);
                totalTimeDisplay.textContent = formatTime(video.duration);
                console.log("Progress bar updated");
            }
        });

        // Seek Video using Progress Bar
        progressBar.addEventListener('input', () => {
            console.log("Progress bar changed");
            const time = video.duration * (progressBar.value / 100);
            video.currentTime = time;
        });

        // Volume Control
        volumeSlider.addEventListener('input', () => {
            console.log("Volume changed");
            video.volume = volumeSlider.value;
        });

        // Fullscreen Toggle
        fullscreenButton.addEventListener('click', () => {
            console.log("Fullscreen button clicked");
            if (!document.fullscreenElement) {
                video.requestFullscreen().catch(err => {
                    console.error(`Failed to enter fullscreen mode: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });

        // Format Time for Display (MM:SS)
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        };

        // Update total time when metadata is loaded
        video.addEventListener('loadedmetadata', () => {
            totalTimeDisplay.textContent = formatTime(video.duration);
            console.log("Loaded metadata, duration set");
        });

        // Auto-hide Video Controls
        let controlsTimeout;
        video.addEventListener('mousemove', () => {
            videoControls.style.opacity = '1';
            clearTimeout(controlsTimeout);
            controlsTimeout = setTimeout(() => {
                videoControls.style.opacity = '0';
            }, 3000);
        });

        // Show controls when video is paused
        video.addEventListener('pause', () => {
            videoControls.style.opacity = '1';
        });

    } else {
        console.error("One or more video player elements not found!");
    }

    // Like and Dislike Button Interactivity
    const likeButton = document.querySelector('.like-button');
    const dislikeButton = document.querySelector('.dislike-button');

    if (likeButton && dislikeButton) {
        console.log("Like and Dislike buttons found, initializing event listeners");
        likeButton.addEventListener('click', () => {
            console.log("Like button clicked");
            likeButton.classList.toggle('liked');
            dislikeButton.classList.remove('disliked');
        });

        dislikeButton.addEventListener('click', () => {
            console.log("Dislike button clicked");
            dislikeButton.classList.toggle('disliked');
            likeButton.classList.remove('liked');
        });
    } else {
        console.error("Like and Dislike buttons not found!");
    }

    // Comments Section: Adding Comments
    const commentButton = document.querySelector(".comment-button");
    const commentInput = document.querySelector(".comment-input");
    const commentsList = document.querySelector(".comments-list");

    if (commentButton && commentInput && commentsList) {
        console.log("Comments section found, initializing event listener");
        commentButton.addEventListener("click", () => {
            const commentText = commentInput.value.trim();
            if (commentText !== "") {
                console.log("Adding comment");
                const commentItem = document.createElement("div");
                commentItem.classList.add("comment-item");
                commentItem.innerHTML = `<strong>You:</strong> ${commentText}`;
                commentsList.appendChild(commentItem);
                commentInput.value = "";
            }
        });
    } else {
        console.error("Comment section elements not found!");
    }

    // Social Media Sharing Buttons
    const shareButtons = document.querySelectorAll('.social-share-button');

    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const animeName = document.querySelector('.video-details h1').innerText;
            alert(`Share ${animeName} on ${button.textContent.split(' ')[2]}!`);
            console.log(`Share button clicked for ${button.textContent}`);
        });
    });
});
