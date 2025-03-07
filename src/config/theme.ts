import type { IConfigOption, Theme } from '@/types'
import { toMerged } from 'es-toolkit'

const defaultTheme: Theme = {
  base: {
    '--md-primary-color': `#000000`,
    'text-align': `left`,
    'line-height': `1.75`,
  },
  block: {
    container: {},
    // 一级标题
    h1: {
      'display': `table`,
      'padding': `0 1em`,
      'border-bottom': `2px solid var(--md-primary-color)`,
      'margin': `2em auto 1em`,
      'color': `hsl(var(--foreground))`,
      'font-size': `1.2em`,
      'font-weight': `bold`,
      'text-align': `center`,
    },

    // 二级标题
    h2: {
      'display': `table`,
      'padding': `0 0.2em`,
      'margin': `4em auto 2em`,
      'color': `#fff`,
      'background': `var(--md-primary-color)`,
      'font-size': `1.2em`,
      'font-weight': `bold`,
      'text-align': `center`,
    },

    // 三级标题
    h3: {
      'padding-left': `8px`,
      'border-left': `3px solid var(--md-primary-color)`,
      'margin': `2em 8px 0.75em 0`,
      'color': `hsl(var(--foreground))`,
      'font-size': `1.1em`,
      'font-weight': `bold`,
      'line-height': `1.2`,
    },

    // 四级标题
    h4: {
      'margin': `2em 8px 0.5em`,
      'color': `var(--md-primary-color)`,
      'font-size': `1em`,
      'font-weight': `bold`,
    },

    // 五级标题
    h5: {
      'margin': `1.5em 8px 0.5em`,
      'color': `var(--md-primary-color)`,
      'font-size': `1em`,
      'font-weight': `bold`,
    },

    // 六级标题
    h6: {
      'margin': `1.5em 8px 0.5em`,
      'font-size': `1em`,
      'color': `var(--md-primary-color)`,
    },

    // 段落
    p: {
      'margin': `1.5em 8px`,
      'letter-spacing': `0.1em`,
      'color': `hsl(var(--foreground))`,
      'text-align': `justify`,
    },

    // 引用
    blockquote: {
      'font-style': `normal`,
      'padding': `1em`,
      'border-left': `4px solid var(--md-primary-color)`,
      'border-radius': `6px`,
      'color': `rgba(0,0,0,0.5)`,
      'background': `var(--blockquote-background)`,
      'margin-bottom': `1em`,
    },

    // 引用内容
    blockquote_p: {
      'display': `block`,
      'font-size': `1em`,
      'letter-spacing': `0.1em`,
      'color': `hsl(var(--foreground))`,
    },

    blockquote_note: {
    },

    blockquote_tip: {
    },

    blockquote_important: {
    },

    blockquote_warning: {
    },

    blockquote_caution: {
    },

    // GFM 警告块标题
    blockquote_title: {
      'display': `flex`,
      'align-items': `center`,
      'gap': `0.5em`,
      'margin-bottom': `0.5em`,
    },

    blockquote_title_note: {
      color: `#478be6`,
    },

    blockquote_title_tip: {
      color: `#57ab5a`,
    },

    blockquote_title_important: {
      color: `#986ee2`,
    },

    blockquote_title_warning: {
      color: `#c69026`,
    },

    blockquote_title_caution: {
      color: `#e5534b`,
    },

    blockquote_p_note: {
    },

    blockquote_p_tip: {
    },

    blockquote_p_important: {
    },

    blockquote_p_warning: {
    },

    blockquote_p_caution: {
    },

    // 代码块
    code_pre: {
      'font-size': `14px`,
      'overflow-x': `auto`,
      'border-radius': `8px`,
      'padding': `1em`,
      'line-height': `1.5`,
      'margin': `10px 8px`,
    },

    // 行内代码
    code: {
      'margin': 0,
      'white-space': `nowrap`,
      'font-family': `Menlo, Operator Mono, Consolas, Monaco, monospace`,
    },

    // 图片
    image: {
      'display': `block`,
      'width': `100% !important`,
      'margin': `0.1em auto 0.5em`,
      'border-radius': `4px`,
    },

    // 有序列表
    ol: {
      'padding-left': `1em`,
      'margin-left': `0`,
      'color': `hsl(var(--foreground))`,
    },

    // 无序列表
    ul: {
      'list-style': `circle`,
      'padding-left': `1em`,
      'margin-left': `0`,
      'color': `hsl(var(--foreground))`,
    },

    footnotes: {
      'margin': `0.5em 8px`,
      'font-size': `80%`,
      'color': `hsl(var(--foreground))`,
    },

    figure: {
      margin: `1.5em 8px`,
      color: `hsl(var(--foreground))`,
    },

    hr: {
      'border-style': `solid`,
      'border-width': `2px 0 0`,
      'border-color': `rgba(0,0,0,0.1)`,
      '-webkit-transform-origin': `0 0`,
      '-webkit-transform': `scale(1, 0.5)`,
      'transform-origin': `0 0`,
      'transform': `scale(1, 0.5)`,
      'height': `0.4em`,
      'margin': `1.5em 0`,
    },
  },
  inline: {
    listitem: {
      'text-indent': `-1em`,
      'display': `block`,
      'margin': `0.2em 8px`,
      'color': `hsl(var(--foreground))`,
    },

    codespan: {
      'font-size': `90%`,
      'color': `#d14`,
      'background': `rgba(27,31,35,.05)`,
      'padding': `3px 5px`,
      'border-radius': `4px`,
      // 'word-break': `break-all`,
    },

    em: {
      'font-style': `italic`,
      'font-size': `inherit`,
    },

    link: {
      color: `#576b95`,
    },

    wx_link: {
      'color': `#576b95`,
      'text-decoration': `none`,
    },

    // 字体加粗样式
    strong: {
      'color': `var(--md-primary-color)`,
      'font-weight': `bold`,
      'font-size': `inherit`,
    },

    table: {
      'border-collapse': `collapse`,
      'text-align': `center`,
      'margin': `1em 8px`,
      'color': `hsl(var(--foreground))`,
    },

    thead: {
      'background': `rgba(0, 0, 0, 0.05)`,
      'font-weight': `bold`,
      'color': `hsl(var(--foreground))`,
    },

    td: {
      'border': `1px solid #dfdfdf`,
      'padding': `0.25em 0.5em`,
      'color': `#3f3f3f`,
      'word-break': `keep-all`,
    },

    footnote: {
      'font-size': `12px`,
      'color': `hsl(var(--foreground))`,
    },

    figcaption: {
      'text-align': `center`,
      'color': `#888`,
      'font-size': `0.8em`,
    },
  },
}

const graceTheme = toMerged(defaultTheme, {
  base: {
  },
  block: {
    'container': {},
    'h1': {
      'padding': `0.5em 1em`,
      'border-bottom': `2px solid var(--md-primary-color)`,
      'font-size': `1.4em`,
      'text-shadow': `2px 2px 4px rgba(0,0,0,0.1)`,
    },

    'h2': {
      'padding': `0.3em 1em`,
      'border-radius': `8px`,
      'font-size': `1.3em`,
      'box-shadow': `0 4px 6px rgba(0,0,0,0.1)`,
    },

    'h3': {
      'padding-left': `12px`,
      'font-size': `1.2em`,
      'border-left': `4px solid var(--md-primary-color)`,
      'border-bottom': `1px dashed var(--md-primary-color)`,
    },

    'h4': {
      'font-size': `1.1em`,
    },

    'h5': {
      'font-size': `1em`,
    },

    'h6': {
      'font-size': `1em`,
    },

    'p': {
    },

    'blockquote': {
      'font-style': `italic`,
      'padding': `1em 1em 1em 2em`,
      'border-left': `4px solid var(--md-primary-color)`,
      'border-radius': `6px`,
      'color': `rgba(0,0,0,0.6)`,
      'box-shadow': `0 4px 6px rgba(0,0,0,0.05)`,
      'margin-bottom': `1em`,
    },

    'blockquote_p': {
    },

    'markdown-alert': {
      'font-style': `italic`,
    },

    'code_pre': {
      'box-shadow': `inset 0 0 10px rgba(0,0,0,0.05)`,
    },

    'code': {
      'white-space': `pre-wrap`,
      'font-family': `'Fira Code', Menlo, Operator Mono, Consolas, Monaco, monospace`,
    },

    'image': {
      'border-radius': `8px`,
      'box-shadow': `0 4px 8px rgba(0,0,0,0.1)`,
    },

    'ol': {
      'padding-left': `1.5em`,
    },

    'ul': {
      'list-style': `none`,
      'padding-left': `1.5em`,
    },

    'footnotes': {

    },

    'figure': {

    },

    'hr': {
      height: `1px`,
      border: `none`,
      margin: `2em 0`,
      background: `linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))`,
    },
  },
  inline: {
    listitem: {
      margin: `0.5em 8px`,
    },

    codespan: {
    },

    em: {
    },

    link: {
    },

    wx_link: {
    },

    strong: {
    },

    table: {
      'border-collapse': `separate`,
      'border-spacing': `0`,
      'border-radius': `8px`,
      'margin': `1em 8px`,
      'color': `hsl(var(--foreground))`,
      'box-shadow': `0 4px 6px rgba(0,0,0,0.1)`,
      'overflow': `hidden`,
    },

    thead: {
      color: `#fff`,
    },

    td: {
      padding: `0.5em 1em`,
    },

    footnote: {
      color: `rgba(0,0,0,0.5)`,
    },

    figcaption: {

    },
  },
})

const bloggerTheme = toMerged(defaultTheme, {
  base: {
    '--md-primary-color': `#ffffff`,
    'text-align': `left`,
    'line-height': `1.75`,
  },
  block: {
    'container': {
      'background-color': `rgba(33, 37, 41, 1)`,
    },
    'h1': {
      'display': `inline`,
      'padding': `0.5em 1em`,
      'border-bottom': `2px solid var(--md-primary-color)`,
      'font-size': `1.4em`,
      'text-shadow': `2px 2px 4px rgba(0,0,0,0.1)`,
      'color': `#fff`,
      'text-align': `left`,
    },

    'h2': {
      'display': `inline`,
      'padding': `0.3em 1em`,
      'border-radius': `8px`,
      'font-size': `1.3em`,
      'box-shadow': `0 4px 6px rgba(0,0,0,0.1)`,
      'color': `#fff`,
      'text-align': `left`,
    },

    'h3': {
      'padding-left': `12px`,
      'font-size': `1.2em`,
      'border-left': `4px solid var(--md-primary-color)`,
      'border-bottom': `1px dashed var(--md-primary-color)`,
      'color': `#fff`,
    },

    'h4': {
      'font-size': `1.1em`,
      'color': `#fff`,
    },

    'h5': {
      'font-size': `1em`,
      'color': `#fff`,
    },

    'h6': {
      'font-size': `1em`,
      'color': `#fff`,
    },

    'p': {
      color: `#ffffff`,
    },

    'blockquote': {
      'font-style': `italic`,
      'padding': `1em 1em 1em 2em`,
      'border-left': `4px solid var(--md-primary-color)`,
      'border-radius': `6px`,
      'color': `rgba(255,255,255,0.6)`,
      'box-shadow': `0 4px 6px rgba(0,0,0,0.05)`,
      'margin-bottom': `1em`,
      'background': `rgba(41, 45, 48, 0.7)`,
    },

    'blockquote_p': {
      color: `#fff`,
    },

    'markdown-alert': {
      'font-style': `italic`,
    },

    'code_pre': {
      'box-shadow': `inset 0 0 10px rgba(0,0,0,0.05)`,
    },

    'code': {
      'white-space': `pre-wrap`,
      'font-family': `'Fira Code', Menlo, Operator Mono, Consolas, Monaco, monospace`,
    },

    'image': {
      'border-radius': `8px`,
      'box-shadow': `0 4px 8px rgba(0,0,0,0.1)`,
    },

    'ol': {
      'padding-left': `1.5em`,
    },

    'ul': {
      'list-style': `none`,
      'padding-left': `1.5em`,
    },

    footnotes: {
      'margin': `0.5em 8px`,
      'font-size': `80%`,
      'color': `white`,
    },

    'figure': {
      color: `#fff`,
    },

    'hr': {
      height: `1px`,
      border: `none`,
      margin: `2em 0`,
      background: `linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))`,
    },
  },
  inline: {
    listitem: {
      margin: `0.5em 8px`,
      color: `#fff`,
    },

    codespan: {
    },

    em: {
      color: `#fff`,
    },

    link: {
    },

    wx_link: {
    },

    strong: {
      color: `var(--md-primary-color)`,
    },

    table: {
      'border-collapse': `separate`,
      'border-spacing': `0`,
      'border-radius': `8px`,
      'margin': `1em 8px`,
      'color': `#fff`,
      'box-shadow': `0 4px 6px rgba(0,0,0,0.1)`,
      'overflow': `hidden`,
    },

    thead: {
      color: `#fff`,
    },

    td: {
      padding: `0.5em 1em`,
      color: `#fff`,
    },

    footnote: {
      color: `rgba(0,0,0,0.5)`,
    },

    figcaption: {
      color: `#fff`,
    },
  },
})

export const themeMap = {
  default: defaultTheme,
  grace: graceTheme,
  blogger: bloggerTheme,
}

export const themeOptions: IConfigOption<keyof typeof themeMap>[] = [
  {
    label: `经典`,
    value: `default`,
    desc: ``,
  },
  {
    label: `优雅`,
    value: `grace`,
    desc: ``,
  },
  {
    label: `博客`,
    value: `blogger`,
    desc: ``,
  },
]
