// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll animations
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Form submission
async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Summoning...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            submitBtn.textContent = 'Message Sent to the Realm!';
            submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            event.target.reset();
        } else {
            alert("Something went wrong! Please try again.");
            submitBtn.textContent = originalText;
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Message not sent.");
        submitBtn.textContent = originalText;
    } finally {
        submitBtn.disabled = false;
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(45deg, #b82e24, #ff4500)';
        }, 3000);
    }
}

// Glitch effect for hero title
function addGlitchEffect() {
    const title = document.querySelector('.hero-content h1');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.1) {
                title.style.textShadow = '2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff';
                title.style.transform = 'translate(2px, 1px)';
                setTimeout(() => {
                    title.style.textShadow = '0 0 20px rgba(184, 46, 36, 0.5)';
                    title.style.transform = 'translate(0, 0)';
                }, 100);
            }
        }, 3000);
    }
}

// Initialize animations and effects
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    handleScroll();
    addGlitchEffect();
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic particle generation
function createParticles() {
    const hero = document.querySelector('.hero');
    if (hero) {
        setInterval(() => {
            if (document.querySelectorAll('.particle').length < 10) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                hero.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 6000);
            }
        }, 2000);
    }
}

// Initialize particle system
createParticles();

// Add typing effect to tagline
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const tagline = document.querySelector('.hero-content .tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        setTimeout(() => {
            typeWriter(tagline, originalText, 80);
        }, 1000);
    }
});

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add some interactive hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ember effect to hero
function createEmber() {
    const hero = document.querySelector('.hero');
    const ember = document.createElement('div');
    ember.style.position = 'absolute';
    ember.style.width = '3px';
    ember.style.height = '3px';
    ember.style.background = 'linear-gradient(45deg, #ff4500, #ffa500)';
    ember.style.borderRadius = '50%';
    ember.style.left = Math.random() * 100 + '%';
    ember.style.top = '100%';
    ember.style.opacity = '0.8';
    ember.style.pointerEvents = 'none';
    ember.style.animation = 'ember-rise 8s linear forwards';

    hero.appendChild(ember);

    setTimeout(() => {
        ember.remove();
    }, 8000);
}

// Add ember animation to CSS
const emberStyle = document.createElement('style');
emberStyle.textContent = `
    @keyframes ember-rise {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-50vh) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
        }
    }
`;
document.head.appendChild(emberStyle);

// Generate embers periodically
setInterval(createEmber, 3000);

// Portfolio Filter Functionality
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Toggle active class
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Gallery data for different categories
const galleryData = {
    conceptual: {
        title: "Dark Conceptual",
        subtitle: "Exploring the depths of imagination",
        images: [
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/b82e24?text=Shadow+Portrait",
                title: "Shadow Portrait",
                description: "A study in light and darkness"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/b82e24?text=Abstract+Emotions",
                title: "Abstract Emotions",
                description: "Capturing the unseen feelings"
            },
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/ff4500?text=Dark+Reflections",
                title: "Dark Reflections",
                description: "Mirror of the soul"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/ff4500?text=Conceptual+Art",
                title: "Conceptual Art",
                description: "Beyond reality"
            },
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/b82e24?text=Mysterious+Forms",
                title: "Mysterious Forms",
                description: "Shapes in the void"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/b82e24?text=Ethereal+Shadows",
                title: "Ethereal Shadows",
                description: "Dancing with darkness"
            }
        ]
    },
    portrait: {
        title: "Portrait Series",
        subtitle: "Capturing souls through the lens",
        images: [
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/b82e24?text=Dramatic+Portrait",
                title: "Dramatic Portrait",
                description: "Classic portrait with modern twist"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/b82e24?text=Urban+Soul",
                title: "Urban Soul",
                description: "City lights and human essence"
            },
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/ff4500?text=Emotional+Depth",
                title: "Emotional Depth",
                description: "Raw human emotion captured"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/ff4500?text=Character+Study",
                title: "Character Study",
                description: "Exploring personality through photography"
            }
        ]
    },
    cinematic: {
        title: "Cinematic Moments",
        subtitle: "Frames that tell stories",
        images: [
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/b82e24?text=Movie+Scene",
                title: "Movie Scene",
                description: "Cinematic storytelling"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/b82e24?text=Film+Noir",
                title: "Film Noir",
                description: "Classic noir aesthetics"
            },
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/ff4500?text=Action+Shot",
                title: "Action Shot",
                description: "Capturing motion and energy"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/ff4500?text=Dramatic+Lighting",
                title: "Dramatic Lighting",
                description: "Play of light and shadow"
            },
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/b82e24?text=Cinematic+Mood",
                title: "Cinematic Mood",
                description: "Atmospheric storytelling"
            }
        ]
    },
    fantasy: {
        title: "Fantasy & Mystical",
        subtitle: "Where dreams meet reality",
        images: [
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/b82e24?text=Warrior+Spirit",
                title: "Warrior Spirit",
                description: "Epic fantasy character"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/b82e24?text=Mystical+Realm",
                title: "Mystical Realm",
                description: "Otherworldly landscapes"
            },
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/ff4500?text=Fire+Magic",
                title: "Fire Magic",
                description: "Elemental power visualization"
            },
            {
                src: "https://via.placeholder.com/400x300/2a2a2a/ff4500?text=Fantasy+Portrait",
                title: "Fantasy Portrait",
                description: "Mythical being comes to life"
            },
            {
                src: "https://via.placeholder.com/400x300/1a1a1a/b82e24?text=Ethereal+Beauty",
                title: "Ethereal Beauty",
                description: "Supernatural elegance"
            }
        ]
    }
};

// Mapping for home portfolio items to gallery categories
const homePortfolioMapping = {
    "Dark Conceptual": "conceptual",
    "Portrait Series": "portrait", 
    "Ethereal Imagery": "fantasy",
    "Cinematic Moments": "cinematic",
    "Warrior & Fantasy": "fantasy",
    "Shadows & Silence": "conceptual"
};

let currentImages = [];
let currentImageIndex = 0;

// Function to open gallery popup
function openGallery(category) {
    const popup = document.getElementById('galleryPopup');
    const title = document.getElementById('galleryTitle');
    const subtitle = document.getElementById('gallerySubtitle');
    const grid = document.getElementById('galleryGrid');

    // Get gallery data for the category
    const data = galleryData[category];
    if (!data) return;

    // Set title and subtitle
    title.textContent = data.title;
    subtitle.textContent = data.subtitle;

    // Clear existing gallery items
    grid.innerHTML = '';

    // Populate gallery with images
    data.images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <div class="gallery-item-title">${image.title}</div>
                <div class="gallery-item-desc">${image.description}</div>
            </div>
        `;

        // Add click event to open fullscreen
        item.addEventListener('click', () => {
            openFullscreen(data.images, index);
        });

        grid.appendChild(item);
    });

    // Show popup
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Function to close gallery popup
function closeGallery() {
    const popup = document.getElementById('galleryPopup');
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Function to open fullscreen image viewer
function openFullscreen(images, index) {
    currentImages = images;
    currentImageIndex = index;

    const fullscreen = document.getElementById('fullscreenViewer');
    const image = document.getElementById('fullscreenImage');

    image.src = images[index].src;
    image.alt = images[index].title;

    fullscreen.classList.add('active');
}

// Function to close fullscreen viewer
function closeFullscreen() {
    const fullscreen = document.getElementById('fullscreenViewer');
    fullscreen.classList.remove('active');
}

// Function to navigate through images in fullscreen
function navigateImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    } else if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }

    const image = document.getElementById('fullscreenImage');
    image.src = currentImages[currentImageIndex].src;
    image.alt = currentImages[currentImageIndex].title;
}

// Initialize portfolio item click handlers for both home and portfolio pages
function initializePortfolioHandlers() {
    // Handle portfolio page items (existing functionality)
    document.querySelectorAll('#portfolio .portfolio-item').forEach(item => {
        item.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            if (category && galleryData[category]) {
                openGallery(category);
            } else {
                // Fallback for items without specific category
                const title = this.getAttribute('data-title');
                alert(`${title} - Gallery coming soon!`);
            }
        });
    });

    // Handle home page portfolio items (NEW functionality)
    document.querySelectorAll('#home .portfolio-item').forEach(item => {
        item.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            const category = homePortfolioMapping[title];
            
            if (category && galleryData[category]) {
                openGallery(category);
            } else {
                // Fallback for unmapped items
                alert(`${title} - Gallery coming soon!`);
            }
        });
    });
}

// Initialize portfolio handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolioHandlers);

// Also initialize when page loads (fallback)
window.addEventListener('load', initializePortfolioHandlers);

// Close popup when clicking outside
document.getElementById('galleryPopup').addEventListener('click', function (e) {
    if (e.target === this) {
        closeGallery();
    }
});

// Close fullscreen when clicking outside
document.getElementById('fullscreenViewer').addEventListener('click', function (e) {
    if (e.target === this) {
        closeFullscreen();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    const popup = document.getElementById('galleryPopup');
    const fullscreen = document.getElementById('fullscreenViewer');

    if (popup.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeGallery();
        }
    }

    if (fullscreen.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeFullscreen();
        } else if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        }
    }
});
