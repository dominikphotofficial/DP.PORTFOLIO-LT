const cbScript = document.createElement('script');
cbScript.id = 'Cookiebot';
cbScript.src = 'https://consent.cookiebot.com/uc.js';
cbScript.setAttribute('data-cbid', '06c15308-ea25-4737-9b50-13705638aa99');
cbScript.setAttribute('data-blockingmode', 'auto');
cbScript.type = 'text/javascript';

if (document.head.firstChild) {
    document.head.insertBefore(cbScript, document.head.firstChild);
} else {
    document.head.appendChild(cbScript);
}

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);
    }
});

setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader && preloader.style.display !== "none") {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 600);
    }
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("main-header") || document.querySelector("header");
    
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    const burger = document.getElementById("burger-menu") || document.querySelector(".burger");
    const navOverlay = document.getElementById("nav-overlay") || document.querySelector(".nav-menu");
    
    if (burger && navOverlay) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navOverlay.classList.toggle("active");
            
            if (navOverlay.classList.contains("active")) {
                document.body.style.overflow = "hidden";
                if(header) header.classList.remove("scrolled");
            } else {
                document.body.style.overflow = "";
                if (window.scrollY > 50 && header) {
                    header.classList.add("scrolled");
                }
            }
        });
    }

    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;
    
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    
    if (galleryImages.length > 0 && lightbox) {
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxCounter = document.getElementById("lightbox-counter");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");
        
        let currentIndex = 0;
        let imageArray = [];
        
        galleryImages.forEach((img, index) => {
            imageArray.push(img.src);
            img.addEventListener("click", () => {
                currentIndex = index;
                if (lightboxImg) lightboxImg.src = imageArray[currentIndex];
                if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });
        
        const updateL = () => {
            if (lightboxImg) lightboxImg.src = imageArray[currentIndex];
            if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        };
        
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                lightbox.classList.remove("active");
                document.body.style.overflow = "";
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % imageArray.length;
                updateL();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                updateL();
            });
        }
        
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") {
                lightbox.classList.remove("active");
                document.body.style.overflow = "";
            }
            if (e.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % imageArray.length;
                updateL();
            }
            if (e.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                updateL();
            }
        });
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-in-up").forEach(el => {
        observer.observe(el);
    });
});
