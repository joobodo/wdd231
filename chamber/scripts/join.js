document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('#menu-button');
  const siteNav = document.querySelector('#site-nav');
  const currentYear = document.querySelector('#current-year');
  const lastModified = document.querySelector('#last-modified');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = document.lastModified;
  }

  if (menuButton && siteNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      menuButton.textContent = isOpen ? '×' : '☰';
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
  }

  const form = document.querySelector('.membership-form');
  if (form) {
    const timestampField = document.querySelector('#timestamp');
    if (timestampField) {
      timestampField.value = new Date().toISOString();
    }
  }

  const modalLinks = document.querySelectorAll('.membership-link');
  const modals = document.querySelectorAll('.membership-modal');

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const panel = modal.querySelector('.modal-panel');
    if (panel) panel.focus();
  }

  modalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('data-target');
      const modal = document.getElementById(targetId);
      openModal(modal);
    });
  });

  modals.forEach((modal) => {
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => closeModal(modal));
    }

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modals.forEach((modal) => closeModal(modal));
    }
  });

  const thankYouFields = document.querySelectorAll('[data-field]');
  if (thankYouFields.length) {
    const params = new URLSearchParams(window.location.search);

    thankYouFields.forEach((field) => {
      const key = field.dataset.field;
      const value = params.get(key);

      if (value) {
        if (key === 'timestamp') {
          const date = new Date(value);
          field.textContent = Number.isNaN(date.getTime()) ? value : date.toLocaleString();
        } else {
          field.textContent = value;
        }
      }
    });
  }
});
