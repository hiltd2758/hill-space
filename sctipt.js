emailjs.init("IdZindU3V5A_y8F2Q");

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateForm()) return;

        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send(
            'service_jovlfaz',
            'template_j0chp08',
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'hiltd2758@ut.edu.vn'
            }
        )
        .then(function(response) {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch(function(error) {
            alert('Oops! Something went wrong. Please try again later.');
            console.error('EmailJS error:', error);
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    return true;
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        document.querySelectorAll('.resource-category').forEach(category => {
            category.style.display = (filter === 'all' || category.dataset.category === filter) ? 'block' : 'none';
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // Highlight active navigation link on scroll
    window.addEventListener("scroll", function () {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 60;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });
    });
});

document.querySelectorAll(".cta-button").forEach(button => {
    button.addEventListener("click", function(e) {
        let ripple = document.createElement("span");
        ripple.classList.add("ripple");

        let rect = this.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

document.querySelectorAll('.rating-stars i').forEach(star => {
    star.addEventListener('click', function() {
        const ratingValue = Array.from(this.parentElement.children).indexOf(this) + 1;
        const projectCard = this.closest('.project-feed-card');
        
        this.parentElement.querySelectorAll('i').forEach((s, index) => {
            s.className = index < ratingValue ? 'fas fa-star' : 'far fa-star';
        });

        const ratingCount = projectCard.querySelector('.rating-count');
        const currentCount = parseInt(ratingCount.textContent.match(/\d+/)[0]);
        ratingCount.textContent = `(${currentCount + 1} ratings)`;

        const thankYou = document.createElement('div');
        thankYou.className = 'rating-thanks';
        thankYou.textContent = 'Thanks for rating!';
        this.parentElement.appendChild(thankYou);
        setTimeout(() => thankYou.remove(), 2000);
    });
});

document.querySelectorAll('.comment-input').forEach(input => {
    const button = input.querySelector('.comment-btn');
    const textInput = input.querySelector('input');

    button.addEventListener('click', () => {
        if (textInput.value.trim()) {
            const commentsSection = input.closest('.project-comments');
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <img src="/api/placeholder/32/32" alt="User" class="comment-avatar">
                <div class="comment-content">
                    <span class="comment-author">You</span>
                    <p>${textInput.value}</p>
                </div>
            `;
            commentsSection.querySelector('.comments-preview').prepend(newComment);
            textInput.value = '';

            newComment.style.opacity = '0';
            newComment.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
                newComment.style.transition = 'all 0.3s ease';
                newComment.style.opacity = '1';
                newComment.style.transform = 'translateY(0)';
            });
        }
    });

    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') button.click();
    });
});

const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.project-feed-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const techStack = Array.from(card.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) ||
                           techStack.some(tech => tech.includes(searchTerm));
            
            card.style.display = matches ? 'block' : 'none';
        });
    });
}

const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    let page = 1;
    loadMoreBtn.addEventListener('click', async () => {
        try {
            loadMoreBtn.textContent = 'Loading...';
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const projectsGrid = document.querySelector('.projects-feed-grid');
            const template = document.querySelector('.project-feed-card').cloneNode(true);
            template.querySelector('h3').textContent = `New Project ${page + 1}`;
            projectsGrid.appendChild(template);
            
            page++;
            if (page >= 3) {
                loadMoreBtn.style.display = 'none';
            }
            
            loadMoreBtn.textContent = 'Load More Projects';
        } catch (error) {
            loadMoreBtn.textContent = 'Error Loading Projects';
        }
    });
}

document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('bookmarked');
        const icon = this.querySelector('i');
        if (this.classList.contains('bookmarked')) {
            icon.className = 'fas fa-bookmark';
        } else {
            icon.className = 'far fa-bookmark';
        }
    });
});

function animateStats() {
    document.querySelectorAll('.project-stats span').forEach(stat => {
        const value = parseInt(stat.textContent.match(/\d+/)[0]);
        let current = 0;
        const increment = value / 20;
        const interval = setInterval(() => {
            current += increment;
            if (current >= value) {
                current = value;
                clearInterval(interval);
            }
            stat.textContent = stat.textContent.replace(/\d+/, Math.round(current));
        }, 50);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.project-feed-card').forEach(card => {
    observer.observe(card);
});


const initializeMobileNav = () => {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbar = document.querySelector('.navbar'); // Thay đổi selector này
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbar && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbar.classList.toggle('active');
            navbarMenu.classList.toggle('active'); // Thêm toggle cho menu
        });

        // Thêm event listener cho các link trong menu
        document.querySelectorAll('.navbar-menu li a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initializeMobileNav();
});


