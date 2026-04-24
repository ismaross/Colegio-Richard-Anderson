// Script básico para el sitio web del colegio

// Pestañas de Propuesta Educativa
document.addEventListener('DOMContentLoaded', function () {
    const btns = document.querySelectorAll('.tab-btn');
    if (!btns.length) return;

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

    btns.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    });

    // Activar pestaña según el hash de la URL (ej: academics.html#primaria)
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        activateTab(hash);
    }
});

// Función para alternar el menú en móviles (si se agrega un botón hamburguesa)
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

// Envío de formularios vía Formspree (sin recargar la página)
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.ajax-form').forEach(function (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const feedback = form.querySelector('.form-feedback');
            const btn = form.querySelector('button[type="submit"]');
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
});

// Función para hacer la galería interactiva (ampliar imagen al hacer clic)
document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Aquí se podría abrir un modal, pero por simplicidad, solo un alert
            alert('Imagen: ' + img.alt);
        });
    });
});

// Animación simple para las secciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s, transform 0.5s';
    });

    // Animar las secciones después de un pequeño delay
    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 100); // Delay de 100ms para que se vea la transición
});