// Navigation between sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Search functionality
function searchServices(event) {
    event.preventDefault();

    const servicio = document.getElementById('servicio').value.trim().toLowerCase();
    const ubicacion = document.getElementById('ubicacion').value.trim().toLowerCase();
    const presupuesto = parseInt(document.getElementById('presupuesto').value);
    console.log(servicio, ubicacion, presupuesto)

    const mockResults = [
        {
            name: "Carlos Mendoza",
            service: "Electricista",
            category: "tecnicos",
            rating: 4.8,
            price: "$25/hora",
            location: "Guayaquil",
            image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
            experience: "5 años",
            reviews: 127,
        },
        {
            name: "María González",
            service: "Diseñadora Gráfica",
            category: "diseno",
            rating: 4.9,
            price: "$30/hora",
            location: "Quito",
            image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
            experience: "8 años",
            reviews: 89
        },
        {
            name: "Juan Pérez",
            service: "Desarrollador Web",
            category: "tecnologia",
            rating: 4.7,
            price: "$45/hora",
            location: "Cuenca",
            image: "https://images.pexels.com/photos/29284315/pexels-photo-29284315.jpeg",
            experience: "6 años",
            reviews: 156
        }
    ];

    const filteredResults = mockResults.filter(item => {
        const itemService = item.category.toLowerCase();
        const itemLocation = item.location.toLowerCase();
        const itemPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
        console.log('filter', itemService, itemLocation, itemPrice)

        const matchServicio = servicio === '' || itemService === servicio;
        const matchUbicacion = ubicacion === '' || itemLocation.includes(ubicacion);
        const matchPresupuesto = isNaN(presupuesto) || itemPrice <= presupuesto;

        return matchServicio && matchUbicacion && matchPresupuesto;
    });

    displaySearchResults(filteredResults);
}


function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = `
                <h3 style="margin-bottom: 2rem; color: #333;">Resultados de búsqueda (${results.length} encontrados)</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    ${results.map(result => `
                        <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: all 0.3s ease;" 
                             onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.15)'"
                             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.1)'">
                            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                                <img style="height: 6rem; width: 6rem; margin-right: 1rem; border-radius: 50%" src="${result.image}">
                                <div>
                                    <h4 style="margin: 0; color: #333; font-size: 1.3rem;">${result.name}</h4>
                                    <p style="margin: 0.5rem 0; color: #667eea; font-weight: 600;">${result.service}</p>
                                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                                        <span style="color: #ffc107;">⭐</span>
                                        <span style="font-weight: 600;">${result.rating}</span>
                                        <span style="color: #666;">(${result.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <p style="margin: 0.5rem 0; color: #666;"><strong>📍</strong> ${result.location}</p>
                                <p style="margin: 0.5rem 0; color: #666;"><strong>💼</strong> ${result.experience} de experiencia</p>
                                <p style="margin: 0.5rem 0; color: #667eea; font-size: 1.2rem; font-weight: 700;">${result.price}</p>
                            </div>
                            <button onclick="contactWorker('${result.name}')" 
                                    style="width: 100%; padding: 12px; background: linear-gradient(45deg, #667eea, #764ba2); 
                                           color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; 
                                           transition: all 0.3s ease;"
                                    onmouseover="this.style.background='linear-gradient(45deg, #5a67d8, #6c5ce7)'"
                                    onmouseout="this.style.background='linear-gradient(45deg, #667eea, #764ba2)'">
                                Contactar
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
}

function contactWorker(workerName) {
    alert(`¡Excelente! Te pondremos en contacto con ${workerName}. Recibirás un email con los detalles de contacto en breve.`);
}

// Contact form submission
function submitApplication(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Mock submission
    alert('¡Gracias por tu interés! Hemos recibido tu solicitud. Nuestro equipo la revisará y te contactaremos en las próximas 24-48 horas.');
    event.target.reset();
}

// Plan selection
function selectPlan(planType) {
    let message = '';
    switch (planType) {
        case 'gratuito':
            message = '¡Perfecto! Te has registrado en el plan gratuito. Puedes comenzar a explorar servicios inmediatamente.';
            break;
        case 'premium':
            message = '¡Excelente elección! El plan Premium te dará máxima visibilidad. Serás redirigido al proceso de pago.';
            break;
        case 'empresarial':
            message = 'Gracias por tu interés en el plan empresarial. Un representante se pondrá en contacto contigo para una demo personalizada.';
            break;
    }
    alert(message);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #02459E 20%, #764ba2 80%)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #02459E 20%, #764ba2 80%)';
        header.style.backdropFilter = 'blur(10px)';
    }
});


// Initialize with home section visible
document.addEventListener('DOMContentLoaded', function () {
    showSection('home');
});

// Mobile menu toggle (if you want to add mobile menu later)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Add some interactive animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .company-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255,255,255,0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }
        `;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);