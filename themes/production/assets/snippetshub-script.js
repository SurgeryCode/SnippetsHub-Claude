document.addEventListener('DOMContentLoaded', () => {
    // 0. Theme Toggle & Mobile Menu
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.site-header');

    // Theme Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            let newTheme = 'light';

            // Determine current effective theme
            const isDark = currentTheme === 'dark' || (!currentTheme && systemDark);

            if (isDark) {
                newTheme = 'light';
            } else {
                newTheme = 'dark';
            }

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Header Scroll Effect (v7) - Optimized with RAF
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    if (mobileToggle && navLinks) {
        const closeMobileMenu = () => {
            navLinks.classList.remove('active');
            mobileToggle.textContent = '☰';
            mobileToggle.setAttribute('aria-expanded', 'false');
        };

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Switch Icon
            if (navLinks.classList.contains('active')) {
                mobileToggle.textContent = '✕';
                mobileToggle.setAttribute('aria-expanded', 'true');
            } else {
                closeMobileMenu();
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside the menu panel and toggle button
        document.addEventListener('click', (event) => {
            if (!navLinks.classList.contains('active')) return;

            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = mobileToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMobileMenu();
            }
        });
    }

    // 1. Filtering Logic (Explore Marketplace)
    const filterSections = document.querySelectorAll('[data-filtering-section]');

    filterSections.forEach(section => {
        const filterBtns = section.querySelectorAll('.filter-btn');
        const snippetCards = section.querySelectorAll('.snippet-card');

        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update Active State within this section only
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.getAttribute('data-filter');

                    snippetCards.forEach(card => {
                        const category = card.getAttribute('data-category');
                        // Always find the immediate child of the grid container
                        const gridItem = card.closest('.grid__item') || card.parentElement;

                        // Reset Animation State
                        gridItem.style.transition = 'none';
                        gridItem.style.opacity = '0';
                        gridItem.style.transform = 'translateY(10px)';

                        if (filter === 'all' || (category && category.includes(filter))) {
                            gridItem.style.display = 'block'; 

                            // Trigger reflow
                            void gridItem.offsetWidth;

                            // Apply Animate In
                            gridItem.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                            gridItem.style.opacity = '1';
                            requestAnimationFrame(() => {
                                gridItem.style.transform = 'translateY(0)';
                            });
                        } else {
                            gridItem.style.display = 'none';
                        }
                    });
                });
            });
        }
    });

    // 2. Scroll to Top Logic
    const scrollBtn = document.getElementById('scrollToTop');

    if (scrollBtn) {
        let isScrollBtnVisible = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        if (!isScrollBtnVisible) {
                            scrollBtn.classList.add('visible');
                            isScrollBtnVisible = true;
                        }
                    } else {
                        if (isScrollBtnVisible) {
                            scrollBtn.classList.remove('visible');
                            isScrollBtnVisible = false;
                        }
                    }
                });
            }
        }, { passive: true });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileToggle) {
                        mobileToggle.textContent = '☰';
                        mobileToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // 4. Landing Page Sticky Bar Logic
    const stickyBar = document.querySelector('.sticky-bottom-bar');
    const heroSection = document.querySelector('.landing-hero') || document.querySelector('.hero-section');

    if (stickyBar && heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Hero scrolled out, show bar
                    stickyBar.classList.add('visible');
                } else {
                    // Hero visible, hide bar
                    stickyBar.classList.remove('visible');
                }
            });
        }, {
            threshold: 0,
            rootMargin: "-100px"
        });

        observer.observe(heroSection);
    }

    // 5. Landing Page Tabs Logic
    const tabs = document.querySelectorAll('.tab-pill');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Reset active state for tabs
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Determine target content ID based on tab data or index
                // Assuming content IDs match tab data-tab attribute
                const targetId = tab.dataset.tab;

                // Hide all tab contents
                document.querySelectorAll('.tab-content-panel').forEach(panel => {
                    panel.style.display = 'none';
                });

                // Show target
                const targetContent = document.getElementById(targetId + '-content'); // e.g. features-content
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
            });
        });
    }
});
