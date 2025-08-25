// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll is handled by CSS (html{scroll-behavior:smooth}) but we also close any mobile nav here (if added later).

// Parallax: move hero ::before via CSS variable
// (function(){
//   const root = document.documentElement;
//   const update = () => {
//     root.style.setProperty('--parallax', (window.scrollY * 0.25) + 'px');
//   };
//   update();
//   window.addEventListener('scroll', update, {passive: true});
// })();

// Reveal on scroll using IntersectionObserver
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  els.forEach(el=>io.observe(el));
})();

// Contact form toast
document.getElementById('contact-form')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    const messageBox = document.createElement('div');
    messageBox.textContent = response.ok
      ? "Thanks! I'll get back to you shortly."
      : "Sorry, there was a problem submitting your message. Please try again later.";
    messageBox.style.position = 'fixed';
    messageBox.style.bottom = '32px';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translateX(-50%)';
    messageBox.style.background = '#222';
    messageBox.style.color = '#fff';
    messageBox.style.padding = '16px 24px';
    messageBox.style.borderRadius = '12px';
    messageBox.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
    messageBox.style.zIndex = '9999';
    messageBox.style.fontSize = '1rem';
    document.body.appendChild(messageBox);
    setTimeout(() => {
      messageBox.remove();
    }, 3500);
    if (response.ok) form.reset();
  }).catch(() => {
    const messageBox = document.createElement('div');
    messageBox.textContent = "Sorry, there was a problem submitting your message. Please try again later.";
    messageBox.style.position = 'fixed';
    messageBox.style.bottom = '32px';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translateX(-50%)';
    messageBox.style.background = '#222';
    messageBox.style.color = '#fff';
    messageBox.style.padding = '16px 24px';
    messageBox.style.borderRadius = '12px';
    messageBox.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
    messageBox.style.zIndex = '9999';
    messageBox.style.fontSize = '1rem';
    document.body.appendChild(messageBox);
    setTimeout(() => {
      messageBox.remove();
    }, 3500);
  });
});

// Theme switcher
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn?.querySelector('.theme-icon');
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
function setTheme(theme) {
  if(theme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    themeIcon.textContent = '🌞';
  }
  localStorage.setItem('theme', theme);
}
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || getSystemTheme();
setTheme(initialTheme);
themeBtn?.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  setTheme(newTheme);
  themeBtn.classList.add('spin');
  setTimeout(()=>themeBtn.classList.remove('spin'), 400);
});
// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if(!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'light' : 'dark');
  }
});

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const mobileMenuClose = document.getElementById('mobile-menu-close');

// Debug logging
console.log('Mobile menu toggle:', mobileMenuToggle);
console.log('Mobile menu:', mobileMenu);
console.log('Mobile nav links:', mobileNavLinks);
console.log('Mobile menu close:', mobileMenuClose);

function toggleMobileMenu() {
  console.log('Toggle mobile menu clicked');
  mobileMenuToggle?.classList.toggle('active');
  mobileMenu?.classList.toggle('active');
  const themeBtn = document.getElementById('theme-toggle');
  
  if (mobileMenu?.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
    // Hide theme button when menu is open
    if (themeBtn) {
      themeBtn.style.opacity = '0';
      themeBtn.style.pointerEvents = 'none';
    }
  } else {
    document.body.style.overflow = '';
    // Show theme button when menu is closed
    if (themeBtn) {
      themeBtn.style.opacity = '1';
      themeBtn.style.pointerEvents = 'auto';
    }
  }
  console.log('Menu active:', mobileMenu?.classList.contains('active'));
}

function closeMobileMenu() {
  mobileMenuToggle?.classList.remove('active');
  mobileMenu?.classList.remove('active');
  document.body.style.overflow = '';
  
  // Show theme button when menu is closed
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.style.opacity = '1';
    themeBtn.style.pointerEvents = 'auto';
  }
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  console.log('Mobile menu toggle listener added');
} else {
  console.log('Mobile menu toggle button not found!');
}

// Add close button functionality
if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  console.log('Mobile menu close listener added');
} else {
  console.log('Mobile menu close button not found!');
}

// Close menu when clicking outside
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    closeMobileMenu();
  }
});

// Close menu when clicking nav links
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});
// Close menu when clicking 'Get in Touch' button in mobile menu
const getInTouchBtn = document.querySelector('.mobile-menu-footer .btn');
if (getInTouchBtn) {
  getInTouchBtn.addEventListener('click', closeMobileMenu);
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
    closeMobileMenu();
  }
});

// Handle window resize - close mobile menu and hide hamburger on larger screens
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    // Close mobile menu if it's open
    closeMobileMenu();
    // The CSS will automatically hide the hamburger button via media queries
  }
});

// Also check on page load in case user refreshes on a large screen with menu open
window.addEventListener('load', () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Generated by Copilot
// Smooth scroll for anchor links (services, process, work, contact)
document.querySelectorAll('a[href^="#services"], a[href^="#process"], a[href^="#work"], a[href^="#contact"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Work Gallery Modal System
// Swiper-based Work Gallery Modal System
class WorkGallery {
  constructor() {
    this.modal = document.getElementById('work-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalDescription = document.getElementById('modal-description-text');
    this.closeBtn = document.getElementById('modal-close');
    this.overlay = document.querySelector('.modal-overlay');
    this.swiperWrapper = document.getElementById('swiper-wrapper');
    this.swiper = null;
    this.currentWork = null;
    this.workData = {
      1: {
        title: "Legacy App Modernization",
        description: "Motivate kids to complete daily tasks with Lickety Split—a musical timer that turns routines into a fun, beat-the-clock game using encouraging classical music.",
        images: [
          { src: "./assets/images/ls/ls1.png", alt: "Lickety Split" },
          { src: "./assets/images/ls/ls2.png", alt: "Lickety Split" },
          { src: "./assets/images/ls/ls3.png", alt: "Lickety Split" },
          { src: "./assets/images/ls/ls4.png", alt: "Lickety Split" },
          { src: "./assets/images/ls/ls5.png", alt: "Lickety Split" }
        ]
      },
      2: {
        title: "Cybersecurity Extension for SAP",
        description: "Enhanced and supported custom Fiori apps for real-time threat detection and compliance at Layer Seven Security.",
        images: [
          { src: "./assets/images/l7s/tiles.png", alt: "Cybersecurity Extension for SAP" }
        ]
      },
      3: {
        title: "Mobile App Revamp & Release",
        description: "Upgraded, rebuilt, redesigned, and published a legacy Ionic app to Play Store and App Store for improved reliability and user experience.",
        images: [
          { src: "./assets/images/cp/cp1.png", alt: "Mobile App Revamp & Release" },
          { src: "./assets/images/cp/cp2.png", alt: "Mobile App Revamp & Release" },
          { src: "./assets/images/cp/cp3.png", alt: "Mobile App Revamp & Release" },
          { src: "./assets/images/cp/cp4.png", alt: "Mobile App Revamp & Release" },
        ]
      }
    };
    this.init();
  }
  init() {
    // Add event listeners to gallery buttons
    const galleryButtons = document.querySelectorAll('.work-card-btn');
    galleryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const workId = btn.getAttribute('data-work');
        this.openGallery(workId);
      });
    });
    // Close modal events
    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.overlay.addEventListener('click', () => this.closeModal());
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.modal.classList.contains('active')) {
        if (e.key === 'Escape') this.closeModal();
      }
    });
  }
  openGallery(workId) {
    this.currentWork = this.workData[workId];
    if (!this.currentWork) return;
    // Set modal content
    this.modalTitle.textContent = this.currentWork.title;
    this.modalDescription.textContent = this.currentWork.description;
    // Inject Swiper slides
    this.swiperWrapper.innerHTML = '';
    this.currentWork.images.forEach(img => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="width:100%;height:auto;max-height:400px;object-fit:contain;border-radius:var(--radius);" />`;
      this.swiperWrapper.appendChild(slide);
    });
    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Initialize Swiper
    if (this.swiper) this.swiper.destroy(true, true);
    this.swiper = new Swiper('.gallery-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      keyboard: {
        enabled: true,
      },
      slidesPerView: 1,
      spaceBetween: 20,
    });
  }
  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
    this.swiperWrapper.innerHTML = '';
  }
}
// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WorkGallery();
});

// Generated by Copilot
