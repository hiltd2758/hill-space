const particleContainer = document.querySelector('.cursor-particles');
const particles = [];
const maxParticles = 10;

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 4 + 2}px`; 
    particle.style.height = particle.style.width;
    particle.style.background = `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.5})`; 
    particle.style.borderRadius = '50%';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.boxShadow = '0 0 8px rgba(100, 255, 218, 0.8)'; 
    particleContainer.appendChild(particle);
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    const life = Math.random() * 500 + 500;
    return { element: particle, x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life, maxLife: life };
}
function updateParticles(){
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 16;
        p.element.style.left = `${p.x}px`;
        p.element.style.top = `${p.y}px`;
        p.element.style.opacity = p.life / p.maxLife;

        if (p.life <= 0) {
            p.element.remove();
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(updateParticles);
}

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    if (particles.length < maxParticles && Math.random() > 0.5) {
        particles.push(createParticle(x, y));
    }
});

updateParticles();