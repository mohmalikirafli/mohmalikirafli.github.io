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

const portfolioCount = document.querySelector('.hero-proof div:first-child strong');
if (portfolioCount) portfolioCount.textContent = '12';

const projectGrid = document.querySelector('.project-grid');
const jknRepositoryLink = document.querySelector('a[href="https://github.com/mohmalikirafli/jkn-fktp-latent-class-analysis"]');
const insertBeforeCard = jknRepositoryLink?.closest('.project-card') || null;

const latestProjectCards = [
  {
    repositoryUrl: 'https://github.com/mohmalikirafli/public-health-ai-audit-lab',
    html: `
      <article class="project-card reveal visible">
        <div class="project-visual visual-insights" style="background:linear-gradient(145deg,#2d2b68,#17485f)">
          <span class="visual-label">PUBLIC HEALTH AI EVALUATION</span>
          <div class="metric-orbit" style="width:190px">
            <div class="orbit-center"><strong style="font-size:30px">7.3</strong><span>/ 12 mean score</span></div>
            <i></i><i></i><i></i>
          </div>
        </div>
        <div class="project-content">
          <div class="project-top"><span>AI Audit & Evaluation</span><span>Public Health</span></div>
          <h3>Public Health AI Audit Lab</h3>
          <p>An evidence-grounded six-case benchmark for auditing AI-generated public-health answers across epidemiology, biostatistics, health equity, surveillance, policy, causal reasoning, citation integrity, safety, and uncertainty.</p>
          <div class="project-facts"><span>6 scenarios</span><span>12-point rubric</span><span>2 critical errors</span></div>
          <a href="https://github.com/mohmalikirafli/public-health-ai-audit-lab" target="_blank" rel="noreferrer">View repository ↗</a>
        </div>
      </article>`
  },
  {
    repositoryUrl: 'https://github.com/mohmalikirafli/surabaya-ssk-readiness',
    html: `
      <article class="project-card reveal visible">
        <div class="project-visual visual-spatial" style="background:linear-gradient(145deg,#173a4b,#2c4d59)">
          <span class="visual-label">PROGRAM IMPLEMENTATION DASHBOARD</span>
          <svg viewBox="0 0 320 180" role="img" aria-label="Abstract school implementation readiness map">
            <path d="M28 126 C72 93,96 118,136 72 S203 99,286 43" />
            <path d="M31 145 C77 119,117 145,157 107 S224 132,289 83" />
            <circle cx="66" cy="111" r="7"/><circle cx="129" cy="88" r="7"/><circle cx="197" cy="105" r="7"/><circle cx="260" cy="66" r="7"/>
          </svg>
          <strong class="visual-number">166</strong>
        </div>
        <div class="project-content">
          <div class="project-top"><span>Implementation Analytics</span><span>JavaScript</span></div>
          <h3>Surabaya SSK Implementation Readiness</h3>
          <p>An interactive bilingual dashboard translating a 166-school assessment into implementation-readiness insights, school-level mapping, filters, regional comparisons, barriers, and actionable programme priorities.</p>
          <div class="project-facts"><span>166 schools</span><span>21 map markers</span><span>χ² p = 0.007</span></div>
          <a href="https://github.com/mohmalikirafli/surabaya-ssk-readiness" target="_blank" rel="noreferrer">View repository ↗</a>
        </div>
      </article>`
  }
];

latestProjectCards.forEach(project => {
  if (!projectGrid || document.querySelector(`a[href="${project.repositoryUrl}"]`)) return;
  const template = document.createElement('template');
  template.innerHTML = project.html.trim();
  const card = template.content.firstElementChild;
  projectGrid.insertBefore(card, insertBeforeCard);
});

const liveProjects = [
  {
    repositoryUrl: 'https://github.com/mohmalikirafli/indonesia-child-nutrition-map',
    liveUrl: 'https://mohmalikirafli.github.io/indonesia-child-nutrition-map/',
    liveLabel: 'View live dashboard'
  },
  {
    repositoryUrl: 'https://github.com/mohmalikirafli/surabaya-ssk-readiness',
    liveUrl: 'https://mohmalikirafli.github.io/surabaya-ssk-readiness/',
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
