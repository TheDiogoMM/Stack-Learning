export type Technology = 'React 19' | 'Next.js 15.5' | 'TypeScript' | 'Tailwind CSS 4' | 'shadcn/ui' | 'Supabase' | 'Sketchain';
export type Difficulty = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface YoutubeVideo {
  title: string;
  youtubeId: string;
  creator: string;
  duration: number;
}

export interface Lesson {
  id: string;
  title: string;
  technology: Technology;
  difficulty: Difficulty;
  estimatedTime: number;
  order: number;
  content: string;
  codeTemplate?: string;
  codeSolution?: string;
  youtubeVideos: YoutubeVideo[];
  prerequisites?: string[];
  tags?: string[];
  nextLesson?: { id: string; title: string };
}

export const lessons: Lesson[] = [
  // ─── REACT 19 ────────────────────────────────────────────────────────────
  {
    id: 'react-intro',
    title: 'Introdução a React 19',
    technology: 'React 19',
    difficulty: 'Iniciante',
    estimatedTime: 45,
    order: 1,
    prerequisites: [],
    tags: ['react', 'jsx', 'componentes'],
    nextLesson: { id: 'react-components', title: 'Componentes e Props' },
    youtubeVideos: [
      { title: 'Introdução ao ReactJS — Primeiros Passos', creator: 'Cod3r', youtubeId: 'FsT89xnwJ1M', duration: 30 },
    ],
    content: `# Introdução a React 19

React 19 é a versão mais recente da biblioteca de interfaces criada pelo Meta. A principal novidade é o **React Compiler**, que elimina a necessidade de otimizações manuais com \`useMemo\` e \`useCallback\`.

## O que há de novo

- **React Compiler** — otimização automática de re-renders
- **Actions** — gerenciamento de estado assíncrono simplificado
- **\`use()\` hook** — leitura de Promises e Context diretamente no render
- **Server Components estáveis** — renderização no servidor sem JavaScript no cliente

## Seu primeiro componente

\`\`\`tsx
export function Saudacao({ nome }: { nome: string }) {
  return <h1>Olá, {nome}!</h1>;
}
\`\`\`

## Por que aprender React 19 agora?

> Com o compilador automático, o código fica mais simples e mais performático ao mesmo tempo. É o melhor momento para começar.

| Recurso | React 18 | React 19 |
|---------|----------|----------|
| Compilador automático | ❌ | ✅ |
| Actions | ❌ | ✅ |
| use() hook | ❌ | ✅ |
| Server Components | Experimental | Estável |
`,
    codeTemplate: `// Crie um componente funcional chamado "Perfil"
// que receba "nome" e "cargo" como props e os exiba

interface PerfilProps {
  nome: string;
  cargo: string;
}

export function Perfil({ nome, cargo }: PerfilProps) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `interface PerfilProps {
  nome: string;
  cargo: string;
}

export function Perfil({ nome, cargo }: PerfilProps) {
  return (
    <div>
      <h2>{nome}</h2>
      <p>{cargo}</p>
    </div>
  );
}`,
  },
  {
    id: 'react-components',
    title: 'Componentes e Props',
    technology: 'React 19',
    difficulty: 'Iniciante',
    estimatedTime: 40,
    order: 2,
    prerequisites: ['react-intro'],
    tags: ['componentes', 'props', 'composição'],
    nextLesson: { id: 'react-hooks', title: 'Hooks: useState e useEffect' },
    youtubeVideos: [
      { title: 'Como usar props e enviar dados para componentes no React', creator: 'Rocketseat', youtubeId: 'bSkqEC6L6is', duration: 20 },
    ],
    content: `# Componentes e Props

Componentes são blocos reutilizáveis de interface. Props são os parâmetros que passamos para eles — como argumentos de uma função.

## Componentes funcionais

\`\`\`tsx
function Card({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}
\`\`\`

## Composição

\`\`\`tsx
function App() {
  return (
    <div>
      <Card titulo="React" descricao="Biblioteca de UI" />
      <Card titulo="TypeScript" descricao="JavaScript tipado" />
    </div>
  );
}
\`\`\`

## Props obrigatórias vs opcionais

\`\`\`tsx
interface BotaoProps {
  label: string;       // obrigatória
  variante?: 'primary' | 'secondary'; // opcional
  onClick?: () => void;
}
\`\`\`

## children

\`\`\`tsx
function Container({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 24 }}>{children}</div>;
}
\`\`\`
`,
    codeTemplate: `// Crie um componente "Badge" que receba:
// - texto: string
// - cor: 'verde' | 'vermelho' | 'azul'
// e exiba o texto com fundo colorido

interface BadgeProps {
  texto: string;
  cor: 'verde' | 'vermelho' | 'azul';
}

export function Badge({ texto, cor }: BadgeProps) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `interface BadgeProps {
  texto: string;
  cor: 'verde' | 'vermelho' | 'azul';
}

const cores = {
  verde: '#27ae60',
  vermelho: '#e74c3c',
  azul: '#3498db',
};

export function Badge({ texto, cor }: BadgeProps) {
  return (
    <span style={{
      background: cores[cor],
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '0.85rem',
    }}>
      {texto}
    </span>
  );
}`,
  },
  {
    id: 'react-hooks',
    title: 'Hooks: useState e useEffect',
    technology: 'React 19',
    difficulty: 'Iniciante',
    estimatedTime: 50,
    order: 3,
    prerequisites: ['react-components'],
    tags: ['hooks', 'useState', 'useEffect', 'estado'],
    nextLesson: { id: 'react-performance', title: 'useCallback e Performance' },
    youtubeVideos: [
      { title: 'Guia Prático sobre React Hooks: useState e useEffect', creator: 'DevEmDobro', youtubeId: 'uWpKViEATt0', duration: 35 },
    ],
    content: `# Hooks: useState e useEffect

Hooks permitem usar estado e efeitos colaterais em componentes funcionais.

## useState

\`\`\`tsx
const [count, setCount] = useState(0);
const [nome, setNome] = useState('');
const [ativo, setAtivo] = useState(false);
\`\`\`

## Atualização baseada no estado anterior

\`\`\`tsx
// ✅ Correto — usa função atualizadora
setCount(prev => prev + 1);

// ⚠️ Pode ter problemas em atualizações rápidas
setCount(count + 1);
\`\`\`

## useEffect

\`\`\`tsx
useEffect(() => {
  // Executa após o render
  document.title = \`Contagem: \${count}\`;
}, [count]); // dependências
\`\`\`

## Casos comuns de useEffect

\`\`\`tsx
// Executar uma vez ao montar
useEffect(() => {
  fetchDados();
}, []);

// Cleanup (ex: cancelar subscriptions)
useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id);
}, []);
\`\`\`
`,
    codeTemplate: `// Crie um componente "Relogio" que:
// 1. Exiba a hora atual (HH:MM:SS)
// 2. Atualize a cada segundo usando useEffect
// 3. Limpe o intervalo ao desmontar

import { useState, useEffect } from 'react';

export function Relogio() {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `import { useState, useEffect } from 'react';

export function Relogio() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p style={{ fontFamily: 'monospace', fontSize: '2rem' }}>{hora}</p>;
}`,
  },
  {
    id: 'react-performance',
    title: 'useCallback e Performance',
    technology: 'React 19',
    difficulty: 'Intermediário',
    estimatedTime: 45,
    order: 4,
    prerequisites: ['react-hooks'],
    tags: ['useCallback', 'useMemo', 'performance', 'memo'],
    nextLesson: { id: 'react-context', title: 'React Context' },
    youtubeVideos: [
      { title: 'Guia definitivo de performance no React — useMemo e useCallback', creator: 'Rocketseat', youtubeId: 'NmU2nNehNNY', duration: 32 },
    ],
    content: `# useCallback e Performance

No React 19, o compilador automático elimina a maioria dos casos onde você precisaria de \`useCallback\` e \`useMemo\`. Mas entender quando usá-los ainda é importante.

## React.memo

\`\`\`tsx
const ItemLista = React.memo(function ItemLista({ texto }: { texto: string }) {
  return <li>{texto}</li>;
});
\`\`\`

## useCallback

\`\`\`tsx
const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []); // sem dependências = função estável
\`\`\`

## useMemo

\`\`\`tsx
const total = useMemo(
  () => itens.reduce((acc, item) => acc + item.preco, 0),
  [itens]
);
\`\`\`

## Quando NÃO usar

> No React 19 com o compilador, o runtime aplica essas otimizações automaticamente. Só otimize manualmente se o Profiler indicar um problema real.
`,
    codeTemplate: `// Crie uma lista com filtro otimizada:
// - Estado: itens (array de strings) e filtro (string)
// - Filtre os itens com useMemo
// - Função de adicionar item com useCallback

import { useState, useMemo, useCallback } from 'react';

export function ListaFiltrada() {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `import { useState, useMemo, useCallback } from 'react';

export function ListaFiltrada() {
  const [itens, setItens] = useState(['React', 'TypeScript', 'Tailwind', 'Supabase']);
  const [filtro, setFiltro] = useState('');

  const itensFiltrados = useMemo(
    () => itens.filter(i => i.toLowerCase().includes(filtro.toLowerCase())),
    [itens, filtro]
  );

  const adicionar = useCallback((novoItem: string) => {
    setItens(prev => [...prev, novoItem]);
  }, []);

  return (
    <div>
      <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Filtrar..." />
      <ul>{itensFiltrados.map(i => <li key={i}>{i}</li>)}</ul>
      <button onClick={() => adicionar('Novo Item')}>Adicionar</button>
    </div>
  );
}`,
  },
  {
    id: 'react-context',
    title: 'React Context',
    technology: 'React 19',
    difficulty: 'Intermediário',
    estimatedTime: 50,
    order: 5,
    prerequisites: ['react-performance'],
    tags: ['context', 'estado global', 'provider'],
    nextLesson: { id: 'nextjs-app-router', title: 'App Router explicado' },
    youtubeVideos: [
      { title: 'React Context API na prática com hook personalizado', creator: 'Rocketseat', youtubeId: 'g4lw8__0Mow', duration: 28 },
    ],
    content: `# React Context

Context permite compartilhar dados entre componentes sem passar props manualmente em cada nível.

## Criando um Context

\`\`\`tsx
interface TemaContext {
  tema: 'dark' | 'light';
  toggleTema: () => void;
}

const TemaCtx = createContext<TemaContext>({
  tema: 'dark',
  toggleTema: () => {},
});
\`\`\`

## Provider

\`\`\`tsx
function TemaProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<'dark' | 'light'>('dark');
  return (
    <TemaCtx.Provider value={{ tema, toggleTema: () => setTema(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </TemaCtx.Provider>
  );
}
\`\`\`

## Consumindo

\`\`\`tsx
function Botao() {
  const { tema, toggleTema } = useContext(TemaCtx);
  return <button onClick={toggleTema}>Tema: {tema}</button>;
}
\`\`\`

## use() no React 19

\`\`\`tsx
// React 19 permite usar Context diretamente com use()
function Botao() {
  const { tema } = use(TemaCtx);
  return <div>{tema}</div>;
}
\`\`\`
`,
    codeTemplate: `// Crie um contexto de "Carrinho" com:
// - itens: string[]
// - adicionarItem(item: string): void
// - removerItem(item: string): void

import { createContext, useContext, useState } from 'react';

// SEU CÓDIGO AQUI`,
    codeSolution: `import { createContext, useContext, useState } from 'react';

interface CarrinhoCtx {
  itens: string[];
  adicionarItem: (item: string) => void;
  removerItem: (item: string) => void;
}

const CarrinhoContext = createContext<CarrinhoCtx>({
  itens: [],
  adicionarItem: () => {},
  removerItem: () => {},
});

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<string[]>([]);
  return (
    <CarrinhoContext.Provider value={{
      itens,
      adicionarItem: (item) => setItens(p => [...p, item]),
      removerItem: (item) => setItens(p => p.filter(i => i !== item)),
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);`,
  },

  // ─── NEXT.JS 15.5 ────────────────────────────────────────────────────────
  {
    id: 'nextjs-app-router',
    title: 'App Router explicado',
    technology: 'Next.js 15.5',
    difficulty: 'Iniciante',
    estimatedTime: 40,
    order: 6,
    prerequisites: ['react-context'],
    tags: ['nextjs', 'app router', 'rotas', 'layout'],
    nextLesson: { id: 'nextjs-server-client', title: 'Server vs Client Components' },
    youtubeVideos: [
      { title: 'Roteamento no Next.js — File-system Routing | Curso Completo', creator: 'Rocketseat', youtubeId: 'IW-3rCMV_eU', duration: 40 },
    ],
    content: `# App Router explicado

O App Router do Next.js 15 usa o sistema de arquivos para definir rotas dentro da pasta \`app/\`.

## Estrutura básica

\`\`\`
app/
├── layout.tsx       ← layout raiz
├── page.tsx         ← rota /
├── sobre/
│   └── page.tsx     ← rota /sobre
└── blog/
    ├── page.tsx     ← rota /blog
    └── [slug]/
        └── page.tsx ← rota /blog/:slug
\`\`\`

## layout.tsx

\`\`\`tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

## Rotas dinâmicas

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default function Post({ params }: { params: { slug: string } }) {
  return <h1>Post: {params.slug}</h1>;
}
\`\`\`

## Metadata

\`\`\`tsx
export const metadata = {
  title: 'Meu Site',
  description: 'Descrição do site',
};
\`\`\`
`,
    codeTemplate: `// Crie a estrutura de um layout Next.js com:
// - Tag html com lang="pt-BR"
// - Header com o nome do site
// - Main com {children}
// - Footer com copyright

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <h1>Sketchain Academy</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 Sketchain</p>
        </footer>
      </body>
    </html>
  );
}`,
  },
  {
    id: 'nextjs-server-client',
    title: 'Server vs Client Components',
    technology: 'Next.js 15.5',
    difficulty: 'Intermediário',
    estimatedTime: 45,
    order: 7,
    prerequisites: ['nextjs-app-router'],
    tags: ['server components', 'client components', 'use client'],
    nextLesson: { id: 'nextjs-api-routes', title: 'API Routes' },
    youtubeVideos: [
      { title: 'Next.js: O Novo Modelo Mental — Server vs Client Components', creator: 'Rocketseat', youtubeId: 'hvaQ2ccfITo', duration: 38 },
    ],
    content: `# Server vs Client Components

Por padrão, todos os componentes no App Router são **Server Components** — renderizados no servidor, sem JavaScript no cliente.

## Server Component (padrão)

\`\`\`tsx
// Pode usar async/await diretamente
export default async function Usuarios() {
  const dados = await fetch('https://api.exemplo.com/usuarios').then(r => r.json());
  return <ul>{dados.map((u: { id: number; nome: string }) => <li key={u.id}>{u.nome}</li>)}</ul>;
}
\`\`\`

## Client Component

\`\`\`tsx
'use client'; // obrigatório no topo do arquivo

import { useState } from 'react';

export function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
\`\`\`

## Quando usar cada um

| Server Component | Client Component |
|-----------------|-----------------|
| Busca de dados | useState / useEffect |
| Acesso ao banco | Eventos (onClick) |
| Sem JavaScript no cliente | Animações |
| SEO | localStorage |

## Composição

\`\`\`tsx
// Server Component pode importar Client Component
import { Contador } from './Contador'; // 'use client'

export default function Pagina() {
  return (
    <div>
      <h1>Página (server)</h1>
      <Contador /> {/* client */}
    </div>
  );
}
\`\`\`
`,
    codeTemplate: `// Identifique e corrija o erro neste componente:
// Ele tenta usar useState mas está como Server Component

export default function Formulario() {
  const [valor, setValor] = useState('');
  return (
    <input value={valor} onChange={e => setValor(e.target.value)} />
  );
}`,
    codeSolution: `'use client';

import { useState } from 'react';

export default function Formulario() {
  const [valor, setValor] = useState('');
  return (
    <input value={valor} onChange={e => setValor(e.target.value)} />
  );
}`,
  },
  {
    id: 'nextjs-api-routes',
    title: 'API Routes',
    technology: 'Next.js 15.5',
    difficulty: 'Intermediário',
    estimatedTime: 40,
    order: 8,
    prerequisites: ['nextjs-server-client'],
    tags: ['api routes', 'route handlers', 'GET', 'POST'],
    nextLesson: { id: 'nextjs-middleware', title: 'Middleware e Auth' },
    youtubeVideos: [
      { title: 'Novo modelo de Rotas API com Next.js — Route Handlers', creator: 'Rocketseat', youtubeId: 'Vvu509Q3jY0', duration: 30 },
    ],
    content: `# API Routes

No App Router, as rotas de API são criadas com \`route.ts\` dentro de \`app/api/\`.

## Estrutura

\`\`\`
app/
└── api/
    └── usuarios/
        └── route.ts
\`\`\`

## GET e POST

\`\`\`ts
import { NextResponse } from 'next/server';

export async function GET() {
  const dados = [{ id: 1, nome: 'Ana' }];
  return NextResponse.json(dados);
}

export async function POST(request: Request) {
  const body = await request.json();
  // salvar no banco...
  return NextResponse.json({ criado: true, ...body }, { status: 201 });
}
\`\`\`

## Parâmetros de rota

\`\`\`ts
// app/api/usuarios/[id]/route.ts
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ id: params.id });
}
\`\`\`

## Erros

\`\`\`ts
return NextResponse.json({ erro: 'Não encontrado' }, { status: 404 });
\`\`\`
`,
    codeTemplate: `// Crie uma route handler que:
// GET /api/produtos → retorna lista de produtos
// POST /api/produtos → cria produto com { nome, preco }

import { NextResponse } from 'next/server';

const produtos = [{ id: 1, nome: 'Produto A', preco: 99.9 }];

export async function GET() {
  // SEU CÓDIGO AQUI
}

export async function POST(request: Request) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `import { NextResponse } from 'next/server';

const produtos = [{ id: 1, nome: 'Produto A', preco: 99.9 }];

export async function GET() {
  return NextResponse.json(produtos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const novo = { id: Date.now(), nome: body.nome, preco: body.preco };
  produtos.push(novo);
  return NextResponse.json(novo, { status: 201 });
}`,
  },
  {
    id: 'nextjs-middleware',
    title: 'Middleware e Auth',
    technology: 'Next.js 15.5',
    difficulty: 'Avançado',
    estimatedTime: 50,
    order: 9,
    prerequisites: ['nextjs-api-routes'],
    tags: ['middleware', 'auth', 'cookies', 'redirect'],
    nextLesson: { id: 'nextjs-deploy', title: 'Deploy em Vercel' },
    youtubeVideos: [
      { title: 'Protegendo APIs no Next.js com Middleware e JWT', creator: 'Rocketseat', youtubeId: 'VttJPmaLMWU', duration: 30 },
    ],
    content: `# Middleware e Auth

O middleware do Next.js roda antes de qualquer requisição, permitindo redirecionar, reescrever URLs e proteger rotas.

## middleware.ts (raiz do projeto)

\`\`\`ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/perfil/:path*'],
};
\`\`\`

## Lendo e escrevendo cookies

\`\`\`ts
// Ler
const valor = request.cookies.get('meu-cookie')?.value;

// Escrever na resposta
const response = NextResponse.next();
response.cookies.set('tema', 'dark', { httpOnly: true });
return response;
\`\`\`

## Com Supabase Auth

\`\`\`ts
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(/* config */);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL('/login', request.url));
  return NextResponse.next();
}
\`\`\`
`,
    codeTemplate: `// Crie um middleware que:
// 1. Proteja todas as rotas /admin/*
// 2. Verifique se existe cookie "admin-token"
// 3. Redirecione para /login se não existir

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // SEU CÓDIGO AQUI
}

export const config = {
  matcher: [], // configure aqui
};`,
    codeSolution: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};`,
  },
  {
    id: 'nextjs-deploy',
    title: 'Deploy em Vercel',
    technology: 'Next.js 15.5',
    difficulty: 'Iniciante',
    estimatedTime: 30,
    order: 10,
    prerequisites: ['nextjs-middleware'],
    tags: ['deploy', 'vercel', 'CI/CD', 'variáveis de ambiente'],
    nextLesson: { id: 'ts-basics', title: 'Tipos básicos e Inferência' },
    youtubeVideos: [
      { title: 'Como DEPLOYAR Next.js na VERCEL de GRAÇA em 10 Minutos', creator: 'Programação Web', youtubeId: 'ysSLwPkjzj4', duration: 25 },
    ],
    content: `# Deploy em Vercel

A Vercel é a plataforma criada pelos autores do Next.js — o deploy é integrado por padrão.

## Passos

1. Crie conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente
4. Clique em Deploy

## vercel.json (opcional)

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
\`\`\`

## Variáveis de ambiente

No dashboard da Vercel em **Settings → Environment Variables**:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
\`\`\`

## Domínio customizado

1. Settings → Domains
2. Adicione seu domínio
3. Configure os registros DNS no seu provedor

## Preview Deploys

Cada Pull Request gera automaticamente uma URL de preview — ideal para revisão antes de ir para produção.
`,
  },

  // ─── TYPESCRIPT ──────────────────────────────────────────────────────────
  {
    id: 'ts-basics',
    title: 'Tipos básicos e Inferência',
    technology: 'TypeScript',
    difficulty: 'Iniciante',
    estimatedTime: 35,
    order: 11,
    prerequisites: [],
    tags: ['typescript', 'tipos', 'inferência'],
    nextLesson: { id: 'ts-interfaces', title: 'Interfaces vs Types' },
    youtubeVideos: [
      { title: 'TypeScript Tutorial: Aprenda do ZERO passo a passo', creator: 'DevClub', youtubeId: 'WvPlUwj2n5k', duration: 55 },
    ],
    content: `# Tipos básicos e Inferência

TypeScript adiciona tipagem estática ao JavaScript, capturando erros antes de executar o código.

## Tipos primitivos

\`\`\`ts
const nome: string = 'Ana';
const idade: number = 30;
const ativo: boolean = true;
const indefinido: undefined = undefined;
const nulo: null = null;
\`\`\`

## Inferência de tipos

\`\`\`ts
// TypeScript infere automaticamente
const nome = 'Ana';    // string
const idade = 30;      // number
const lista = [1,2,3]; // number[]
\`\`\`

## Arrays e Tuplas

\`\`\`ts
const numeros: number[] = [1, 2, 3];
const nomes: Array<string> = ['Ana', 'João'];
const par: [string, number] = ['idade', 30]; // tupla
\`\`\`

## Union Types

\`\`\`ts
let status: 'ativo' | 'inativo' | 'pendente';
let id: string | number;
\`\`\`

## Type Assertion

\`\`\`ts
const input = document.getElementById('nome') as HTMLInputElement;
\`\`\`
`,
    codeTemplate: `// Corrija os erros de tipo neste código:

function somar(a, b) {
  return a + b;
}

const resultado = somar('5', 10);
const lista = [1, '2', 3]; // deve ser só números
let status = 'ativo';
status = 123; // erro esperado`,
    codeSolution: `function somar(a: number, b: number): number {
  return a + b;
}

const resultado = somar(5, 10); // 15
const lista: number[] = [1, 2, 3];
let status: 'ativo' | 'inativo' = 'ativo';
// status = 123; // ❌ Type 'number' is not assignable to type 'string'`,
  },
  {
    id: 'ts-interfaces',
    title: 'Interfaces vs Types',
    technology: 'TypeScript',
    difficulty: 'Iniciante',
    estimatedTime: 35,
    order: 12,
    prerequisites: ['ts-basics'],
    tags: ['interface', 'type', 'typescript'],
    nextLesson: { id: 'ts-generics', title: 'Generics' },
    youtubeVideos: [
      { title: 'TypeScript Completo: Interfaces, Types e Generics — Aula Prática', creator: 'DevSuperior', youtubeId: 'XwtKuAV_fHY', duration: 40 },
    ],
    content: `# Interfaces vs Types

Ambos definem a "forma" de um objeto, mas têm diferenças importantes.

## Interface

\`\`\`ts
interface Usuario {
  id: number;
  nome: string;
  email?: string; // opcional
}
\`\`\`

## Type

\`\`\`ts
type Usuario = {
  id: number;
  nome: string;
  email?: string;
};
\`\`\`

## Diferenças chave

| | Interface | Type |
|--|-----------|------|
| Extensão | extends | & (intersection) |
| Union | ❌ | ✅ |
| Merging | ✅ | ❌ |
| Primitivos | ❌ | ✅ |

## Extensão

\`\`\`ts
// Interface
interface Admin extends Usuario {
  nivel: number;
}

// Type
type Admin = Usuario & { nivel: number };
\`\`\`

## Recomendação

Use **interface** para objetos e classes. Use **type** para unions, primitivos e composições complexas.
`,
    codeTemplate: `// Crie os tipos para um sistema de blog:
// - Post: id, titulo, conteudo, autorId, publicado
// - Autor: id, nome, email
// - PostComAutor: Post com campo "autor: Autor" (sem autorId)

// SEU CÓDIGO AQUI`,
    codeSolution: `interface Autor {
  id: number;
  nome: string;
  email: string;
}

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorId: number;
  publicado: boolean;
}

type PostComAutor = Omit<Post, 'autorId'> & {
  autor: Autor;
};`,
  },
  {
    id: 'ts-generics',
    title: 'Generics',
    technology: 'TypeScript',
    difficulty: 'Intermediário',
    estimatedTime: 45,
    order: 13,
    prerequisites: ['ts-interfaces'],
    tags: ['generics', 'typescript', 'reutilização'],
    nextLesson: { id: 'ts-advanced', title: 'Types Avançados' },
    youtubeVideos: [
      { title: 'Aulão de TypeScript — Inferência, Interfaces, Tipos e Generics', creator: 'Rocketseat', youtubeId: 'EnneL962QAs', duration: 50 },
    ],
    content: `# Generics

Generics permitem criar componentes e funções reutilizáveis que funcionam com qualquer tipo.

## Função genérica

\`\`\`ts
function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

primeiro([1, 2, 3]);        // number
primeiro(['a', 'b']);       // string
primeiro([true, false]);    // boolean
\`\`\`

## Interface genérica

\`\`\`ts
interface Resposta<T> {
  dados: T;
  erro: string | null;
  carregando: boolean;
}

type RespostaUsuario = Resposta<Usuario>;
type RespostaLista = Resposta<Usuario[]>;
\`\`\`

## Constraints

\`\`\`ts
function getPropriedade<T, K extends keyof T>(obj: T, chave: K): T[K] {
  return obj[chave];
}

getPropriedade({ nome: 'Ana', idade: 30 }, 'nome'); // 'Ana'
\`\`\`

## Múltiplos tipos genéricos

\`\`\`ts
function mapear<T, U>(lista: T[], transformar: (item: T) => U): U[] {
  return lista.map(transformar);
}
\`\`\`
`,
    codeTemplate: `// Crie uma função genérica "paginar" que:
// - Receba um array de T e um tamanho de página
// - Retorne { dados: T[], total: number, paginas: number }

function paginar<T>(itens: T[], tamanhoPagina: number) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `function paginar<T>(itens: T[], tamanhoPagina: number) {
  return {
    dados: itens.slice(0, tamanhoPagina),
    total: itens.length,
    paginas: Math.ceil(itens.length / tamanhoPagina),
  };
}

// Uso:
const resultado = paginar([1, 2, 3, 4, 5], 2);
// { dados: [1, 2], total: 5, paginas: 3 }`,
  },
  {
    id: 'ts-advanced',
    title: 'Types Avançados',
    technology: 'TypeScript',
    difficulty: 'Avançado',
    estimatedTime: 50,
    order: 14,
    prerequisites: ['ts-generics'],
    tags: ['utility types', 'conditional types', 'mapped types'],
    nextLesson: { id: 'tw-utility', title: 'Utility-first CSS' },
    youtubeVideos: [
      { title: '3 Conceitos Avançados do TypeScript que Você Deve Saber', creator: 'DevSuperior', youtubeId: 'uSRlK8heDWU', duration: 25 },
    ],
    content: `# Types Avançados

## Utility Types

\`\`\`ts
interface Usuario { id: number; nome: string; email: string; senha: string; }

type UsuarioPublico = Omit<Usuario, 'senha'>;
type UsuarioParcial = Partial<Usuario>;
type UsuarioRequerido = Required<Usuario>;
type SoId = Pick<Usuario, 'id'>;
type ReadonlyUser = Readonly<Usuario>;
\`\`\`

## Conditional Types

\`\`\`ts
type EhArray<T> = T extends any[] ? true : false;
type EhString = EhArray<string>;   // false
type EhLista = EhArray<string[]>;  // true
\`\`\`

## Mapped Types

\`\`\`ts
type Opcional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };
\`\`\`

## Template Literal Types

\`\`\`ts
type Evento = 'click' | 'hover' | 'focus';
type Handler = \`on\${Capitalize<Evento>}\`; // 'onClick' | 'onHover' | 'onFocus'
\`\`\`

## infer

\`\`\`ts
type RetornoFuncao<T> = T extends (...args: any[]) => infer R ? R : never;
type R = RetornoFuncao<() => string>; // string
\`\`\`
`,
    codeTemplate: `// Crie um tipo "DeepPartial<T>" que torna
// todas as propriedades opcionais recursivamente

type DeepPartial<T> = {
  // SEU CÓDIGO AQUI
};

// Teste:
interface Config {
  tema: { cor: string; tamanho: number };
  usuario: { nome: string; permissoes: string[] };
}

type ConfigOpcional = DeepPartial<Config>;`,
    codeSolution: `type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface Config {
  tema: { cor: string; tamanho: number };
  usuario: { nome: string; permissoes: string[] };
}

type ConfigOpcional = DeepPartial<Config>;
// { tema?: { cor?: string; tamanho?: number }; usuario?: { nome?: string; permissoes?: string[] } }`,
  },

  // ─── TAILWIND CSS 4 ──────────────────────────────────────────────────────
  {
    id: 'tw-utility',
    title: 'Utility-first CSS',
    technology: 'Tailwind CSS 4',
    difficulty: 'Iniciante',
    estimatedTime: 30,
    order: 15,
    prerequisites: [],
    tags: ['tailwind', 'utility-first', 'classes'],
    nextLesson: { id: 'tw-responsive', title: 'Responsividade' },
    youtubeVideos: [
      { title: 'Tailwind CSS do ZERO ao AVANÇADO', creator: 'Hora de Codar', youtubeId: 'SUavcwCCLN8', duration: 45 },
    ],
    content: `# Utility-first CSS

Tailwind CSS oferece classes utilitárias que você aplica diretamente no HTML, sem escrever CSS separado.

## Filosofia

\`\`\`tsx
// CSS tradicional
<div className="card"> ... </div>

// Tailwind
<div className="bg-white rounded-lg shadow-md p-6"> ... </div>
\`\`\`

## Classes essenciais

\`\`\`tsx
// Layout
<div className="flex items-center justify-between gap-4">

// Espaçamento (p = padding, m = margin)
<div className="p-4 px-8 mt-6 mb-2">

// Tipografia
<h1 className="text-2xl font-bold text-gray-900">

// Cores
<div className="bg-blue-500 text-white border border-gray-200">

// Tamanho
<div className="w-full max-w-lg h-48">
\`\`\`

## Tailwind CSS 4 — novidades

\`\`\`css
/* Configuração via CSS (sem tailwind.config.js) */
@import "tailwindcss";

@theme {
  --color-brand: #D4A574;
  --font-display: "Raleway", sans-serif;
}
\`\`\`

## Hover, Focus, Active

\`\`\`tsx
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2">
  Botão
</button>
\`\`\`
`,
    codeTemplate: `// Converta este CSS para classes Tailwind:
// .container { display: flex; flex-direction: column; gap: 16px; padding: 24px; }
// .titulo { font-size: 24px; font-weight: bold; color: #111; }
// .botao { background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; }

export function Exemplo() {
  return (
    <div className=""> {/* adicione classes Tailwind */}
      <h1 className="">Título</h1>
      <button className="">Clique</button>
    </div>
  );
}`,
    codeSolution: `export function Exemplo() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Título</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Clique
      </button>
    </div>
  );
}`,
  },
  {
    id: 'tw-responsive',
    title: 'Responsividade',
    technology: 'Tailwind CSS 4',
    difficulty: 'Iniciante',
    estimatedTime: 35,
    order: 16,
    prerequisites: ['tw-utility'],
    tags: ['responsivo', 'breakpoints', 'mobile-first'],
    nextLesson: { id: 'tw-darkmode', title: 'Dark Mode' },
    youtubeVideos: [
      { title: 'Tailwind CSS — Responsividade na Prática', creator: 'Hora de Codar', youtubeId: 'XtZI-EDwD7I', duration: 25 },
    ],
    content: `# Responsividade com Tailwind

Tailwind usa breakpoints com prefixos — **mobile-first** por padrão.

## Breakpoints

| Prefixo | Largura mínima |
|---------|---------------|
| (nenhum) | 0px (mobile) |
| sm: | 640px |
| md: | 768px |
| lg: | 1024px |
| xl: | 1280px |
| 2xl: | 1536px |

## Exemplos

\`\`\`tsx
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Texto responsivo
<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">

// Esconder em mobile
<div className="hidden md:flex">

// Só mobile
<div className="block md:hidden">

// Padding responsivo
<section className="px-4 md:px-8 lg:px-16 py-12">
\`\`\`

## Layout de 2 colunas → 1 em mobile

\`\`\`tsx
<div className="flex flex-col md:flex-row gap-8">
  <aside className="w-full md:w-64">Sidebar</aside>
  <main className="flex-1">Conteúdo</main>
</div>
\`\`\`
`,
    codeTemplate: `// Crie um layout responsivo:
// - Mobile: 1 coluna, padding 16px
// - Tablet (md): 2 colunas, padding 32px
// - Desktop (lg): 3 colunas, padding 48px
// Cada célula: card com título e texto

export function Grid() {
  const itens = ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Next.js', 'shadcn'];
  return (
    // SEU CÓDIGO AQUI
  );
}`,
    codeSolution: `export function Grid() {
  const itens = ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Next.js', 'shadcn'];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-12 py-8">
      {itens.map(item => (
        <div key={item} className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-bold">{item}</h3>
          <p className="text-gray-500 text-sm mt-2">Tecnologia do stack</p>
        </div>
      ))}
    </div>
  );
}`,
  },
  {
    id: 'tw-darkmode',
    title: 'Dark Mode',
    technology: 'Tailwind CSS 4',
    difficulty: 'Intermediário',
    estimatedTime: 30,
    order: 17,
    prerequisites: ['tw-responsive'],
    tags: ['dark mode', 'tema', 'variáveis CSS'],
    nextLesson: { id: 'shadcn-basics', title: 'Setup e componentes básicos' },
    youtubeVideos: [
      { title: 'Landing Page Responsiva com Dark Mode e Light Mode — Tailwind', creator: 'Matheus Battisti', youtubeId: '2ZJ_pVsVS3Q', duration: 35 },
    ],
    content: `# Dark Mode com Tailwind

## Configuração (Tailwind v4)

\`\`\`css
@import "tailwindcss";

@theme {
  --color-bg: #ffffff;
  --color-text: #111111;
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg: #0f0f0f;
    --color-text: #e5e5e5;
  }
}
\`\`\`

## Prefix dark:

\`\`\`tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <h1 className="text-2xl dark:text-white">Título</h1>
  <p className="text-gray-600 dark:text-gray-400">Descrição</p>
</div>
\`\`\`

## Toggle manual com JavaScript

\`\`\`tsx
'use client';

export function ToggleTema() {
  function toggle() {
    document.documentElement.classList.toggle('dark');
  }
  return <button onClick={toggle}>Alternar tema</button>;
}
\`\`\`

## Boas práticas

- Sempre defina as variantes \`dark:\` nos componentes de design system
- Use CSS variables para cores que mudam com o tema
- Teste os dois modos antes de publicar
`,
    codeTemplate: `// Crie um Card que suporte dark mode:
// - Fundo branco no light, cinza-escuro no dark
// - Texto escuro no light, claro no dark
// - Borda sutil em ambos os modos
// - Botão com cores invertidas no dark

export function Card({ titulo, descricao }: { titulo: string; descricao: string }) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `export function Card({ titulo, descricao }: { titulo: string; descricao: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{titulo}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{descricao}</p>
      <button className="mt-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded text-sm font-medium">
        Ação
      </button>
    </div>
  );
}`,
  },

  // ─── SHADCN/UI ───────────────────────────────────────────────────────────
  {
    id: 'shadcn-basics',
    title: 'Setup e componentes básicos',
    technology: 'shadcn/ui',
    difficulty: 'Iniciante',
    estimatedTime: 35,
    order: 18,
    prerequisites: ['tw-darkmode'],
    tags: ['shadcn', 'button', 'card', 'input'],
    nextLesson: { id: 'shadcn-forms', title: 'Forms com React Hook Form' },
    youtubeVideos: [
      { title: 'Criando UI no React na velocidade da luz com shadcn/ui', creator: 'Rocketseat', youtubeId: 'er_QPBldsXE', duration: 28 },
    ],
    content: `# Setup e componentes básicos do shadcn/ui

shadcn/ui não é uma biblioteca — é uma coleção de componentes que você copia para o seu projeto e customiza.

## Instalação

\`\`\`bash
npx shadcn@latest init
npx shadcn@latest add button card input
\`\`\`

## Button

\`\`\`tsx
import { Button } from '@/components/ui/button';

<Button>Padrão</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Deletar</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Pequeno</Button>
<Button disabled>Desabilitado</Button>
\`\`\`

## Card

\`\`\`tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Conteúdo do card</p>
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>
\`\`\`

## Input

\`\`\`tsx
import { Input } from '@/components/ui/input';

<Input type="email" placeholder="seu@email.com" />
\`\`\`

## Customização

Os componentes ficam em \`src/components/ui/\` — edite diretamente para mudar estilos com Tailwind.
`,
    codeTemplate: `// Crie um card de perfil usando shadcn/ui:
// - Card com header (nome e cargo)
// - Content com email e telefone
// - Footer com botão "Editar"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PerfilCardProps {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
}

export function PerfilCard({ nome, cargo, email, telefone }: PerfilCardProps) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PerfilCardProps {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
}

export function PerfilCard({ nome, cargo, email, telefone }: PerfilCardProps) {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{nome}</CardTitle>
        <p className="text-sm text-muted-foreground">{cargo}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">📧 {email}</p>
        <p className="text-sm">📱 {telefone}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Editar</Button>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    id: 'shadcn-forms',
    title: 'Forms com React Hook Form',
    technology: 'shadcn/ui',
    difficulty: 'Intermediário',
    estimatedTime: 45,
    order: 19,
    prerequisites: ['shadcn-basics'],
    tags: ['forms', 'react-hook-form', 'zod', 'validação'],
    nextLesson: { id: 'shadcn-tables', title: 'Tables e Dropdowns' },
    youtubeVideos: [
      { title: 'Form dinâmico com validações usando React Hook Form e Zod', creator: 'Rocketseat', youtubeId: 'H2_yqSFCy4g', duration: 35 },
    ],
    content: `# Forms com React Hook Form + Zod

## Instalação

\`\`\`bash
npm install react-hook-form zod @hookform/resolvers
npx shadcn@latest add form
\`\`\`

## Schema de validação (Zod)

\`\`\`ts
import { z } from 'zod';

const schema = z.object({
  nome: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;
\`\`\`

## Componente de formulário

\`\`\`tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export function MeuForm() {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
\`\`\`
`,
  },
  {
    id: 'shadcn-tables',
    title: 'Tables e Dropdowns',
    technology: 'shadcn/ui',
    difficulty: 'Intermediário',
    estimatedTime: 40,
    order: 20,
    prerequisites: ['shadcn-forms'],
    tags: ['table', 'dropdown', 'tanstack', 'shadcn'],
    nextLesson: { id: 'sb-setup', title: 'Setup PostgreSQL' },
    youtubeVideos: [
      { title: 'React Data Table com Next.js, Shadcn/ui e Tanstack Table', creator: 'Filipe Deschamps', youtubeId: 'NJ_X8rbH600', duration: 40 },
    ],
    content: `# Tables e Dropdowns

## Table básica

\`\`\`tsx
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {usuarios.map(u => (
      <TableRow key={u.id}>
        <TableCell>{u.nome}</TableCell>
        <TableCell>{u.email}</TableCell>
        <TableCell>{u.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
\`\`\`

## Dropdown Menu

\`\`\`tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">⋯</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => editar(id)}>Editar</DropdownMenuItem>
    <DropdownMenuItem onClick={() => deletar(id)} className="text-red-600">
      Deletar
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

## Combinando (tabela com ações)

Cada linha da tabela pode ter um \`DropdownMenu\` na última coluna para ações contextuais.
`,
  },

  // ─── SUPABASE ────────────────────────────────────────────────────────────
  {
    id: 'sb-setup',
    title: 'Setup PostgreSQL',
    technology: 'Supabase',
    difficulty: 'Iniciante',
    estimatedTime: 35,
    order: 21,
    prerequisites: [],
    tags: ['supabase', 'postgresql', 'banco de dados'],
    nextLesson: { id: 'sb-auth', title: 'Autenticação' },
    youtubeVideos: [
      { title: 'Curso Supabase Gratuito para Iniciantes', creator: 'Hora de Codar', youtubeId: 'OztHXOnQLXc', duration: 50 },
    ],
    content: `# Setup PostgreSQL com Supabase

Supabase é um Backend-as-a-Service open source que fornece PostgreSQL, autenticação, storage e mais.

## Criar projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha nome, senha e região
4. Aguarde o provisionamento (~2 min)

## Criar tabela pelo dashboard

\`\`\`sql
CREATE TABLE clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

## Conectar no projeto

\`\`\`ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
\`\`\`

## Tipos gerados automaticamente

\`\`\`bash
npx supabase gen types typescript --project-id SEU_ID > src/types/supabase.ts
\`\`\`

## Estrutura recomendada

\`\`\`
src/
└── lib/
    ├── supabase.ts        ← cliente
    └── supabase.server.ts ← cliente SSR (Next.js)
\`\`\`
`,
  },
  {
    id: 'sb-auth',
    title: 'Autenticação',
    technology: 'Supabase',
    difficulty: 'Iniciante',
    estimatedTime: 40,
    order: 22,
    prerequisites: ['sb-setup'],
    tags: ['auth', 'supabase', 'email', 'OAuth'],
    nextLesson: { id: 'sb-crud', title: 'CRUD básico' },
    youtubeVideos: [
      { title: 'Autenticação e Autorização no Supabase na Prática', creator: 'DevSuperior', youtubeId: 'G58nA0a41M4', duration: 35 },
    ],
    content: `# Autenticação com Supabase

## Login com email/senha

\`\`\`ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@email.com',
  password: 'senha123',
});
\`\`\`

## Registro

\`\`\`ts
const { data, error } = await supabase.auth.signUp({
  email: 'novo@email.com',
  password: 'senha123',
});
\`\`\`

## Logout

\`\`\`ts
await supabase.auth.signOut();
\`\`\`

## Sessão atual

\`\`\`ts
const { data: { user } } = await supabase.auth.getUser();
\`\`\`

## Listener de mudanças

\`\`\`ts
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') console.log('Logado:', session?.user.email);
  if (event === 'SIGNED_OUT') console.log('Deslogado');
});
\`\`\`

## OAuth (Google, GitHub)

\`\`\`ts
await supabase.auth.signInWithOAuth({ provider: 'github' });
\`\`\`

Ative os provedores em **Authentication → Providers** no dashboard.
`,
  },
  {
    id: 'sb-crud',
    title: 'CRUD básico',
    technology: 'Supabase',
    difficulty: 'Iniciante',
    estimatedTime: 40,
    order: 23,
    prerequisites: ['sb-auth'],
    tags: ['crud', 'select', 'insert', 'update', 'delete'],
    nextLesson: { id: 'sb-relations', title: 'Relacionamentos' },
    youtubeVideos: [
      { title: 'Banco de Dados Relacional e SQL com Supabase — Masterclass', creator: 'Formação DEV', youtubeId: 'wOcbetwEJD4', duration: 60 },
    ],
    content: `# CRUD básico com Supabase

## SELECT

\`\`\`ts
// Todos os registros
const { data } = await supabase.from('clientes').select('*');

// Com filtro
const { data } = await supabase
  .from('clientes')
  .select('id, nome, email')
  .eq('ativo', true)
  .order('nome');

// Um registro
const { data } = await supabase
  .from('clientes')
  .select('*')
  .eq('id', clienteId)
  .single();
\`\`\`

## INSERT

\`\`\`ts
const { data, error } = await supabase
  .from('clientes')
  .insert({ nome: 'Ana', email: 'ana@email.com' })
  .select()
  .single();
\`\`\`

## UPDATE

\`\`\`ts
const { error } = await supabase
  .from('clientes')
  .update({ nome: 'Ana Silva' })
  .eq('id', clienteId);
\`\`\`

## DELETE

\`\`\`ts
const { error } = await supabase
  .from('clientes')
  .delete()
  .eq('id', clienteId);
\`\`\`

## Tratamento de erros

\`\`\`ts
const { data, error } = await supabase.from('clientes').select('*');
if (error) throw new Error(error.message);
\`\`\`
`,
    codeTemplate: `// Crie funções CRUD para a tabela "tarefas":
// interface Tarefa { id: string; titulo: string; concluida: boolean; }

import { supabase } from '@/lib/supabase';

export async function listarTarefas() {
  // SEU CÓDIGO AQUI
}

export async function criarTarefa(titulo: string) {
  // SEU CÓDIGO AQUI
}

export async function concluirTarefa(id: string) {
  // SEU CÓDIGO AQUI
}

export async function deletarTarefa(id: string) {
  // SEU CÓDIGO AQUI
}`,
    codeSolution: `import { supabase } from '@/lib/supabase';

export async function listarTarefas() {
  const { data, error } = await supabase.from('tarefas').select('*').order('criado_em');
  if (error) throw new Error(error.message);
  return data;
}

export async function criarTarefa(titulo: string) {
  const { data, error } = await supabase
    .from('tarefas')
    .insert({ titulo, concluida: false })
    .select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function concluirTarefa(id: string) {
  const { error } = await supabase.from('tarefas').update({ concluida: true }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deletarTarefa(id: string) {
  const { error } = await supabase.from('tarefas').delete().eq('id', id);
  if (error) throw new Error(error.message);
}`,
  },
  {
    id: 'sb-relations',
    title: 'Relacionamentos',
    technology: 'Supabase',
    difficulty: 'Intermediário',
    estimatedTime: 45,
    order: 24,
    prerequisites: ['sb-crud'],
    tags: ['join', 'foreign key', 'relacionamentos', 'supabase'],
    nextLesson: { id: 'sb-rls', title: 'Row Level Security' },
    youtubeVideos: [
      { title: 'PostgreSQL + Tabelas e Relacionamentos com Deploy no Supabase', creator: 'Formação DEV', youtubeId: 'Zqfvukc420I', duration: 40 },
    ],
    content: `# Relacionamentos no Supabase

## Foreign Keys

\`\`\`sql
CREATE TABLE projetos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE
);
\`\`\`

## JOIN com select

\`\`\`ts
// Projetos com dados do cliente
const { data } = await supabase
  .from('projetos')
  .select(\`
    id,
    titulo,
    cliente:clientes (id, nome, email)
  \`);
\`\`\`

## Relacionamento inverso (1:N)

\`\`\`ts
// Cliente com todos os seus projetos
const { data } = await supabase
  .from('clientes')
  .select(\`
    id,
    nome,
    projetos (id, titulo, status)
  \`)
  .eq('id', clienteId)
  .single();
\`\`\`

## Muitos para muitos

\`\`\`sql
-- Tabela de junção
CREATE TABLE projeto_tags (
  projeto_id UUID REFERENCES projetos(id),
  tag_id UUID REFERENCES tags(id),
  PRIMARY KEY (projeto_id, tag_id)
);
\`\`\`

\`\`\`ts
const { data } = await supabase
  .from('projetos')
  .select('id, titulo, tags:projeto_tags(tag:tags(nome))');
\`\`\`
`,
  },
  {
    id: 'sb-rls',
    title: 'Row Level Security',
    technology: 'Supabase',
    difficulty: 'Avançado',
    estimatedTime: 50,
    order: 25,
    prerequisites: ['sb-relations'],
    tags: ['RLS', 'segurança', 'políticas', 'supabase'],
    nextLesson: { id: 'sk-arquitetura', title: 'Arquitetura da plataforma' },
    youtubeVideos: [
      { title: 'Como Controlar Acesso de Usuários com RLS no Supabase', creator: 'DevSuperior', youtubeId: 'iFzkI4whgTI', duration: 30 },
    ],
    content: `# Row Level Security (RLS)

RLS permite que cada linha do banco tenha suas próprias regras de acesso baseadas no usuário logado.

## Habilitar RLS

\`\`\`sql
ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;
\`\`\`

## Políticas básicas

\`\`\`sql
-- Ver apenas os próprios projetos
CREATE POLICY "ver próprios projetos" ON projetos
  FOR SELECT USING (auth.uid() = user_id);

-- Criar apenas para si mesmo
CREATE POLICY "criar projeto" ON projetos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Atualizar apenas os seus
CREATE POLICY "atualizar projeto" ON projetos
  FOR UPDATE USING (auth.uid() = user_id);

-- Deletar apenas os seus
CREATE POLICY "deletar projeto" ON projetos
  FOR DELETE USING (auth.uid() = user_id);
\`\`\`

## Política pública (leitura)

\`\`\`sql
-- Qualquer um pode ler posts publicados
CREATE POLICY "posts públicos" ON posts
  FOR SELECT USING (publicado = true);
\`\`\`

## Verificar usuário logado

\`\`\`sql
-- auth.uid() → ID do usuário logado
-- auth.jwt() → JWT completo
-- auth.role() → 'anon' ou 'authenticated'
\`\`\`

## Testar com service_role

Use a chave \`service_role\` (nunca no frontend!) para bypass de RLS em testes no servidor.
`,
  },

  // ─── SKETCHAIN ───────────────────────────────────────────────────────────
  {
    id: 'sk-arquitetura',
    title: 'Arquitetura da plataforma',
    technology: 'Sketchain',
    difficulty: 'Intermediário',
    estimatedTime: 45,
    order: 26,
    prerequisites: ['sb-rls'],
    tags: ['arquitetura', 'sketchain', 'sistema'],
    nextLesson: { id: 'sk-setup', title: 'Setup inicial' },
    youtubeVideos: [
      { title: 'Full Stack SaaS com Next.js, Supabase e Shadcn/ui', creator: 'Rocketseat', youtubeId: 'KHKpKR1NuaU', duration: 45 },
    ],
    content: `# Arquitetura da Plataforma Sketchain

Sketchain é uma plataforma de gestão de projetos e clientes para escritórios de arquitetura.

## Visão geral

\`\`\`
┌─────────────────────────────────────┐
│           Next.js 15.5              │
│  ┌─────────────┐  ┌──────────────┐  │
│  │   Escritório │  │Portal Cliente│  │
│  │  /escritorio │  │  /cliente    │  │
│  └──────┬──────┘  └──────┬───────┘  │
└─────────┼────────────────┼──────────┘
          │                │
          ▼                ▼
┌─────────────────────────────────────┐
│            Supabase                 │
│  PostgreSQL + Auth + Storage + RLS  │
└─────────────────────────────────────┘
\`\`\`

## Módulos principais

| Módulo | Descrição |
|--------|-----------|
| Clientes | Cadastro e gestão de clientes |
| Projetos | CRUD de projetos com status |
| Inventário | Itens por projeto |
| Portal | Acesso do cliente ao projeto |
| Notificações | Alertas por status |

## Schema do banco

\`\`\`sql
clientes (id, nome, email, telefone, criado_em)
projetos (id, titulo, status, cliente_id, criado_em)
inventario (id, projeto_id, nome, quantidade, preco)
notificacoes (id, user_id, mensagem, lida, criado_em)
\`\`\`

## Fluxo de acesso

1. Escritório faz login → acessa dashboard completo
2. Cliente recebe link → acessa portal restrito (apenas seus projetos)
3. RLS garante isolamento entre clientes
`,
  },
  {
    id: 'sk-setup',
    title: 'Setup inicial',
    technology: 'Sketchain',
    difficulty: 'Iniciante',
    estimatedTime: 35,
    order: 27,
    prerequisites: ['sk-arquitetura'],
    tags: ['setup', 'next.js', 'supabase', 'estrutura'],
    nextLesson: { id: 'sk-clientes', title: 'CRUD Clientes' },
    youtubeVideos: [
      { title: 'Dominando Next.js do ZERO', creator: 'Matheus Battisti', youtubeId: 'e6FigV2fLC8', duration: 55 },
    ],
    content: `# Setup Inicial do Sketchain

## Criar projeto Next.js

\`\`\`bash
npx create-next-app@latest sketchain \\
  --typescript --tailwind --app --src-dir
cd sketchain
npm install @supabase/supabase-js @supabase/ssr
npx shadcn@latest init
\`\`\`

## Variáveis de ambiente

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... # apenas no servidor
\`\`\`

## Estrutura de pastas

\`\`\`
src/
├── app/
│   ├── escritorio/    ← dashboard interno
│   └── cliente/       ← portal do cliente
├── components/
│   ├── ui/            ← shadcn/ui
│   └── shared/        ← componentes compartilhados
├── lib/
│   ├── supabase.ts    ← cliente browser
│   └── supabase-server.ts ← cliente SSR
└── types/
    └── supabase.ts    ← tipos gerados
\`\`\`

## Criar tabelas no Supabase

Execute o SQL da aula de Arquitetura no **SQL Editor** do Supabase, habilite RLS e crie as políticas.
`,
  },
  {
    id: 'sk-clientes',
    title: 'CRUD Clientes',
    technology: 'Sketchain',
    difficulty: 'Intermediário',
    estimatedTime: 50,
    order: 28,
    prerequisites: ['sk-setup'],
    tags: ['crud', 'clientes', 'formulário', 'tabela'],
    nextLesson: { id: 'sk-projetos', title: 'CRUD Projetos' },
    youtubeVideos: [
      { title: 'Supabase: Como Criar e Relacionar Tabelas Passo a Passo', creator: 'DevSuperior', youtubeId: 'tl0TkyfSHNo', duration: 30 },
    ],
    content: `# CRUD de Clientes

## Server Action para criar cliente

\`\`\`ts
'use server';

import { supabase } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function criarCliente(formData: FormData) {
  const nome = formData.get('nome') as string;
  const email = formData.get('email') as string;

  const { error } = await supabase.from('clientes').insert({ nome, email });
  if (error) throw new Error(error.message);

  revalidatePath('/escritorio/clientes');
}
\`\`\`

## Listar clientes (Server Component)

\`\`\`tsx
export default async function ClientesPage() {
  const { data: clientes } = await supabase
    .from('clientes')
    .select('*')
    .order('nome');

  return (
    <div>
      {clientes?.map(c => (
        <div key={c.id}>{c.nome} — {c.email}</div>
      ))}
    </div>
  );
}
\`\`\`

## Formulário de criação

\`\`\`tsx
<form action={criarCliente}>
  <Input name="nome" placeholder="Nome completo" required />
  <Input name="email" type="email" placeholder="Email" required />
  <Button type="submit">Criar Cliente</Button>
</form>
\`\`\`

## Deletar com confirmação

Use o componente \`Dialog\` do shadcn para confirmar antes de deletar.
`,
  },
  {
    id: 'sk-projetos',
    title: 'CRUD Projetos',
    technology: 'Sketchain',
    difficulty: 'Intermediário',
    estimatedTime: 50,
    order: 29,
    prerequisites: ['sk-clientes'],
    tags: ['projetos', 'crud', 'status', 'relacionamento'],
    nextLesson: { id: 'sk-status', title: 'Status Tracking' },
    youtubeVideos: [
      { title: 'CRUD com Supabase na Prática', creator: 'Rocketseat', youtubeId: 'hmtMQEl6azM', duration: 40 },
    ],
    content: `# CRUD de Projetos

## Schema

\`\`\`sql
CREATE TABLE projetos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'briefing' CHECK (status IN ('briefing','desenvolvimento','revisao','entregue')),
  cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  criado_em TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

## Listar com cliente

\`\`\`ts
const { data } = await supabase
  .from('projetos')
  .select('*, cliente:clientes(nome, email)')
  .order('criado_em', { ascending: false });
\`\`\`

## Criar projeto

\`\`\`ts
const { data: { user } } = await supabase.auth.getUser();

await supabase.from('projetos').insert({
  titulo,
  cliente_id: clienteId,
  user_id: user!.id,
  status: 'briefing',
});
\`\`\`

## Filtrar por status

\`\`\`ts
const { data } = await supabase
  .from('projetos')
  .select('*')
  .eq('status', 'desenvolvimento');
\`\`\`
`,
  },
  {
    id: 'sk-status',
    title: 'Status Tracking',
    technology: 'Sketchain',
    difficulty: 'Intermediário',
    estimatedTime: 40,
    order: 30,
    prerequisites: ['sk-projetos'],
    tags: ['status', 'kanban', 'workflow', 'atualização'],
    nextLesson: { id: 'sk-portal', title: 'Portal do Cliente' },
    youtubeVideos: [
      { title: 'Refatorando app React com novos componentes shadcn/ui', creator: 'Rocketseat', youtubeId: 'xo38Vy5QAF0', duration: 20 },
    ],
    content: `# Status Tracking

## Fluxo de status

\`\`\`
Briefing → Desenvolvimento → Revisão → Entregue
\`\`\`

## Atualizar status

\`\`\`ts
'use server';

export async function atualizarStatus(projetoId: string, novoStatus: string) {
  const { error } = await supabase
    .from('projetos')
    .update({ status: novoStatus, atualizado_em: new Date().toISOString() })
    .eq('id', projetoId);

  if (error) throw new Error(error.message);
  revalidatePath('/escritorio/projetos');
}
\`\`\`

## Badge de status

\`\`\`tsx
const STATUS_CONFIG = {
  briefing:      { label: 'Briefing',      cor: 'bg-gray-500' },
  desenvolvimento: { label: 'Em Desenvolvimento', cor: 'bg-blue-500' },
  revisao:       { label: 'Em Revisão',    cor: 'bg-yellow-500' },
  entregue:      { label: 'Entregue',      cor: 'bg-green-500' },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  return (
    <span className={\`\${config.cor} text-white px-3 py-1 rounded-full text-xs font-medium\`}>
      {config.label}
    </span>
  );
}
\`\`\`

## Histórico de mudanças

Registre cada mudança de status em uma tabela \`status_historico\` para auditoria.
`,
  },
  {
    id: 'sk-portal',
    title: 'Portal do Cliente',
    technology: 'Sketchain',
    difficulty: 'Avançado',
    estimatedTime: 55,
    order: 31,
    prerequisites: ['sk-status'],
    tags: ['portal', 'cliente', 'RLS', 'acesso restrito'],
    nextLesson: { id: 'sk-notificacoes', title: 'Notificações' },
    youtubeVideos: [
      { title: 'Autenticação Server Side com Next.js e Supabase', creator: 'Rocketseat', youtubeId: 'MEj2rCiHdYg', duration: 35 },
    ],
    content: `# Portal do Cliente

O portal permite que o cliente veja o andamento dos seus projetos sem acesso ao dashboard do escritório.

## Rota separada

\`\`\`
app/
└── cliente/
    ├── layout.tsx     ← layout do portal
    ├── page.tsx       ← dashboard do cliente
    └── projetos/
        └── [id]/
            └── page.tsx
\`\`\`

## Middleware de proteção

\`\`\`ts
// middleware.ts
if (pathname.startsWith('/cliente')) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL('/login', request.url));
}
\`\`\`

## RLS para o portal

\`\`\`sql
-- Cliente vê apenas os projetos dele
CREATE POLICY "portal cliente" ON projetos
  FOR SELECT USING (
    cliente_id IN (
      SELECT id FROM clientes WHERE email = auth.jwt()->>'email'
    )
  );
\`\`\`

## Componente de status visual

\`\`\`tsx
function TimelineStatus({ status }: { status: string }) {
  const etapas = ['briefing', 'desenvolvimento', 'revisao', 'entregue'];
  const atual = etapas.indexOf(status);
  return (
    <div className="flex gap-2">
      {etapas.map((e, i) => (
        <div key={e} className={\`h-2 flex-1 rounded \${i <= atual ? 'bg-green-500' : 'bg-gray-200'}\`} />
      ))}
    </div>
  );
}
\`\`\`
`,
  },
  {
    id: 'sk-notificacoes',
    title: 'Notificações',
    technology: 'Sketchain',
    difficulty: 'Avançado',
    estimatedTime: 45,
    order: 32,
    prerequisites: ['sk-portal'],
    tags: ['notificações', 'realtime', 'supabase', 'alertas'],
    nextLesson: { id: 'sk-deploy', title: 'Deploy' },
    youtubeVideos: [
      { title: 'Notificação em Tempo Real com Supabase Realtime', creator: 'DevSuperior', youtubeId: 'wJf_O7LEmjQ', duration: 30 },
    ],
    content: `# Notificações em Tempo Real

## Tabela de notificações

\`\`\`sql
CREATE TABLE notificacoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  titulo TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  lida BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE notificacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ver próprias notificações" ON notificacoes
  FOR ALL USING (auth.uid() = user_id);
\`\`\`

## Criar notificação ao mudar status

\`\`\`ts
async function notificarCliente(clienteUserId: string, projeto: string, status: string) {
  await supabase.from('notificacoes').insert({
    user_id: clienteUserId,
    titulo: 'Projeto atualizado',
    mensagem: \`"\${projeto}" está agora em: \${status}\`,
  });
}
\`\`\`

## Realtime no cliente

\`\`\`tsx
useEffect(() => {
  const channel = supabase
    .channel('notificacoes')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notificacoes',
      filter: \`user_id=eq.\${userId}\`,
    }, payload => {
      setNotificacoes(prev => [payload.new, ...prev]);
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [userId]);
\`\`\`
`,
  },
  {
    id: 'sk-deploy',
    title: 'Deploy',
    technology: 'Sketchain',
    difficulty: 'Iniciante',
    estimatedTime: 30,
    order: 33,
    prerequisites: ['sk-notificacoes'],
    tags: ['deploy', 'vercel', 'produção', 'CI/CD'],
    youtubeVideos: [
      { title: 'Deploy 100% GRÁTIS com Vercel + Next.js', creator: 'Programação Web', youtubeId: '8CMW3URmXUo', duration: 25 },
    ],
    content: `# Deploy do Sketchain

## Checklist pré-deploy

- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] RLS habilitado em todas as tabelas
- [ ] Políticas testadas com usuário real
- [ ] Build local sem erros (\`npm run build\`)
- [ ] \`.env.local\` não commitado

## Deploy na Vercel

\`\`\`bash
# Instalar CLI
npm install -g vercel

# Login e deploy
vercel login
vercel --prod
\`\`\`

## Variáveis na Vercel

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
\`\`\`

## Domínio customizado

1. **Vercel** → Settings → Domains → Add Domain
2. No seu provedor DNS, adicione:
   - \`A 76.76.21.21\`
   - \`CNAME www cname.vercel-dns.com\`

## Monitoramento

- **Vercel Analytics** — Core Web Vitals
- **Supabase Dashboard** — queries lentas e uso do banco
- **Sentry** (opcional) — erros em produção

## Parabéns! 🎉

Você construiu e deployou uma plataforma completa com Next.js 15.5, Supabase e shadcn/ui.
`,
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find(l => l.id === id);
}

export function getLessonsByTechnology(tech: Technology): Lesson[] {
  return lessons.filter(l => l.technology === tech).sort((a, b) => a.order - b.order);
}

export function getProgressPercent(completed: string[], tech?: Technology): number {
  const pool = tech ? getLessonsByTechnology(tech) : lessons;
  if (pool.length === 0) return 0;
  const done = pool.filter(l => completed.includes(l.id)).length;
  return Math.round((done / pool.length) * 100);
}
