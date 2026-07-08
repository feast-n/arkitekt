const loaderBar = document.getElementById('loaderBar');
const loader = document.getElementById('loader');
let loadProgress = 0;

const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 15 + 5;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
    setTimeout(finishLoad, 400);
  }
  loaderBar.style.width = loadProgress + '%';
}, 100);

function finishLoad() {
  gsap.to(loader, {
    clipPath: 'inset(0 0 100% 0)',
    duration: 0.8,
    ease: 'expo.inOut',
    onComplete: () => {
      loader.style.display = 'none';
      animateHero();
    }
  });
}

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

function animateHero() {
  const words = document.querySelectorAll('.word-inner');
  gsap.to(words, {
    y: '0%',
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.08,
  });

  gsap.to('.hero-fade', {
    opacity: 1,
    duration: 1,
    delay: 0.6,
    ease: 'power2.out',
  });
}

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.anim-section').forEach(section => {
  gsap.to(section, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 85%',
      once: true,
    }
  });
});

document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.5s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .exh-card, input, textarea, select').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovering');
    ring.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovering');
    ring.classList.remove('hovering');
  });
});

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuLine1 = document.getElementById('menuLine1');
const menuLine2 = document.getElementById('menuLine2');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.add('open');
    menuLine1.style.transform = 'rotate(45deg) translateY(4px)';
    menuLine2.style.transform = 'rotate(-45deg) translateY(-3px)';
    menuLine2.style.width = '24px';
    menuLine2.style.marginLeft = '0';
  } else {
    closeMobile();
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  menuLine1.style.transform = '';
  menuLine2.style.transform = '';
  menuLine2.style.width = '';
  menuLine2.style.marginLeft = '';
}

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  e.target.reset();
  setTimeout(() => toast.classList.remove('show'), 3000);
});

const wrapper = document.querySelector('.wrapper');
lenis.on('scroll', ({ scroll }) => {
  if (wrapper) {
    wrapper.style.transform = `translateY(-${scroll}px)`;
  }
});