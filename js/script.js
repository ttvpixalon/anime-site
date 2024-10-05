document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tab switching logic
    const tabs = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and hide all content
            tabs.forEach(item => item.classList.remove("active"));
            contents.forEach(content => content.style.display = "none");

            // Add active class to the clicked tab and show the corresponding content
            tab.classList.add("active");
            const activeContent = document.getElementById(tab.getAttribute("data-tab"));
            activeContent.style.display = "block";
        });
    });

    // Episode pagination logic
    const episodesPerPage = 20;
    const totalEpisodes = 220; // Assume Naruto has 220 episodes, you can make this dynamic
    let currentPage = 1;

    const renderEpisodes = (page) => {
        const start = (page - 1) * episodesPerPage + 1;
        const end = Math.min(start + episodesPerPage - 1, totalEpisodes);

        const episodeList = document.getElementById("episode-list");
        episodeList.innerHTML = "";

        for (let i = start; i <= end; i++) {
            const episodeItem = document.createElement("div");
            episodeItem.classList.add("episode-item");
            episodeItem.innerText = `Episode ${i}`;
            episodeItem.addEventListener("click", () => {
                window.location.href = `watch.html?id=${i}`;
            });
            episodeList.appendChild(episodeItem);
        }

        renderPagination(page);
    };

    const renderPagination = (currentPage) => {
        const totalPages = Math.ceil(totalEpisodes / episodesPerPage);
        const paginationControls = document.getElementById("episode-pagination");
        paginationControls.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.classList.add("pagination-button");
            button.innerText = i;

            if (i === currentPage) {
                button.disabled = true;
                button.style.background = "#ff6347";
            }

            button.addEventListener("click", () => {
                renderEpisodes(i);
            });

            paginationControls.appendChild(button);
        }
    };

    // Initialize with the first page of episodes
    renderEpisodes(currentPage);

    // Share Anime Functionality
    window.shareAnime = function(animeName) {
        alert(`Share ${animeName} on social media!`);
        // Real-world scenario: integrate with a sharing API or custom share function
    };
});
