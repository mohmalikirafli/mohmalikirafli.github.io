const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const sections = [...document.querySelectorAll('main section[id]')];

// Ensure the full professional name is shown, including when an older stylesheet is cached.
const interfaceStyle = document.createElement('style');
interfaceStyle.textContent = `
  .brand-text::after { content: none !important; }
  .brand-text { font-size: 16px !important; white-space: nowrap; }
  .language-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 46px;
    height: 36px;
    padding: 0 12px;
    border: 1px solid rgba(111,231,221,.45);
    border-radius: 999px;
    background: rgba(111,231,221,.08);
    color: var(--cyan);
    font: inherit;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .08em;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease, color .2s ease;
  }
  .language-toggle:hover,
  .language-toggle:focus-visible {
    background: rgba(111,231,221,.16);
    border-color: var(--cyan);
    color: #fff;
    outline: none;
  }
  @media (max-width: 760px) {
    .brand-text { font-size: 14px !important; }
    .language-toggle {
      width: 100%;
      height: 44px;
      margin-top: 6px;
    }
  }
`;
document.head.appendChild(interfaceStyle);

document.querySelectorAll('.brand-text').forEach(element => {
  element.textContent = 'Mohammad Maliki Rafli';
});

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
  projectGrid.insertBefore(template.content.firstElementChild, insertBeforeCard);
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

const translations = {
  'Skip to content': 'Lewati ke konten',
  'About': 'Tentang',
  'Expertise': 'Keahlian',
  'Projects': 'Proyek',
  'Direction': 'Arah Riset',
  'Contact': 'Kontak',
  'Open to research, analytics, and data collaboration': 'Terbuka untuk kolaborasi riset, analitik, dan data',
  'Turning complex data into': 'Mengubah data kompleks menjadi',
  'evidence people can act on.': 'bukti yang dapat ditindaklanjuti.',
  'I am Mohammad Maliki Rafli, a Master of Public Health graduate student specializing in': 'Saya Mohammad Maliki Rafli, mahasiswa Magister Kesehatan Masyarakat dengan spesialisasi',
  'Biostatistics and Health Data Science': 'Biostatistika dan Sains Data Kesehatan',
  '. I develop reproducible analyses across clinical data, health services, spatial epidemiology, evidence synthesis, interactive data visualization, consumer insights, and forecasting.': '. Saya mengembangkan analisis yang dapat direproduksi pada data klinis, layanan kesehatan, epidemiologi spasial, sintesis bukti, visualisasi data interaktif, wawasan konsumen, dan peramalan.',
  'Explore selected work': 'Lihat proyek pilihan',
  'View CV': 'Lihat CV',
  'GitHub profile ↗': 'Profil GitHub ↗',
  'public portfolio projects': 'proyek portofolio publik',
  'core analytics stack': 'perangkat analitik utama',
  'applied analytical domains': 'domain analitik terapan',
  'Public Health · Research · Applied Analytics': 'Kesehatan Masyarakat · Riset · Analitik Terapan',
  'Statistical rigor': 'Ketelitian statistik',
  'with context': 'dengan konteks',
  'Evidence': 'Bukti',
  'to decisions': 'menjadi keputusan',
  'Analytical depth, practical relevance.': 'Analisis mendalam, relevansi praktis.',
  'My work connects statistical reasoning, domain knowledge, reproducibility, and clear decision communication.': 'Pekerjaan saya menghubungkan penalaran statistik, pengetahuan domain, reproduktibilitas, dan komunikasi keputusan yang jelas.',
  'I am pursuing a Master of Public Health at Universitas Airlangga with a concentration in Biostatistics and Health Data Science. My experience includes health and population data analysis, research assistance, survey work, statistical modeling, interactive visualization, and the preparation of analytical reports and presentations.': 'Saya sedang menempuh Magister Kesehatan Masyarakat di Universitas Airlangga dengan konsentrasi Biostatistika dan Sains Data Kesehatan. Pengalaman saya mencakup analisis data kesehatan dan kependudukan, asisten riset, survei, pemodelan statistik, visualisasi interaktif, serta penyusunan laporan dan presentasi analitik.',
  'My portfolio spans clinical-risk prediction, survival analysis, health-service segmentation, spatial disease modeling, child-nutrition inequality mapping, systematic evidence synthesis, consumer segmentation, purchase-intention analysis, demand forecasting, and inventory optimization. Across domains, I clarify the decision problem, protect data privacy, check assumptions, report limitations, and translate findings into usable recommendations.': 'Portofolio saya mencakup prediksi risiko klinis, analisis survival, segmentasi layanan kesehatan, pemodelan penyakit spasial, pemetaan ketimpangan gizi anak, sintesis bukti sistematis, segmentasi konsumen, analisis niat beli, peramalan permintaan, dan optimasi persediaan. Pada setiap domain, saya memperjelas masalah keputusan, menjaga privasi data, memeriksa asumsi, melaporkan keterbatasan, dan menerjemahkan temuan menjadi rekomendasi yang dapat digunakan.',
  'Email me ↗': 'Kirim email ↗',
  'Methods selected for the question—not the trend.': 'Metode dipilih berdasarkan pertanyaan, bukan tren.',
  'Capabilities developed through applied public-health, research, visualization, and business-analytics projects.': 'Kapabilitas yang dikembangkan melalui proyek kesehatan masyarakat, riset, visualisasi, dan analitik bisnis terapan.',
  'Biostatistics & Epidemiology': 'Biostatistika & Epidemiologi',
  'Regression, count models, survival analysis, latent class analysis, model diagnostics, interpretation, and uncertainty-aware reporting.': 'Regresi, model count, analisis survival, latent class analysis, diagnostik model, interpretasi, dan pelaporan yang mempertimbangkan ketidakpastian.',
  'Health Data Science': 'Sains Data Kesehatan',
  'Reproducible preprocessing, supervised learning, internal validation, calibration, discrimination, model comparison, and interpretation.': 'Praproses yang dapat direproduksi, supervised learning, validasi internal, kalibrasi, diskriminasi, perbandingan model, dan interpretasi.',
  'Spatial & Evidence Methods': 'Metode Spasial & Sintesis Bukti',
  'Spatial dependence, geographic weighting, area-level disease modeling, systematic review, meta-analysis, critical appraisal, and GRADE.': 'Dependensi spasial, pembobotan geografis, pemodelan penyakit tingkat wilayah, systematic review, meta-analysis, critical appraisal, dan GRADE.',
  'Visualization & Decision Analytics': 'Visualisasi & Analitik Keputusan',
  'Interactive maps, data stories, dashboards, consumer segmentation, purchase drivers, demand forecasting, and stakeholder-oriented recommendations.': 'Peta interaktif, data story, dashboard, segmentasi konsumen, faktor pendorong pembelian, peramalan permintaan, dan rekomendasi berorientasi pemangku kepentingan.',
  'Selected work': 'Proyek pilihan',
  'Projects built to answer real analytical questions.': 'Proyek yang dibangun untuk menjawab pertanyaan analitik nyata.',
  'The current selection prioritizes the strongest and most recent work across health research, biostatistics, interactive visualization, customer insights, and forecasting.': 'Pilihan ini memprioritaskan karya terkuat dan terbaru dalam riset kesehatan, biostatistika, visualisasi interaktif, wawasan pelanggan, dan peramalan.',
  'Chronic Kidney Disease Prediction': 'Prediksi Penyakit Ginjal Kronis',
  'End-to-end comparison of LASSO logistic regression, decision tree, and neural network models, covering preprocessing, internal validation, calibration, discrimination, uncertainty, and interpretation.': 'Perbandingan end-to-end regresi logistik LASSO, decision tree, dan neural network yang mencakup praproses, validasi internal, kalibrasi, diskriminasi, ketidakpastian, dan interpretasi.',
  'Classification': 'Klasifikasi',
  'Privacy-aware': 'Menjaga privasi',
  'NourishMap Indonesia': 'NourishMap Indonesia',
  'An interactive public-health data story mapping provincial stunting prevalence, annual change, rankings, wealth inequality, age patterns, long-term trends, and programme coverage using SSGI 2024.': 'Data story kesehatan masyarakat interaktif yang memetakan prevalensi stunting provinsi, perubahan tahunan, peringkat, ketimpangan ekonomi, pola usia, tren jangka panjang, dan cakupan program menggunakan SSGI 2024.',
  '38 provinces': '38 provinsi',
  'Surabaya SSK Readiness Dashboard': 'Dashboard Kesiapan Implementasi SSK Surabaya',
  'Surabaya SSK Implementation Readiness': 'Kesiapan Implementasi SSK Surabaya',
  'A bilingual interactive assessment of population-education implementation across Surabaya, combining school-level mapping, regional comparisons, a South Surabaya deep dive, data-quality notes, and action priorities.': 'Penilaian interaktif dwibahasa tentang implementasi pendidikan kependudukan di Surabaya yang menggabungkan pemetaan tingkat sekolah, perbandingan wilayah, analisis mendalam Surabaya Selatan, catatan kualitas data, dan prioritas tindakan.',
  'An interactive bilingual dashboard translating a 166-school assessment into implementation-readiness insights, school-level mapping, filters, regional comparisons, barriers, and actionable programme priorities.': 'Dashboard interaktif dwibahasa yang menerjemahkan penilaian 166 sekolah menjadi wawasan kesiapan implementasi, pemetaan tingkat sekolah, filter, perbandingan wilayah, hambatan, dan prioritas program yang dapat ditindaklanjuti.',
  '166 assessed': '166 dinilai',
  '166 schools': '166 sekolah',
  '21 mapped': '21 dipetakan',
  '21 map markers': '21 titik peta',
  'PUBLIC HEALTH AI EVALUATION': 'EVALUASI AI KESEHATAN MASYARAKAT',
  'AI Audit & Evaluation': 'Audit & Evaluasi AI',
  'Public Health': 'Kesehatan Masyarakat',
  'Public Health AI Audit Lab': 'Laboratorium Audit AI Kesehatan Masyarakat',
  'An evidence-grounded six-case benchmark for auditing AI-generated public-health answers across epidemiology, biostatistics, health equity, surveillance, policy, causal reasoning, citation integrity, safety, and uncertainty.': 'Benchmark enam kasus berbasis bukti untuk mengaudit jawaban AI tentang kesehatan masyarakat pada epidemiologi, biostatistika, kesetaraan kesehatan, surveilans, kebijakan, penalaran kausal, integritas sitasi, keselamatan, dan ketidakpastian.',
  '6 scenarios': '6 skenario',
  '12-point rubric': 'rubrik 12 poin',
  '2 critical errors': '2 kesalahan kritis',
  '/ 12 mean score': '/ 12 skor rata-rata',
  'PROGRAM IMPLEMENTATION DASHBOARD': 'DASHBOARD IMPLEMENTASI PROGRAM',
  'Implementation Analytics': 'Analitik Implementasi',
  'JKN Participant Typology & FKTP Utilization': 'Tipologi Peserta JKN & Pemanfaatan FKTP',
  'Model-based segmentation of 1,697,452 JKN participants using enrollment and primary-care utilization indicators, resulting in an interpretable five-class solution.': 'Segmentasi berbasis model terhadap 1.697.452 peserta JKN menggunakan indikator kepesertaan dan pemanfaatan layanan primer, menghasilkan solusi lima kelas yang dapat diinterpretasikan.',
  '5 classes': '5 kelas',
  'Administrative data': 'Data administratif',
  'Heart Failure Survival Analysis': 'Analisis Survival Gagal Jantung',
  'Time-to-death analysis of 299 heart-failure patients using Kaplan–Meier estimation, log-rank testing, multivariable Cox regression, and proportional-hazards diagnostics.': 'Analisis waktu hingga kematian pada 299 pasien gagal jantung menggunakan estimasi Kaplan–Meier, uji log-rank, regresi Cox multivariabel, dan diagnostik proportional hazards.',
  '299 patients': '299 pasien',
  '96 deaths': '96 kematian',
  'FMCG Customer Insights & Purchase Drivers': 'Wawasan Pelanggan FMCG & Pendorong Pembelian',
  'Consumer-research workflow transforming 800 synthetic survey profiles into four actionable segments, channel insights, and an interpretable purchase-intention model.': 'Alur riset konsumen yang mengubah 800 profil survei sintetis menjadi empat segmen yang dapat ditindaklanjuti, wawasan kanal, dan model niat beli yang dapat diinterpretasikan.',
  '800 consumers': '800 konsumen',
  '4 segments': '4 segmen',
  'Beauty FMCG Demand Forecasting': 'Peramalan Permintaan Beauty FMCG',
  'Time-aware demand forecasting and inventory optimization for beauty products, benchmarking machine learning against a naïve baseline and translating forecasts into replenishment actions.': 'Peramalan permintaan berbasis waktu dan optimasi persediaan produk kecantikan, membandingkan machine learning dengan baseline naïf serta menerjemahkan hasil peramalan menjadi tindakan pengisian ulang.',
  'Temporal holdout': 'Holdout temporal',
  'Inventory actions': 'Tindakan persediaan',
  'Spatial Modeling of Leprosy Cases': 'Pemodelan Spasial Kasus Kusta',
  'Geographically weighted negative binomial regression assessing overdispersion, spatial dependence, and local heterogeneity in leprosy cases across Central Java.': 'Geographically weighted negative binomial regression untuk menilai overdispersi, dependensi spasial, dan heterogenitas lokal kasus kusta di Jawa Tengah.',
  'Count data': 'Data count',
  'Local effects': 'Efek lokal',
  'View live dashboard ↗': 'Lihat dashboard langsung ↗',
  'Open live dashboard ↗': 'Buka dashboard langsung ↗',
  'View repository ↗': 'Lihat repository ↗',
  'Browse all repositories ↗': 'Lihat semua repository ↗',
  'Analytical direction': 'Arah analitik',
  'Questions and methods I am continuing to develop.': 'Pertanyaan dan metode yang terus saya kembangkan.',
  'Spatial count modeling for infectious disease': 'Pemodelan count spasial untuk penyakit menular',
  'Comparing Poisson, negative binomial, and geographically weighted approaches for heterogeneous area-level disease outcomes.': 'Membandingkan pendekatan Poisson, binomial negatif, dan geographically weighted untuk luaran penyakit tingkat wilayah yang heterogen.',
  'Clinical prediction and time-to-event analysis': 'Prediksi klinis dan analisis time-to-event',
  'Balancing discrimination, calibration, proportional-hazards assumptions, interpretability, uncertainty, and external validity.': 'Menyeimbangkan diskriminasi, kalibrasi, asumsi proportional hazards, interpretabilitas, ketidakpastian, dan validitas eksternal.',
  'Population segmentation and health-service utilization': 'Segmentasi populasi dan pemanfaatan layanan kesehatan',
  'Identifying meaningful subgroups that can improve program targeting, continuity of care, referral management, and resource allocation.': 'Mengidentifikasi subkelompok bermakna yang dapat meningkatkan penargetan program, kesinambungan pelayanan, pengelolaan rujukan, dan alokasi sumber daya.',
  'Public-health visualization and evidence communication': 'Visualisasi kesehatan masyarakat dan komunikasi bukti',
  'Designing interactive maps and data stories that expose inequality, document methodology, communicate uncertainty, and support responsible interpretation.': 'Merancang peta interaktif dan data story yang menampilkan ketimpangan, mendokumentasikan metodologi, mengomunikasikan ketidakpastian, dan mendukung interpretasi yang bertanggung jawab.',
  'Let’s work on a question worth answering.': 'Mari mengerjakan pertanyaan yang layak dijawab.',
  'I welcome conversations about research collaboration, biostatistics, health data science, public-health visualization, customer insights, forecasting, and applied analytics opportunities.': 'Saya terbuka untuk diskusi mengenai kolaborasi riset, biostatistika, sains data kesehatan, visualisasi kesehatan masyarakat, wawasan pelanggan, peramalan, dan peluang analitik terapan.',
  'Curriculum Vitae ↗': 'Curriculum Vitae ↗',
  'Built around evidence, clarity, and reproducible analysis.': 'Dibangun berdasarkan bukti, kejelasan, dan analisis yang dapat direproduksi.',
  'Back to top ↑': 'Kembali ke atas ↑'
};

const languageButton = document.createElement('button');
languageButton.type = 'button';
languageButton.className = 'language-toggle';
const contactLink = navMenu?.querySelector('.nav-cta');
if (navMenu) navMenu.insertBefore(languageButton, contactLink || null);

const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    if (!parent || parent.closest('script, style, .language-toggle')) return NodeFilter.FILTER_REJECT;
    return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }
});

while (walker.nextNode()) {
  const node = walker.currentNode;
  const raw = node.nodeValue;
  textNodes.push({
    node,
    english: raw.trim(),
    leading: raw.match(/^\s*/)?.[0] || '',
    trailing: raw.match(/\s*$/)?.[0] || ''
  });
}

const pageMetadata = {
  en: {
    title: 'Mohammad Maliki Rafli | Biostatistics, Health Data Science & Analytics',
    description: 'Portfolio of Mohammad Maliki Rafli — biostatistics, health data science, public health research, interactive data visualization, consumer insights, and applied analytics.'
  },
  id: {
    title: 'Mohammad Maliki Rafli | Biostatistika, Sains Data Kesehatan & Analitik',
    description: 'Portofolio Mohammad Maliki Rafli dalam biostatistika, sains data kesehatan, riset kesehatan masyarakat, visualisasi data interaktif, wawasan konsumen, dan analitik terapan.'
  }
};

const applyLanguage = language => {
  const selectedLanguage = language === 'id' ? 'id' : 'en';
  document.documentElement.lang = selectedLanguage;

  textNodes.forEach(({ node, english, leading, trailing }) => {
    const value = selectedLanguage === 'id' ? (translations[english] || english) : english;
    node.nodeValue = `${leading}${value}${trailing}`;
  });

  languageButton.textContent = selectedLanguage === 'id' ? 'EN' : 'ID';
  languageButton.setAttribute(
    'aria-label',
    selectedLanguage === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia'
  );
  languageButton.title = selectedLanguage === 'id' ? 'Switch to English' : 'Ubah ke Bahasa Indonesia';

  const metadata = pageMetadata[selectedLanguage];
  document.title = metadata.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);

  navToggle?.setAttribute(
    'aria-label',
    selectedLanguage === 'id' ? 'Buka navigasi' : 'Open navigation'
  );

  localStorage.setItem('portfolio-language', selectedLanguage);
};

let currentLanguage = localStorage.getItem('portfolio-language') === 'id' ? 'id' : 'en';
applyLanguage(currentLanguage);

languageButton.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'en' ? 'id' : 'en';
  applyLanguage(currentLanguage);
});

const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navToggle.setAttribute(
    'aria-label',
    isOpen
      ? (currentLanguage === 'id' ? 'Buka navigasi' : 'Open navigation')
      : (currentLanguage === 'id' ? 'Tutup navigasi' : 'Close navigation')
  );
  navMenu?.classList.toggle('open', !isOpen);
});

navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', currentLanguage === 'id' ? 'Buka navigasi' : 'Open navigation');
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

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
