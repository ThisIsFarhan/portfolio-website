function togglemenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Video Modal Functionality
function openDemoModal(videoSrc) {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.add('open');
        const video = document.getElementById('demoVideo');
        if (video && videoSrc) {
            video.src = videoSrc;
            video.play();
        }
    }
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.remove('open');
        const video = document.getElementById('demoVideo');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('demoModal');
    if (event.target == modal) {
        closeDemoModal();
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
document.addEventListener('DOMContentLoaded', function () {
    loadProjects();
    // loadCertifications();
});