import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Particles from './components/Particles/Particles';
import './styles/main.scss';

function App() {
  return (
    <div className="app">
      <Particles />
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
