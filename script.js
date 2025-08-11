document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const backToTopButton = document.querySelector('.back-to-top');

    // --- Navbar, Back to Top Button, and Active Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksForScroll = document.querySelectorAll('#nav-links a');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Toggle .scrolled class on navbar
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                if (backToTopButton) backToTopButton.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                if (backToTopButton) backToTopButton.classList.remove('visible');
            }

            // Highlight active nav link
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksForScroll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' }); // Asymmetrical margin to feel more natural

    sections.forEach(section => scrollObserver.observe(section));


    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
            // Add/remove class to body to prevent scrolling
            document.body.classList.toggle('body-no-scroll');
            const isExpanded = navLinks.classList.contains('nav-active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                     // Re-enable scrolling
                    document.body.classList.remove('body-no-scroll');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
    
    // --- Animate on Scroll ---
    const scrollAnimationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollAnimationObserver.observe(el);
    });

    // --- Modern Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formMessage = contactForm.querySelector('.form-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Basic validation
            const name = this.elements.name.value.trim();
            const email = this.elements.email.value.trim();
            const message = this.elements.message.value.trim();

            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill out all fields before sending.';
                formMessage.style.color = 'var(--error)';
                return;
            }

            // If validation passes, simulate sending
            formMessage.textContent = '';
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network delay
            setTimeout(() => {
                this.reset();
                
                // Success feedback
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'var(--success)';
                formMessage.textContent = 'Thank you! I will get back to you shortly.';
                formMessage.style.color = 'var(--success)';
                
                // Reset form state after a few seconds
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = ''; // Resets to CSS-defined style
                    formMessage.textContent = '';
                }, 4000);
            }, 1500);
        });
    }
    
    // --- Dynamic Copyright Year ---
    const copyright = document.getElementById('copyright');
    if (copyright) {
        copyright.innerHTML = `&copy; ${new Date().getFullYear()} Pankaj Maurya. Built with passion and modern web technologies.`;
    }

});