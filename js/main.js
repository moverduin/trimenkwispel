// ============================================
// Trim & Kwispel - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile navigation toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Scroll to top button ---
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Fade-in on scroll (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything if IntersectionObserver not supported
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // --- Contact form handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const naam = document.getElementById('naam');
            const hondNaam = document.getElementById('hondNaam');

            // Simple success feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Bericht verstuurd! Woof!';
            btn.style.background = 'var(--secondary)';
            btn.style.borderColor = 'var(--secondary)';
            btn.disabled = true;

            // Show fun message
            const msg = document.createElement('div');
            msg.style.cssText = 'text-align:center; padding:20px; margin-top:16px; background:rgba(74,124,111,0.1); border-radius:12px; color:var(--secondary); font-weight:600;';
            const dogName = hondNaam && hondNaam.value ? hondNaam.value : 'je viervoeter';
            msg.textContent = `Bedankt ${naam.value}! We nemen zo snel mogelijk contact op. Geef ${dogName} alvast een aai van ons! 🐾`;
            contactForm.appendChild(msg);

            // Reset after a few seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                contactForm.reset();
                msg.remove();
            }, 5000);
        });
    }

    // --- Fun: random dog fact in console ---
    const facts = [
        '🐾 Wist je dat honden 300 miljoen geurreceptoren hebben? Wij slechts 6 miljoen!',
        '🐕 Een hond zijn neus-afdruk is net zo uniek als een menselijke vingerafdruk.',
        '🦴 Honden dromen net als mensen — kleine honden dromen zelfs vaker!',
        '🐶 De Basenji is het enige hondenras dat niet blaft.',
        '🎾 Honden zien vooral blauw en geel — geen rood of groen!',
        '🐾 Een hond kan tot 250 woorden en gebaren leren begrijpen.',
    ];
    console.log(facts[Math.floor(Math.random() * facts.length)]);
    console.log('🐾 Welkom bij Trim & Kwispel! Gemaakt met liefde voor honden.');
});
