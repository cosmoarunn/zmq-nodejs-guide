const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ZeroMQ - NodeJs',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'ZeroMQ',
        link: '/zmq/',
      },
      {
        text: 'Architecture',
        link: '/patterns/'
      },
      {
        text: 'Advanced',
        link: '/advanced/'
      },
      {
        text: 'Examples',
        link: '/examples/'
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    sidebar: {
        '/zmq/': [ {
            title: 'ZeroMQ',
            collapsable: false,
            children: [
              '',
              'installing',
              'using-zmq'
              
            ]
        },{
          title: 'Sockets Universe',
          collapsable: false,
          children: [
            'understanding-sockets',
            'structural-elements'
            
          ],
        }
      ],
        '/patterns/' : [
          {
            title: 'Socket Patterns',
            collapsable: true,
            children: [
              '',
              'simple-request-reply',
              'pubsub',
              'pipeline',
              'exclusive-pair',
            ],
          }
        ],
        '/advanced/' : [
          {
            title: 'Advanced Architectures',
            collapsable: true,
            children: [
              '',
            ],
          }
        ],
        '/examples/' : [{ 
            title: 'Examples', 
            children: [
              '',
              'JavaScript',
              'TypeScript'
            ],
          }, 
          {
            title: 'JavaScript',
            children: [
              'simple-req-rep'
            ],
          }
        ],
      },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
