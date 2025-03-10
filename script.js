document.addEventListener('DOMContentLoaded', function() {
    // Element selections
    const navLinks = document.querySelectorAll('.nav-links a');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const skillLevels = document.querySelectorAll('.skill-level');
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');

    // Animate elements on page load
    animateOnLoad();

    // Toggle navbar for mobile
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Animate links (optional on mobile)
        navLinkItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinkItems.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink(scrollPosition);
        
        // Animate skill bars when they come into view
        animateSkillBars();
        
        // Animate elements when they come into view
        animateOnScroll();
    }, { passive: true });

    // Portfolio filtering (if you have portfolio items)
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            portfolioFilters.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact form submission (placeholder for actual submission)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Message sent successfully!');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // Helper Functions
    function updateActiveNavLink(scrollPos) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }

    function animateSkillBars() {
        skillLevels.forEach(skill => {
            const skillPosition = skill.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (skillPosition < windowHeight * 0.8) {
                const skillValue = skill.parentElement.nextElementSibling.textContent;
                skill.style.width = skillValue;
            }
        });
    }

    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.service-card, .timeline-item, .portfolio-item');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.8) {
                element.classList.add('fade-in');
            }
        });
    }

    function animateOnLoad() {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            heroContent.classList.add('fade-in');
        }
        
        if (heroImage) {
            heroImage.classList.add('fade-in', 'delay-1');
        }
    }

    // Mouse cursor glow effect
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.pageX + 'px';
        cursorGlow.style.top = e.pageY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .timeline-content');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorGlow.classList.add('cursor-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('cursor-hover');
        });
    });

    // Add these styles for cursor glow
    const style = document.createElement('style');
    style.textContent = `
        .cursor-glow {
            position: absolute;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, rgba(16, 231, 247, 0.3), transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            transition: width 0.2s, height 0.2s, opacity 0.2s;
        }
        
        .cursor-hover {
            width: 50px;
            height: 50px;
            background: radial-gradient(circle, rgba(16, 231, 247, 0.5), transparent 70%);
        }
    `;
    document.head.appendChild(style);

    // Portfolio item modal functionality (if you have .portfolio-item)
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('portfolio-modal-container');
    document.body.appendChild(modalContainer);

    modalContainer.innerHTML = `
        <div class="portfolio-modal">
            <div class="modal-close">&times;</div>
            <div class="modal-content">
                <h3 class="modal-title"></h3>
                <div class="modal-image-container"></div>
                <div class="modal-description"></div>
                <div class="modal-details">
                    <p class="modal-category"></p>
                    <a href="#" class="modal-link" target="_blank">View Project</a>
                </div>
            </div>
        </div>
    `;

    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .portfolio-modal-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .portfolio-modal-container.active {
            display: flex;
            opacity: 1;
        }
        
        .portfolio-modal {
            background-color: #fff;
            border-radius: 8px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .portfolio-modal-container.active .portfolio-modal {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 28px;
            cursor: pointer;
            color: #555;
            transition: color 0.2s;
        }
        
        .modal-close:hover {
            color: #000;
        }
        
        .modal-title {
            margin-top: 0;
            margin-bottom: 20px;
            color: #333;
            font-size: 24px;
        }
        
        .modal-image-container {
            width: 100%;
            margin-bottom: 20px;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .modal-image-container img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .modal-description {
            margin-bottom: 20px;
            line-height: 1.6;
            color: #555;
        }
        
        .modal-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        
        .modal-category {
            background-color: #f5f5f5;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 14px;
            color: #666;
        }
        
        .modal-link {
            display: inline-block;
            background-color: #10e7f7;
            color: #fff;
            padding: 8px 20px;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.2s;
        }
        
        .modal-link:hover {
            background-color: #0bc5d4;
        }
    `;
    document.head.appendChild(modalStyle);

    const modal = document.querySelector('.portfolio-modal-container');
    const modalClose = document.querySelector('.modal-close');
    
    // Open modal when clicking portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.portfolio-title')?.textContent || 'Untitled';
            const category = this.getAttribute('data-category') || 'N/A';
            const imageSrc = this.querySelector('img')?.src || '';
            const description = this.getAttribute('data-description') || 'No description available.';
            const projectLink = this.getAttribute('data-link') || '#';
            
            document.querySelector('.modal-title').textContent = title;
            document.querySelector('.modal-category').textContent = category;
            document.querySelector('.modal-description').textContent = description;
            document.querySelector('.modal-link').href = projectLink;
            document.querySelector('.modal-image-container').innerHTML = `<img src="${imageSrc}" alt="${title}">`;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add back-to-top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #10e7f7;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s, background-color 0.3s;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            background-color: #0bc5d4;
        }
    `;
    document.head.appendChild(backToTopStyle);
    
    // Show/hide back-to-top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Lazy loading for images with data-src
    const images = document.querySelectorAll('img[data-src]');
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(image => {
        lazyLoadObserver.observe(image);
    });
    
    // Parallax-like slider effect for the timeline
    function handleTimelineScroll() {
      const timeline = document.querySelector('.timeline');
      if (!timeline) return;
      
      const rect = timeline.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2) - (window.innerHeight / 2);
      timeline.style.transform = `translateY(${-offset * 0.2}px)`;
    }
    window.addEventListener('scroll', handleTimelineScroll, { passive: true });

    // Social media linking functionality for WhatsApp, Instagram, and Gmail
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            let url;
            
            switch(platform) {
                case 'gmail':
                    url = 'https://mail.google.com/';
                    break;
                case 'whatsapp':
                    const phoneNumber = '+977982209162';
                    if (/Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)) {
                        url = `whatsapp://send?phone=${phoneNumber}`;
                    } else {
                        url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
                    }
                    break;
                case 'instagram':
                    const instaUsername = 'pariyarpooja7302024';
                    url = `https://www.instagram.com/${instaUsername}/`;
                    break;
                default:
                    console.warn('Unknown social platform:', platform);
                    return;
            }
            
            try {
                setTimeout(() => {
                    window.open(url, '_blank');
                }, 100);
            } catch (error) {
                console.error('Failed to open link:', error);
                window.location.href = url;
            }
        });
    });
});
