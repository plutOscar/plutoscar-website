(() => {
  document.documentElement.classList.add('has-js');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.classList.toggle('open', !isOpen);
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const backToTop = document.querySelector('.back-to-top');
  const updateScrollUI = () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 480);
  };
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Portfolio filters and the search box support the ?q= search sent by the header.
  const projectCards = [...document.querySelectorAll('[data-project-card]')];
  if (projectCards.length) {
    const filterButtons = [...document.querySelectorAll('[data-filter]')];
    const searchInput = document.querySelector('[data-portfolio-search]');
    const emptyMessage = document.querySelector('[data-empty-results]');
    const urlQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (searchInput) searchInput.value = urlQuery;
    let activeFilter = 'all';

    const applyFilters = () => {
      const query = (searchInput?.value || '').trim().toLowerCase();
      let visibleCount = 0;
      projectCards.forEach(card => {
        const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
        const text = `${card.dataset.title || ''} ${card.dataset.description || ''} ${card.dataset.category || ''}`.toLowerCase();
        const searchMatch = !query || text.includes(query);
        const show = categoryMatch && searchMatch;
        card.hidden = !show;
        if (show) visibleCount += 1;
      });
      if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
    };

    filterButtons.forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      applyFilters();
    }));
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    applyFilters();
  }

  // Project image previews.
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-lightbox-image]').forEach(button => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.lightboxImage;
      lightboxImage.alt = button.dataset.lightboxAlt || button.getAttribute('aria-label') || 'Enlarged project screenshot';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
  lightbox?.querySelector('button')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });


})();
