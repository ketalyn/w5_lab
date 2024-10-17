// Show loading screen
const loadingScreen = document.getElementById('loading-screen');
loadingScreen.style.display = 'block'; // Show loading screen

// Hide loading screen when the page has fully loaded
window.onload = () => {
    loadingScreen.style.display = 'none'; // Hide loading screen when the page has fully loaded
};

// Your existing code
const heroSlides = document.querySelector('.hero-slides');
const imageSlides = document.querySelectorAll('.image-slide');
const productInfos = document.querySelectorAll('.product-info');
const beams = document.querySelectorAll('.beam'); // Select all beam elements
const toggleLightbulb = document.getElementById('toggle-lightbulb');
let isDown = false;
let startX;
let scrollLeft;

// Function to update product info based on the current slide
function updateProductInfo() {
    const slideWidth = imageSlides[0].offsetWidth + 10; // Adding 10px for margin-right
    const currentSlideIndex = Math.round(heroSlides.scrollLeft / slideWidth);

    // Hide all product info sections
    productInfos.forEach(info => info.classList.remove('active'));

    // Show the product info for the current slide
    if (productInfos[currentSlideIndex]) {
        productInfos[currentSlideIndex].classList.add('active');
    }
}

// Function to toggle beam visibility
function toggleBeams() {
    beams.forEach(beam => {
        // Toggle the visibility by changing the opacity
        beam.style.display = beam.style.display === 'none' ? 'block' : 'none';
    });
}

// Lightbulb click event to toggle beams
toggleLightbulb.addEventListener('click', toggleBeams);

// Mouse down event
heroSlides.addEventListener('mousedown', (e) => {
    isDown = true;
    heroSlides.classList.add('active');
    startX = e.pageX - heroSlides.offsetLeft;
    scrollLeft = heroSlides.scrollLeft;
});

// Mouse leave event
heroSlides.addEventListener('mouseleave', () => {
    isDown = false;
    heroSlides.classList.remove('active');
});

// Mouse up event
heroSlides.addEventListener('mouseup', () => {
    isDown = false;
    heroSlides.classList.remove('active');
    updateProductInfo(); // Update info after dragging
});

// Mouse move event
heroSlides.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - heroSlides.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    heroSlides.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
heroSlides.addEventListener('touchstart', (e) => {
    isDown = true;
    heroSlides.classList.add('active');
    startX = e.touches[0].pageX - heroSlides.offsetLeft;
    scrollLeft = heroSlides.scrollLeft;
});

heroSlides.addEventListener('touchend', () => {
    isDown = false;
    heroSlides.classList.remove('active');
    updateProductInfo(); // Update info after dragging
});

heroSlides.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - heroSlides.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed for touch
    heroSlides.scrollLeft = scrollLeft - walk;
});

// Scroll event to update product info dynamically
heroSlides.addEventListener('scroll', updateProductInfo);
