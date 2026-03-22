class SiteNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar" id="navbar">
        <ul class="nav-links">
          <li><a href="index.html" id="nav-home" data-text="Home">Home</a></li>
          <li class="dropdown">
            <a href="Portfolio.html" id="nav-portfolio" data-text="Portfolio">Portfolio</a>
            <div class="dropdown-content">
              <a href="GameHub.html">Games</a>
              <a href="Artworks.html">Artworks</a>
              <a href="Websites.html">Websites</a>
            </div>
          </li>
          <li><a href="About.html" id="nav-about" data-text="About">About</a></li>
          <li><a href="contact.html" id="nav-contact" data-text="Contact">Contact</a></li>
        </ul>
      </nav>
    `;

    // Initialize active tab dynamically based on loaded filename
    const currentPath = window.location.pathname.toLowerCase();
    
    // Defer a tiny bit just to ensure DOM elements from innerHTML are accessible
    setTimeout(() => {
      if (currentPath.includes('about.html')) {
        this.querySelector('#nav-about').classList.add('active');
      } else if (currentPath.includes('contact.html')) {
        this.querySelector('#nav-contact').classList.add('active');
      } else if (currentPath.includes('portfolio.html') || currentPath.includes('gamehub.html') || currentPath.includes('artworks.html') || currentPath.includes('websites.html')) {
        this.querySelector('#nav-portfolio').classList.add('active');
      } else if (currentPath.endsWith('/') || currentPath.includes('index.html')) {
        this.querySelector('#nav-home').classList.add('active');
      }
    }, 0);
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer" id="contact">
        <div class="footer-content">
          <h2 class="footer-title" data-text="LET'S COLLABORATE!">LET'S COLLABORATE!</h2>
          <a href="mailto:marcaceedu@gmail.com" class="footer-email">marcaceedu@gmail.com</a>
          
          <div class="footer-links">
            <a href="About.html" class="footer-link">know more about me</a>
            <a href="contact.html" class="footer-link">contact</a>
          </div>
        </div>
        
        <button id="btn-top" class="btn-top">[ TOP ]</button>
      </footer>
    `;

    // Attach the scroll-to-top behavior so it automatically works on every page
    const btnTop = this.querySelector('#btn-top');
    if (btnTop) {
      btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
}

// Define the custom elements so they can be used as <site-navbar> and <site-footer>
customElements.define('site-navbar', SiteNavbar);
customElements.define('site-footer', SiteFooter);

class SiteHeroSlideshow extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'TITLE';
    const subtitle = this.getAttribute('subtitle') || 'Subtitle text';
    
    this.innerHTML = `
      <section id="hero" class="slideshow-hero" aria-label="Portfolio Slideshow">
        <div id="slides-container" class="slides-container-scope"></div>
        <div class="slide-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title" data-text="${title}">${title}</h1>
          <p class="hero-subtitle">${subtitle}</p>
          <div class="social-bar">
            <a href="https://www.linkedin.com/in/marc-ace-rycell-edu-9aaa06236/" target="_blank" rel="noopener" aria-label="LinkedIn" id="social-linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://github.com/Soraaax277" target="_blank" rel="noopener" aria-label="GitHub" id="social-github">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://soraaax277.itch.io" target="_blank" rel="noopener" aria-label="itch.io" id="social-itch">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 245.37 220.8" fill="currentColor">
                <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.902-24.62 0 13.362 10.867 24.62 24.453 24.62 13.586 0 24.453-11.258 24.453-24.62 0 13.362 11.317 24.62 24.9 24.62h.9c13.583 0 24.9-11.258 24.9-24.62 0 13.362 10.867 24.62 24.454 24.62 13.584 0 24.454-11.258 24.454-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.198-90.695 1.365zm65.194 66.217c-2.253 6.8-8.813 11.688-16.337 11.688-9.145 0-16.756-7.46-16.756-16.88 0-.43.015-.856.045-1.278l.034-.43H64.17l.032.43c.03.422.046.848.046 1.278 0 9.42-7.612 16.88-16.757 16.88-7.67 0-14.318-5.087-16.44-12.147C7.777 88.16 5.437 127.9 4.12 166.96h237.13c-1.32-39.075-3.663-78.81-16.93-99.718-2.123 7.06-8.772 12.147-16.44 12.147-9.145 0-16.757-7.46-16.757-16.88 0-.43.015-.856.045-1.278l.033-.43h-6l.033.43c.03.422.044.848.044 1.278 0 9.42-7.613 16.88-16.756 16.88-7.524 0-14.084-4.89-16.337-11.688l-1.8-5.43H98.984l-1.8 5.43zM4.12 166.96c1.7 51.17 5.036 86.87 5.036 86.87h227.064s3.336-35.7 5.036-86.87H4.12z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/soraaa.arts/" target="_blank" rel="noopener" aria-label="Instagram" id="social-instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
        <div id="dot-container" class="dot-container"></div>
        <div class="slideshow-progress"><div id="progress-bar" class="progress-bar"></div></div>
        <div class="slide-caption" aria-live="polite">
          <span id="slide-caption-text" class="slide-caption-text"></span>
        </div>
        <!-- Scroll indicator -->
        <div class="scroll-indicator">
          <div class="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>
    `;

    this.initSlideshow();
  }

  initSlideshow() {
    const slides = [
      { src: 'Images/Index_Slideshow/TITLECARD (1).png',        caption: 'Title Card Art' },
      { src: 'Images/Index_Slideshow/MainMenuBG.png',           caption: 'Game Dev' },
      { src: 'Images/Index_Slideshow/UnderMyBlanketDigi.jpg',   caption: 'Digital Art' },
      { src: 'Images/Index_Slideshow/main menu bg.png',         caption: 'UI Design' },
      { src: 'Images/Index_Slideshow/Screenshot 2026-03-20 232829.png', caption: 'Project Showcase' },
      { src: 'Images/Index_Slideshow/Customer ID Thumbnail.png',caption: 'Multimedia' },
    ];

    const INTERVAL = 3000;
    const container   = this.querySelector('.slides-container-scope');
    const progressBar = this.querySelector('.progress-bar');
    const captionEl   = this.querySelector('.slide-caption-text');

    let current = 0;
    const slideEls = [];

    // Build slide DOM
    slides.forEach((s, i) => {
      const el = document.createElement('div');
      el.className = 'slide' + (i === 0 ? ' active' : '');
      el.style.backgroundImage = `url('${s.src}')`;
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', s.caption);
      container.appendChild(el);
      slideEls.push(el);
    });

    if (captionEl) captionEl.textContent = slides[0].caption;

    const startProgress = () => {
      if (!progressBar) return;
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        progressBar.style.transition = `width ${INTERVAL}ms linear`;
        progressBar.style.width = '100%';
      }));
    };

    const goTo = (index) => {
      // Remove active from old
      slideEls[current].classList.remove('active');
      slideEls[current].classList.add('exit');
      // Clean up exit after transition
      const old = slideEls[current];
      setTimeout(() => old.classList.remove('exit'), 1000);

      current = (index + slides.length) % slides.length;

      // Activate new slide
      slideEls[current].classList.add('active');
      if (captionEl) captionEl.textContent = slides[current].caption;
      startProgress();
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    // Un-stoppable auto-advance — nothing pauses it
    setInterval(next, INTERVAL);
    startProgress();

    // Touch swipe support
    let touchStartX = 0;
    container.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    container.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    }, { passive: true });
  }
}
customElements.define('site-hero-slideshow', SiteHeroSlideshow);
