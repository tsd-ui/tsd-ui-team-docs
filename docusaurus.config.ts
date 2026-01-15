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
  url: 'http://localhost',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true
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
          alt: 'TAS Logo',
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
            to: '/f2f', label: 'F2F', position: 'left'
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
            title: 'Helpful Links',
            items: [
              {
                label: 'New around here?',
                to: '/docs/welcome',
              },
              {
                label: 'JIRA Epic',
                href: 'https://issues.redhat.com/projects/TSD-UI/summary',
              },
            ],
          },
          {
            title: 'Product',
            items: [
              {
                label: 'The Source',
                to: 'https://source.redhat.com/communities/communities_of_practice/applications/integration_cop/integration_community_of_practice_forum/sigstore_productization'
              },
            ],
          },
          {
            title: 'RHTAS Org',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/securesign',
              },
              {
                label: 'Snyk',
                href: 'https://app.snyk.io/org/application-services-red-hat-trusted-artifact-signer/'
              },
              {
                label: 'Quay',
                to: 'https://quay.io/organization/securesign/'
              },
              {
                label: 'Google Drive',
                href: 'https://drive.google.com/drive/u/0/folders/1yLnj4F_fttu5oZqezvKf9LrKBxxnPbrS'
              },
            ],
          },
          {
            title: 'Communications',
            items: [
              {
                label: 'Slack (team)',
                href: 'https://redhat.enterprise.slack.com/archives/C09MQNXHECQ',
              },
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
