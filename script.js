document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. NAVBAR LIQUID GLASS MOUSE TRACKING
       ========================================================================= */
    const navbar = document.getElementById('navbar');

    navbar.addEventListener('mousemove', (e) => {
        const rect = navbar.getBoundingClientRect();
        // Calculate mouse position relative to the navbar
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for the pseudo element to track
        navbar.style.setProperty('--mouse-x', `${x}px`);
        navbar.style.setProperty('--mouse-y', `${y}px`);
    });

    navbar.addEventListener('mouseleave', () => {
        // Reset or gently hide when mouse leaves
        navbar.style.setProperty('--mouse-x', `50%`);
        navbar.style.setProperty('--mouse-y', `50%`);
    });


    /* =========================================================================
       2. BACKGROUND FLOATING LINES (CANVAS) -> Moved to floatingLines.js
       ========================================================================= */

    /* =========================================================================
       3. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* =========================================================================
       4. COUNTER ANIMATION FOR METRICS
       ========================================================================= */
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true; // Prevents re-triggering
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const prefix = counter.getAttribute('data-prefix') || '';
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000; // 2 seconds
                    const fps = 60;
                    const frames = duration / (1000 / fps);
                    const increment = target / frames;
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            // Check if target has decimals (like 99.999)
                            if (target % 1 !== 0) {
                                counter.innerText = prefix + current.toFixed(3) + suffix;
                            } else {
                                counter.innerText = prefix + Math.ceil(current) + suffix;
                            }
                            requestAnimationFrame(updateCounter);
                        } else {
                            if (target % 1 !== 0) {
                                counter.innerText = prefix + target.toFixed(3) + suffix;
                            } else {
                                counter.innerText = prefix + target + suffix;
                            }
                        }
                    };

                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe the metrics section to trigger counters
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) {
        counterObserver.observe(metricsSection);
    }


    /* =========================================================================
       5. PROTOCOL TIMELINE Scroll Line Drawing & Active States
       ========================================================================= */
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineContainer && timelineProgress) {
        window.addEventListener('scroll', () => {
            const containerRect = timelineContainer.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;
            const windowHeight = window.innerHeight;

            // Calculate how far down the timeline we've scrolled
            // Start filling line when top of timeline hits middle of screen
            const triggerPoint = windowHeight / 2; 
            
            if (containerTop < triggerPoint) {
                let scrollPercentage = (triggerPoint - containerTop) / containerHeight;
                scrollPercentage = Math.max(0, Math.min(1, scrollPercentage));
                timelineProgress.style.height = `${scrollPercentage * 100}%`;
                
                // Set active states on timeline items based on scroll progression
                timelineItems.forEach((item, index) => {
                    // Approximate position of each item relative to total height
                    const itemPosition = (index + 0.5) / timelineItems.length;
                    if (scrollPercentage >= itemPosition - 0.1) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });

            } else {
                timelineProgress.style.height = `0%`;
                timelineItems.forEach(item => item.classList.remove('active'));
            }
        });
    }
});
