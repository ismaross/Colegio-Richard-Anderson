document.addEventListener('DOMContentLoaded', function () {

    // Pestañas de Propuesta Educativa
    const btns = document.querySelectorAll('.tab-btn');
    if (btns.length) {
        function activateTab(tabId) {
            btns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
            const panel = document.getElementById(tabId);
            if (btn && panel) {
                btn.classList.add('active');
                panel.classList.add('active');
            }
        }
        btns.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) activateTab(hash);
    }

    // Menú hamburguesa para móviles
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function () {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    document.querySelectorAll('nav ul li.has-dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
            }
        });
    });

    // Envío de formularios vía Formspree
    document.querySelectorAll('.ajax-form').forEach(function (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const feedback = form.querySelector('.form-feedback');
            const btn = form.querySelector('button[type="submit"]');
            if (!btn || !feedback) return;
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    form.reset();
                    feedback.textContent = '¡Mensaje enviado! Nos pondremos en contacto a la brevedad.';
                    feedback.style.display = 'block';
                    feedback.style.color = '#1a6b2a';
                } else {
                    throw new Error();
                }
            } catch {
                feedback.textContent = 'Hubo un error al enviar. Por favor escribinos a admisiones@richardanderson.edu.uy';
                feedback.style.display = 'block';
                feedback.style.color = '#cc0000';
            }
            btn.disabled = false;
            btn.textContent = 'Enviar consulta →';
        });
    });

    // Lightbox para la galería
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    if (galleryImages.length) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;align-items:center;justify-content:center;cursor:zoom-out';
        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:6px;box-shadow:0 4px 32px rgba(0,0,0,.6)';
        overlay.appendChild(lightboxImg);
        document.body.appendChild(overlay);

        lightboxImg.onerror = function () { overlay.style.display = 'none'; };

        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function () {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                overlay.style.display = 'flex';
            });
        });

        overlay.addEventListener('click', function () { overlay.style.display = 'none'; });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') overlay.style.display = 'none';
        });
    }

    // Animación de entrada para secciones al hacer scroll
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section:not(.hero)');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s, transform 0.5s';
        });
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(section => observer.observe(section));
    }

});
