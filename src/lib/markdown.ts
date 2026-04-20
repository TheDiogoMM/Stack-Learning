import MarkdownIt from 'markdown-it';
import type { Options } from 'markdown-it';
import hljs from 'highlight.js';

const highlight: Options['highlight'] = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="hljs-block"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
    } catch {}
  }
  return `<pre class="hljs-block"><code>${MarkdownIt().utils.escapeHtml(str)}</code></pre>`;
};

const md = new MarkdownIt({ html: false, linkify: true, typographer: true, highlight });

export function renderMarkdown(text: string): string {
  return md.render(text);
}
