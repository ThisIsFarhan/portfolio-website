function togglemenu(){
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// OptiPros Card Toggle Functionality
function toggleOptiProsCard() {
    const content = document.getElementById('optipros-content');
    const icon = document.getElementById('optipros-icon');
    const card = document.getElementById('optipros-card');

    // Toggle expanded state
    const isExpanded = content.classList.contains('expanded');

    if (isExpanded) {
        // Collapse
        content.classList.remove('expanded');
        icon.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
    } else {
        // Expand
        content.classList.add('expanded');
        icon.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
    }
}

// MedLipReader Card Toggle Functionality
function toggleMedLipCard() {
    const content = document.getElementById('medlip-content');
    const icon = document.getElementById('medlip-icon');
    const card = document.getElementById('medlip-card');

    // Toggle expanded state
    const isExpanded = content.classList.contains('expanded');

    if (isExpanded) {
        // Collapse
        content.classList.remove('expanded');
        icon.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
    } else {
        // Expand
        content.classList.add('expanded');
        icon.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
    }
}

// Add keyboard accessibility for OptiPros card
function initializeOptiProsAccessibility() {
    const cardHeader = document.querySelector('.fyp-card-header');
    if (cardHeader) {
        // Add keyboard support
        cardHeader.setAttribute('tabindex', '0');
        cardHeader.setAttribute('role', 'button');
        cardHeader.setAttribute('aria-expanded', 'false');
        cardHeader.setAttribute('aria-label', 'Toggle OptiPros project details');

        cardHeader.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleOptiProsCard();
            }
        });
    }
}

// Add keyboard accessibility for MedLipReader card
function initializeMedLipAccessibility() {
    const cardHeader = document.querySelector('.medlip-card-header');
    if (cardHeader) {
        // Add keyboard support
        cardHeader.setAttribute('tabindex', '0');
        cardHeader.setAttribute('role', 'button');
        cardHeader.setAttribute('aria-expanded', 'false');
        cardHeader.setAttribute('aria-label', 'Toggle MedLipReader project details');

        cardHeader.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMedLipCard();
            }
        });
    }
}

// // Load and display projects
// async function loadProjects() {
//     try {
//         const response = await fetch('./data/projects.json');
//         const data = await response.json();
        
//         // Create category filters
//         const categoriesContainer = document.getElementById('project-categories');
//         const categoriesHTML = data.categories.map((category, index) => `
//             <button class="category-btn ${index === 0 ? 'active' : ''}" 
//                     onclick="filterProjects('${category.name}')">
//                 ${category.name}
//             </button>
//         `).join('');
//         categoriesContainer.innerHTML = categoriesHTML;

//         // Store projects data globally
//         window.projectsData = data;
        
//         // Show first category by default
//         filterProjects(data.categories[0].name);
//     } catch (error) {
//         console.error('Error loading projects:', error);
//     }
// }

// function filterProjects(categoryName) {
//     // Update active category button
//     document.querySelectorAll('.category-btn').forEach(btn => {
//         btn.classList.toggle('active', btn.textContent.trim() === categoryName);
//     });

//     // Find selected category
//     const category = window.projectsData.categories.find(c => c.name === categoryName);
//     if (!category) return;

//     // Display projects
//     const projectsGrid = document.getElementById('projects-grid');
//     const projectsHTML = category.projects.map(project => `
//         <div class="project-card">
//             <img src="${project.image}" alt="${project.title}">
//             <h3>${project.title}</h3>
//             <p>${project.description}</p>
//             <div class="project-links">
//                 ${project.link ? 
//                     `<a href="${project.link}" target="_blank">Details</a>` :
//                     `<a href="${project.links.github}" target="_blank">GitHub</a>
//                      <a href="${project.links.article}" target="_blank">Article</a>`
//                 }
//             </div>
//         </div>
//     `).join('');
//     projectsGrid.innerHTML = projectsHTML;
// }

// Load and display projects
async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        
        // Create category filters
        const categoriesContainer = document.getElementById('project-categories');
        const categoriesHTML = data.categories.map((category, index) => `
            <button class="category-btn ${index === 0 ? 'active' : ''}" 
                    onclick="filterProjects('${category.name}')">
                ${category.name}
            </button>
        `).join('');
        categoriesContainer.innerHTML = categoriesHTML;

        // Store projects data globally
        window.projectsData = data;
        
        // Show first category by default
        filterProjects(data.categories[0].name);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function filterProjects(categoryName) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === categoryName);
    });

    // Find selected category
    const category = window.projectsData.categories.find(c => c.name === categoryName);
    if (!category) return;

    // Display projects
    const projectsGrid = document.getElementById('projects-grid');
    const projectsHTML = category.projects.map(project => {
        // Generate dynamic links
        const linksHTML = project.links ? 
            Object.entries(project.links).map(([key, url]) => 
                `<a href="${url}" target="_blank">${key.charAt(0).toUpperCase() + key.slice(1)}</a>`
            ).join(' ') 
            : '';

        return `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    ${project.link ? `<a href="${project.link}" target="_blank">Details</a>` : linksHTML}
                </div>
            </div>
        `;
    }).join('');
    projectsGrid.innerHTML = projectsHTML;
}


// Load and display certifications
async function loadCertifications() {
    try {
        const response = await fetch('./data/certifications.json');
        const data = await response.json();
        
        const certificationsContainer = document.getElementById('certifications-grid');
        const certificationsHTML = data.certifications.map(cert => `
            <div class="certification-card">
                <h3>${cert.title}</h3>
                <p class="cert-issuer">${cert.issuer}</p>
                <p class="cert-platform">${cert.platform}</p>
                <p class="cert-date">${cert.date}</p>
                <a href="${cert.link}" target="_blank" class="cert-link">View Certificate</a>
            </div>
        `).join('');
        certificationsContainer.innerHTML = certificationsHTML;
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadCertifications();
    initializeOptiProsAccessibility();
    initializeMedLipAccessibility();
});