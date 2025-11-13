// Main initialization and search functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupThemeToggle();
    setupSearchFunctionality();
    setupSmoothScrolling();
    observeElements();
}

// Search functionality
function setupSearchFunctionality() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    
    if (!searchTerm) {
        searchResults.classList.add('hidden');
        return;
    }

    const results = [];
    
    Object.keys(searchContent).forEach(key => {
        if (key.includes(searchTerm) || searchContent[key].toLowerCase().includes(searchTerm)) {
            results.push({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                description: searchContent[key]
            });
        }
    });

    displaySearchResults(results);
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
    } else {
        searchResults.innerHTML = results.map(result => 
            `<div class="search-result-item">
                <strong>${result.title}</strong>
                <p>${result.description}</p>
            </div>`
        ).join('');
    }
    
    searchResults.classList.remove('hidden');
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Intersection observer for fade-in animation
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.card').forEach((el) => {
        observer.observe(el);
    });
}
