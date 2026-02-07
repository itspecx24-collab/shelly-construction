// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Smooth Scrolling for Anchor Links
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

    // Project Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
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
    }

    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const closeModalButtons = document.querySelectorAll('.close-modal, .close-modal-btn');

    // Project data
    const projectData = {
        1: {
            title: 'Modern Villa',
            category: 'Residential Construction',
            description: 'A stunning contemporary villa featuring clean lines, expansive glass walls, and seamless indoor-outdoor living spaces. This luxury home includes 5 bedrooms, a home theater, and a infinity pool.',
            duration: '8 months',
            location: 'Beverly Hills, CA',
            services: 'General Construction, Interior Design, Landscaping',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        2: {
            title: 'Office Complex',
            category: 'Commercial Construction',
            description: 'A modern 10-story office building with sustainable design features, smart building technology, and flexible workspace solutions. Includes underground parking and rooftop garden.',
            duration: '14 months',
            location: 'Downtown, NY',
            services: 'General Construction, Electrical, Plumbing, HVAC',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        3: {
            title: 'Home Renovation',
            category: 'Residential Renovation',
            description: 'Complete transformation of a 1970s ranch house into a modern open-concept living space. Features include kitchen remodel, bathroom updates, and energy-efficient upgrades.',
            duration: '3 months',
            location: 'Austin, TX',
            services: 'Renovation, Kitchen Remodel, Bathroom Update',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        4: {
            title: 'Luxury Apartment',
            category: 'Residential Construction',
            description: 'High-end apartment complex with premium finishes, smart home technology, and resort-style amenities including pool, fitness center, and concierge services.',
            duration: '18 months',
            location: 'Miami, FL',
            services: 'General Construction, Interior Finishes, Amenities',
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        5: {
            title: 'Retail Center',
            category: 'Commercial Construction',
            description: 'Modern shopping center with sustainable design, ample parking, and flexible retail spaces. Features include solar panels, rainwater harvesting, and electric vehicle charging stations.',
            duration: '12 months',
            location: 'Seattle, WA',
            services: 'General Construction, Sustainable Design, Site Development',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        6: {
            title: 'Kitchen Remodel',
            category: 'Residential Renovation',
            description: 'Complete kitchen renovation with custom cabinetry, high-end appliances, quartz countertops, and a large island with seating. Modern design with optimal workflow.',
            duration: '6 weeks',
            location: 'Denver, CO',
            services: 'Kitchen Remodel, Custom Cabinetry, Countertops',
            image: 'https://images.unsplash.com/photo-1600566753376-12c8ac737b99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        7: {
            title: 'Beach House',
            category: 'Residential Construction',
            description: 'Coastal beach house designed to withstand hurricanes while maximizing ocean views. Features include impact-resistant windows, elevated foundation, and outdoor living spaces.',
            duration: '10 months',
            location: 'Malibu, CA',
            services: 'General Construction, Coastal Design, Outdoor Living',
            image: 'https://images.unsplash.com/photo-1600566753376-12c8ac737b99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        8: {
            title: 'Industrial Warehouse',
            category: 'Commercial Construction',
            description: 'Large-scale warehouse facility with modern logistics systems, loading docks, office spaces, and energy-efficient systems. Designed for optimal workflow and storage.',
            duration: '16 months',
            location: 'Chicago, IL',
            services: 'Industrial Construction, Logistics Design, Electrical',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        9: {
            title: 'Bathroom Renovation',
            category: 'Residential Renovation',
            description: 'Luxury bathroom renovation with spa-like features including walk-in shower, soaking tub, heated floors, and custom vanity with premium fixtures.',
            duration: '4 weeks',
            location: 'Portland, OR',
            services: 'Bathroom Renovation, Plumbing, Tile Work',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
    };

    viewProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project && modal) {
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalCategory').textContent = project.category;
                document.getElementById('modalDescription').textContent = project.description;
                document.getElementById('modalDuration').textContent = project.duration;
                document.getElementById('modalLocation').textContent = project.location;
                document.getElementById('modalServices').textContent = project.services;
                document.getElementById('modalImage').src = project.image;
                document.getElementById('modalImage').alt = project.title;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            faqQuestions.forEach(q => {
                q.parentElement.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Note: Formspree endpoint is now configured
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                formMessage.textContent = 'Oops! Something went wrong. Please try again or contact us directly.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .feature-item, .team-member, .benefit-item, .process-step');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    
    let statsAnimated = false;
    
    const animateStats = () => {
        if (statsAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current) + (stat.textContent.includes('%') ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                }
            };
            
            updateCounter();
        });
        
        statsAnimated = true;
    };
    
    // Trigger stats animation when in view
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Smooth reveal for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-content');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                parallax.style.opacity = 1 - scrolled / 600;
            }
        });
    }

    // Add hover effect to cards
    const cards = document.querySelectorAll('.service-card, .project-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Initialize tooltips (if needed)
    const initTooltips = () => {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = e.target.getAttribute('data-tooltip');
                tooltip.style.position = 'absolute';
                tooltip.style.background = 'var(--bg-light)';
                tooltip.style.color = 'var(--text-light)';
                tooltip.style.padding = '8px 12px';
                tooltip.style.borderRadius = '6px';
                tooltip.style.fontSize = '14px';
                tooltip.style.zIndex = '1000';
                tooltip.style.pointerEvents = 'none';
                
                document.body.appendChild(tooltip);
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            });
            
            element.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    };

    // Initialize everything when DOM is ready
    initTooltips();

    // Console log for debugging
    console.log('Shelly Construction website loaded successfully!');
});

// Utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Performance optimization for scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 100));

// Resize handler with debounce
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}, 250));
