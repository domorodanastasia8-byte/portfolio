(function () {
  const languageStorageKey = 'portfolio-language-v1';
  const groups = [
    ['.skip-link', ['Skip to content']],
    ['.wordmark', ['ANASTASIA DOMOROD']],
    ['.site-nav nav a', ['Selected work', 'Results', 'Experience']],
    ['.eyebrow', ['<span class="micro-mark" aria-hidden="true"></span>Senior Marketer · B2C · 6+ years of experience']],
    ['.positioning', ['I build controllable marketing systems — without chaos or unnecessary activity']],
    ['.hero-meta p', ['Location: Batumi, Georgia', 'Markets: Russia, Georgia, also open to opportunities in other countries', 'Work format: full-time / part-time', 'English: B1 (currently improving)']],
    ['.cases .section-title > p', ['Selected work']],
    ['.cases-heading-core h2', ['System, action,<br>result']],
    ['.system-field-labels span', ['Chaos', 'System']],
    ['.case-intro > p:first-child', ['Case 1 (beauty)', 'Case 2 (fitness)', 'Case 3 (tourism)']],
    ['.case-intro h3', ['Restoring marketing control and growing without expanding the team', 'Launching and scaling a franchise marketing network from scratch', 'Turning an unprofitable location into a profitable one']],
    ['.case-intro > p:last-child', ['My role: Head of Marketing / Marketing Operations Lead', 'My role: Head of Marketing', 'My role: Marketing Specialist']],
    ['.case-outcome h4', ['Result:', 'Result:', 'Result:']],
    ['.case-outcome p', [
      '— +30% inbound traffic<br>— Reduced marketing costs by removing ineffective channels<br>— Marketing became profitable and predictable<br>— No staff turnover<br>— A clear, transparent and scalable department operating system',
      '— Launched a repeatable marketing model for a 13-location network<br>— New locations opened through a clear, controllable playbook<br>— Marketing no longer depended on manual management<br>— Greater visibility and business control<br>— A resilient system ready to scale further',
      '— The location moved out of loss and began consistently meeting its revenue target'
    ]],
    ['.case-details summary', ['Context / challenge:', 'What I did:', 'Context / challenge:', 'What I did:', 'Context / challenge:', 'What I did:']],
    ['.case-details details p', [
      '— Complete chaos in the marketing department<br>— Low inbound traffic<br>— Processes were undocumented and roles were unclear<br>— No shared strategy or direction<br>— The department was unprofitable<br>— No consolidated analytics or performance control',
      '— Audited the current state of marketing and the team<br>— Documented and formalized all key processes<br>— Developed and implemented operating standards<br>— Introduced regular 1:1s<br>— Defined ownership and KPIs (development plans for every team member)<br>— Built consolidated analytics across all marketing channels<br>— Removed ineffective tools and activities based on data',
      '— A franchise partner with a 13-location network<br>— No centralized marketing<br>— No documented processes or standards<br>— New locations planned<br>— Needed a system that could scale without manual management<br>— No funnels<br>— Low traffic at 7 branches (3 were unprofitable)',
      '— Built marketing from scratch: strategy, channels, funnels, hiring and contractor management<br>— Created all key processes and operating standards<br>— Built and managed a four-person team<br>— Supported new-location launches, including a record-revenue opening<br>— Set up analytics and performance control across all locations<br>— Introduced unified marketing standards for the network',
      '— The location achieved only 70–80% of its revenue plan and operated at a loss<br>— Difficult-to-reach location<br>— Weak presence in local promotion channels<br>— Not enough traffic',
      '— Built collaborations and partnerships<br>— Organized on-site events as newsworthy moments<br>— Established media relations<br>— Launched outdoor advertising<br>— Grew the location’s social channels<br>— Promoted the location on map services<br>— Added new traffic sources'
    ]],
    ['.proof .section-title > p', ['Results']],
    ['.proof .section-title h2', ['Numbers']],
    ['.lead-counter p', ['New leads attracted<br>during my work']],
    ['.metric p', ['6+ years in marketing with real cases', 'ROI over 6 months without increasing the budget (<em>beauty</em>)', '7,266 leads in 5 months — before I joined, the company generated 48% fewer in the same period (<em>fitness</em>)', 'Brand awareness in the city grew through influencer marketing and PR (<em>retail</em>)', 'Website conversion doubled (<em>retail</em>)', 'Location revenue plan achieved at 95–100%, up from 70–80% in 2 months (<em>tourism</em>)']],
    ['.summary .mini-title', ['<span class="micro-mark" aria-hidden="true"></span>Approach']],
    ['.summary > p', [
      'Marketing leader with 6+ years of experience. I build marketing systems from scratch and bring order to departments where chaos came first: no documented processes, no analytics, no control.',
      'My core experience is in B2C: beauty, fitness, retail, edtech and tourism.<br>The methodology transfers to any vertical: current-state audit → process structure → analytics → sustainable growth without manual management.',
      'I work in different formats — full-time / part-time, depending on the company’s needs.'
    ]],
    ['.capabilities .mini-title', ['Competencies']],
    ['.capability h3', ['Marketing audit and diagnostics', 'Building analytics and reporting from scratch', 'Team management', 'Operating standards and KPIs', 'AI &amp; Automation', 'Ad platforms']],
    ['.capability p', ['I find the point of chaos in a department and turn it into a system', 'Consolidated channel analytics and performance control', 'Experience leading teams of 3 to 10 people', 'Defining ownership, roles and regular 1:1s', 'I build Telegram bots and mini-apps (vibe-coding) and configure AI agents for marketing-team tasks — covering part of an assistant’s role without another hire', 'VK, Telegram Ads, Meta Ads (Facebook/Instagram), Yandex Direct']],
    ['.experience .section-title > p', ['Experience']],
    ['.job h3', ['UMNIX', 'Pacha Mama Alpaca Park', 'IDOL FACE', 'STRETCH HOUSE', 'FREELANCE', 'KRASNOE & BELOE', 'GLORYES']],
    ['.job > div > p', [
      'Online school, edtech startup', 'Marketing Specialist · 2026', '— Built a marketing system from scratch and diversified traffic beyond the main channel<br>— We did not reach payback: the bottleneck was on the sales side, not marketing',
      'Alpaca contact-park chain', 'Marketing Specialist · 2026', '— Led marketing for four locations<br>— Collaborations and partnerships, event-led PR moments, media relations, outdoor advertising and map-service promotion',
      'Facial lifting massage studio chain', 'Head of Marketing · 2025–2026', '— Led marketing at management-company level: strategy, processes and analytics<br>— Managed a team of 10<br>— Increased inbound traffic by 30% through systematic channel optimization<br>— Automated marketing processes for a network of 100+ franchisees',
      'Women’s fitness studio chain', 'Marketing Director · 2024–2025', '— Built marketing from scratch for a 13-location network<br>— Managed a team of 4<br>— Created and implemented key processes: funnels, channels, analytics and operating standards<br>— Prepared a system that scales without losing control',
      'Internet Marketer · 2022–2024', 'Telegram bots, websites, marketing strategy development and execution, contractor management and ad-account setup',
      'Head of SMM · 2021', 'Built the company’s social-media image, organized shoots, worked with bloggers, managed contractors and directly led 3 people'
    ]],
    ['.job-letter span:first-child', ['View recommendation letter', 'View recommendation letter']],
    ['.job:last-child p', ['SMM Specialist · 2020']],
    ['.work-samples .mini-title', ['<span class="micro-mark" aria-hidden="true"></span>Portfolio in detail']],
    ['.samples-heading h2', ['See me<br>in action']],
    ['.samples-heading > p', ['Examples of working documents: from research and strategy to processes and analytics. All data is anonymized.']],
    ['.sample-card .sample-type', ['PDF · strategy', 'PDF · customer research', 'Table · processes', 'Table · analytics', 'PDF · funnel']],
    ['.sample-card strong', ['Marketing strategy example', 'Target-audience research', 'Marketing department process map', 'Marketing analytics example', 'Ad-source analytics']],
    ['.contact-main .mini-title', ['<span class="micro-mark light" aria-hidden="true"></span>CONTACT ME']],
    ['.contact-main h2', ['Open to collaboration']],
    ['.contact-main > p', ['Batumi, Georgia']],
    ['.contact-side > p', ['— with companies in Russia: self-employed / Russian employment contract (remote)<br>— with companies in Georgia: hybrid format possible, Batumi<br>— also open to offers from other countries (remote)']],
    ['.contact-links a span', ['Telegram: @domorod', 'WhatsApp: +995 599 05 89 86']],
    ['.text-editor-toggle', ['Edit text']],
    ['.text-editor-actions > span', ['Click text to edit it']],
    ['.text-editor-save', ['Save']],
    ['.text-editor-cancel', ['Cancel']]
  ];

  const tracked = [];
  groups.forEach(([selector, values]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      const value = values[index];
      if (typeof value !== 'string') return;
      if (!tracked.some((item) => item.element === element)) tracked.push({ element, ru: element.innerHTML, en: value });
    });
  });

  const applyLanguage = (language) => {
    const isEnglish = language === 'en';
    tracked.forEach(({ element, ru, en }) => { element.innerHTML = isEnglish ? en : ru; });
    document.documentElement.lang = isEnglish ? 'en' : 'ru';
    document.title = isEnglish ? 'Anastasia Domorod | Senior Marketer' : 'Анастасия Домород | Senior Marketer';
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = isEnglish
      ? 'Anastasia Domorod. Senior Marketer building controllable marketing systems and business growth.'
      : 'Анастасия Домород. Senior Marketer с опытом построения управляемых маркетинговых систем и роста бизнес-показателей.';
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) skipLink.setAttribute('aria-label', isEnglish ? 'Skip to content' : 'Перейти к содержанию');
    document.querySelectorAll('[data-language]').forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const switcher = document.querySelector('[data-language-switcher]');
    if (switcher) switcher.setAttribute('aria-label', isEnglish ? 'Language selection' : 'Выбор языка');
    document.querySelectorAll('.job-letter').forEach((link, index) => {
      link.setAttribute('aria-label', isEnglish
        ? `View recommendation letter from ${index === 0 ? 'IDOL FACE' : 'Stretch House'} in a new tab`
        : `Посмотреть рекомендательное письмо от ${index === 0 ? 'IDOL FACE' : 'Stretch House'} в новой вкладке`);
    });
    const counter = document.querySelector('.lead-counter');
    if (counter) counter.setAttribute('aria-label', isEnglish ? 'More than 45,000 new leads attracted during my work' : 'Более 45 000 новых лидов привлечено за время работы');
    document.querySelectorAll('.sample-card').forEach((link, index) => {
      const enLabels = ['Open marketing strategy example in a new tab', 'Open target-audience research in a new tab', 'Open marketing department process map in a new tab', 'Open marketing analytics example in a new tab', 'Open ad-source analytics in a new tab'];
      const ruLabels = ['Открыть пример маркетинговой стратегии в новой вкладке', 'Открыть исследование целевой аудитории в новой вкладке', 'Открыть карту процессов отдела маркетинга в новой вкладке', 'Открыть пример маркетинговой аналитики в новой вкладке', 'Открыть аналитику рекламных источников в новой вкладке'];
      link.setAttribute('aria-label', (isEnglish ? enLabels : ruLabels)[index]);
    });
    window.localStorage.setItem(languageStorageKey, language);
  };

  const initialLanguage = window.localStorage.getItem(languageStorageKey) === 'en' ? 'en' : 'ru';
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language));
  });
  applyLanguage(initialLanguage);
})();
