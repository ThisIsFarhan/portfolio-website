function togglemenu(){
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open')
}


document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project-card");
    let currentIndex = 0;

    function showProject(index) {
        projects.forEach((project, i) => {
            project.classList.toggle("active", i === index);
        });
    }

    document.getElementById("prev-btn").addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        showProject(currentIndex);
    });

    document.getElementById("next-btn").addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % projects.length;
        showProject(currentIndex);
    });

    showProject(currentIndex);
});
