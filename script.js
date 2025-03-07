// Store progress data in localStorage
let progress = JSON.parse(localStorage.getItem('visualStoryProgress')) || {
    viewedItems: [],
    completedPercentage: 0
};

// Sample data for the grid
const gridItems = [
    {
        id: 1,
        imageUrl: 'public/image1.jpg',
        images: ['public/image1big.jpg', 'public/image1bigA.jpg', 'public/image1bigB.jpg'],
        storyText: 'text here...'
    },
    {
        id: 2,
        imageUrl: 'public/image2.jpg',
        images: ['public/image2big.jpg',],
        storyText: 'text here...'
    },
    {
        id: 3,
        imageUrl: 'public/image3.jpg',
        images: ['public/image3big.jpg', 'public/image3bigA.jpg', 'public/image3bigB.jpg', 'public/image3bigC.jpg', 'public/image3bigD.jpg', 'public/image3bigE.jpg',],
        storyText: 'text here...'
    },
    {
        id: 4,
        imageUrl: 'public/image4.jpg',
        images: ['public/image4big.jpg', 'public/image4bigA.jpg'],
        storyText: 'text here...'
    },
    {
        id: 5,
        imageUrl: 'public/image5.jpg',
        images: ['public/image5big.jpg', 'public/image5bigA.jpg', 'public/image5bigB.jpg'],
        storyText: 'text here...'
    },
    {
        id: 6,
        imageUrl: 'public/image6.jpg',
        images: ['public/image6big.jpg', 'public/image6bigA.jpg', 'public/image6bigB.jpg'],
        storyText: 'text here...'
    },
    { id: 7, imageUrl: 'public/image7.jpg', storyText: 'text here...' },
    { id: 8, imageUrl: 'public/image8.jpg', storyText: 'text here...' },
    { id: 9, imageUrl: 'public/image9.jpg', storyText: '"text here...' },
    { id: 10, imageUrl: 'public/image10.jpg', storyText: 'text here...' },
    { id: 11, imageUrl: 'public/image11.jpg', fullSizeUrl: 'text here...' },
    { id: 12, imageUrl: 'public/image12.jpg', storyText: 'text here...' },
    { id: 13, imageUrl: 'public/image13.jpg', storyText: 'text here...' },
    { id: 14, imageUrl: 'public/image14.jpg', images: ['public/image14big.gif'], storyText: 'text here...' },
    { 
        id: 15, 
        imageUrl: 'public/image15.jpg', 
        images: ['public/image15big.jpg'], // Optional - can add multiple images here if you want them to show after text
        storyText: 'text here...' 
    },
    { id: 16, imageUrl: 'public/image16.jpg', storyText: 'text here...' },
    { id: 17, imageUrl: 'public/image17.jpg', storyText: 'text here...' },
    { id: 18, imageUrl: 'public/image18.jpg', storyText: 'text here...' },
    { id: 19, imageUrl: 'public/image19.jpg', storyText: 'text here...' },
    { id: 20, imageUrl: 'public/image20.jpg', storyText: 'text here...' },
    {
        id: 21, imageUrl: 'public/image21.jpg', images: ['public/image21big.jpg', 'public/image21bigA.jpg', 'public/image21bigB.jpg', 'public/image21bigC.jpg', 'public/image21bigD.jpg', 'public/image21bigE.jpg',],
        storyText: 'text here... '
    },
    { id: 22, imageUrl: 'public/image22.jpg', videoUrl: 'public/grida3opet.mp4', images: ['public/image22big.jpg'], storyText: 'text here...' },

    { id: 23, imageUrl: 'public/image23.jpg', fullSizeUrl: 'public/image23big.gif', storyText: 'text here...' },
    // images: ['public/image23big.gif'],
    { id: 24, imageUrl: 'public/image24.jpg', images: ['public/image24big.jpg', 'public/image24big2.jpg', 'public/image24bigD.jpg'], videoUrl: 'public/image24.mp4', storyText: 'text here...' }
];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function generateRandomActiveItems() {
    // Always include the first item (index 0)
    const firstItem = gridItems[0];

    // Always include the last item (index 23)
    const lastItem = gridItems[23];

    // Slice the items to generate the middle indices.
    const otherItems = gridItems.slice(1, 23);

    // Get 4 random items from the other items
    const randomOtherItems = [];
    const tempItems = [...otherItems];
    while (randomOtherItems.length < 4 && tempItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * tempItems.length);
        randomOtherItems.push(tempItems[randomIndex]);
        tempItems.splice(randomIndex, 1);
    }

    // Return array with first item, random items and last Item

    return [firstItem, ...randomOtherItems, lastItem];
}

function initializeGrid() {
    const grid = document.getElementById('imageGrid');
    grid.innerHTML = '';

    // Get the first item + 5 random others
    const activeItems = generateRandomActiveItems();

    // Fill the grid with all 24 cells
    for (let i = 0; i < 24; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const img = document.createElement('img');

        // Find corresponding item in gridItems array
        const item = gridItems[i];

        // Check if the item is one of the activeItems
        const isActive = activeItems.includes(item);

        if (isActive) {
            img.src = item.imageUrl;
            cell.dataset.id = item.id;
            cell.dataset.storyText = item.storyText;

            // Handle special items (animations/videos)
            if (item.fullSizeUrl) {
                cell.dataset.fullSizeUrl = item.fullSizeUrl;
            }
            if (item.videoUrl) {
                cell.dataset.videoUrl = item.videoUrl;
            }

            cell.addEventListener('click', () => openModal(item));
            cell.classList.remove('inactive'); // Ensure it's not inactive

        } else {
            // For inactive cells, use their proper image but apply filter
            img.src = item.imageUrl;
            img.style.filter = 'brightness(0.5) grayscale(0.7)';
            cell.classList.add('inactive'); // Ensure it's inactive
            cell.removeEventListener('click', () => openModal(item)); // Remove event listener on inactive item
        }

        cell.appendChild(img);
        grid.appendChild(cell);
    }

    updateProgressBar();
}

// Slideshow variables
let currentSlide = 0;
let currentSlideImages = [];

// Function to navigate to a specific slide
function goToSlide(index) {
    currentSlide = index;
    updateSlideshow();
}

// Next slide function
function nextSlide() {
    currentSlide = (currentSlide + 1) % currentSlideImages.length;
    updateSlideshow();
}

// Previous slide function
function prevSlide() {
    currentSlide = (currentSlide - 1 + currentSlideImages.length) % currentSlideImages.length;
    updateSlideshow();
}

// Update the slideshow display
function updateSlideshow() {
    const slideshowContainer = document.getElementById('slideshow-images');
    const slideDots = document.getElementById('slide-dots');

    // Update the content (image or video)
    if (currentSlideImages.length > 0) {
        const currentContent = currentSlideImages[currentSlide];

        // Check if it's a video (ends with .mp4) or an image
        if (typeof currentContent === 'string' && currentContent.endsWith('.mp4')) {
            slideshowContainer.innerHTML = `
                <video controls autoplay style="width: 100%; max-height: 500px;" controlsList="nodownload">
                    <source src="${currentContent}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            // It's an image
            slideshowContainer.innerHTML = `<img src="${currentContent}" alt="Slide image ${currentSlide + 1}">`;
        }

        // Update dots
        const dots = slideDots.querySelectorAll('.slide-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Open modal with item details
function openModal(item) {
    const modal = document.getElementById('modal');
    const storyText = document.getElementById('storyText');
    const slideshowImages = document.getElementById('slideshow-images');
    const slideDots = document.getElementById('slide-dots');

    modal.classList.add('active');

    // Reset current slide
    currentSlide = 0;

    // Determine which images to use
    // Special case for item 24 - images first, then video
    if (item.id === 24) {
        // Start with fullSizeUrl image
        slideshowImages.innerHTML = `<img src="${item.images[0]}" alt="First slide image">`;

        // Create an array with all images and then the video
        currentSlideImages = [...item.images];
        currentSlideImages.push(item.videoUrl); // Add video as last item

        // Show navigation
        document.querySelector('.slideshow-navigation').style.display = 'flex';

        // Create navigation dots
        slideDots.innerHTML = '';
        currentSlideImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slide-dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = () => goToSlide(index);
            slideDots.appendChild(dot);
        });
    }
    // Normal video item with potential slideshow after
    else if (item.videoUrl) {
        slideshowImages.innerHTML = `
            <video id="modalVideo" controls style="width: 100%; max-height: 500px;" controlsList="nodownload">
                <source src="${item.videoUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;

        // Check if there are also images for slideshow after video
        if (item.images && item.images.length > 0) {
            currentSlideImages = item.images;
            document.querySelector('.slideshow-navigation').style.display = 'none'; // Hide initially

            // Add event listener to show slideshow after video ends
            const videoElement = document.getElementById('modalVideo');
            videoElement.addEventListener('ended', function() {
                // Hide video and show first image from slideshow
                videoElement.style.display = 'none';
                slideshowImages.innerHTML = `<img src="${currentSlideImages[0]}" alt="Slide image 1">`;

                // Update slideshow navigation
                const slideDots = document.getElementById('slide-dots');
                slideDots.innerHTML = '';
                currentSlideImages.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = `slide-dot ${index === 0 ? 'active' : ''}`;
                    dot.onclick = () => goToSlide(index);
                    slideDots.appendChild(dot);
                });

                // Reset current slide and show navigation
                currentSlide = 0;
                document.querySelector('.slideshow-navigation').style.display = currentSlideImages.length > 1 ? 'flex' : 'none';
            });
        } else {
            currentSlideImages = []; // No slideshow for videos without images
            document.querySelector('.slideshow-navigation').style.display = 'none';
        }
    } else if (item.fullSizeUrl && item.videos) {
        // Image with videos to follow sequence
        slideshowImages.innerHTML = `<img src="${item.fullSizeUrl}" alt="Full size image" id="initialImage">`;

        // Create an array of content for sequential display
        currentSlideImages = [item.fullSizeUrl]; // First is the image

        // Add videos to sequence
        item.videos.forEach(videoUrl => {
            currentSlideImages.push(videoUrl);
        });

        // Show navigation if we have more than one item
        document.querySelector('.slideshow-navigation').style.display = currentSlideImages.length > 1 ? 'flex' : 'none';

        // Create dots for the image and each video
        slideDots.innerHTML = '';
        currentSlideImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slide-dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = () => goToSlide(index);
            slideDots.appendChild(dot);
        });
    } else if (item.fullSizeUrl) {
        // Animation item
        slideshowImages.innerHTML = `<img src="${item.fullSizeUrl}" alt="Full size animation">`;
        currentSlideImages = [item.fullSizeUrl];
        document.querySelector('.slideshow-navigation').style.display = currentSlideImages.length > 1 ? 'flex' : 'none';
    } else if (item.id === 15) {
        // Special case for item 15 - text-focused with no initial image
        slideshowImages.innerHTML = `<div style="height: 200px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #ddd; font-style: italic;">Text-focused item</div>`;
        currentSlideImages = []; // No slideshow initially
        
        // If we have images, add them as additional slides that can be shown after the text
        if (item.images && item.images.length > 0) {
            currentSlideImages = [...item.images];
            
            // Create dots for slideshow navigation
            slideDots.innerHTML = '';
            currentSlideImages.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = `slide-dot ${index === 0 ? 'active' : ''}`;
                dot.onclick = () => {
                    // When clicking a dot, replace text with an image
                    slideshowImages.innerHTML = `<img src="${currentSlideImages[index]}" alt="Slide image ${index + 1}">`;
                    currentSlide = index;
                    updateSlideshow();
                };
                slideDots.appendChild(dot);
            });
            
            document.querySelector('.slideshow-navigation').style.display = 'flex';
        } else {
            document.querySelector('.slideshow-navigation').style.display = 'none';
        }
    } else if (item.images && item.images.length > 0) {
        // Item with multiple images
        currentSlideImages = [...item.images]; // Use direct array instead of transforming
        slideshowImages.innerHTML = `<img src="${currentSlideImages[0]}" alt="Slide image 1">`;

        // Create dots for slideshow navigation
        slideDots.innerHTML = '';
        currentSlideImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slide-dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = () => goToSlide(index);
            slideDots.appendChild(dot);
        });

        document.querySelector('.slideshow-navigation').style.display = currentSlideImages.length > 1 ? 'flex' : 'none';
    } else {
        // Fall back to single image
        const bigImageUrl = item.imageUrl.replace('.jpg', 'big.jpg');
        slideshowImages.innerHTML = `<img src="${bigImageUrl}" alt="Story image">`;
        currentSlideImages = [bigImageUrl];
        document.querySelector('.slideshow-navigation').style.display = 'none';
    }

    // Create dots for slideshow navigation
    slideDots.innerHTML = '';
    if (currentSlideImages.length > 1) {
        currentSlideImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slide-dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = () => goToSlide(index);
            slideDots.appendChild(dot);
        });
    }

    // Set the story text
    storyText.innerHTML = item.storyText;

    // Add special styling for item 15
    if (item.id === 15) {
        storyText.classList.add('maya-font');
        document.querySelector('.modal-content').classList.add('text-centered');
    } else {
        storyText.classList.remove('maya-font');
        document.querySelector('.modal-content').classList.remove('text-centered');
    }

    // Update progress if this is a new item
    if (!progress.viewedItems.includes(item.id)) {
        progress.viewedItems.push(item.id);
        saveProgress();
    }
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Show all items in the grid (for testing)
function showAll() {
    const grid = document.getElementById('imageGrid');
    grid.innerHTML = '';

    gridItems.forEach(item => {
        const cell = document.createElement('div');
        cell.className = 'cell';

        const img = document.createElement('img');
        img.src = item.imageUrl;

        cell.dataset.id = item.id;
        cell.addEventListener('click', () => openModal(item));

        cell.appendChild(img);
        grid.appendChild(cell);
    });
}

// Regenerate the active items
function regenerateActive() {
    initializeGrid();
}

// Update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const totalItems = gridItems.length;
    const viewedItems = progress.viewedItems.length;

    const percentage = Math.min(100, Math.round((viewedItems / totalItems) * 100));
    progressBar.style.width = percentage + '%';

    progress.completedPercentage = percentage;
    saveProgress();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('visualStoryProgress', JSON.stringify(progress));
}

// Clear progress (for testing)
document.getElementById('clear-progress-button').addEventListener('click', function() {
    localStorage.removeItem('visualStoryProgress');
    progress = { viewedItems: [], completedPercentage: 0 };
    initializeGrid();
});

// Toggle display of source code
function toggleSource() {
    const sourceModal = document.getElementById('sourceModal');
    const sourceCode = document.getElementById('sourceCode');

    if (!sourceModal.classList.contains('active')) {
        // Fetch the source code when opening
        Promise.all([
            fetch('script.js').then(response => response.text()),
            fetch('style.css').then(response => response.text()),
            fetch('index.html').then(response => response.text())
        ]).then(([js, css, html]) => {
            sourceCode.textContent = 'JavaScript:\n\n' + js + '\n\nCSS:\n\n' + css + '\n\nHTML:\n\n' + html;
        });
    }

    sourceModal.classList.toggle('active');
}

// Download the project from GitHub
function downloadFromGitHub() {
    window.open('https://github.com/yourusername/visual-bio-story/archive/refs/heads/main.zip', '_blank');
}

// Initialize the grid when the page loads
window.onload = function() {
    initializeGrid();
};

// Expose functions to global scope for HTML buttons
window.closeModal = closeModal;
window.showAll = showAll;
window.regenerateActive = regenerateActive;
window.toggleSource = toggleSource;
window.downloadFromGitHub = downloadFromGitHub;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;
