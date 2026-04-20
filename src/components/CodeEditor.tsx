import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  initialCode: string;
  language?: 'typescript' | 'javascript';
  solution?: string;
  onCodeChange?: (code: string) => void;
}

export default function CodeEditor({ initialCode, language = 'typescript', solution, onCodeChange }: Props) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <div style={{
          background: '#1e1e1e',
          padding: '8px 16px',
          borderBottom: '1px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#e74c3c', display: 'inline-block' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f39c12', display: 'inline-block' }} />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ae60', display: 'inline-block' }} />
          <span style={{ color: 'var(--netflix-gray)', fontSize: '0.75rem', marginLeft: '8px' }}>
            {language === 'typescript' ? 'index.tsx' : 'index.js'}
          </span>
        </div>
        <Editor
          height="400px"
          language={language}
          defaultValue={initialCode}
          theme="vs-dark"
          onChange={value => onCodeChange?.(value ?? '')}
          options={{
            fontSize: 14,
            tabSize: 2,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            fontFamily: "'Fira Code', 'Cascadia Code', monospace",
            fontLigatures: true,
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          style={{
            background: 'var(--netflix-dark-gray)',
            border: '1px solid var(--netflix-gray)',
            borderRadius: '6px',
            padding: '8px 18px',
            color: 'var(--netflix-gray)',
            cursor: 'not-allowed',
            fontSize: '0.85rem',
          }}
          disabled
          title="Em breve"
        >
          ▶ Executar
        </button>

        {solution && (
          <button
            onClick={() => setShowSolution(!showSolution)}
            style={{
              background: 'none',
              border: '1px solid var(--sketchain-gold)',
              borderRadius: '6px',
              padding: '8px 18px',
              color: 'var(--sketchain-gold)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'background 200ms',
            }}
          >
            {showSolution ? 'Ocultar Solução' : '💡 Ver Solução'}
          </button>
        )}
      </div>

      {showSolution && solution && (
        <div style={{
          background: '#1e1e1e',
          border: '1px solid var(--sketchain-gold)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <div style={{
            background: '#2a2400',
            padding: '8px 16px',
            borderBottom: '1px solid var(--sketchain-gold)',
          }}>
            <span style={{ color: 'var(--sketchain-gold)', fontSize: '0.8rem', fontWeight: 'bold' }}>
              💡 Solução
            </span>
          </div>
          <Editor
            height="300px"
            language={language}
            value={solution}
            theme="vs-dark"
            options={{
              fontSize: 14,
              tabSize: 2,
              minimap: { enabled: false },
              lineNumbers: 'on',
              readOnly: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 12, bottom: 12 },
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              fontLigatures: true,
            }}
          />
        </div>
      )}
    </div>
  );
}
