const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];
const languageButtons = [...document.querySelectorAll('.language-option')];

const uiStyles = document.createElement('style');
uiStyles.textContent = `
  .brand-text::after{content:none!important}.brand-text{font-size:16px!important;white-space:nowrap}
  .language-switch{display:inline-flex;align-items:center;padding:3px;border:1px solid rgba(111,231,221,.35);border-radius:999px;background:rgba(111,231,221,.06)}
  .language-option{min-width:34px;height:30px;padding:0 9px;border:0;border-radius:999px;background:transparent;color:#91a0b5;font:inherit;font-size:11px;font-weight:800;cursor:pointer}
  .language-option.active{background:var(--cyan);color:var(--ink)}
  .project-actions{display:flex;align-items:center;flex-wrap:wrap;gap:22px;margin-top:auto}
  .project-actions a{display:inline-flex;color:var(--lime);font-weight:700}
  .project-content{display:flex;flex-direction:column}
  .visual-ai{background:linear-gradient(145deg,#2d2b68,#17485f)}
  .visual-ssk{background:linear-gradient(145deg,#173a4b,#2c4d59)}
  .visual-nutrition{background:linear-gradient(145deg,#0b3b35,#1b5d50)}
  .visual-ai svg,.visual-ssk svg,.visual-nutrition svg{width:88%;height:auto;overflow:visible}
  .visual-ssk path,.visual-nutrition path{fill:none;stroke:rgba(111,231,221,.62);stroke-width:2}
  .visual-ssk path:nth-child(2),.visual-nutrition path:nth-child(2){stroke:rgba(200,243,109,.58)}
  .visual-ssk circle,.visual-nutrition circle{fill:var(--orange)}
  .audit-gauge{width:170px;aspect-ratio:1;display:grid;place-content:center;text-align:center;border-radius:50%;border:1px solid rgba(111,231,221,.3);background:radial-gradient(circle,rgba(111,231,221,.2),rgba(7,17,31,.18));box-shadow:inset 0 0 0 22px rgba(255,255,255,.025)}
  .audit-gauge strong{font-family:Manrope,sans-serif;font-size:48px;line-height:1;color:#fff}.audit-gauge span{color:var(--cyan);font-weight:800}.audit-gauge small{margin-top:6px;color:#aab7c7}
  @media(max-width:760px){.brand-text{font-size:13px!important}.language-switch{margin:8px 12px}.language-option{flex:1}.project-actions{gap:16px}}
`;
document.head.appendChild(uiStyles);

const translations = {
  id: {
    skipContent: 'Lewati ke konten', navAbout: 'Tentang', navExpertise: 'Keahlian', navProjects: 'Proyek', navDirection: 'Arah Riset', navContact: 'Kontak',
    heroStatus: 'Terbuka untuk kolaborasi riset, analitik, dan data', heroTitleLead: 'Mengubah data kompleks menjadi', heroTitleAccent: 'bukti yang dapat ditindaklanjuti.',
    heroIntro: 'Saya Mohammad Maliki Rafli, mahasiswa Magister Kesehatan Masyarakat dengan spesialisasi', heroField: 'Biostatistika dan Sains Data Kesehatan',
    heroScope: '. Saya mengembangkan analisis yang dapat direproduksi pada data klinis, layanan kesehatan, epidemiologi spasial, sintesis bukti, visualisasi interaktif, wawasan konsumen, dan peramalan.',
    exploreWork: 'Lihat proyek pilihan', viewCv: 'Lihat CV', githubProfile: 'Profil GitHub ↗', publicProjects: 'proyek portofolio publik', analyticsStack: 'perangkat analitik utama', appliedDomains: 'domain analitik terapan',
    profileField: 'Biostatistika & Sains Data Kesehatan', profileScope: 'Kesehatan Masyarakat · Riset · Analitik Terapan', rigor: 'Ketelitian statistik', withContext: 'dengan konteks', evidence: 'Bukti', toDecisions: 'menjadi keputusan',
    aboutTitle: 'Analisis mendalam, relevansi praktis.', aboutLead: 'Pekerjaan saya menghubungkan penalaran statistik, pengetahuan domain, reproduktibilitas, dan komunikasi keputusan yang jelas.',
    aboutEducation: 'Saya sedang menempuh Magister Kesehatan Masyarakat di Universitas Airlangga dengan konsentrasi Biostatistika dan Sains Data Kesehatan. Pengalaman saya mencakup analisis data kesehatan dan kependudukan, asisten riset, survei, pemodelan statistik, visualisasi interaktif, serta penyusunan laporan dan presentasi analitik.',
    aboutPortfolio: 'Portofolio saya mencakup prediksi risiko klinis, analisis survival, segmentasi layanan kesehatan, pemodelan penyakit spasial, pemetaan ketimpangan gizi anak, audit AI kesehatan masyarakat, dashboard kesiapan implementasi, segmentasi konsumen, peramalan permintaan, dan optimasi persediaan.', emailMe: 'Kirim email ↗',
    expertiseTitle: 'Metode dipilih berdasarkan pertanyaan, bukan tren.', expertiseIntro: 'Kapabilitas yang dikembangkan melalui proyek kesehatan masyarakat, riset, visualisasi, evaluasi AI, dan analitik bisnis terapan.',
    expertiseBioTitle: 'Biostatistika & Epidemiologi', expertiseBioText: 'Regresi, model count, analisis survival, latent class analysis, diagnostik model, interpretasi, dan pelaporan yang mempertimbangkan ketidakpastian.',
    expertiseDataTitle: 'Sains Data Kesehatan', expertiseDataText: 'Praproses yang dapat direproduksi, supervised learning, validasi internal, kalibrasi, diskriminasi, perbandingan model, dan interpretasi.',
    expertiseSpatialTitle: 'Metode Spasial & Sintesis Bukti', expertiseSpatialText: 'Dependensi spasial, pembobotan geografis, pemodelan penyakit tingkat wilayah, sintesis bukti sistematis, critical appraisal, dan komunikasi ketidakpastian.',
    expertiseDecisionTitle: 'Visualisasi & Analitik Keputusan', expertiseDecisionText: 'Peta interaktif, data story, dashboard, evaluasi keluaran AI, segmentasi konsumen, peramalan permintaan, dan rekomendasi untuk pemangku kepentingan.',
    selectedWork: 'Proyek pilihan', projectsTitle: 'Proyek yang dibangun untuk menjawab pertanyaan analitik nyata.', projectsIntro: 'Pilihan ini memprioritaskan karya terbaru yang berorientasi keputusan dalam riset kesehatan, biostatistika, evaluasi AI, analitik implementasi, visualisasi interaktif, wawasan pelanggan, dan peramalan.',
    ckdTitle: 'Prediksi Penyakit Ginjal Kronis', ckdText: 'Perbandingan end-to-end regresi logistik LASSO, decision tree, dan neural network yang mencakup praproses, validasi internal, kalibrasi, diskriminasi, ketidakpastian, dan interpretasi.', classification: 'Klasifikasi', privacyAware: 'Menjaga privasi',
    meanScore: 'skor rata-rata', aiAudit: 'Audit & Evaluasi AI', publicHealth: 'Kesehatan Masyarakat', aiTitle: 'Laboratorium Audit AI Kesehatan Masyarakat', aiText: 'Benchmark enam kasus berbasis bukti untuk mengaudit jawaban AI tentang kesehatan masyarakat pada epidemiologi, biostatistika, kesetaraan kesehatan, surveilans, kebijakan, penalaran kausal, integritas sitasi, keselamatan, dan ketidakpastian.', sixScenarios: '6 skenario', rubric12: 'rubrik 12 poin', criticalErrors: '2 kesalahan kritis',
    implementationAnalytics: 'Analitik Implementasi', sskTitle: 'Kesiapan Implementasi SSK Surabaya', sskText: 'Dashboard interaktif dwibahasa yang menerjemahkan penilaian 166 sekolah menjadi wawasan kesiapan implementasi, pemetaan tingkat sekolah, filter, perbandingan wilayah, hambatan, dan prioritas program yang dapat ditindaklanjuti.', schools166: '166 sekolah', markers21: '21 titik peta',
    interactiveViz: 'Visualisasi Interaktif', nutritionText: 'Data story kesehatan masyarakat interaktif yang memetakan prevalensi stunting provinsi, perubahan tahunan, peringkat, ketimpangan ekonomi, pola usia, tren jangka panjang, dan cakupan program menggunakan SSGI 2024.', provinces38: '38 provinsi',
    jknTitle: 'Tipologi Peserta JKN & Pemanfaatan FKTP', jknText: 'Segmentasi berbasis model terhadap 1.697.452 peserta JKN menggunakan indikator kepesertaan dan pemanfaatan layanan primer, menghasilkan solusi lima kelas yang dapat diinterpretasikan.', fiveClasses: '5 kelas', administrativeData: 'Data administratif',
    survivalTitle: 'Analisis Survival Gagal Jantung', survivalText: 'Analisis waktu hingga kematian pada 299 pasien gagal jantung menggunakan estimasi Kaplan–Meier, uji log-rank, regresi Cox multivariabel, dan diagnostik proportional hazards.', patients299: '299 pasien', deaths96: '96 kematian',
    segmentation: 'Segmentasi', fmcgTitle: 'Wawasan Pelanggan FMCG & Pendorong Pembelian', fmcgText: 'Alur riset konsumen yang mengubah 800 profil survei sintetis menjadi empat segmen yang dapat ditindaklanjuti, wawasan kanal, dan model niat beli yang dapat diinterpretasikan.', consumers800: '800 konsumen', segments4: '4 segmen',
    forecasting: 'Peramalan', forecastTitle: 'Peramalan Permintaan Beauty FMCG', forecastText: 'Peramalan permintaan berbasis waktu dan optimasi persediaan produk kecantikan, membandingkan machine learning dengan baseline naïf serta menerjemahkan hasil peramalan menjadi tindakan pengisian ulang.', temporalHoldout: 'Holdout temporal', inventoryActions: 'Tindakan persediaan',
    leprosyTitle: 'Pemodelan Spasial Kasus Kusta', leprosyText: 'Geographically weighted negative binomial regression untuk menilai overdispersi, dependensi spasial, dan heterogenitas lokal kasus kusta di Jawa Tengah.', countData: 'Data count', localEffects: 'Efek lokal',
    viewLive: 'Lihat dashboard langsung ↗', viewRepository: 'Lihat repository ↗', browseRepositories: 'Lihat semua repository ↗', analyticalDirection: 'Arah analitik', researchTitle: 'Pertanyaan dan metode yang terus saya kembangkan.',
    researchSpatialTitle: 'Pemodelan count spasial untuk penyakit menular', researchSpatialText: 'Membandingkan pendekatan Poisson, binomial negatif, dan geographically weighted untuk luaran penyakit tingkat wilayah yang heterogen.',
    researchClinicalTitle: 'Prediksi klinis dan analisis time-to-event', researchClinicalText: 'Menyeimbangkan diskriminasi, kalibrasi, asumsi proportional hazards, interpretabilitas, ketidakpastian, dan validitas eksternal.',
    researchAiTitle: 'Evaluasi AI yang bertanggung jawab untuk kesehatan masyarakat', researchAiText: 'Mengaudit akurasi faktual, penalaran kausal, integritas sitasi, keselamatan, ketidakpastian, kesetaraan, dan kegunaan tindakan dalam konten kesehatan yang dihasilkan AI.',
    researchVizTitle: 'Visualisasi kesehatan masyarakat dan komunikasi bukti', researchVizText: 'Merancang peta interaktif dan data story yang menampilkan ketimpangan, mendokumentasikan metodologi, mengomunikasikan ketidakpastian, dan mendukung interpretasi yang bertanggung jawab.',
    contactTitle: 'Mari mengerjakan pertanyaan yang layak dijawab.', contactText: 'Saya terbuka untuk diskusi mengenai kolaborasi riset, biostatistika, sains data kesehatan, visualisasi kesehatan masyarakat, evaluasi AI yang bertanggung jawab, wawasan pelanggan, peramalan, dan analitik terapan.', footerText: 'Dibangun berdasarkan bukti, kejelasan, dan analisis yang dapat direproduksi.', backToTop: 'Kembali ke atas ↑'
  }
};

const aiRepositoryLink = document.querySelector('a[href="https://github.com/mohmalikirafli/public-health-ai-audit-lab"]');
const aiLiveUrl = 'https://mohmalikirafli.github.io/public-health-ai-audit-lab/';
if (aiRepositoryLink && !document.querySelector(`a[href="${aiLiveUrl}"]`)) {
  const aiLiveLink = document.createElement('a');
  aiLiveLink.href = aiLiveUrl;
  aiLiveLink.target = '_blank';
  aiLiveLink.rel = 'noreferrer';
  aiLiveLink.dataset.i18n = 'viewLive';
  aiLiveLink.textContent = 'View live dashboard ↗';
  aiRepositoryLink.before(aiLiveLink);
}

const englishText = new Map();
document.querySelectorAll('[data-i18n]').forEach(element => englishText.set(element, element.textContent));

const applyLanguage = language => {
  const selected = language === 'id' ? 'id' : 'en';
  document.documentElement.lang = selected;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = selected === 'id' ? (translations.id[key] || englishText.get(element)) : englishText.get(element);
  });
  languageButtons.forEach(button => {
    const active = button.dataset.language === selected;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  localStorage.setItem('portfolio-language', selected);
};

languageButtons.forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.language)));
applyLanguage(localStorage.getItem('portfolio-language') || 'en');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  navMenu?.classList.toggle('open', !open);
});
navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navToggle?.setAttribute('aria-expanded', 'false');
  navMenu?.classList.remove('open');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();