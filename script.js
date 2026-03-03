const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".side-nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      section.classList.add("fade-in-visible");
    }
  });
});

const projectBoxes = document.querySelectorAll(".project-left");
const lightbox = document.getElementById("project-lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox .prev");
const nextBtn = document.querySelector(".lightbox .next");

let currentImages = [];
let currentIndex = 0;
lightboxImg.addEventListener("click", () => {
    lightboxImg.classList.toggle("zoomed");
});

projectBoxes.forEach(box => {
  box.addEventListener("click", () => {
    currentImages = JSON.parse(box.dataset.images);
    currentIndex = 0;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.style.display = "flex";
  lightboxImg.src = currentImages[currentIndex];
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function showPrev() {
    lightboxImg.classList.add("fade"); 
    setTimeout(() => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
        lightboxImg.classList.remove("fade"); 
    }, 200); 
}

function showNext() {
    lightboxImg.classList.add("fade"); 
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
        lightboxImg.classList.remove("fade"); 
    }, 200);
}

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});


document.addEventListener("keydown", e => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "Escape") closeLightbox();
  }
});