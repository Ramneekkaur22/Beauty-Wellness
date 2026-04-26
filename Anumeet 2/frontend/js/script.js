// ============================================================
// js/script.js — Core frontend logic & animations
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  updateAuthUI();
});

// Theme Management
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark for premium look
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  if (toggleBtn) {
    toggleBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    toggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }
}

// Navbar Blur Effect on Scroll
function initNavbar() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(11, 15, 25, 0.95)';
      nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
      nav.style.background = 'var(--nav-bg)';
      nav.style.boxShadow = 'none';
    }
  });
}

// =========================================================
// GSAP Animations (Replaces CSS Intersection Observer)
// =========================================================
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  function initAnimations() {
    // 1. General Section Headers & Elements
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .about-hero h1, .about-hero p');
    fadeElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 2. Hero Section Load Sequence
    const heroContent = document.querySelectorAll('.hero-content > *');
    if (heroContent.length > 0) {
      gsap.fromTo(heroContent, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }

    // 3. Staggered Grid Cards (Categories, Services, Features)
    const grids = document.querySelectorAll('.categories-grid, .services-grid, .about-features');
    grids.forEach(grid => {
      const cards = grid.children;
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%"
            }
          }
        );
      }
    });

    // 4. Subtle Parallax for Hero Images
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      gsap.to('.hero-img', {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
    
    // 5. Fade in images in About page
    gsap.utils.toArray('.about-image, .about-hero-img').forEach(img => {
      gsap.fromTo(img,
        { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%"
          }
        }
      );
    });
  }

  // Run after a slight delay to ensure dynamic DOM content is fully injected by data.js scripts
  window.addEventListener('load', () => {
    setTimeout(initAnimations, 100);
  });
}

// Toast Notifications
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '⚠️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Auth UI Updates
function updateAuthUI() {
  const authContainer = document.getElementById('auth-nav');
  if (!authContainer) return;

  const user = getUser();
  if (user) {
    authContainer.innerHTML = `
      <a href="bookings.html">My Bookings</a>
      ${user.role === 'admin' ? '<a href="admin.html">Admin</a>' : ''}
      <a href="profile.html">Profile</a>
      <a href="#" onclick="handleLogout(event)" class="btn btn-outline" style="padding: 0.4rem 1rem">Logout</a>
    `;
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="btn btn-outline" style="padding: 0.4rem 1rem">Login</a>
      <a href="signup.html" class="btn btn-primary" style="padding: 0.4rem 1rem">Sign Up</a>
    `;
  }
}

window.handleLogout = (e) => {
  e.preventDefault();
  logoutUser();
  showToast('Logged out successfully');
  updateAuthUI();
  if (window.location.pathname.includes('profile') || window.location.pathname.includes('bookings')) {
    setTimeout(() => window.location.href = 'index.html', 1000);
  }
};

// Render Service Cards
function createServiceCard(service) {
  return `
    <a href="details.html?id=${service.id}" class="service-card observe fade-in">
      <div class="service-img-container">
        <img src="${service.image}" alt="${service.title}" class="service-img loading-skeleton">
        ${service.tags && service.tags[0] ? `<span class="service-badge">${service.tags[0]}</span>` : ''}
      </div>
      <div class="service-info">
        <span class="service-category">${service.category}</span>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-provider">by ${service.provider}</p>
        <div class="service-meta">
          <span class="service-price">₹${service.price}</span>
          <span class="service-rating">★ ${service.rating} (${service.reviewCount})</span>
        </div>
      </div>
    </a>
  `;
}

// Replace images once loaded to remove skeleton
document.addEventListener('load', (e) => {
  if (e.target.tagName === 'IMG' && e.target.classList.contains('loading-skeleton')) {
    e.target.classList.remove('loading-skeleton');
  }
}, true);
