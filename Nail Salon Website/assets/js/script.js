const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats");

let started = false;

function animateCounter(element) {

    const target = Number(element.dataset.target);

    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const ease = 1 - Math.pow(1 - progress, 3);

        const currentNumber = Math.floor(target * ease);

        element.textContent =
            new Intl.NumberFormat("fa-IR").format(currentNumber);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


/* =========================
   Counter
========================= */

if (statsSection) {

    const observer = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting && !started) {

            started = true;

            counters.forEach(counter => {
                animateCounter(counter);
            });

            observer.unobserve(statsSection);
        }

    }, {
        threshold: 0.4
    });

    observer.observe(statsSection);
}


/* =========================
   Theme
========================= */

const themeButton = document.getElementById("theme-toggle");

if (themeButton) {

    const themeIcon = themeButton.querySelector("img");

    const savedTheme = localStorage.getItem("theme");


    /* تم ذخیره شده */

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeIcon.src = "assets/icons/sun.svg";
        themeIcon.alt = "حالت روشن";

    } else {

        document.body.classList.remove("dark-mode");

        themeIcon.src = "assets/icons/moon.svg";
        themeIcon.alt = "حالت تاریک";
    }


    /* تغییر تم */

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            themeIcon.src = "assets/icons/sun.svg";
            themeIcon.alt = "حالت روشن";

            localStorage.setItem("theme", "dark");

        } else {

            themeIcon.src = "assets/icons/moon.svg";
            themeIcon.alt = "حالت تاریک";

            localStorage.setItem("theme", "light");
        }

    });

}