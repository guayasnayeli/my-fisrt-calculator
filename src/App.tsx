import { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');

  const sumar = () => {
    const resultado = Number(num1) + Number(num2);
    alert('Resultado: ' + resultado);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Calculadora básica</h2>

      <div>
        <label>Valor 1: </label>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Valor 2: </label>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      <button
        onClick={sumar}
        style={{ marginTop: '20px' }}
      >
        Calcular
      </button>
    </div>
  );
}

export default App;