/**
 * @file 文档解析服务 / ES module
 * @module plugins/marked

 */

import marked from 'marked'
import Hljs from '~/plugins/highlight'
import { meta } from '~/config/app.config'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  // sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return Hljs.highlightAuto(code).value
  }
})

const renderer = new marked.Renderer()

// 段落解析
const paragraphRender = text => `<p>${text}</p>`

// 标题解析
const headingRender = (text, level, raw) => {
  const id = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-')
  return `<h${level} id=${id} alt=${id} title=${id}>${text}</h${level}>`
}

// 对连接进行权重防流和新窗处理
const linkRender = (href, title, text) => {
  const isSelf = href.includes(meta.url)
  const textIsImage = text.includes('<img')
  const linkHtml = `
    <a
      href="${href}"
      target="_blank"
      class="${textIsImage ? 'image-link' : 'link'}"
      title="${title || (textIsImage ? href : text)}"
      ${isSelf ? '' : 'rel="external nofollow noopenter"'}
    >
      ${text}
    </a>
  `
  return linkHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}

//对图片进行弹窗处理
const imageRender = (src, title, alt) => {
  // 仅替换 HTTP 链接为 proxy
  // src = src.replace(/^http:\/\//gi, `${apiConfig.PROXY}/`)
  const imageHtml = `
    <img
      class="lozad"
      data-src="${src}"
      title="${title || alt || meta.url}"
      alt="${alt || title || src}"
      onclick="if (window.utils) window.utils.openImgPopup('${src}')"
    />
  `
  return imageHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}

//预览时不做懒加载，弹窗
const imageRender1 = (src, title, alt) => {
  // 仅替换 HTTP 链接为 proxy
  // src = src.replace(/^http:\/\//gi, `${apiConfig.PROXY}/`)
  const imageHtml = `
    <img
      class=""
      src="${src}"
      title="${title || alt || meta.url}"
      alt="${alt || title || src}"
    />
  `
  return imageHtml.replace(/\s+/g, ' ').replace(/\n/g, ' ')
}

// 代码解析器（行号处理）
const codeRender = function (code, lang, escaped) {
  if (this.options.highlight) {
    const out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  const lineNums = code
    .split('\n')
    .map((l, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, ' '))
    .join('')

  const preHtml = lang
    ? `
      <pre data-lang="${lang}">
        <ul class="code-lines">${lineNums}</ul>
        <code class="${this.options.langPrefix}${escape(lang, true)}">${
    escaped ? code : escape(code, true)
    }\n</code>
      </pre>\n
    `
    : `
      <pre>
        <ul class="code-lines">${lineNums}</ul>
        <code>${escaped ? code : escape(code, true)}\n</code>
      </pre>
    `

  return preHtml
}

renderer.link = linkRender
renderer.code = codeRender
renderer.heading = headingRender
renderer.paragraph = paragraphRender
renderer.image = imageRender

export default (content, parseHtml = false) => {
  renderer.text = text => text
  // 如果是解析评论，则不解析 html 内容
  // marked.setOptions({ sanitize: !parseHtml })
  if (!parseHtml) {
    renderer.image = imageRender1
  }

  if (typeof content !== 'string') {
    return ''
  }

  // 返回解析内容
  return marked(content, { renderer })
}



