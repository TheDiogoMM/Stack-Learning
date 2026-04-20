import { useMemo } from 'react';
import { renderMarkdown } from '@/lib/markdown';
import 'highlight.js/styles/github-dark.css';

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  const html = useMemo(() => renderMarkdown(content), [content]);

  return (
    <>
      <style>{markdownStyles}</style>
      <div
        className="md-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

const markdownStyles = `
.md-body { color: var(--netflix-light-gray); line-height: 1.8; font-size: 0.95rem; }
.md-body h1 { font-size: 2rem; font-weight: bold; color: var(--sketchain-terracota); margin: 0 0 24px; }
.md-body h2 { font-size: 1.4rem; font-weight: bold; color: var(--sketchain-gold); margin: 32px 0 16px; }
.md-body h3 { font-size: 1.1rem; font-weight: bold; color: var(--netflix-light-gray); margin: 24px 0 12px; }
.md-body p { margin-bottom: 16px; }
.md-body ul, .md-body ol { padding-left: 24px; margin-bottom: 16px; }
.md-body li { margin-bottom: 6px; }
.md-body code { background: var(--netflix-dark-gray); padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 0.88em; color: #9cdcfe; }
.md-body .hljs-block { background: #1e1e1e; border-radius: 8px; padding: 20px; overflow-x: auto; margin: 16px 0; }
.md-body .hljs-block code { background: none; padding: 0; color: inherit; font-size: 0.85rem; }
.md-body a { color: var(--sketchain-gold); text-decoration: underline; }
.md-body a:hover { color: var(--sketchain-terracota); }
.md-body strong { font-weight: bold; }
.md-body em { font-style: italic; }
.md-body blockquote { border-left: 4px solid var(--sketchain-terracota); padding-left: 16px; color: var(--netflix-gray); margin: 16px 0; }
.md-body table { width: 100%; border-collapse: collapse; margin: 16px 0; }
.md-body th { background: var(--netflix-dark-gray); color: var(--sketchain-terracota); padding: 10px 14px; text-align: left; border: 1px solid #2a2a2a; }
.md-body td { padding: 10px 14px; border: 1px solid #2a2a2a; color: var(--netflix-light-gray); }
.md-body tr:nth-child(even) td { background: #141414; }
`;
