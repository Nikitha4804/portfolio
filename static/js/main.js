// Handle active navigation links based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const homeSection = document.querySelector('#home');
        const educationSection = document.querySelector('#education');
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        const educationBottom = educationSection.offsetTop + educationSection.offsetHeight;
        
        if (window.scrollY < homeBottom || 
            (window.scrollY >= educationSection.offsetTop && window.scrollY < educationBottom)) {
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Modal Functions
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Automatically close after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
} 
// Function to Open Modal and Show Image
function openModal(imageSrc) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImage");

    if (modal && modalImg) {
        modal.style.display = "flex";  // Show modal
        modalImg.src = imageSrc;  // Set image source
    } else {
        console.error("Modal or Image Element Not Found!");
    }
}

// Function to Close Modal
function closeModal() {
    let modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}
function openModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImage = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImage.src = imageSrc;
}

function closeModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.submit-btn');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/send_email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (data.status === 'success') {
                    alert('Message sent successfully!');
                    this.reset();
                } else {
                    alert(data.message || 'Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            }
        });
    }
});

// Resume Viewer Functions
function openResumeViewer() {
    const modal = document.getElementById('resume-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeResumeViewer() {
    const modal = document.getElementById('resume-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('resume-modal');
    if (event.target === modal) {
        closeResumeViewer();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeResumeViewer();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
