
const firebaseConfig = {
    apiKey: "AIzaSyCEHv-uL7GYEzF6jBy2P5lzSOMbyd-Q5Ps",
    authDomain: "jobby-landing.firebaseapp.com",
    databaseURL: "https://jobby-landing-default-rtdb.firebaseio.com",
    projectId: "jobby-landing",
    storageBucket: "jobby-landing.firebasestorage.app",
    messagingSenderId: "983795092075",
    appId: "1:983795092075:web:74f0427ef2ec58df137f2e",
    measurementId: "G-N6CY4MVHFK"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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
            name: 'José García',
            service: 'Técnico de Aire Acondicionado',
            description: 'Especialista en instalación, reparación y mantenimiento de sistemas de aire acondicionado.',
            rating: 4.8,
            price: "$30/hora",
            location: 'Guayaquil',
            image: 'https://images.pexels.com/photos/30257405/pexels-photo-30257405.jpeg',
            experience: 5,
            reviews: 45,
            category: 'tecnicos'
        },
        {
            name: 'Luis Zambrano',
            service: 'Electricista',
            description: 'Instalación, reparación y mantenimiento de sistemas eléctricos residenciales e industriales.',
            rating: 4.6,
            price: "$28/hora",
            location: 'Daule',
            image: 'https://images.pexels.com/photos/29284315/pexels-photo-29284315.jpeg',
            experience: 4,
            reviews: 32,
            category: 'hogar'
        },
        {
            name: 'Mía Sánchez',
            service: 'Pintora',
            description: 'Pintura de interiores y exteriores, acabados decorativos y mantenimiento de superficies.',
            rating: 4.7,
            price: "$25/hora",
            location: 'Milagro',
            image: 'https://images.pexels.com/photos/10641053/pexels-photo-10641053.jpeg',
            experience: 3,
            reviews: 21,
            category: 'hogar'
        },
        {
            name: 'Santiago Vera',
            service: 'Técnico en Computación',
            description: 'Soluciona problemas de hardware y software, instalación y mantenimiento de computadoras.',
            rating: 4.9,
            price: "$35/hora",
            location: 'Samborondón',
            image: 'https://images.pexels.com/photos/31610843/pexels-photo-31610843.jpeg',
            experience: 6,
            reviews: 60,
            category: 'tecnologia'
        },
        {
            name: 'Ashley López',
            service: 'Diseñadora Gráfica',
            description: 'Especialista en identidad visual, branding y diseño publicitario.',
            rating: 4.5,
            price: "$40/hora",
            location: 'Playas',
            image: 'https://images.pexels.com/photos/31942700/pexels-photo-31942700.jpeg',
            experience: 4,
            reviews: 33,
            category: 'diseno'
        },
        {
            name: 'Mathias Alvarado',
            service: 'Técnico en Celulares',
            description: 'Reparación y mantenimiento de teléfonos móviles y tablets.',
            rating: 4.7,
            price: "$30/hora",
            location: 'Ceibos',
            image: 'https://images.pexels.com/photos/29047759/pexels-photo-29047759.jpeg',
            experience: 3,
            reviews: 19,
            category: 'tecnologia'
        },
        {
            name: 'Doménica González',
            service: 'Tutora de Matemáticas',
            description: 'Clases personalizadas para estudiantes de primaria y secundaria.',
            rating: 5.0,
            price: "$20/hora",
            location: 'Durán',
            image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
            experience: 2,
            reviews: 12,
            category: 'educacion'
        },
        {
            name: 'Danna Moran',
            service: 'Cerrajera',
            description: 'Apertura de cerraduras, cambio de llaves y sistemas de seguridad.',
            rating: 4.8,
            price: "$35/hora",
            location: 'Naranjal',
            image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
            experience: 5,
            reviews: 27,
            category: 'hogar'
        },
        {
            name: 'Ángel Castro',
            service: 'Gasfitero',
            description: 'Especialista en instalaciones de gas y mantenimiento de sistemas de gas domiciliario.',
            rating: 4.6,
            price: "$32/hora",
            location: 'Yaguachi',
            image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
            experience: 5,
            reviews: 18,
            category: 'hogar'
        },
        {
            name: 'Emily Vera',
            service: 'Diseñadora UX/UI',
            description: 'Diseño de interfaces atractivas y experiencia de usuario efectiva.',
            rating: 4.9,
            price: "$50/hora",
            location: 'Balao',
            image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
            experience: 6,
            reviews: 41,
            category: 'diseno'
        }
    ];


    const filteredResults = mockResults.filter(item => {
        const itemCategoria = item.category.toLowerCase();
        const itemUbicacion = item.location.toLowerCase();
        const itemPrecio = parseInt(item.price.replace(/[^0-9]/g, ''));

        // Evaluar si cada filtro coincide (o si está vacío)
        const coincideCategoria = servicio === '' || itemCategoria === servicio;
        const coincideUbicacion = ubicacion === '' || itemUbicacion.includes(ubicacion);
        const coincidePresupuesto = isNaN(presupuesto) || itemPrecio <= presupuesto;

        return coincideCategoria && coincideUbicacion && coincidePresupuesto;
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
                                <p style="margin: 0.5rem 0; color: #666;"><strong>💼</strong> ${result.description}</p>
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

    // Agregar timestamp
    data.timestamp = new Date().toISOString();

    // Enviar a Firebase Realtime Database
    firebase.database().ref('solicitudes').push(data)
        .then(() => {
            alert('¡Gracias por tu interés! Hemos recibido tu solicitud y la almacenamos en Firebase.');
            event.target.reset();
        })
        .catch(error => {
            console.error("Error al enviar los datos a Firebase:", error);
            alert("Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.");
        });
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