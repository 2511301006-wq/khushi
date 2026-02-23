/* ============================================
   Government Welfare Schemes — Script
   ============================================ */

// ---------- Scheme Data Store ----------
const SCHEMES = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    icon: '🌾',
    shortDesc: 'Direct income support of ₹6,000 per year to farmer families for purchasing farm inputs.',
    description: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a central sector scheme that provides income support to all landholding farmer families across the country. Under this scheme, ₹6,000 per year is transferred directly into bank accounts of eligible farmer families in three equal instalments of ₹2,000 each.',
    benefits: [
      { icon: '💰', text: '₹6,000 per year in three equal instalments of ₹2,000' },
      { icon: '🏦', text: 'Direct bank transfer (DBT) ensuring no middlemen' },
      { icon: '📋', text: 'Helps farmers meet agricultural and household needs' },
      { icon: '🔄', text: 'Regular income support every four months' }
    ],
    eligibility: [
      'Must be a landholding farmer family',
      'Must have cultivable land as per land records of the respective state/UT',
      'Institutional landholders are excluded',
      'Former and present holders of constitutional posts are not eligible',
      'Income tax payers in last assessment year are excluded',
      'Professionals like doctors, engineers, lawyers, CAs registered with professional bodies are excluded'
    ],
    howToApply: [
      'Visit the official PM-KISAN portal at pmkisan.gov.in',
      'Click on "New Farmer Registration" and select your state',
      'Enter Aadhaar number and captcha code',
      'Fill in personal, bank account, and land details',
      'Upload supporting documents and submit the application',
      'Track your application status using the "Beneficiary Status" option'
    ],
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchYear: '2019',
    budget: '₹60,000 Crore',
    beneficiaries: '11+ Crore',
    officialLink: 'https://pmkisan.gov.in'
  },
  {
    id: 'pm-awas',
    name: 'PM Awas Yojana',
    category: 'Housing',
    icon: '🏠',
    shortDesc: 'Affordable housing for the urban and rural poor with credit-linked subsidy on home loans.',
    description: 'Pradhan Mantri Awas Yojana (PMAY) aims to provide affordable housing to the urban and rural poor. The scheme offers credit-linked subsidy on home loans for purchase, construction, or enhancement of houses. It targets "Housing for All" by providing pucca houses with basic amenities.',
    benefits: [
      { icon: '🏗️', text: 'Subsidy up to ₹2.67 lakh on home loan interest rates' },
      { icon: '🏡', text: 'Financial assistance of ₹1.2 to ₹1.5 lakh for rural housing' },
      { icon: '🚰', text: 'Houses with toilet, electricity, water, and LPG connection' },
      { icon: '👩', text: 'Mandatory ownership or co-ownership for women members' }
    ],
    eligibility: [
      'Beneficiary family should not own a pucca house anywhere in India',
      'Annual household income up to ₹18 lakh (for MIG category)',
      'For EWS category: annual income up to ₹3 lakh',
      'For LIG category: annual income between ₹3 to ₹6 lakh',
      'The house must be in the name of a female member or jointly owned',
      'Must not have availed central government housing assistance earlier'
    ],
    howToApply: [
      'Visit the PMAY official website at pmaymis.gov.in',
      'Click "Citizen Assessment" and select the appropriate category',
      'Enter your Aadhaar number for verification',
      'Fill the online application form with personal & income details',
      'Submit the form and note down the application reference number',
      'Visit nearest Common Service Centre (CSC) to apply offline if needed'
    ],
    ministry: 'Ministry of Housing & Urban Affairs',
    launchYear: '2015',
    budget: '₹48,000 Crore',
    beneficiaries: '2.95+ Crore',
    officialLink: 'https://pmaymis.gov.in'
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat – PMJAY',
    category: 'Health',
    icon: '🏥',
    shortDesc: 'Health insurance cover of ₹5 lakh per family per year for secondary and tertiary care hospitalisation.',
    description: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PMJAY) is the world\'s largest health assurance scheme. It provides a health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalisation at empanelled hospitals across India. The scheme covers over 1,900 medical procedures.',
    benefits: [
      { icon: '🏥', text: '₹5 lakh health cover per family per year' },
      { icon: '📋', text: 'Covers 1,900+ medical procedures including surgeries' },
      { icon: '💊', text: 'Cashless and paperless treatment at empanelled hospitals' },
      { icon: '👨‍👩‍👧‍👦', text: 'No restriction on family size, age, or gender' }
    ],
    eligibility: [
      'Families identified based on SECC (Socio-Economic Caste Census) 2011 data',
      'Rural: families with deprivation criteria (kutcha house, no adult earning member, SC/ST households etc.)',
      'Urban: workers in vulnerable occupational categories',
      'No cap on family size — covers all members',
      'Pre-existing diseases are covered from day one',
      'All public and empanelled private hospitals across India are covered'
    ],
    howToApply: [
      'Check eligibility at mera.pmjay.gov.in using mobile number or ration card',
      'Visit nearest Ayushman Bharat Kendra or empanelled hospital',
      'Carry Aadhaar card, ration card, and any other government ID',
      'Complete biometric verification at the hospital',
      'Receive the Ayushman card (Golden Card) post verification',
      'Avail cashless treatment at any PMJAY-empanelled hospital'
    ],
    ministry: 'Ministry of Health & Family Welfare',
    launchYear: '2018',
    budget: '₹7,200 Crore',
    beneficiaries: '55+ Crore',
    officialLink: 'https://pmjay.gov.in'
  },
  {
    id: 'jan-dhan',
    name: 'PM Jan Dhan Yojana',
    category: 'Financial Inclusion',
    icon: '🏦',
    shortDesc: 'Universal access to banking services with zero-balance accounts and RuPay debit cards.',
    description: 'Pradhan Mantri Jan Dhan Yojana (PMJDY) is one of the biggest financial inclusion initiatives in the world. It provides access to financial services such as savings/deposit accounts, remittance, credit, insurance, and pension with zero balance requirement. Each account holder gets a RuPay debit card.',
    benefits: [
      { icon: '🏦', text: 'Zero balance savings account at any bank' },
      { icon: '💳', text: 'Free RuPay debit card with ₹2 lakh accident insurance' },
      { icon: '🛡️', text: 'Life insurance cover of ₹30,000 for accounts opened before Jan 2015' },
      { icon: '💸', text: 'Overdraft facility of ₹10,000 for eligible accounts' }
    ],
    eligibility: [
      'Any Indian citizen above 10 years of age',
      'Does not have any existing bank account',
      'Minor accounts can be opened with a guardian',
      'Aadhaar card or any officially valid document required for KYC',
      'Even small accounts can be opened with simplified KYC norms',
      'No minimum balance requirement'
    ],
    howToApply: [
      'Visit your nearest bank branch or Banking Correspondent outlet',
      'Fill the Jan Dhan account opening form',
      'Submit KYC documents (Aadhaar, Voter ID, or PAN card)',
      'Provide a recent passport-size photograph',
      'The bank will process and open the zero-balance account',
      'Collect your RuPay debit card and passbook'
    ],
    ministry: 'Ministry of Finance',
    launchYear: '2014',
    budget: 'N/A',
    beneficiaries: '52+ Crore',
    officialLink: 'https://pmjdy.gov.in'
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    category: 'Women & Child',
    icon: '👧',
    shortDesc: 'Small savings scheme for girl child with high interest rates and tax benefits under Sec 80C.',
    description: 'Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme aimed at parents of girl children. It offers one of the highest interest rates among small saving instruments and provides tax benefits under Section 80C. The account matures after 21 years or upon marriage of the girl after age 18.',
    benefits: [
      { icon: '📈', text: 'High interest rate of ~8% per annum, compounded yearly' },
      { icon: '💰', text: 'Tax benefits under Section 80C of Income Tax Act' },
      { icon: '🎓', text: 'Partial withdrawal allowed (50%) for higher education after age 18' },
      { icon: '🔒', text: 'Fully government-backed — safe and secure investment' }
    ],
    eligibility: [
      'Account can be opened for a girl child below 10 years of age',
      'Only one account per girl child is allowed',
      'Maximum two accounts per family (exception for twins/triplets)',
      'Minimum deposit ₹250 per year, maximum ₹1.5 lakh per year',
      'The depositor must be the natural or legal guardian',
      'Account can be opened at any post office or authorized bank'
    ],
    howToApply: [
      'Visit nearest post office or authorized bank (SBI, PNB, ICICI etc.)',
      'Fill out SSY account opening form (Form-1)',
      'Submit birth certificate of the girl child',
      'Submit identity and address proof of the guardian (Aadhaar, PAN)',
      'Make initial deposit (minimum ₹250)',
      'Receive the passbook and maintain yearly minimum deposits'
    ],
    ministry: 'Ministry of Finance',
    launchYear: '2015',
    budget: 'N/A',
    beneficiaries: '3+ Crore',
    officialLink: 'https://www.india.gov.in/sukanya-samriddhi-yojna'
  },
  {
    id: 'ujjwala',
    name: 'PM Ujjwala Yojana',
    category: 'Women & Child',
    icon: '🔥',
    shortDesc: 'Free LPG connections for women from below poverty line households to reduce indoor air pollution.',
    description: 'Pradhan Mantri Ujjwala Yojana (PMUY) aims to safeguard the health of women and children by providing free LPG connections to women from Below Poverty Line (BPL) households. The scheme helps replace unclean cooking fuels with clean LPG, reducing indoor air pollution and associated health risks.',
    benefits: [
      { icon: '🔥', text: 'Free LPG connection with a deposit-free cylinder' },
      { icon: '💰', text: 'Financial assistance of ₹1,600 for each LPG connection' },
      { icon: '🏠', text: 'Reduces indoor air pollution and improves family health' },
      { icon: '⏱️', text: 'Saves time spent on collecting firewood' }
    ],
    eligibility: [
      'Women belonging to Below Poverty Line (BPL) families',
      'Must be above 18 years of age',
      'No existing LPG connection in the household',
      'Identified through SECC-2011 data or specific priority categories',
      'SC/ST households, beneficiaries of PMAY, and forest dwellers are prioritized',
      'Must have a Jan Dhan or savings bank account'
    ],
    howToApply: [
      'Visit the nearest LPG distributor (Indane, Bharat Gas, HP Gas)',
      'Fill the Ujjwala application form (KYC form)',
      'Submit Aadhaar card, BPL certificate, and ration card',
      'Provide a bank account passbook copy',
      'Submit a passport-size photograph',
      'Collect the LPG connection after verification and approval'
    ],
    ministry: 'Ministry of Petroleum & Natural Gas',
    launchYear: '2016',
    budget: '₹12,800 Crore',
    beneficiaries: '10+ Crore',
    officialLink: 'https://www.pmuy.gov.in'
  },
  {
    id: 'mgnrega',
    name: 'MGNREGA',
    category: 'Employment',
    icon: '👷',
    shortDesc: 'Guarantees 100 days of wage employment per year to every rural household for unskilled manual work.',
    description: 'The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) guarantees 100 days of wage employment per financial year to every rural household whose adult members volunteer to do unskilled manual work. It enhances livelihood security and creates durable community assets.',
    benefits: [
      { icon: '💼', text: '100 days of guaranteed wage employment per household per year' },
      { icon: '💰', text: 'Wages directly transferred to bank/post office accounts' },
      { icon: '🏗️', text: 'Creates community infrastructure: roads, wells, irrigation canals' },
      { icon: '📋', text: 'Unemployment allowance if work not provided within 15 days' }
    ],
    eligibility: [
      'Adult members of any rural household willing to do unskilled manual work',
      'Must apply for a Job Card at the local Gram Panchayat',
      'Applicant must be above 18 years of age',
      'Must be a resident of the rural area where the application is made',
      'Job Card is valid for 5 years across the entire family',
      'Both men and women are eligible with equal wages'
    ],
    howToApply: [
      'Visit the Gram Panchayat office in your village',
      'Apply for a Job Card with a passport-size photograph',
      'Job Card will be issued within 15 days after verification',
      'Submit a written demand for work to the Gram Panchayat',
      'Work must be provided within 15 days of demand',
      'Wages will be credited to your bank/post office account within 15 days'
    ],
    ministry: 'Ministry of Rural Development',
    launchYear: '2006',
    budget: '₹86,000 Crore',
    beneficiaries: '7+ Crore Households',
    officialLink: 'https://nrega.nic.in'
  },
  {
    id: 'samagra-shiksha',
    name: 'Samagra Shiksha Abhiyan',
    category: 'Education',
    icon: '📚',
    shortDesc: 'Integrated programme for school education covering pre-school to Class XII for quality education.',
    description: 'Samagra Shiksha is an integrated scheme for school education from pre-school to Class XII. It subsumes three earlier schemes — Sarva Shiksha Abhiyan (SSA), Rashtriya Madhyamik Shiksha Abhiyan (RMSA), and Teacher Education. It aims to improve school effectiveness, ensure equity, and promote inclusion.',
    benefits: [
      { icon: '📖', text: 'Free textbooks, uniforms, and transport for eligible students' },
      { icon: '🏫', text: 'Infrastructure development: classrooms, libraries, labs' },
      { icon: '👩‍🏫', text: 'Teacher training and professional development' },
      { icon: '💻', text: 'Digital learning resources and ICT integration in schools' }
    ],
    eligibility: [
      'All students from pre-school to Class XII in government and aided schools',
      'Special focus on girls, SC/ST, minority, and CWSN students',
      'Students from economically weaker sections get additional support',
      'Schools in rural and urban areas across all states and UTs',
      'Teachers in government schools eligible for training programs',
      'Schools must be recognized by the respective state education board'
    ],
    howToApply: [
      'Enroll in any government or government-aided school',
      'Benefits are automatically provided to enrolled students',
      'Parents can approach Block Education Officer for specific entitlements',
      'Schools apply for infrastructure grants through state education departments',
      'Teachers register through DIKSHA portal for training modules',
      'States submit Annual Work Plans for fund allocation under the scheme'
    ],
    ministry: 'Ministry of Education',
    launchYear: '2018',
    budget: '₹37,453 Crore',
    beneficiaries: '26+ Crore Students',
    officialLink: 'https://samagra.education.gov.in'
  },
  {
    id: 'mudra',
    name: 'PM Mudra Yojana',
    category: 'Employment',
    icon: '🏢',
    shortDesc: 'Collateral-free loans up to ₹10 lakh for micro and small enterprises under Shishu, Kishore, Tarun.',
    description: 'Pradhan Mantri MUDRA Yojana (PMMY) provides collateral-free micro loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises. The loans are offered in three categories: Shishu (up to ₹50,000), Kishore (₹50,001 to ₹5 lakh), and Tarun (₹5,00,001 to ₹10 lakh).',
    benefits: [
      { icon: '💰', text: 'Collateral-free loans — no security or guarantor needed' },
      { icon: '📊', text: 'Three categories: Shishu, Kishore, Tarun based on loan amount' },
      { icon: '🏦', text: 'Available through all public & private sector banks, NBFCs, MFIs' },
      { icon: '📋', text: 'MUDRA card for withdrawing working capital as needed' }
    ],
    eligibility: [
      'Any Indian citizen with a business plan for non-farm income activity',
      'Micro and small enterprises including manufacturing, trading, and services',
      'New and existing entrepreneurs; no restriction on business vintage',
      'Women entrepreneurs given priority under Mahila Udyami scheme',
      'SC/ST and minority applicants are encouraged',
      'Business should not be a defaulter to any bank/financial institution'
    ],
    howToApply: [
      'Visit the nearest bank branch or NBFC offering MUDRA loans',
      'Download and fill the MUDRA loan application form',
      'Submit business plan/project report along with identity proof',
      'Provide address proof, photographs, and business documents',
      'Bank will process the application — usually within 7–10 working days',
      'Apply online through the Udyamimitra portal at udyamimitra.in'
    ],
    ministry: 'Ministry of Finance',
    launchYear: '2015',
    budget: '₹3 Lakh Crore (cumulative)',
    beneficiaries: '47+ Crore Loans Sanctioned',
    officialLink: 'https://www.mudra.org.in'
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana',
    category: 'Financial Inclusion',
    icon: '🧓',
    shortDesc: 'Guaranteed pension of ₹1,000 to ₹5,000/month after age 60 for unorganised sector workers.',
    description: 'Atal Pension Yojana (APY) is the government\'s guaranteed pension scheme targeted at the unorganised sector workers. It provides a fixed pension of ₹1,000 to ₹5,000 per month after the age of 60, depending on the contribution and the age of joining.',
    benefits: [
      { icon: '🧓', text: 'Guaranteed monthly pension of ₹1,000 to ₹5,000 after age 60' },
      { icon: '👨‍👩‍👧', text: 'Same pension amount to spouse after subscriber\'s death' },
      { icon: '💰', text: 'Return of accumulated corpus to nominee on death of both' },
      { icon: '🏛️', text: 'Government guaranteed — safe and assured returns' }
    ],
    eligibility: [
      'Indian citizen between 18 and 40 years of age',
      'Must have a savings bank account',
      'Must link Aadhaar and mobile number to the bank account',
      'Not a member of any statutory social security scheme',
      'Income tax payers are not eligible (from Oct 2022)',
      'Contribution continues until age 60; pension starts from age 60'
    ],
    howToApply: [
      'Visit your bank branch where you hold a savings account',
      'Fill the APY registration form available at the bank',
      'Choose the desired pension amount (₹1,000 to ₹5,000/month)',
      'Provide Aadhaar number and mobile number',
      'Set up auto-debit from your savings account for contributions',
      'Can also enroll through net banking or mobile banking apps'
    ],
    ministry: 'Ministry of Finance (PFRDA)',
    launchYear: '2015',
    budget: 'N/A',
    beneficiaries: '6+ Crore',
    officialLink: 'https://www.npscra.nsdl.co.in/scheme-details.php'
  },
  {
    id: 'fasal-bima',
    name: 'PM Fasal Bima Yojana',
    category: 'Agriculture',
    icon: '🌱',
    shortDesc: 'Affordable crop insurance for farmers with premium as low as 2% for Kharif and 1.5% for Rabi crops.',
    description: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) provides comprehensive crop insurance cover against crop loss/damage arising from unforeseen events at very low premium rates. It uses technology like satellite imagery, drones, and AI for fast claim settlement.',
    benefits: [
      { icon: '🌾', text: 'Premium as low as 2% for Kharif, 1.5% for Rabi, 5% for horticulture' },
      { icon: '📱', text: 'Claim settlement within 2 months using technology-driven assessment' },
      { icon: '🌧️', text: 'Covers natural calamities, pests, diseases, and post-harvest losses' },
      { icon: '💰', text: 'No cap on government subsidy — full sum insured coverage' }
    ],
    eligibility: [
      'All farmers including sharecroppers and tenant farmers',
      'Must be growing notified crops in notified areas',
      'Voluntary for all farmers (since Kharif 2020)',
      'Loanee farmers must have crop loan account with a bank',
      'Non-loanee farmers can also apply through CSC centers or agents',
      'Must submit crop sowing declaration within the specified window'
    ],
    howToApply: [
      'Visit the nearest bank, CSC center, or insurance company agent',
      'Apply online at pmfby.gov.in or through the crop insurance app',
      'Submit land records, Aadhaar, bank details, and sowing certificate',
      'Pay the farmer\'s share of premium (subsidized rate)',
      'Enrolment window: before sowing season deadline for each crop',
      'Report crop loss within 72 hours through the portal or helpline 14447'
    ],
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    launchYear: '2016',
    budget: '₹15,500 Crore',
    beneficiaries: '4+ Crore',
    officialLink: 'https://pmfby.gov.in'
  },
  {
    id: 'beti-bachao',
    name: 'Beti Bachao Beti Padhao',
    category: 'Women & Child',
    icon: '👩‍🎓',
    shortDesc: 'National campaign for survival, protection, education, and empowerment of the girl child.',
    description: 'Beti Bachao Beti Padhao (BBBP) is a campaign of the Government of India that aims to generate awareness and improve the efficiency of welfare services intended for girls. It addresses the declining Child Sex Ratio and promotes education and empowerment of girls.',
    benefits: [
      { icon: '📚', text: 'Promotes girl child education and enrollment in schools' },
      { icon: '🏥', text: 'Improved health and nutrition services for young girls' },
      { icon: '⚖️', text: 'Enforcement against sex-selective elimination (PC&PNDT Act)' },
      { icon: '🎯', text: 'Community mobilization and awareness campaigns' }
    ],
    eligibility: [
      'All girl children and their families across India',
      'Initially focused on 100 districts with low Child Sex Ratio (CSR)',
      'Now expanded to all 640+ districts across the country',
      'Multi-sectoral approach involving Health, Education, and WCD departments',
      'Schools, Anganwadi centres, and hospitals participate',
      'Any citizen can join awareness campaigns and report violations'
    ],
    howToApply: [
      'Benefits are delivered through existing government infrastructure',
      'Enroll girl children in nearby schools — education is free and compulsory',
      'Visit Anganwadi centers for health and nutrition services',
      'Report sex-selective practices to the district magistrate or call 181',
      'Participate in community awareness programmes and rallies',
      'Access resources at wcd.nic.in for detailed information'
    ],
    ministry: 'Ministry of Women & Child Development',
    launchYear: '2015',
    budget: '₹1,100 Crore',
    beneficiaries: 'All Girls Nationwide',
    officialLink: 'https://wcd.nic.in/bbbp-schemes'
  }
];

// ---------- Category icon classes mapping ----------
const CATEGORY_ICON_CLASS = {
  'Agriculture':         'scheme-card__icon--agriculture',
  'Housing':             'scheme-card__icon--housing',
  'Health':              'scheme-card__icon--health',
  'Financial Inclusion': 'scheme-card__icon--financial',
  'Women & Child':       'scheme-card__icon--women',
  'Employment':          'scheme-card__icon--employment',
  'Education':           'scheme-card__icon--education'
};

// ---------- DOM Ready ----------
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  detectPage();
});

// ---------- Page Detection ----------
function detectPage() {
  const path = window.location.pathname;
  if (path.includes('scheme-detail')) {
    renderDetailPage();
  } else if (path.includes('schemes')) {
    renderSchemesPage();
  } else {
    renderHomePage();
  }
}

// ==============================
//  NAVBAR
// ==============================
function initNavbar() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }
}

// ==============================
//  SCROLL ANIMATIONS
// ==============================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ==============================
//  HOME PAGE
// ==============================
function renderHomePage() {
  const grid = document.getElementById('schemesGrid');
  const searchInput = document.getElementById('heroSearch');
  const filterChips = document.querySelectorAll('.filters__chip');

  if (!grid) return;

  let activeCategory = 'All';

  // Render cards
  function renderCards(filter = '', category = 'All') {
    const filtered = SCHEMES.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(filter.toLowerCase()) ||
                            s.shortDesc.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === 'All' || s.category === category;
      return matchesSearch && matchesCategory;
    });

    grid.innerHTML = filtered.map(s => createSchemeCard(s)).join('');

    // Re-observe for animations
    document.querySelectorAll('.scheme-card.fade-in').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });

    // No results
    const noResults = document.getElementById('noResults');
    if (noResults) {
      noResults.classList.toggle('visible', filtered.length === 0);
    }
  }

  // Initial render
  renderCards();

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderCards(e.target.value, activeCategory);
    });
  }

  // Category filters
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.category;
      const searchVal = searchInput ? searchInput.value : '';
      renderCards(searchVal, activeCategory);
    });
  });
}

// ==============================
//  SCHEMES LISTING PAGE
// ==============================
function renderSchemesPage() {
  const grid = document.getElementById('listingGrid');
  const searchInput = document.getElementById('listingSearch');
  const filterChips = document.querySelectorAll('.filters__chip');

  if (!grid) return;

  let activeCategory = 'All';

  function renderCards(filter = '', category = 'All') {
    const filtered = SCHEMES.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(filter.toLowerCase()) ||
                            s.shortDesc.toLowerCase().includes(filter.toLowerCase()) ||
                            s.category.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === 'All' || s.category === category;
      return matchesSearch && matchesCategory;
    });

    grid.innerHTML = filtered.map(s => createSchemeCard(s)).join('');

    document.querySelectorAll('.scheme-card.fade-in').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });

    const noResults = document.getElementById('noResults');
    if (noResults) {
      noResults.classList.toggle('visible', filtered.length === 0);
    }
  }

  renderCards();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderCards(e.target.value, activeCategory);
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.category;
      const searchVal = searchInput ? searchInput.value : '';
      renderCards(searchVal, activeCategory);
    });
  });
}

// ==============================
//  CREATE SCHEME CARD HTML
// ==============================
function createSchemeCard(scheme) {
  const iconClass = CATEGORY_ICON_CLASS[scheme.category] || '';
  return `
    <a href="scheme-detail.html?id=${scheme.id}" class="scheme-card fade-in">
      <div class="scheme-card__header">
        <div class="scheme-card__icon ${iconClass}">${scheme.icon}</div>
        <div>
          <h3 class="scheme-card__title">${scheme.name}</h3>
          <span class="scheme-card__category">${scheme.category}</span>
        </div>
      </div>
      <p class="scheme-card__desc">${scheme.shortDesc}</p>
      <div class="scheme-card__tags">
        <span class="scheme-card__tag">Since ${scheme.launchYear}</span>
        <span class="scheme-card__tag">${scheme.beneficiaries}</span>
      </div>
      <span class="scheme-card__link">View Details →</span>
    </a>
  `;
}

// ==============================
//  DETAIL PAGE
// ==============================
function renderDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const schemeId = params.get('id');
  const scheme = SCHEMES.find(s => s.id === schemeId);

  if (!scheme) {
    document.getElementById('detailContent').innerHTML = `
      <div style="text-align:center;padding:80px 20px;">
        <h2>Scheme Not Found</h2>
        <p style="color:var(--text-secondary);margin:16px 0 24px;">The scheme you are looking for does not exist.</p>
        <a href="schemes.html" class="btn-back">← Back to All Schemes</a>
      </div>
    `;
    return;
  }

  // Title
  const titleEl = document.getElementById('detailTitle');
  if (titleEl) titleEl.textContent = scheme.name;

  // Page title
  document.title = `${scheme.name} — Jan Kalyan`;

  // Breadcrumb
  const breadcrumbName = document.getElementById('breadcrumbName');
  if (breadcrumbName) breadcrumbName.textContent = scheme.name;

  // Meta
  const metaEl = document.getElementById('detailMeta');
  if (metaEl) {
    metaEl.innerHTML = `
      <div class="detail-hero__meta-item"><span class="label">Ministry:</span> ${scheme.ministry}</div>
      <div class="detail-hero__meta-item"><span class="label">Since:</span> ${scheme.launchYear}</div>
      <div class="detail-hero__meta-item"><span class="label">Budget:</span> ${scheme.budget}</div>
    `;
  }

  // Overview
  const overviewEl = document.getElementById('detailOverview');
  if (overviewEl) overviewEl.textContent = scheme.description;

  // Benefits
  const benefitsEl = document.getElementById('detailBenefits');
  if (benefitsEl) {
    benefitsEl.innerHTML = scheme.benefits.map(b => `
      <div class="benefit-card">
        <div class="benefit-card__icon">${b.icon}</div>
        <p class="benefit-card__text">${b.text}</p>
      </div>
    `).join('');
  }

  // Eligibility
  const eligibilityEl = document.getElementById('detailEligibility');
  if (eligibilityEl) {
    eligibilityEl.innerHTML = scheme.eligibility.map(e => `
      <div class="eligibility-list__item">
        <span class="eligibility-list__check">✓</span>
        <span>${e}</span>
      </div>
    `).join('');
  }

  // How to Apply
  const applyEl = document.getElementById('detailApply');
  if (applyEl) {
    applyEl.innerHTML = scheme.howToApply.map((step, i) => `
      <div class="steps-list__item">
        <div class="steps-list__num">${i + 1}</div>
        <p class="steps-list__text">${step}</p>
      </div>
    `).join('');
  }

  // Sidebar
  const sidebarEl = document.getElementById('detailSidebar');
  if (sidebarEl) {
    sidebarEl.innerHTML = `
      <div class="sidebar-card">
        <h3 class="sidebar-card__title">Quick Facts</h3>
        <div class="sidebar-card__item">
          <span class="sidebar-card__label">Ministry</span>
          <span class="sidebar-card__value">${scheme.ministry.split('Ministry of ')[1] || scheme.ministry}</span>
        </div>
        <div class="sidebar-card__item">
          <span class="sidebar-card__label">Launched</span>
          <span class="sidebar-card__value">${scheme.launchYear}</span>
        </div>
        <div class="sidebar-card__item">
          <span class="sidebar-card__label">Budget</span>
          <span class="sidebar-card__value">${scheme.budget}</span>
        </div>
        <div class="sidebar-card__item">
          <span class="sidebar-card__label">Beneficiaries</span>
          <span class="sidebar-card__value">${scheme.beneficiaries}</span>
        </div>
        <div class="sidebar-card__item">
          <span class="sidebar-card__label">Category</span>
          <span class="sidebar-card__value">${scheme.category}</span>
        </div>
        <a href="${scheme.officialLink}" target="_blank" rel="noopener noreferrer" class="sidebar-card__btn">
          Visit Official Website ↗
        </a>
      </div>
    `;
  }
}
