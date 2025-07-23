 // Scroll animation for game cards
            document.addEventListener('DOMContentLoaded', function () {
                const gameCards = document.querySelectorAll('.game-card');

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                });

                gameCards.forEach(card => {
                    observer.observe(card);
                });
            });
                 // Page Loader Functionality
        const pageLoader = document.getElementById('pageLoader');
        const loaderProgress = document.getElementById('loaderProgress');
        const body = document.body;

        // Simulate loading progress with GSAP
        gsap.to(loaderProgress, {
            width: "100%",
            duration: 3.5,
            ease: "power2.inOut",
            onComplete: () => {
                // Hide loader with fade out animation
                gsap.to(pageLoader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    onComplete: () => {
                        pageLoader.style.display = "none";
                        body.style.overflow = "auto";
                        initAnimations();
                    }
                });
            }
        });

        // Initialize animations and functionality
        function initAnimations() {
            // Register GSAP plugins
            gsap.registerPlugin(ScrollTrigger);

            // Animate elements on scroll
            gsap.utils.toArray('section').forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    stagger: 0.2
                });
            });

            // Animate service cards
            gsap.utils.toArray('.service-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%'
                    },
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    delay: i * 0.1
                });
            });

            // Animate team members
            gsap.utils.toArray('.team-member').forEach((member, i) => {
                gsap.from(member, {
                    scrollTrigger: {
                        trigger: member,
                        start: 'top 85%'
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    delay: i * 0.15
                });
            });

            // Header background animation on scroll
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Active link highlight
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - sectionHeight / 3)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
            });

            // Magnetic button effect
            const magneticBtn = document.querySelector('.magnetic');
            if (magneticBtn) {
                magneticBtn.addEventListener('mousemove', (e) => {
                    const rect = magneticBtn.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const deltaX = (x - centerX) / centerX * 10;
                    const deltaY = (y - centerY) / centerY * 10;

                    gsap.to(magneticBtn, {
                        x: deltaX,
                        y: deltaY,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                });

                magneticBtn.addEventListener('mouseleave', () => {
                    gsap.to(magneticBtn, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.5)"
                    });
                });
            }

            // Hover effect for nav links
            navLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link.querySelector('i'), {
                        scale: 1.4,
                        rotate: 12,
                        duration: 0.3
                    });
                });

                link.addEventListener('mouseleave', () => {
                    gsap.to(link.querySelector('i'), {
                        scale: 1,
                        rotate: 0,
                        duration: 0.3
                    });
                });
            });
        }

        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navList = document.querySelector('.nav-list');

        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
            mobileMenuBtn.innerHTML = navList.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    navList.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Scroll Button
        const scrollBtn = document.getElementById("scrollBtn");

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('active');
            } else {
                scrollBtn.classList.remove('active');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        // Smooth scrolling for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate stats counting
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const observerOptions = {
                threshold: 0.5,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const stat = entry.target;
                        const target = parseInt(stat.getAttribute('data-count'));
                        const duration = 2000;
                        let start = 0;

                        const counter = () => {
                            const increment = target / (duration / 16);
                            start += increment;
                            if (start < target) {
                                stat.textContent = Math.ceil(start);
                                requestAnimationFrame(counter);
                            } else {
                                stat.textContent = target;
                            }
                        };

                        requestAnimationFrame(counter);
                        observer.unobserve(stat);
                    }
                });
            }, observerOptions);

            statNumbers.forEach(stat => {
                observer.observe(stat);
            });
        }

        // Initialize stats animation
        document.addEventListener('DOMContentLoaded', animateStats);

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                // Form submission logic would go here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }