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
   *  The Host parameter
   * 
   */
  host: '0.0.0.0',// 'https://zmq-nodejs.arunpanneerselvam.com' || '0.0.0.0',
  /**
   * The Port parameter
   * 
   */
  port : 5500,
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
        text: 'Patterns',
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
              'exclusive-pair',
              'pubsub',
              'espresso',
              'pubsubhub',
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
              'protocol-handling',
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
    'tabs',
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-comment',
    {
      choosen: 'gitalk', 
      options: {
        clientID: '118ef613991564fe204f',
        clientSecret: 'a7a7c6561aa26624183a913f6d50adb73dab6085 ',
        repo: 'https://github.com/cosmoarunn/zmq-nodejs-guide',
        owner: 'https://github.com/cosmoarunn',
        admin: ['GitHub repo owner and collaborators, only these guys can initialize github issues'],
        distractionFreeMode: false 
      }
    }
  ],

  markdown: {
    lineNumbers: true
  }
}
