window.onload = function () {
    VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        color: 0x00f5a0,
        backgroundColor: 0x000000,
        points: 12,
        maxDistance: 20,
        spacing: 15
    });
};

document.addEventListener("DOMContentLoaded", function () {
    const roleElement = document.getElementById("typing-role");

    if (!roleElement) {
        return;
    }

    const roles = ["Competitive Programmer", "Frontend Developer", "Problem Solver"];
    const typingSpeed = 90;
    const deletingSpeed = 55;
    const holdDelay = 1200;
    const switchDelay = 300;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        roleElement.textContent = currentRole.slice(0, charIndex);

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeLoop, holdDelay);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeLoop, switchDelay);
            return;
        }

        setTimeout(typeLoop, isDeleting ? deletingSpeed : typingSpeed);
    }

    typeLoop();

    setupRevealAnimations();
    setupActiveNavHighlight();
});

function setupRevealAnimations() {
    const revealTargets = document.querySelectorAll(
        ".hero-headline-card, .code-box, .section-title, .stat-card, .project-card, .skills-card, .achievement-card, .education-card, .contact-card"
    );

    if (!revealTargets.length) {
        return;
    }

    revealTargets.forEach(function (element, index) {
        element.classList.add("reveal");
        element.style.transitionDelay = String(Math.min(index * 45, 360)) + "ms";
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    revealTargets.forEach(function (element) {
        revealObserver.observe(element);
    });
}

function setupActiveNavHighlight() {
    const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));

    if (!navLinks.length) {
        return;
    }

    const sectionMap = navLinks
        .map(function (link) {
            const targetId = link.getAttribute("href");
            const section = targetId ? document.querySelector(targetId) : null;
            if (!section) {
                return null;
            }
            return { link: link, section: section };
        })
        .filter(Boolean);

    function updateActiveLink() {
        const currentY = window.scrollY + 170;
        let current = null;

        sectionMap.forEach(function (item) {
            if (item.section.offsetTop <= currentY) {
                current = item;
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");
        });

        if (current) {
            current.link.classList.add("active");
        }
    }

    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
}