const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const sections = [...document.querySelectorAll('main section[id]')];

const tableauProfileUrl = 'https://public.tableau.com/app/profile/mohammad.maliki.rafli/vizzes';

const addExternalLink = (container, label, url, className = '') => {
  if (!container || container.querySelector(`a[href="${url}"]`)) return;

  const link = document.createElement('a');
  link.href = url;
  link.textContent = `${label} ↗`;
  link.target = '_blank';
  link.rel = 'noreferrer';
  if (className) link.className = className;
  container.appendChild(link);
};

const addInternalLink = (container, label, url, options = {}) => {
  if (!container || container.querySelector(`a[href="${url}"]`)) return;

  const link = document.createElement('a');
  link.href = url;
  link.textContent = label;
  if (options.className) link.className = options.className;
  if (options.before) container.insertBefore(link, container.firstElementChild);
  else container.appendChild(link);
};

addInternalLink(navMenu, 'CV', 'cv/', { before: false });
addInternalLink(document.querySelector('.hero-actions'), 'View CV', 'cv/', { className: 'button button-secondary' });
addExternalLink(document.querySelector('.about-links'), 'Tableau Public', tableauProfileUrl);
addExternalLink(document.querySelector('.contact-actions'), 'Tableau Public', tableauProfileUrl, 'text-link');

const toolBelt = document.querySelector('.tool-belt');
if (toolBelt) {
  [...toolBelt.children].forEach(item => {
    if (['RevMan', 'GRADEpro'].includes(item.textContent.trim())) item.remove();
  });

  if (![...toolBelt.children].some(item => item.textContent.trim() === 'Tableau')) {
    const tableauTool = document.createElement('span');
    tableauTool.textContent = 'Tableau';
    toolBelt.appendChild(tableauTool);
  }
}

const liveProjects = [
  {
    repositoryUrl: 'https://github.com/mohmalikirafli/indonesia-child-nutrition-map',
    liveUrl: 'https://mohmalikirafli.github.io/indonesia-child-nutrition-map/',
    liveLabel: 'View live dashboard'
  }
];

const applyProjectLinkStyle = link => {
  link.style.display = 'inline-flex';
  link.style.alignItems = 'center';
  link.style.color = 'var(--lime)';
  link.style.fontWeight = '700';
  link.style.margin = '0';
  link.style.padding = '0';
  link.style.border = '0';
  link.style.background = 'transparent';
  link.style.minHeight = 'auto';
  link.style.fontSize = 'inherit';
  link.style.boxShadow = 'none';
};

liveProjects.forEach(({ repositoryUrl, liveUrl, liveLabel }) => {
  const repositoryLink = document.querySelector(`.project-content > a[href="${repositoryUrl}"]`);
  if (!repositoryLink || repositoryLink.parentElement.querySelector(`a[href="${liveUrl}"]`)) return;

  const actions = document.createElement('div');
  actions.className = 'project-actions';
  actions.style.display = 'flex';
  actions.style.flexWrap = 'wrap';
  actions.style.alignItems = 'center';
  actions.style.gap = '24px';
  actions.style.marginTop = '0';

  const liveLink = document.createElement('a');
  liveLink.href = liveUrl;
  liveLink.textContent = `${liveLabel} ↗`;
  liveLink.target = '_blank';
  liveLink.rel = 'noreferrer';
  applyProjectLinkStyle(liveLink);

  repositoryLink.textContent = 'View repository ↗';
  repositoryLink.className = '';
  applyProjectLinkStyle(repositoryLink);

  repositoryLink.parentElement.insertBefore(actions, repositoryLink);
  actions.append(liveLink, repositoryLink);
});

const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navMenu?.classList.toggle('open', !isOpen);
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open navigation');
    navMenu?.classList.remove('open');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
