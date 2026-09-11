const INQUIRY_EMAIL = 'mediaunit@example.com'; // Replace with the real Media Unit email.

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => observer.observe(el));

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
});
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileNav?.setAttribute('aria-hidden', 'true');
}));

// Smooth cursor on desktop.
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
window.addEventListener('mousemove', (e) => {
  if (!cursorDot || !cursorRing) return;
  cursorDot.style.left = `${e.clientX}px`;
  cursorDot.style.top = `${e.clientY}px`;
  cursorRing.style.left = `${e.clientX}px`;
  cursorRing.style.top = `${e.clientY}px`;
});

// Small tilt interaction for portfolio cards.
document.querySelectorAll('.service-card, .person-card, .gallery-item').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    if (window.innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.2).toFixed(2)}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

// Demo inquiry: opens the visitor's mail app with the entered message.
const form = document.getElementById('inquiryForm');
const note = document.getElementById('formNote');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const contact = data.get('contact');
  const message = data.get('message');
  const subject = encodeURIComponent(`Media Unit Enquiry — ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail / Phone: ${contact}\n\nMessage:\n${message}`);
  window.location.href = `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`;
  if (note) note.textContent = `Opening your email app… Replace ${INQUIRY_EMAIL} in script.js with the real address.`;
});

document.querySelectorAll('[data-placeholder-link]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    alert('Replace this link with the Media Unit\'s real social media URL in index.html.');
  });
});
