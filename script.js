const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  items.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

const leadCounter = document.querySelector('[data-lead-counter]');
if (leadCounter) {
  const leadFill = document.querySelector('[data-lead-fill]');
  const formatter = new Intl.NumberFormat('ru-RU');
  let leadCount = 45000;
  let fillLevel = 0.14;

  const updateCounter = () => {
    if (document.visibilityState !== 'visible') return;
    leadCount += 1;
    leadCounter.textContent = formatter.format(leadCount);
    fillLevel = Math.min(0.3, fillLevel + 0.00045);
    if (leadFill) leadFill.style.transform = `scaleY(${fillLevel})`;

    if (!reducedMotion) {
      leadCounter.animate([
        { opacity: 0.72, transform: 'translateY(8%)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 180,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
      });
    }
  };

  leadCounter.textContent = formatter.format(leadCount);
  window.setInterval(updateCounter, 1600);
}

const systemField = document.querySelector('[data-system-field]');
if (systemField) {
  const particleLayer = systemField.querySelector('[data-system-particles]');
  const bondLayer = systemField.querySelector('[data-system-bonds]');
  const particleCount = 30;
  const columns = 6;
  const rows = 5;
  const particles = [];
  const bonds = [];
  let hasPlayed = false;

  const random = (() => {
    let seed = 1731;
    return () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  })();

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'system-particle';
    particle.dataset.chaosX = String(0.08 + random() * 0.84);
    particle.dataset.chaosY = String(0.15 + random() * 0.7);
    particleLayer.appendChild(particle);
    particles.push(particle);
  }

  const addBond = (column, row, lengthInSteps, rotation) => {
    const bond = document.createElement('span');
    bond.className = 'system-bond';
    bond.dataset.column = String(column);
    bond.dataset.row = String(row);
    bond.dataset.length = String(lengthInSteps);
    bond.dataset.rotation = String(rotation);
    bondLayer.appendChild(bond);
    bonds.push(bond);
  };

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns - 1; column += 1) addBond(column, row, 1, 0);
  }
  for (let row = 0; row < rows - 1; row += 1) {
    for (let column = 0; column < columns; column += 1) addBond(column, row, 1, 90);
  }

  const getLayout = () => {
    const width = systemField.clientWidth;
    const height = systemField.clientHeight;
    const insetX = Math.max(34, width * 0.12);
    const insetY = Math.max(54, height * 0.2);
    return {
      width,
      height,
      insetX,
      insetY,
      stepX: (width - insetX * 2) / (columns - 1),
      stepY: (height - insetY * 2) / (rows - 1)
    };
  };

  const placeFinalState = () => {
    const layout = getLayout();
    particles.forEach((particle, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      particle.style.transform = `translate(${layout.insetX + column * layout.stepX}px, ${layout.insetY + row * layout.stepY}px)`;
      particle.style.opacity = '1';
    });
    bonds.forEach((bond) => {
      const x = layout.insetX + Number(bond.dataset.column) * layout.stepX;
      const y = layout.insetY + Number(bond.dataset.row) * layout.stepY;
      const vertical = Number(bond.dataset.rotation) === 90;
      bond.style.width = `${vertical ? layout.stepY : layout.stepX}px`;
      bond.style.transform = `translate(${x}px, ${y}px) rotate(${vertical ? 90 : 0}deg) scaleX(1)`;
      bond.style.opacity = '0.24';
    });
  };

  const playSystemAnimation = () => {
    if (hasPlayed) return;
    hasPlayed = true;
    const layout = getLayout();

    particles.forEach((particle, index) => {
      const chaosX = Number(particle.dataset.chaosX) * layout.width;
      const chaosY = Number(particle.dataset.chaosY) * layout.height;
      const column = index % columns;
      const row = Math.floor(index / columns);
      const targetX = layout.insetX + column * layout.stepX;
      const targetY = layout.insetY + row * layout.stepY;
      const finalTransform = `translate(${targetX}px, ${targetY}px)`;

      particle.style.transform = finalTransform;
      particle.style.opacity = '1';
      particle.animate([
        { transform: `translate(${chaosX}px, ${chaosY}px)`, opacity: 0.42 },
        { transform: finalTransform, opacity: 1 }
      ], {
        duration: 2400,
        delay: index * 30,
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)',
        fill: 'both'
      });
    });

    bonds.forEach((bond) => {
      const x = layout.insetX + Number(bond.dataset.column) * layout.stepX;
      const y = layout.insetY + Number(bond.dataset.row) * layout.stepY;
      const vertical = Number(bond.dataset.rotation) === 90;
      const baseTransform = `translate(${x}px, ${y}px) rotate(${vertical ? 90 : 0}deg)`;
      bond.style.width = `${vertical ? layout.stepY : layout.stepX}px`;
      bond.style.transform = `${baseTransform} scaleX(1)`;
      bond.style.opacity = '0.24';
      bond.animate([
        { transform: `${baseTransform} scaleX(0)`, opacity: 0 },
        { transform: `${baseTransform} scaleX(1)`, opacity: 0.24 }
      ], {
        duration: 500,
        delay: 2050,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fill: 'both'
      });
    });
  };

  if (reducedMotion || !('IntersectionObserver' in window) || !Element.prototype.animate) {
    placeFinalState();
  } else {
    particles.forEach((particle) => {
      const layout = getLayout();
      particle.style.transform = `translate(${Number(particle.dataset.chaosX) * layout.width}px, ${Number(particle.dataset.chaosY) * layout.height}px)`;
    });
    const systemObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        playSystemAnimation();
        systemObserver.disconnect();
      }
    }, { threshold: 0.35 });
    systemObserver.observe(systemField);
  }

  window.addEventListener('resize', () => {
    if (hasPlayed || reducedMotion) {
      particles.forEach((particle) => particle.getAnimations().forEach((animation) => animation.cancel()));
      bonds.forEach((bond) => bond.getAnimations().forEach((animation) => animation.cancel()));
      placeFinalState();
    }
  });
}

const textEditor = document.querySelector('[data-text-editor]');
const textEditModeEnabled = new URLSearchParams(window.location.search).get('edit') === '1';
if (textEditor && textEditModeEnabled) {
  textEditor.hidden = false;
  const storageKey = 'portfolio-text-edits-v1';
  const editableSelector = [
    '.wordmark',
    '.site-nav nav a',
    '.nav-contact',
    '.eyebrow',
    '.mini-title',
    '.hero-copy h1',
    '.hero-copy .positioning',
    '.hero-actions .button span',
    '.hero-meta p',
    '.section-title > p',
    '.section-title h2',
    '.system-field-labels span',
    '.case-number',
    '.case-intro > p',
    '.case-intro h3',
    '.case-outcome h4',
    '.case-outcome p',
    '.case-details summary',
    '.case-details details p',
    '.lead-counter p',
    '.metric strong',
    '.metric p',
    '.summary > p',
    '.capability h3',
    '.capability p',
    '.job time',
    '.job h3',
    '.job p',
    '.samples-heading h2',
    '.samples-heading > p',
    '.sample-card .sample-index',
    '.sample-card .sample-type',
    '.sample-card strong',
    '.contact-main h2',
    '.contact-main > p',
    '.contact-side > p',
    '.contact-links a span'
  ].join(',');
  const editableItems = Array.from(document.querySelectorAll(editableSelector))
    .filter((item) => !item.matches('[data-lead-counter]'));
  const toggleButton = textEditor.querySelector('[data-edit-toggle]');
  const actions = textEditor.querySelector('[data-edit-actions]');
  const saveButton = textEditor.querySelector('[data-edit-save]');
  const cancelButton = textEditor.querySelector('[data-edit-cancel]');
  const status = textEditor.querySelector('[data-edit-status]');
  let isEditing = false;
  let sessionSnapshot = {};
  let statusTimer;

  editableItems.forEach((item, index) => {
    item.dataset.editId = `text-${index + 1}`;
  });

  const sanitizeHTML = (html) => {
    const template = document.createElement('template');
    const output = document.createElement('div');
    template.innerHTML = html;

    const appendClean = (node, parent) => {
      if (node.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(node.textContent || ''));
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      if (node.tagName === 'BR') {
        parent.appendChild(document.createElement('br'));
        return;
      }
      if (node.tagName === 'STRONG' || node.tagName === 'EM') {
        const cleanElement = document.createElement(node.tagName.toLowerCase());
        node.childNodes.forEach((child) => appendClean(child, cleanElement));
        parent.appendChild(cleanElement);
        return;
      }
      if ((node.tagName === 'DIV' || node.tagName === 'P') && parent.childNodes.length && parent.lastChild?.nodeName !== 'BR') {
        parent.appendChild(document.createElement('br'));
      }
      node.childNodes.forEach((child) => appendClean(child, parent));
      if ((node.tagName === 'DIV' || node.tagName === 'P') && parent.lastChild?.nodeName !== 'BR') {
        parent.appendChild(document.createElement('br'));
      }
    };

    template.content.childNodes.forEach((node) => appendClean(node, output));
    while (output.lastChild?.nodeName === 'BR') output.lastChild.remove();
    return output.innerHTML;
  };

  const showStatus = (message) => {
    window.clearTimeout(statusTimer);
    status.textContent = message;
    statusTimer = window.setTimeout(() => {
      status.textContent = '';
    }, 3200);
  };

  const loadSavedText = () => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || '{}');
      editableItems.forEach((item) => {
        const value = saved[item.dataset.editId];
        if (typeof value === 'string') item.innerHTML = sanitizeHTML(value);
      });
    } catch {
      showStatus('Сохранённый текст не удалось загрузить');
    }
  };

  const finishEditing = () => {
    isEditing = false;
    document.body.classList.remove('text-editing');
    editableItems.forEach((item) => {
      item.removeAttribute('contenteditable');
      item.removeAttribute('spellcheck');
    });
    toggleButton.hidden = false;
    toggleButton.setAttribute('aria-pressed', 'false');
    actions.hidden = true;
  };

  const beginEditing = () => {
    sessionSnapshot = Object.fromEntries(editableItems.map((item) => [item.dataset.editId, item.innerHTML]));
    isEditing = true;
    document.body.classList.add('text-editing');
    editableItems.forEach((item) => {
      item.setAttribute('contenteditable', 'true');
      item.setAttribute('spellcheck', 'true');
    });
    toggleButton.hidden = true;
    toggleButton.setAttribute('aria-pressed', 'true');
    actions.hidden = false;
    editableItems[0]?.focus();
  };

  const saveText = () => {
    try {
      const saved = {};
      editableItems.forEach((item) => {
        const cleanValue = sanitizeHTML(item.innerHTML);
        item.innerHTML = cleanValue;
        saved[item.dataset.editId] = cleanValue;
      });
      window.localStorage.setItem(storageKey, JSON.stringify(saved));
      finishEditing();
      showStatus('Текст сохранён в этом браузере');
    } catch {
      showStatus('Не удалось сохранить текст');
    }
  };

  const cancelEditing = () => {
    editableItems.forEach((item) => {
      if (typeof sessionSnapshot[item.dataset.editId] === 'string') item.innerHTML = sessionSnapshot[item.dataset.editId];
    });
    finishEditing();
    showStatus('Изменения отменены');
  };

  toggleButton.addEventListener('click', beginEditing);
  saveButton.addEventListener('click', saveText);
  cancelButton.addEventListener('click', cancelEditing);
  document.addEventListener('click', (event) => {
    if (!isEditing || !event.target.closest('[contenteditable="true"]')) return;
    if (event.target.closest('a, summary')) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  document.addEventListener('keydown', (event) => {
    if (!isEditing) return;
    if (event.key === 'Escape') cancelEditing();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      saveText();
    }
  });

  loadSavedText();
}
