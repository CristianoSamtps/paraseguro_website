(function () {
  /* ══ HELPERS ══ */
  function meta(attrs) {
    var el = document.createElement('meta');
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    document.head.appendChild(el);
  }
  function link(attrs) {
    var el = document.createElement('link');
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    document.head.appendChild(el);
  }
  function jsonld(data) {
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(el);
  }

  /* ══ TITLE ══ */
  document.title = 'Paraseguro | Proteção Independente em Sinistros de Seguros em Portugal';

  /* ══ SEO CORE ══ */
  meta({ name: 'description', content: 'O Paraseguro avoca a gestão do teu sinistro, retirando à seguradora o controlo do processo. Especialistas de saúde, engenharia, crédito e justiça exclusivamente do teu lado.' });
  meta({ name: 'keywords', content: 'paraseguro, sinistros seguros, proteção independente, gestão sinistros, peritagem independente, advocacia seguros, direitos seguro, Portugal' });
  meta({ name: 'author', content: 'Paraseguro' });
  meta({ name: 'robots', content: 'index, follow' });
  link({ rel: 'canonical', href: 'https://paraseguro.pt/' });

  /* ══ OPEN GRAPH ══ */
  var ogTags = [
    { property: 'og:type',        content: 'website' },
    { property: 'og:site_name',   content: 'Paraseguro' },
    { property: 'og:locale',      content: 'pt_PT' },
    { property: 'og:url',         content: 'https://paraseguro.pt/' },
    { property: 'og:title',       content: 'Paraseguro | Proteção Independente em Sinistros de Seguros' },
    { property: 'og:description', content: 'Num sinistro, a seguradora controla tudo em seu favor. O Paraseguro retira-lhe esse controlo e garante que não perdes aquilo a que tens direito.' },
    { property: 'og:image',       content: 'https://paraseguro.pt/files/pexels-photo-5445223_v2.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height',content: '630' },
    { property: 'og:image:alt',   content: 'Paraseguro — Proteção independente em sinistros de seguros' }
  ];
  ogTags.forEach(function (t) { meta(t); });

  /* ══ TWITTER CARD ══ */
  var twTags = [
    { name: 'twitter:card',        content: 'summary_large_image' },
    { name: 'twitter:site',        content: '@paraseguro' },
    { name: 'twitter:title',       content: 'Paraseguro | Proteção Independente em Sinistros de Seguros' },
    { name: 'twitter:description', content: 'Num sinistro, a seguradora controla tudo em seu favor. O Paraseguro retira-lhe esse controlo e garante que não perdes aquilo a que tens direito.' },
    { name: 'twitter:image',       content: 'https://paraseguro.pt/files/pexels-photo-5445223_v2.jpg' }
  ];
  twTags.forEach(function (t) { meta(t); });

  /* ══ DADOS ESTRUTURADOS (JSON-LD) ══ */
  jsonld({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://paraseguro.pt/#organization',
        name: 'Paraseguro',
        url: 'https://paraseguro.pt/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://paraseguro.pt/files/logo_paraseguro_RGB-02.svg',
          width: 200,
          height: 60
        },
        description: 'O Paraseguro avoca a gestão do teu sinistro, retirando à seguradora o controlo hegemónico do processo.',
        areaServed: { '@type': 'Country', name: 'Portugal' },
        inLanguage: 'pt-PT',
        sameAs: [
          'https://www.facebook.com/paraseguro',
          'https://www.instagram.com/paraseguro'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://paraseguro.pt/#website',
        url: 'https://paraseguro.pt/',
        name: 'Paraseguro',
        publisher: { '@id': 'https://paraseguro.pt/#organization' },
        inLanguage: 'pt-PT'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://paraseguro.pt/#webpage',
        url: 'https://paraseguro.pt/',
        name: 'Paraseguro | Proteção Independente em Sinistros de Seguros em Portugal',
        isPartOf: { '@id': 'https://paraseguro.pt/#website' },
        about: { '@id': 'https://paraseguro.pt/#organization' },
        description: 'O Paraseguro avoca a gestão do teu sinistro, retirando à seguradora o controlo hegemónico do processo. Saúde, engenharia, crédito e justiça — exclusivamente do teu lado.',
        inLanguage: 'pt-PT',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://paraseguro.pt/' }
          ]
        }
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://paraseguro.pt/#service',
        name: 'Paraseguro',
        url: 'https://paraseguro.pt/',
        provider: { '@id': 'https://paraseguro.pt/#organization' },
        description: 'Gestão independente e especializada de sinistros de seguros em Portugal.',
        serviceType: 'Gestão de Sinistros de Seguros',
        areaServed: { '@type': 'Country', name: 'Portugal' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Áreas de Atuação',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Saúde', description: 'Assistência médica especializada em sinistros de saúde e acidentes pessoais' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engenharia', description: 'Peritagem independente e gestão técnica de danos materiais e patrimoniais' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Crédito', description: 'Proteção financeira, estabilidade e preservação do teu património pessoal' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Justiça', description: 'Advocacia ativa e permanente dos teus direitos perante a seguradora' } }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://paraseguro.pt/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'O que é o paraseguro?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'O paraseguro é um serviço de proteção independente que avoca a gestão do teu sinistro, retirando à seguradora o controlo hegemónico do processo para garantir que não perdes aquilo a que tens direito.'
            }
          },
          {
            '@type': 'Question',
            name: 'Como funciona o paraseguro?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Quando tens um sinistro, contactas o paraseguro e a equipa avoca a gestão do processo. Especialistas de saúde, engenharia, crédito e justiça tratam de tudo exclusivamente no teu interesse.'
            }
          },
          {
            '@type': 'Question',
            name: 'Quais são as áreas de atuação do paraseguro?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'O paraseguro atua nas áreas de Saúde, Engenharia, Crédito, Proteção civil, Justiça e Bem-estar, oferecendo cobertura completa em cada domínio.'
            }
          }
        ]
      }
    ]
  });
})();
