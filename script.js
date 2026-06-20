/* ===== DOM HELPERS ===== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* ===== CLOSE NAV ON LINK CLICK ===== */
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ===== NAVBAR SCROLL EFFECT ===== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = $$('section[id]');
const navAnchors = $$('.nav-links a:not(.lang-btn)');

function updateActiveLink() {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 150;
    if (window.scrollY >= top) {
      current = s.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

/* ===== LANGUAGE TOGGLE ===== */
let currentLang = 'en';
const langToggle = document.getElementById('langToggle');
const html = document.documentElement;

const translations = {
  ar: {
    nav: ['الرئيسية', 'عن الطبيب', 'الخدمات', 'الحجز', 'الأسعار', 'المدونة', 'اتصل بنا'],
    heroBadge: 'رعاية أسنان منزلية موثوقة',
    heroTitle: 'رعاية أسنان احترافية في منزلك',
    heroDesc: 'احجز زيارة أسنان منزلية مع الدكتور زياد البهنساوي واحصل على رعاية أسنان آمنة ومريحة وشخصية دون مغادرة منزلك.',
    heroBtn1: 'احجز زيارة منزلية',
    heroBtn2: 'اتصل بالطبيب',
    heroTrust: ['طبيب مرخص', 'معدات معقمة', 'زيارات منزلية']
  }
};

langToggle.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentLang === 'en') {
    currentLang = 'ar';
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    langToggle.textContent = 'EN';
    // Simple RTL placeholder — full translation requires more data
    document.querySelector('.hero-badge').innerHTML = '<i class="fas fa-stethoscope"></i> رعاية أسنان منزلية موثوقة';
    document.querySelector('.hero-text h1').textContent = 'رعاية أسنان احترافية في منزلك';
    document.querySelector('.hero-text p').textContent = 'احجز زيارة أسنان منزلية مع الدكتور زياد البهنساوي واحصل على رعاية أسنان آمنة ومريحة وشخصية دون مغادرة منزلك.';
  } else {
    currentLang = 'en';
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    langToggle.textContent = 'AR';
    document.querySelector('.hero-badge').innerHTML = '<i class="fas fa-stethoscope"></i> Trusted Dental Home Care';
    document.querySelector('.hero-text h1').textContent = 'Professional Dental Care at Your Home';
    document.querySelector('.hero-text p').textContent = 'Book a home dental visit with Dr. Ziad El Behansawy and receive safe, comfortable, and personalized dental care without leaving your home.';
  }
});

/* ===== SMOOTH SCROLL FOR OLDER BROWSERS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ===== COUNTER ANIMATION ===== */
function animateCounters() {
  const counters = $$('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = target >= 100 ? '+' : '%';
    let current = 0;
    const increment = Math.ceil(target / 60);
    const update = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        return;
      }
      counter.textContent = current + suffix;
      requestAnimationFrame(update);
    };
    update();
  });
}

/* ===== INTERSECTION OBSERVER FOR COUNTERS ===== */
const aboutSection = document.getElementById('about');
let countersAnimated = false;

if (aboutSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(aboutSection);
}

/* ===== BOOKING FORM ===== */
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fullName').value;
  showToast(`Thank you, ${name}! Your booking request has been received. Dr. Ziad will contact you soon.`);
  bookingForm.reset();
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  showToast(`Thank you, ${name}! Your message has been sent. Dr. Ziad will respond shortly.`);
  contactForm.reset();
});

/* ===== DATE INPUT: SET MIN TO TODAY ===== */
const dateInput = document.getElementById('prefDate');
if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
}

/* ===== TOAST ===== */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ===== PAGE LOAD ANIMATIONS ===== */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
