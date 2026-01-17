(() => {
  const toggleButtons = document.querySelectorAll('.navbar-toggler');
  toggleButtons.forEach((button) => {
    const targetSelector = button.getAttribute('data-target');
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const setExpanded = (expanded) => {
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      target.classList.toggle('show', expanded);
    };

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      setExpanded(!isExpanded);
    });

    target.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;
      if (window.matchMedia('(min-width: 992px)').matches) return;
      setExpanded(false);
    });
  });
})();
