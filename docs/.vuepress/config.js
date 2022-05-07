const path = require('path')
const rootPath = path.dirname(__dirname)
//导入生成侧边栏的工具类
const { sideBarTool } = require(path.join(__dirname, './utils/index.js'))

// 需要排除的一些目录
let unDirIncludes = ['node_modules', 'assets', 'public', '网络工程']
// 只需要处理后缀的文件类型
let SuffixIncludes = ['md', 'html']
//使用方法生生成侧边栏
// 侧边栏
let sidebar = sideBarTool.genSideBarGroup(rootPath, unDirIncludes, SuffixIncludes, {})
module.exports = {
  // 网站的一些基本配置
  title: '星星的泪痕', // 网站的标题
  description: '知识记录', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  base: '/', // 这是部署到github相关的配置
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-bgm-player", {
        audios: [
          // 本地文件示例
          {
            name: '风居住的街道',
            artist: '磯村由紀子',
            url: '/bgm/1.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
          },
          // 网络文件示例
          {
            name: '강남역 4번 출구',
            artist: 'Plastic / Fallin` Dild',
            url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
          }
        ]
      }
    ],
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    authorAvatar: '/avatar.jpg',
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: '分类' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: '标签'      // 默认文案 “标签”
      },
      socialLinks: [     // 信息栏展示社交信息
        // { icon: 'reco-github', link: 'https://github.com/recoluan' },
        // { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
      ]
    },
    //404公益
    noFoundPageByTencent: false,
    mode: 'light', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: false, // 默认 true，false 不显示模式调节按钮，true 则显示
    // logo: '/dh_logo.jpg',
    // 禁用导航栏
    // navbar: false,
    nav: [
      { text: 'Home', link: '/' },
      // 可指定链接跳转模式：默认target: '_blank'新窗口打开，_self当前窗口打开
      { text: 'CSDN', link: 'https://blog.csdn.net', target: '_blank' },
      // 支持嵌套,形成下拉式的导航菜单
      {
        text: '语言',
        ariaLabel: 'Language Menu',
        items: [
          { text: '中文', link: '/language/chinese/' },
          { text: '英文', link: '/language/english/' }
        ]
      }
    ],
    search: true, // 设置是否使用导航栏上的搜索框
    searchMaxSuggestions: 10,  // 搜索框显示的搜索结果数量
    subSidebar: 'auto',
    sidebar: sidebar,
    // sidebar: [
    //   {
    //     //组名
    //     title: 'CSS',
    //     //是否可折叠
    //     collapsable: true,
    //     //组成员
    //     children: [
    //       //  [link,text],首个页面默认是当前文件夹（/css）下的README.md
    //       '/Css/one',
    //       '/Css/two',
    //       // ['/css/two', 'two']
    //     ]
    //   },
    //   {
    //     title: 'JS',
    //     children: [
    //       '/Js/1',
    //       '/Js/2'
    //     ]
    //   },
    //   {
    //     title: 'Vue',
    //     children: [
    //       '/Vue/1'
    //     ]
    //   },
    //   {
    //     title: 'Axios',
    //     children: [
    //       '/Axios/type_1',
    //       '/Axios/type_2'
    //     ]
    //   },
    //   {
    //     title: 'RegExp',
    //     children: [
    //       '/RegExp/1',
    //       '/RegExp/2'
    //     ]
    //   },
    // ]
  }
}