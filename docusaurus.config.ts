// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TSD UI Team',
  tagline: 'Internal docs',
  favicon: 'img/favicon-rh.svg',

  // production url of the docs
  url: process.env.DOCS_URL || 'http://localhost:3000',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.DOCS_BASE_URL || '/',

  onBrokenLinks: 'log',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  noIndex: true,

  plugins: [require.resolve('docusaurus-lunr-search')],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tsd-ui/tsd-ui-team-docs/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/securesign/tsd-ui-team-docs/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'TSD UI Team Docs',
        logo: {
          alt: 'Red Hat Logo',
          src: 'img/Logo-Red_Hat-Hat_icon-Standard-RGB.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tasDocsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/blog', label: 'Blog', position: 'left'
          },
          {
            href: 'https://github.com/tsd-ui/tsd-ui-team-docs',
            label: 'GitHub',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Jira Links',
            items: [
              {
                label: 'TSD UI Dashboard',
                href: 'https://issues.redhat.com/secure/Dashboard.jspa?selectPageId=12390994',
              },
              {
                label: 'All TSD UI Issues',
                href: 'https://issues.redhat.com/issues/?filter=12483581',
              },
              {
                label: 'Good First Issues',
                href: 'https://issues.redhat.com/issues/?filter=12468470',
              },
            ],
          },
          {
            title: 'TSD UI Org',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/tsd-ui',
              },
              {
                label: 'Google Drive',
                href: 'https://drive.google.com/drive/u/0/folders/1yLnj4F_fttu5oZqezvKf9LrKBxxnPbrS'
              },
              {
                label: 'Projects & Repositories',
                href: 'https://docs.google.com/document/d/1eMdS_JS0SaAwkaEhsa_DbG48ct-GYOV63qemeb4nOlI/edit?tab=t.0#heading=h.g0vplhwymsan'
              }
            ],
          },
          {
            title: 'Communications',
            items: [
              {
                label: 'Slack (team)',
                href: 'https://redhat.enterprise.slack.com/archives/C09MQNXHECQ',
              },
              {
                label: 'ADS & TSD UI Team Calendar',
                href: 'https://calendar.google.com/calendar/embed?src=c_4e1eb218a69baa5a98bbb94b0d057c0ff3bfa5937d6250dbf6f0ad2e970bb712%40group.calendar.google.com&ctz=Europe%2FLondon'
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Red Hat`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
