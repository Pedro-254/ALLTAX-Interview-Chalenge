import { useState } from 'react';
import GraphLocal from './pages/graphLocal/Index';
import GraphAPI from './pages/graphAPI/Index';
import './index.css';

function App() {
  const [modoApi, setModoApi] = useState(false);

  return (
    <div className="app-container">
      <div className="toggle-button">
        <button onClick={() => setModoApi(!modoApi)}>
          {modoApi ? 'Ver Gráfico Local' : 'Ver Gráfico com API'}
        </button>
      </div>

      {modoApi ? <GraphAPI /> : <GraphLocal />}
    </div>
  );
}

export default App;
