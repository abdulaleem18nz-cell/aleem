/* ===== ABHISHEK JANGID — PORTFOLIO SCRIPT ===== */

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// ---- Nav Scroll Effect ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ---- Burger Menu ----
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const isOpen = links.style.display === 'flex';
  if (isOpen) {
    links.style.display = 'none';
    links.style.position = '';
    links.style.flexDirection = '';
  } else {
    links.style.display = 'flex';
    links.style.position = 'fixed';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.flexDirection = 'column';
    links.style.background = 'rgba(10,10,15,0.97)';
    links.style.padding = '2rem';
    links.style.gap = '1.5rem';
    links.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
    links.style.backdropFilter = 'blur(20px)';
  }
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if (window.innerWidth < 900) {
      links.style.display = 'none';
    }
  });
});

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- Hero Text Stagger ----
document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.15}s`;
  setTimeout(() => el.classList.add('visible'), 200 + i * 150);
});

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});

// ---- Skill Cards Stagger on Reveal ----
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 100);
    }
  });
}, { threshold: 0.1 });

skillCards.forEach(card => skillObserver.observe(card));

// ---- Parallax Orbs on Mouse Move ----
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 15;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px) scale(1)`;
  });
});

// ---- Typewriter effect on hero tag ----
function typewriter(element, text, speed = 60) {
  element.textContent = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, speed);
    }
  };
  setTimeout(type, 800);
}

const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const originalText = heroTag.textContent;
  typewriter(heroTag, originalText);
}

// ---- Hover tilt on cards ----
document.querySelectorAll('.skill-card, .project-card, .contact-card, .card-inner').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---- Count-up numbers if needed ----
function countUp(element, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start = Math.min(start + step, target);
    element.textContent = start.toFixed(start < 10 ? 2 : 0);
    if (start < target) requestAnimationFrame(update);
  };
  update();
}

console.log('%c✨ Abhishek Jangid Portfolio', 'color: #c8a96e; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with passion & creativity 🚀', 'color: #7c9cff; font-size: 12px;');
