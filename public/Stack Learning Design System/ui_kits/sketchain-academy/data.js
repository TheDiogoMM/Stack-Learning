// Sample curriculum data for the Sketchain Academy UI kit (pt-BR, mirrors the product).
window.SLData = {
  tracks: [
    { id: 'react', name: 'React 19', desc: 'Componentes, hooks e context', color: 'var(--tech-react)', done: 3, total: 5 },
    { id: 'nextjs', name: 'Next.js 15.5', desc: 'App Router, Server Components e deploy', color: 'var(--tech-nextjs)', done: 1, total: 5 },
    { id: 'typescript', name: 'TypeScript', desc: 'Tipos, generics e boas práticas', color: 'var(--tech-typescript)', done: 0, total: 4 },
    { id: 'tailwind', name: 'Tailwind CSS 4', desc: 'Utility-first, responsividade e dark mode', color: 'var(--tech-tailwind)', done: 2, total: 3 },
    { id: 'shadcn', name: 'shadcn/ui', desc: 'Componentes, formulários e tabelas', color: 'var(--tech-shadcn)', done: 0, total: 3 },
    { id: 'supabase', name: 'Supabase', desc: 'PostgreSQL, auth e Row Level Security', color: 'var(--tech-supabase)', done: 0, total: 3 },
  ],
  sequential: [
    { id: 'react-intro', title: 'Introdução a React 19', done: true },
    { id: 'react-components', title: 'Componentes e Props', done: true },
    { id: 'react-hooks', title: 'Hooks: useState e useEffect', done: true },
    { id: 'react-performance', title: 'useCallback e Performance', done: false },
    { id: 'react-context', title: 'React Context', done: false },
    { id: 'nextjs-app-router', title: 'App Router explicado', done: false, locked: true },
    { id: 'nextjs-server-client', title: 'Server vs Client Components', done: false, locked: true },
    { id: 'ts-basics', title: 'Tipos básicos e Inferência', done: false, locked: true },
  ],
  lesson: {
    id: 'react-hooks',
    title: 'Hooks: useState e useEffect',
    technology: 'React 19',
    difficulty: 'Iniciante',
    time: 50,
    track: { done: 3, total: 5 },
    next: 'useCallback e Performance',
    intro: 'Hooks permitem usar estado e efeitos colaterais em componentes funcionais.',
    sections: [
      { h: 'useState', code: "const [count, setCount] = useState(0);\nconst [nome, setNome] = useState('');" },
      { h: 'Atualização baseada no estado anterior', code: '// Correto — função atualizadora\nsetCount(prev => prev + 1);' },
      { h: 'useEffect', code: 'useEffect(() => {\n  document.title = `Contagem: ${count}`;\n}, [count]);' },
    ],
  },
};
