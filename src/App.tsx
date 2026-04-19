import './styles/globals.css';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <header style={{
        background: 'var(--netflix-dark-gray)',
        padding: '20px 40px',
        borderBottom: '1px solid var(--netflix-gray)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <h1 style={{ color: 'var(--sketchain-terracota)', fontSize: '1.4rem', fontWeight: 'bold' }}>
          Stack Learning
        </h1>
      </header>
      <main style={{ background: 'var(--netflix-black)', minHeight: '100vh' }}>
        <Home />
      </main>
    </>
  );
}
