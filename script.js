const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-nav');

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  menu.classList.remove('is-open');
}

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  menu.classList.toggle('is-open', open);
});
menu.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});

// O pulso só inicia quando a área ilustrada de Serviços entra na tela.
const services = document.querySelector('.services');
if (services && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    services.classList.toggle('is-visible', entries[0].isIntersecting);
  }, { threshold: 0.12 });
  observer.observe(services);
} else if (services) {
  services.classList.add('is-visible');
}

// A data mínima usa o calendário local de Santa Catarina, inclusive perto da meia-noite.
function minimumScheduleDate(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now).filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day + 1)).toISOString().slice(0, 10);
}

function buildQuoteMessage(data) {
  const lines = [
    'Olá! Vim através do site, preciso de atendimento.',
    `Nome: ${data.name}`,
    `Cidade: ${data.city}`,
    `Tipo de imóvel: ${data.property}`,
    `Problema: ${data.problem}`,
    `Atendimento: ${data.timing}`
  ];
  if (data.timing === 'Agendado') {
    const [year, month, day] = data.date.split('-');
    lines.push(`Data: ${day}/${month}/${year}`);
  }
  if (data.details) lines.push(`Detalhes: ${data.details}`);
  return lines.join('\n');
}

const quoteForm = document.querySelector('#quote-form');
if (quoteForm) {
  const fields = {
    name: quoteForm.querySelector('#quote-name'),
    city: quoteForm.querySelector('#quote-city'),
    otherCity: quoteForm.querySelector('#quote-other-city'),
    property: quoteForm.querySelector('#quote-property'),
    problem: quoteForm.querySelector('#quote-problem'),
    timing: quoteForm.querySelector('#quote-timing'),
    date: quoteForm.querySelector('#quote-date'),
    details: quoteForm.querySelector('#quote-details')
  };
  const scheduleField = quoteForm.querySelector('#schedule-field');
  const timingField = quoteForm.querySelector('#timing-field');
  const otherCityField = quoteForm.querySelector('#other-city-field');

  function showError(field, message) {
    const error = quoteForm.querySelector(`#${field.id}-error`);
    error.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }
  function clearError(field) {
    const error = quoteForm.querySelector(`#${field.id}-error`);
    if (error) error.textContent = '';
    field.removeAttribute('aria-invalid');
  }
  function updateSchedule() {
    const scheduled = fields.timing.value === 'Agendado';
    scheduleField.hidden = !scheduled;
    timingField.classList.toggle('is-full', !scheduled);
    fields.date.required = scheduled;
    fields.date.min = minimumScheduleDate();
    if (!scheduled) {
      fields.date.value = '';
      clearError(fields.date);
    }
  }

  function updateOtherCity() {
    const other = fields.city.value === 'Outra cidade';
    otherCityField.hidden = !other;
    fields.otherCity.required = other;
    if (!other) {
      fields.otherCity.value = '';
      clearError(fields.otherCity);
    }
  }

  Object.values(fields).forEach(field => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });
  fields.timing.addEventListener('change', updateSchedule);
  fields.city.addEventListener('change', updateOtherCity);
  updateSchedule();
  updateOtherCity();

  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    updateSchedule();
    updateOtherCity();
    let firstInvalid = null;
    const required = [fields.name, fields.city, fields.property, fields.problem, fields.timing];
    required.forEach(field => {
      if (!field.value.trim()) {
        showError(field, field === fields.name ? 'Informe seu nome.' : 'Selecione uma opção.');
        firstInvalid ||= field;
      } else clearError(field);
    });
    if (fields.city.value === 'Outra cidade') {
      if (!fields.otherCity.value.trim()) {
        showError(fields.otherCity, 'Informe a cidade do atendimento.');
        firstInvalid ||= fields.otherCity;
      } else clearError(fields.otherCity);
    }
    if (fields.timing.value === 'Agendado') {
      const minimum = fields.date.min;
      if (!fields.date.value) {
        showError(fields.date, 'Escolha uma data para o atendimento.');
        firstInvalid ||= fields.date;
      } else if (fields.date.value < minimum || !fields.date.validity.valid) {
        showError(fields.date, 'Escolha uma data a partir de amanhã, no horário de Santa Catarina.');
        firstInvalid ||= fields.date;
      } else clearError(fields.date);
    }
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const clean = value => value.trim().replace(/\s+/g, ' ');
    const message = buildQuoteMessage({
      name: clean(fields.name.value),
      city: fields.city.value === 'Outra cidade' ? clean(fields.otherCity.value) : fields.city.value,
      property: fields.property.value, problem: fields.problem.value,
      timing: fields.timing.value, date: fields.date.value,
      details: clean(fields.details.value)
    });
    const url = `https://wa.me/5548996081492?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

// O visualizador segue a ordem real do mosaico, inclusive os dois pares antes/depois.
const galleryButtons = Array.from(document.querySelectorAll('.gallery-open'));
const galleryDialog = document.querySelector('#gallery-lightbox');
if (galleryDialog && galleryButtons.length) {
  const image = galleryDialog.querySelector('.lightbox-image');
  const badge = galleryDialog.querySelector('.lightbox-badge');
  const counter = galleryDialog.querySelector('.lightbox-counter');
  let current = 0;
  let opener = null;

  function showGalleryPhoto(index) {
    current = (index + galleryButtons.length) % galleryButtons.length;
    const button = galleryButtons[current];
    const thumbnail = button.querySelector('img');
    const label = button.querySelector('.gallery-badge');
    image.src = thumbnail.dataset.full || thumbnail.src;
    image.alt = thumbnail.alt;
    badge.textContent = label ? label.textContent : '';
    badge.hidden = !label;
    counter.textContent = `${current + 1} / ${galleryButtons.length}`;
  }

  galleryButtons.forEach((button, index) => button.addEventListener('click', () => {
    opener = button;
    showGalleryPhoto(index);
    galleryDialog.showModal();
    galleryDialog.querySelector('.lightbox-close').focus();
  }));
  galleryDialog.querySelector('.lightbox-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('.lightbox-prev').addEventListener('click', () => showGalleryPhoto(current - 1));
  galleryDialog.querySelector('.lightbox-next').addEventListener('click', () => showGalleryPhoto(current + 1));
  galleryDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showGalleryPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  galleryDialog.addEventListener('click', event => {
    if (event.target === galleryDialog) galleryDialog.close();
  });
  galleryDialog.addEventListener('close', () => {
    image.removeAttribute('src');
    opener?.focus();
  });
}

// Rolagem nativa permite arrastar com o dedo; controles avançam um cartão.
const galleryTrack = document.querySelector('#gallery-track');
if (galleryTrack) {
  const slides = Array.from(galleryTrack.querySelectorAll('.gallery-slide'));
  const prev = document.querySelector('.gallery-carousel-prev');
  const next = document.querySelector('.gallery-carousel-next');
  const dots = document.querySelector('.gallery-carousel-dots');
  let active = 0;
  let raf = 0;
  let positions = [];
  function measuredPositions() {
    const max = Math.max(0, galleryTrack.scrollWidth - galleryTrack.clientWidth);
    const first = slides[0].offsetLeft;
    const starts = slides.slice(0, -1).map(slide => slide.offsetLeft - first)
      .filter(value => value < max - 2);
    // O último ponto representa o fim real da faixa, mesmo com slides de larguras diferentes.
    if (max > 2) starts.push(max);
    return starts.length ? starts : [0];
  }
  function refreshPositions() {
    positions = measuredPositions();
    dots.replaceChildren(...positions.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', index === positions.length - 1
        ? 'Ir para a última posição da galeria'
        : `Ir para a posição ${index + 1} da galeria`);
      dot.dataset.index = String(index);
      return dot;
    }));
    updatePosition();
  }
  function moveTo(index) {
    const bounded = Math.max(0, Math.min(index, positions.length - 1));
    active = bounded;
    galleryTrack.scrollLeft = positions[bounded];
    updatePosition();
  }
  function updatePosition() {
    const x = galleryTrack.scrollLeft;
    active = positions.reduce((closest, value, index) =>
      Math.abs(value - x) < Math.abs(positions[closest] - x) ? index : closest, 0);
    prev.disabled = x < 2;
    next.disabled = x >= galleryTrack.scrollWidth - galleryTrack.clientWidth - 2;
    dots.querySelectorAll('button').forEach((dot, index) => {
      if (index === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }
  dots.addEventListener('click', event => {
    const dot = event.target.closest('button[data-index]');
    if (dot) moveTo(Number(dot.dataset.index));
  });
  prev.addEventListener('click', () => moveTo(active - 1));
  next.addEventListener('click', () => moveTo(active + 1));
  galleryTrack.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updatePosition);
  }, { passive: true });
  window.addEventListener('resize', refreshPositions);
  refreshPositions();
}

// URLs públicas de pesquisa mostram cidades, sem sugerir endereço de escritório.
const regionButtons = Array.from(document.querySelectorAll('.region-city'));
const regionFrame = document.querySelector('#regions-map-frame');
const regionLink = document.querySelector('#regions-map-link');
if (regionFrame && regionLink && regionButtons.length) {
  function selectRegion(button) {
    const place = `${button.dataset.city}, Santa Catarina, Brasil`;
    const query = encodeURIComponent(place);
    regionButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    regionFrame.title = `Mapa de ${place}`;
    regionFrame.src = `https://maps.google.com/maps?q=${query}&z=11&output=embed`;
    regionLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }
  regionButtons.forEach(button => button.addEventListener('click', () => selectRegion(button)));
}

// === DETALHE: BOLHAS DE FUNDO ===
// Ajuste aqui a quantidade por largura; tamanho, opacidade e duração são sorteados abaixo.
const BUBBLE_COUNTS = { desktop: 22, tablet: 12, mobile: 8 };
const bubblesLayer = document.querySelector('.bubbles');
const quoteForBubbles = document.querySelector('#orcamento');
if (bubblesLayer && quoteForBubbles) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentBubbleCount = -1;
  const between = (min, max) => min + Math.random() * (max - min);

  function updateBubbles() {
    const shell = bubblesLayer.parentElement;
    const top = quoteForBubbles.getBoundingClientRect().top - shell.getBoundingClientRect().top;
    bubblesLayer.style.setProperty('--bubbles-top', `${top}px`);
    const width = window.innerWidth;
    const count = reducedMotion.matches ? 0 : width <= 600
      ? BUBBLE_COUNTS.mobile : width <= 1050 ? BUBBLE_COUNTS.tablet : BUBBLE_COUNTS.desktop;
    if (count === currentBubbleCount) return;
    currentBubbleCount = count;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const bubble = document.createElement('span');
      const size = Math.random() < .8 ? between(4, 10) : between(11, 18);
      bubble.style.setProperty('--size', `${size.toFixed(1)}px`);
      bubble.style.setProperty('--left', `${between(2, 98).toFixed(1)}%`);
      bubble.style.setProperty('--top', `${between(0, 105).toFixed(1)}%`);
      bubble.style.setProperty('--duration', `${between(14, 28).toFixed(1)}s`);
      bubble.style.setProperty('--delay', `${between(-28, 0).toFixed(1)}s`);
      bubble.style.setProperty('--drift', `${between(10, 40).toFixed(1) * (Math.random() < .5 ? -1 : 1)}px`);
      bubble.style.setProperty('--opacity', between(.08, .35).toFixed(2));
      if (size > 11) bubble.classList.add('is-large');
      fragment.append(bubble);
    }
    bubblesLayer.replaceChildren(fragment);
  }

  document.addEventListener('visibilitychange', () => {
    bubblesLayer.classList.toggle('is-paused', document.hidden);
    document.querySelector('.hero-stage')?.classList.toggle('is-paused', document.hidden);
  });
  window.addEventListener('resize', updateBubbles);
  reducedMotion.addEventListener('change', updateBubbles);
  bubblesLayer.classList.toggle('is-paused', document.hidden);
  document.querySelector('.hero-stage')?.classList.toggle('is-paused', document.hidden);
  updateBubbles();
}
